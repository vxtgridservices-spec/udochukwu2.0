import { useState, useMemo, useEffect } from 'react';
import { PageView } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { trackAction } from '../utils/tracker';

interface RevenueCalculatorPageProps {
  onNavigate: (page: PageView) => void;
}

export default function RevenueCalculatorPage({ onNavigate }: RevenueCalculatorPageProps) {
  const { formatCurrency, currencySymbol } = useCurrency();

  // State variables for interactive ROI calculations
  const [sector, setSector] = useState<'Hotel' | 'RealEstate' | 'PrivateClinic' | 'SME'>('Hotel');
  const [traffic, setTraffic] = useState(2500);
  const [averageTicket, setAverageTicket] = useState(250000); // Default 250k single conversion price

  // Tracking adjustments
  useEffect(() => {
    const timer = setTimeout(() => {
      if (traffic !== 2500 || averageTicket !== 250000) {
        trackAction(`Adjusted Dedicated ROI Calculator: Set Sector to ${sector}, Monthly Traffic to ${traffic} and Value to ${formatCurrency(averageTicket)}`);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [sector, traffic, averageTicket, formatCurrency]);

  const calculatorSummary = useMemo(() => {
    const unoptimizedRate = 0.012; // 1.2% conversion
    const optimizedRate = 0.038;   // 3.8% conversion (conservative elite funnel)
    
    const legacyConversions = Math.floor(traffic * unoptimizedRate);
    const legacyRevenue = legacyConversions * averageTicket;

    const vxtConversions = Math.floor(traffic * optimizedRate);
    const vxtRevenue = vxtConversions * averageTicket;

    const leakedVisitors = Math.floor(traffic * 0.62); // 62% bounce on sluggish mobile
    const leakRevenueLoss = (traffic * 0.02) * averageTicket; 

    return {
      legacyConversions,
      legacyRevenue: formatCurrency(legacyRevenue),
      vxtConversions,
      vxtRevenue: formatCurrency(vxtRevenue),
      leakRevenueLoss: formatCurrency(leakRevenueLoss),
      additionalInboundRevenue: formatCurrency(vxtRevenue - legacyRevenue),
      leakedVisitors
    };
  }, [sector, traffic, averageTicket, formatCurrency]);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 text-left">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-12">
          <button 
            onClick={() => onNavigate('home')}
            className="text-xs font-mono text-slate-400 hover:text-white uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-colors"
          >
            ← Back to Home
          </button>
        </div>

        <span className="text-[10px] font-mono text-blue-400 tracking-[0.25em] block uppercase font-bold mb-2">
          REVENUE PROJECTION ENGINE
        </span>
        <div className="border-b border-white/20 pb-4 mb-8">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-wide uppercase relative inline-block pb-3 whitespace-normal">
            The Revenue Calculator
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
          </h1>
        </div>
        
        <p className="text-slate-400 text-xs sm:text-sm tracking-[0.12em] font-mono leading-relaxed max-w-3xl font-bold uppercase mb-16">
          Slide your monthly organic visitors and ticket prices below to calculate what the VXT-System captures for you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch w-full">
          
          {/* Left panel selectors */}
          <div className="lg:col-span-6 bg-transparent space-y-10 flex flex-col justify-between">
            <div className="space-y-10">
              
              {/* Sector selects */}
              <div className="space-y-4">
                <label className="text-[10px] font-mono text-slate-400 font-extrabold tracking-widest uppercase block">
                  1. Choose Business Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { key: 'Hotel', label: 'Hotel / Stays' },
                    { key: 'RealEstate', label: 'Real Estate' },
                    { key: 'PrivateClinic', label: 'Clinics' },
                    { key: 'SME', label: 'Corporate' }
                  ].map((x) => (
                    <button
                      key={x.key}
                      onClick={() => {
                        setSector(x.key as any);
                        if (x.key === 'RealEstate') setAverageTicket(2500000);
                        else if (x.key === 'Hotel') setAverageTicket(150000);
                        else if (x.key === 'PrivateClinic') setAverageTicket(45000);
                        else setAverageTicket(600000);
                      }}
                      className={`px-3 py-4 border text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-center transition-all cursor-pointer rounded-none ${
                        sector === x.key
                          ? 'bg-white border-white text-slate-950'
                          : 'bg-[#1E2333] text-slate-300 border-white/10 hover:border-white/35 hover:text-white'
                      }`}
                    >
                      {x.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Traffic slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-mono tracking-wider">
                  <span className="font-extrabold tracking-widest text-slate-400 uppercase">
                    2. Estimated Organic Hits / Month
                  </span>
                  <strong className="text-white font-bold font-mono">
                    {traffic.toLocaleString()} visitors
                  </strong>
                </div>
                <div className="pt-2">
                  <input
                    type="range"
                    min="500"
                    max="20000"
                    step="500"
                    value={traffic}
                    onChange={(e) => setTraffic(Number(e.target.value))}
                    className="w-full h-1 bg-white/15 cursor-ew-resize appearance-none accent-white rounded-none focus:outline-none"
                  />
                </div>
              </div>

              {/* Ticket price input */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-mono tracking-wider">
                  <span className="font-extrabold tracking-widest text-slate-400 uppercase">
                    3. Average Ticket Value ({currencySymbol})
                  </span>
                  <strong className="text-white font-bold font-mono">
                    {formatCurrency(averageTicket)}
                  </strong>
                </div>
                <input
                  type="number"
                  value={averageTicket}
                  onChange={(e) => setAverageTicket(Number(e.target.value))}
                  className="w-full bg-[#1E2333] text-white px-5 py-4 border border-white/10 focus:border-white focus:outline-none font-mono tracking-[0.15em] font-bold rounded-none"
                />
              </div>

            </div>

            <div className="border border-rose-500/20 bg-rose-950/10 p-5 border-l-2 border-l-rose-500 text-[10px] text-rose-300/90 font-mono tracking-[0.15em] uppercase leading-relaxed rounded-none">
              <strong className="text-rose-400 block mb-1">⚠️ THE SLUGGISH BOUNCE DEPRECIATOR:</strong>
              When network latency exceeds 3 seconds, users feel "white screen fatigue," causing standard sluggish template sites to shed up to 62% of traffic to bounce actions.
            </div>

          </div>

          {/* Right panel outcomes and visual graphs */}
          <div className="lg:col-span-6 bg-[#1E2333] text-white p-8 sm:p-12 border border-white/10 flex flex-col justify-between rounded-none">
            <div className="space-y-8">
              
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-[0.25em] uppercase">
                  CONVERSION CAPTURES SCORE SHEET
                </span>
              </div>

              {/* Major outcome number */}
              <div>
                <p className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-[0.2em]">
                  ADDITIONAL RECLAIMED ANNUAL PIPELINE REVENUE
                </p>
                <p className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-emerald-400 mt-4">
                  {calculatorSummary.additionalInboundRevenue}
                </p>
                <p className="text-[10px] font-mono text-slate-400 mt-4 tracking-wider uppercase leading-relaxed font-light">
                  Calculated based on VXT React funnels snapping booking processes from unoptimized 1.2% up to 3.8% rate.
                </p>
              </div>

              {/* Mini tables comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-b border-white/10 py-8">
                <div className="space-y-1">
                  <p className="text-[9px] font-mono text-rose-400 uppercase font-bold tracking-[0.18em] leading-none">
                    LEGACY UNOPTIMIZED SITE
                  </p>
                  <p className="text-lg font-bold text-slate-300 mt-2 font-mono">
                    {calculatorSummary.legacyConversions} clients / mo
                  </p>
                  <span className="text-rose-500/90 font-mono text-[9px] font-bold block mt-1 uppercase tracking-widest">
                    Worth: {calculatorSummary.legacyRevenue}
                  </span>
                </div>
                
                <div className="border-t sm:border-t-0 sm:border-l border-white/10 pt-6 sm:pt-0 sm:pl-6 space-y-1">
                  <p className="text-[9px] font-mono text-emerald-400 uppercase font-bold tracking-[0.18em] leading-none">
                    VXT PRODUCTION SYSTEM
                  </p>
                  <p className="text-lg font-bold text-emerald-400 mt-2 font-mono">
                    {calculatorSummary.vxtConversions} clients / mo
                  </p>
                  <span className="text-emerald-400/95 font-mono text-[9px] font-bold block mt-1 uppercase tracking-widest">
                    Worth: {calculatorSummary.vxtRevenue}
                  </span>
                </div>
              </div>

              <div className="space-y-4 font-mono text-[10px] tracking-[0.15em] text-slate-400 uppercase">
                <div className="flex justify-between items-center leading-none">
                  <span>UNOPTIMIZED BOUNCERS / MO:</span>
                  <span className="text-white font-bold">{calculatorSummary.leakedVisitors} visitors</span>
                </div>
                <div className="flex justify-between items-center leading-none">
                  <span>ESTIMATED LOSS RECLAIMED YEARLY:</span>
                  <span className="text-white font-bold">{calculatorSummary.leakRevenueLoss} VALUE</span>
                </div>
              </div>

            </div>

            {/* Action Button */}
            <div className="pt-8 mt-8 border-t border-white/10">
              <button
                onClick={() => onNavigate('audit')}
                className="w-full border border-white bg-white text-slate-950 font-mono text-xs font-bold tracking-[0.2em] uppercase py-4 hover:bg-transparent hover:text-white transition-all cursor-pointer rounded-none text-center block"
              >
                CRAWL MY WEBSITE FREE
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
