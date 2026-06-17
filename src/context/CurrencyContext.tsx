import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
}

interface CurrencyContextType {
  currencyCode: string;
  currencySymbol: string;
  rate: number;
  formatCurrency: (nairaValue: number) => string;
  allCurrencies: CurrencyInfo[];
  changeCurrency: (code: string) => void;
  isLoading: boolean;
  detectedCountry: string;
  convertNairaString: (nairaStr: string) => string;
}

const ALL_CURRENCIES: CurrencyInfo[] = [
  { code: 'NGN', symbol: '₦', name: 'African Naira' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' }
];

// High-fidelity fallback rates matching modern ballpark estimates (1 USD ~ 1,500 NGN)
const FALLBACK_RATES: Record<string, number> = {
  NGN: 1.0,
  USD: 0.00067, // 1 USD = 1,500 NGN
  GBP: 0.00053, // 1 GBP = 1,900 NGN
  EUR: 0.00063, // 1 EUR = 1,600 NGN
  ZAR: 0.0125,  // 1 ZAR = 80 NGN
  GHS: 0.01,    // 1 GHS = 100 NGN
  KES: 0.087    // 1 KES = 11.5 NGN
};

const SYMBOLS: Record<string, string> = {
  NGN: '₦',
  USD: '$',
  GBP: '£',
  EUR: '€',
  ZAR: 'R',
  GHS: 'GH₵',
  KES: 'KSh'
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currencyCode, setCurrencyCode] = useState<string>(() => localStorage.getItem('vxt_user_currency') || 'NGN');
  const [detectedCountry, setDetectedCountry] = useState<string>(() => localStorage.getItem('vxt_user_country') || 'Africa');
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [isLoading, setIsLoading] = useState(true);

  const currencySymbol = useMemo(() => SYMBOLS[currencyCode] || '$', [currencyCode]);
  const rate = useMemo(() => rates[currencyCode] || FALLBACK_RATES[currencyCode] || 1.0, [rates, currencyCode]);

  useEffect(() => {
    const initializeCurrency = async () => {
      // 1. Setup local rate variables
      let currentRates = { ...FALLBACK_RATES };
      const cachedRates = localStorage.getItem('vxt_rates');
      const cachedTime = localStorage.getItem('vxt_rates_time');

      // Use cached rates if they are under 6 hours old
      if (cachedRates && cachedTime && (Date.now() - Number(cachedTime) < 6 * 60 * 60 * 1055)) {
        try {
          currentRates = JSON.parse(cachedRates);
        } catch (e) {
          currentRates = { ...FALLBACK_RATES };
        }
      } else {
        // Fetch fresh real-time rates from free open api source
        try {
          const res = await fetch('https://open.er-api.com/v6/latest/NGN');
          if (res.ok) {
            const data = await res.json();
            if (data && data.rates) {
              const ratesObj: Record<string, number> = { NGN: 1.0 };
              ALL_CURRENCIES.forEach(curr => {
                if (curr.code !== 'NGN' && data.rates[curr.code]) {
                  ratesObj[curr.code] = data.rates[curr.code];
                } else if (curr.code !== 'NGN') {
                  ratesObj[curr.code] = FALLBACK_RATES[curr.code];
                }
              });
              currentRates = ratesObj;
              localStorage.setItem('vxt_rates', JSON.stringify(ratesObj));
              localStorage.setItem('vxt_rates_time', Date.now().toString());
            }
          }
        } catch (e) {
          console.warn('Real-time rates conversion API offline, utilizing pre-seeded parameters.');
        }
      }

      setRates(currentRates);

      // 2. Identify IP location and currency code
      const cachedCurrency = localStorage.getItem('vxt_user_currency');
      let targetCode = cachedCurrency || 'NGN';
      let targetCountry = localStorage.getItem('vxt_user_country') || 'Africa';

      if (!cachedCurrency) {
        try {
          // Consult fast public client IP mapping
          const res = await fetch('https://ipapi.co/json/');
          if (res.ok) {
            const data = await res.json();
            if (data && data.currency) {
              const isSupported = ALL_CURRENCIES.some(c => c.code === data.currency);
              if (isSupported) {
                targetCode = data.currency;
              } else {
                // African/International routing fallbacks
                const mappedAfrican: Record<string, string> = {
                  NG: 'NGN', GH: 'GHS', KE: 'KES', ZA: 'ZAR'
                };
                targetCode = mappedAfrican[data.country_code] || 'USD';
              }
              if (data.country_name) {
                targetCountry = data.country_name;
                localStorage.setItem('vxt_user_country', data.country_name);
              }
              localStorage.setItem('vxt_user_currency', targetCode);
            }
          }
        } catch (e) {
          console.warn('Context locator API failed, using standard geographical default parameters.');
        }
      }

      setCurrencyCode(targetCode);
      setDetectedCountry(targetCountry);
      setIsLoading(false);
    };

    initializeCurrency();
  }, []);

  const changeCurrency = (code: string) => {
    if (ALL_CURRENCIES.some(curr => curr.code === code)) {
      setCurrencyCode(code);
      localStorage.setItem('vxt_user_currency', code);
    }
  };

  const formatCurrency = (nairaValue: number) => {
    const currentRate = rates[currencyCode] || FALLBACK_RATES[currencyCode] || 1.0;
    const converted = nairaValue * currentRate;

    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(converted);
    } catch (e) {
      const formattedNum = converted.toLocaleString(undefined, {
        maximumFractionDigits: 0
      });
      return `${SYMBOLS[currencyCode] || '$'}${formattedNum}`;
    }
  };

  /**
   * Helper utility to dynamically translate string text containing Naira values "₦X" or "₦X.XM" etc.
   * e.g. "₦1,850,000+" -> "$1,234+"
   */
  const convertNairaString = (nairaStr: string): string => {
    if (!nairaStr || !nairaStr.includes('₦')) return nairaStr;
    const currentRate = rates[currencyCode] || FALLBACK_RATES[currencyCode] || 1.0;
    
    // Regular expression to extract numerical elements from formatted strings like ₦1,850,000+ or ₦180M
    return nairaStr.replace(/₦([\d,]+(?:\.\d+)?)\s*(M|k|K|Million|Billion)?/gi, (match, digits, suffix) => {
      let numericVal = parseFloat(digits.replace(/,/g, ''));
      if (isNaN(numericVal)) return match;
      
      // Handle millions or thousands suffixes
      if (suffix) {
        const lowerSuffix = suffix.toLowerCase();
        if (lowerSuffix === 'm' || lowerSuffix === 'million') {
          // keep representation or expand, let's keep suffix but perform the currency rate conversion directly!
          const multiplied = numericVal * currentRate;
          // Format with symbol
          const symStr = SYMBOLS[currencyCode] || '$';
          return `${symStr}${multiplied.toLocaleString(undefined, { maximumFractionDigits: 1 })}${suffix}`;
        }
        if (lowerSuffix === 'k') {
          const multiplied = numericVal * currentRate;
          const symStr = SYMBOLS[currencyCode] || '$';
          return `${symStr}${multiplied.toLocaleString(undefined, { maximumFractionDigits: 0 })}k`;
        }
      }

      // Standard numeric formatting
      const converted = numericVal * currentRate;
      try {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currencyCode,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(converted);
      } catch (err) {
        return `${SYMBOLS[currencyCode] || '$'}${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
      }
    });
  };

  return (
    <CurrencyContext.Provider value={{
      currencyCode,
      currencySymbol,
      rate,
      formatCurrency,
      allCurrencies: ALL_CURRENCIES,
      changeCurrency,
      isLoading,
      detectedCountry,
      convertNairaString
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be utilized within a valid CurrencyProvider wrap.');
  }
  return context;
}
