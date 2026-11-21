import { useState, useMemo, useEffect } from 'react';
import { PageView } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { trackAction } from '../utils/tracker';
import { Percent } from 'lucide-react';

interface RevenueCalculatorPageProps {
  onNavigate: (page: PageView) => void;
}

export default function RevenueCalculatorPage({ onNavigate }: RevenueCalculatorPageProps) {
  const { formatCurrency, currencySymbol } = useCurrency();

  const [sector, setSector] = useState<'Hotel' | 'RealEstate' | 'PrivateClinic' | 'SME'>('Hotel');
  const [traffic, setTraffic] = useState(2500);
  const [averageTicket, setAverageTicket] = useState(250000);
  const [baselineRate, setBaselineRate] = useState(1.0);
  const [targetRate, setTargetRate] = useState(2.5);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (traffic !== 2500 || averageTicket !== 250000) {
        trackAction(
          `Adjusted Revenue Estimator: Sector=${sector}, Traffic=${traffic}, Ticket=${formatCurrency(
            averageTicket
          )}`
        );
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [sector, traffic, averageTicket, formatCurrency]);

  const calculatorSummary = useMemo(() => {
    const effectiveTarget = Math.max(baselineRate, targetRate);
    const baselineConversions = Math.floor(traffic * (baselineRate / 100));
    const baselineRevenue = baselineConversions * averageTicket;

    const targetConversions = Math.floor(traffic * (effectiveTarget / 100));
    const targetRevenue = targetConversions * averageTicket;

    const monthlyDelta = Math.max(0, targetRevenue - baselineRevenue);
    const annualDelta = monthlyDelta * 12;

    return {
      baselineConversions,
      baselineRevenue: formatCurrency(baselineRevenue),
      targetConversions,
      targetRevenue: formatCurrency(targetRevenue),
      monthlyDelta: formatCurrency(monthlyDelta),
      annualDelta: formatCurrency(annualDelta),
      effectiveTarget,
    };
  }, [traffic, averageTicket, baselineRate, targetRate, formatCurrency]);

  return (
    <div className="bg-[#181d2c] text-white">
      {/* 1. HERO BAND (Warm Sand-Amber Wash) */}
      <section className="bg-[#8f6f47] py-20 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-white/85 tracking-[0.18em] uppercase mb-4">
            <Percent className="w-4 h-4" />
            <span>Scenario Estimation Workbench</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold text-white tracking-tight">
            Revenue Scenario Estimator
          </h1>

          <div className="w-full max-w-2xl h-[1px] bg-white/80 my-6" />

          <p className="text-white/95 text-xs sm:text-sm tracking-[0.16em] font-mono leading-relaxed max-w-2xl uppercase">
            INPUT MONTHLY VISITORS, AVERAGE SALE VALUE, BASELINE CONVERSION %, AND GOAL CONVERSION % TO MODEL SCENARIO MATH.
          </p>
        </div>
      </section>

      {/* 2. CALCULATOR WORKBENCH BAND (Deep Navy) */}
      <section className="bg-[#1b243b] py-16 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch w-full">
            {/* Left Inputs */}
            <div className="lg:col-span-6 space-y-7">
              <div className="space-y-3">
                <label className="text-[11px] font-mono text-white/85 font-semibold tracking-[0.16em] uppercase block">
                  1. Business Category Preset
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'Hotel', label: 'Hospitality' },
                    { key: 'RealEstate', label: 'Real Estate' },
                    { key: 'PrivateClinic', label: 'Clinics' },
                    { key: 'SME', label: 'Commerce' },
                  ].map((x) => (
                    <button
                      key={x.key}
                      type="button"
                      onClick={() => {
                        setSector(x.key as any);
                        if (x.key === 'RealEstate') setAverageTicket(2500000);
                        else if (x.key === 'Hotel') setAverageTicket(150000);
                        else if (x.key === 'PrivateClinic') setAverageTicket(45000);
                        else setAverageTicket(550000);
                      }}
                      className={`px-3 py-3 border text-[11px] font-mono font-semibold tracking-wider uppercase text-center transition-colors cursor-pointer ${
                        sector === x.key
                          ? 'bg-white border-white text-slate-950'
                          : 'bg-[#141a2b]/75 text-white/85 border-white/25 hover:border-white hover:text-white'
                      }`}
                    >
                      {x.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono tracking-wider">
                  <span className="font-semibold text-white/85 uppercase">2. Monthly Visitors</span>
                  <strong className="text-white font-bold tabular-nums">
                    {traffic.toLocaleString()} visitors
                  </strong>
                </div>
                <input
                  type="range"
                  min="200"
                  max="20000"
                  step="200"
                  value={traffic}
                  onChange={(e) => setTraffic(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/20 cursor-ew-resize appearance-none accent-white"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono tracking-wider">
                  <span className="font-semibold text-white/85 uppercase">
                    3. Average Transaction Value ({currencySymbol})
                  </span>
                  <strong className="text-white font-bold tabular-nums">
                    {formatCurrency(averageTicket)}
                  </strong>
                </div>
                <input
                  type="number"
                  min="1000"
                  value={averageTicket}
                  onChange={(e) => setAverageTicket(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-[#141a2b]/80 text-white px-4 py-3.5 border border-white/25 focus:border-white focus:outline-none font-mono font-semibold tabular-nums text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-white/85 uppercase font-semibold">4. Current Conv. %</span>
                    <strong className="text-white tabular-nums">{baselineRate.toFixed(1)}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="5.0"
                    step="0.2"
                    value={baselineRate}
                    onChange={(e) => setBaselineRate(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/20 cursor-ew-resize appearance-none accent-white"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-white/85 uppercase font-semibold">5. Target Conv. %</span>
                    <strong className="text-white tabular-nums">
                      {calculatorSummary.effectiveTarget.toFixed(1)}%
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10.0"
                    step="0.2"
                    value={targetRate}
                    onChange={(e) => setTargetRate(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/20 cursor-ew-resize appearance-none accent-white"
                  />
                </div>
              </div>

              <div className="border border-white/20 bg-[#141a2b]/65 p-5 text-xs text-white/80 font-sans leading-relaxed">
                This estimator uses straightforward linear arithmetic on the rates you enter above. Actual commercial outcomes depend on traffic quality, offer fit, and pricing.
              </div>
            </div>

            {/* Right Output */}
            <div className="lg:col-span-6 bg-[#141a2b]/80 text-white p-7 sm:p-10 border border-white/25 flex flex-col justify-between">
              <div className="space-y-7">
                <span className="text-xs font-mono text-white/75 font-semibold tracking-[0.18em] uppercase block">
                  Modeled Scenario Output
                </span>

                <div>
                  <p className="text-[11px] font-mono text-white/75 uppercase tracking-[0.16em]">
                    Estimated Monthly Revenue Difference
                  </p>
                  <p className="text-4xl sm:text-5xl font-sans font-semibold tracking-tight text-white mt-2 tabular-nums">
                    {calculatorSummary.monthlyDelta}
                  </p>
                  <p className="text-xs font-mono text-white/75 mt-2 uppercase tracking-wider tabular-nums">
                    Annualized Difference: {calculatorSummary.annualDelta}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-b border-white/20 py-7">
                  <div className="space-y-1">
                    <p className="text-[11px] font-mono text-white/70 uppercase tracking-[0.16em]">
                      At {baselineRate.toFixed(1)}% Conversion
                    </p>
                    <p className="text-lg font-bold text-white mt-2 font-mono tabular-nums">
                      {calculatorSummary.baselineConversions} orders / mo
                    </p>
                    <span className="text-white/75 font-mono text-xs block mt-1 tabular-nums">
                      {calculatorSummary.baselineRevenue} / mo
                    </span>
                  </div>

                  <div className="border-t sm:border-t-0 sm:border-l border-white/20 pt-5 sm:pt-0 sm:pl-6 space-y-1">
                    <p className="text-[11px] font-mono text-white/85 uppercase tracking-[0.16em]">
                      At {calculatorSummary.effectiveTarget.toFixed(1)}% Conversion
                    </p>
                    <p className="text-lg font-bold text-white mt-2 font-mono tabular-nums">
                      {calculatorSummary.targetConversions} orders / mo
                    </p>
                    <span className="text-white/90 font-mono text-xs block mt-1 tabular-nums">
                      {calculatorSummary.targetRevenue} / mo
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => onNavigate('audit')}
                  className="w-full border border-white bg-white text-slate-950 font-mono text-xs font-semibold tracking-[0.18em] uppercase py-4 hover:bg-transparent hover:text-white transition-colors cursor-pointer text-center block"
                >
                  Request Website Technical Audit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
