import AfricaSection from './AfricaSection';
import { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageView } from '../types';
import { getSiteSettings } from '../utils/storage';
import { useCurrency } from '../context/CurrencyContext';
import { trackAction } from '../utils/tracker';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Smartphone, 
  Layers, 
  Award, 
  Users, 
  Heart, 
  Building2, 
  Flame, 
  Navigation, 
  ShieldCheck, 
  Gauge, 
  ChevronRight 
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageView) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [heroImageUrl, setHeroImageUrl] = useState('https://res.cloudinary.com/drghjqbak/image/upload/q_auto/f_auto/v1781784160/1781783831624_2_u3nqbc.jpg');
  const { formatCurrency, currencySymbol } = useCurrency();

  useEffect(() => {
    const settings = getSiteSettings();
    setHeroImageUrl(settings.heroImageUrl);
  }, []);

  // Conversion state calculator parameters
  const [sector, setSector] = useState<'Hotel' | 'RealEstate' | 'PrivateClinic' | 'SME'>('Hotel');
  const [traffic, setTraffic] = useState(2500);
  const [averageTicket, setAverageTicket] = useState(250000); // Default 250k single conversion price

  // Track user interactive ROI adjustments
  useEffect(() => {
    const timer = setTimeout(() => {
      // Avoid tracking initial mount by checking changes
      if (traffic !== 2500 || averageTicket !== 250000) {
        trackAction(`Adjusted ROI Calculator: Set Sector to ${sector}, Monthly Traffic to ${traffic} and Value to ${formatCurrency(averageTicket)}`);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [sector, traffic, averageTicket, formatCurrency]);

  const calculatorSummary = useMemo(() => {
    // Standard unoptimized brochure leak stats (5.4% conversion vs our React 11.2%)
    const unoptimizedRate = 0.012; // 1.2% conversion
    const optimizedRate = 0.038;   // 3.8% conversion (conservative elite funnel)
    
    const legacyConversions = Math.floor(traffic * unoptimizedRate);
    const legacyRevenue = legacyConversions * averageTicket;

    const vxtConversions = Math.floor(traffic * optimizedRate);
    const vxtRevenue = vxtConversions * averageTicket;

    const leakedVisitors = Math.floor(traffic * 0.62); // 62% bounce on sluggish mobile
    const leakRevenueLoss = (traffic * 0.02) * averageTicket; // estimated loss based on simple stats

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
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* 1. HERO MAIN FLAGSHIP ROW */}
      <section className="py-4 sm:py-8 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100 dark:border-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Hero left descriptors details */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-5 md:space-y-6 text-left">
            
            {/* 1. Trust Badge */}
            <div className="flex flex-wrap gap-2">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[9px] sm:text-xs font-mono text-blue-600 dark:text-blue-400 font-extrabold uppercase tracking-widest bg-blue-1050 dark:bg-blue-950 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full"
              >
                ✓ TRUSTED BY BUSINESSES ACROSS AFRICA
              </motion.span>
            </div>

            {/* 2. Introduction */}
            <h2 className="text-sm sm:text-xl lg:text-2xl font-serif text-slate-600 dark:text-slate-300 font-normal">
              Hi, I'm Udochukwu.
            </h2>

            {/* 3. Value Proposition Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif text-slate-1000 dark:text-white leading-tight font-normal tracking-tight">
              I help African businesses <span className="font-medium">build brands people trust online.</span>
            </h1>

            {/* 4. Role & Credibility */}
            <p className="text-[10px] sm:text-sm md:text-base font-mono text-blue-700 dark:text-blue-400 font-bold uppercase tracking-wide">
              Web Designer • Digital Strategist • AI Educator • Founder of VXTGrid Services
            </p>

            {/* 5. Supporting Statement */}
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm md:text-base lg:text-lg max-w-xl leading-relaxed font-sans font-light">
              I partner with ambitious businesses, founders and organizations across Africa to create stunning digital experiences that build credibility, generate leads and drive real business growth.
            </p>

            {/* 7. Primary CTAs */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-2.5 sm:gap-4 items-center">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 sm:px-6 sm:py-4 rounded-xl text-xs sm:text-sm transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                Book Free Consultation
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('portfolio')}
                className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-all text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-900 text-center cursor-pointer"
              >
                View Case Studies
              </button>
              
              <button
                onClick={() => onNavigate('learn')}
                className="text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 w-full sm:w-auto py-1 sm:py-0"
              >
                Learn with Udochukwu →
              </button>
            </div>

            {/* 6. Social Proof Strip */}
            <div className="pt-4 sm:pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-slate-100 dark:border-slate-900">
              {[
                { label: '80+ Projects Delivered' },
                { label: '50+ Happy Clients' },
                { label: '12+ Countries Served' },
                { label: '100% Client Satisfaction' },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-base sm:text-xl font-serif font-bold text-slate-900 dark:text-white">{stat.label.split(' ')[0]}</p>
                  <p className="text-[9px] sm:text-[10px] uppercase font-mono text-slate-500">{stat.label.split(' ').slice(1).join(' ')}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Hero right: Udochukwu Portrait with Ambient dashboard */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-4 border-slate-950 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-2xl skew-x-1 hover:skew-x-0 transition-transform duration-500">
              <img 
                src={heroImageUrl} 
                alt="Udochukwu" 
                className="w-full h-auto object-cover max-h-[460px] object-top filter contrast-[1.03]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent"></div>
              
              {/* Overlay stats dashboard block */}
              <div className="absolute bottom-6 left-6 right-6 bg-slate-950/90 text-white p-4 rounded-2xl border border-slate-800 backdrop-blur-md flex items-center justify-between shadow-xl">
                <div>
                  <p className="text-[10px] font-mono text-blue-400 uppercase font-black tracking-widest leading-none">SYSTEM RATIO SPEED</p>
                  <p className="text-xl font-bold mt-1 tracking-tight">0.7s MTN Mobile</p>
                </div>
                
                <div className="text-right border-l border-slate-850 pl-4">
                  <p className="text-[10px] font-mono text-emerald-400 uppercase font-black tracking-widest leading-none">CONVERSION CAPTURES</p>
                  <p className="text-xl font-bold mt-1 tracking-tight text-emerald-400">+295% direct leads</p>
                </div>
              </div>
            </div>

            {/* Glowing circle at back */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-600/10 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
          </div>

        </div>
      </section>

      {/* 2. THE TRUST CERTIFICATE BADGES SECTION */}
      <section className="bg-slate-50 dark:bg-slate-900/60 py-12 transition-colors border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/40 dark:border-slate-700/50 flex gap-4 items-center shadow-xs">
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-950 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Gauge className="w-5 h-5 col-blue-600" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-semibold text-slate-900 dark:text-white">Business-Critical Speed</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">High-performing digital experiences</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/40 dark:border-slate-700/50 flex gap-4 items-center shadow-xs">
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-950 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Award className="w-5 h-5 col-blue-600" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-semibold text-slate-900 dark:text-white">Growth & Revenue Strategy</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Focused on sales conversion</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/40 dark:border-slate-700/50 flex gap-4 items-center shadow-xs">
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-950 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <ShieldCheck className="w-5 h-5 col-blue-600" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-semibold text-slate-900 dark:text-white">Premium Consultancy</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Professional delivery standards</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/40 dark:border-slate-700/50 flex gap-4 items-center shadow-xs">
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-950 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Users className="w-5 h-5 col-blue-600" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-semibold text-slate-900 dark:text-white">Transparent Collaboration</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Full milestone visibility</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE CONVERSION ENGINE & SALES MACHINE CALCULATOR */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100 dark:border-slate-900">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-100 dark:bg-blue-950 px-3.5 py-1.5 rounded-full font-medium">
            THE REVENUE CALCULATOR MACHINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 dark:text-white mt-4 font-normal tracking-tight">
            Stop Leaking Leads. See Your True Inbound Pipeline.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-xs sm:text-sm">
            Most generic websites leak over 60% of their mobile visitors due to unoptimized speed. Slide your monthly organic visitors and ticket prices below to calculate what the VXT-system captures for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left panel selectors */}
          <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Sector selects */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-400 font-extrabold tracking-widest uppercase block">1. MY BUSINESS MODEL CATEGORY</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'Hotel', label: 'Hotel / Stays' },
                    { key: 'RealEstate', label: 'Real Estate' },
                    { key: 'PrivateClinic', label: 'Clinics' },
                    { key: 'SME', label: 'Corporate App' }
                  ].map((x) => (
                    <button
                      key={x.key}
                      onClick={() => {
                        setSector(x.key as any);
                        if (x.key === 'RealEstate') setAverageTicket(2500000); // 2.5 million average for land broker deal
                        else if (x.key === 'Hotel') setAverageTicket(150000); // 150k bedside checkouts
                        else if (x.key === 'PrivateClinic') setAverageTicket(45000); // 45k health registration
                        else setAverageTicket(600000); // 600k SME value
                      }}
                      className={`px-2 py-2.5 rounded-xl border text-[11px] font-bold text-center transition-all cursor-pointer ${
                        sector === x.key
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-350 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {x.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Traffic slider */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs font-mono text-slate-500">
                  <span className="font-extrabold tracking-widest uppercase">2. ESTIMATED GOOGLE ORGANIC VISITORS / MONTH</span>
                  <strong className="text-slate-900 dark:text-white font-bold">{traffic.toLocaleString()} hits</strong>
                </div>
                <input
                  type="range"
                  min="500"
                  max="20000"
                  step="500"
                  value={traffic}
                  onChange={(e) => setTraffic(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-205 rounded-full appearance-none cursor-ew-resize accent-blue-600"
                />
              </div>

              {/* Ticket price input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-slate-500">
                  <span className="font-extrabold tracking-widest uppercase">3. AVERAGE REVENUE VALUE PER SINGLE CLIENT ({currencySymbol})</span>
                  <strong className="text-slate-900 dark:text-white font-bold">{formatCurrency(averageTicket)}</strong>
                </div>
                <input
                  type="number"
                  value={averageTicket}
                  onChange={(e) => setAverageTicket(Number(e.target.value))}
                  className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>

            </div>

            <div className="bg-amber-50 dark:bg-slate-950 p-4 rounded-xl text-[10px] text-slate-500 leading-relaxed border border-amber-200/50 dark:border-slate-800/80">
              <strong className="text-amber-600 dark:text-amber-400 block uppercase mb-1">⚠️ THE SLUGGISH BOUNCE DEPRECIATOR:</strong>
              When local network latency exceeds 3 seconds on Airtel network, local bookers experience "white screen fatigue," causing standard brochure site exits.
            </div>

          </div>

          {/* Right panel outcomes and visual graphs */}
          <div className="lg:col-span-6 bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-blue-400 animate-pulse" />
                <span className="text-[10px] font-mono text-blue-400 font-extrabold tracking-widest">CONVERSION CAPTURES SCORE SHEET</span>
              </div>

              {/* Major outcome number */}
              <div>
                <p className="text-[10px] font-mono text-slate-400 font-extrabold uppercase">ADDITIONAL RECLAIMED ANNUAL PIPELINE REVENUE</p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-blue-400 mt-2">
                  {calculatorSummary.additionalInboundRevenue}
                </p>
                <p className="text-[11px] text-slate-400 mt-1 italic">
                  Calculated based on VXT React funnels snapping booking processes from 1.2% conversion rate to 3.8% rate.
                </p>
              </div>

              {/* Mini tables comparison */}
              <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-850 py-6">
                <div>
                  <p className="text-[9px] font-mono text-slate-400 uppercase font-black tracking-widest leading-none">LEGACY UNOPTIMIZED SITE</p>
                  <p className="text-lg font-bold text-slate-300 mt-1">{calculatorSummary.legacyConversions} clients / month</p>
                  <span className="text-rose-500 font-mono text-[10px] font-bold block mt-1">↳ Worth: {calculatorSummary.legacyRevenue}</span>
                </div>
                
                <div className="border-l border-slate-850 pl-4">
                  <p className="text-[9px] font-mono text-blue-400 uppercase font-black tracking-widest leading-none">VXT PRODUCTION SITE</p>
                  <p className="text-lg font-bold text-blue-400 mt-1">{calculatorSummary.vxtConversions} clients / month</p>
                  <span className="text-emerald-400 font-mono text-[10px] font-bold block mt-1">↳ Worth: {calculatorSummary.vxtRevenue}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400 leading-none">
                  <span>UNOPTIMIZED MTN BOUNCERS / MONTH:</span>
                  <span className="text-red-400 font-bold">{calculatorSummary.leakedVisitors} visitors</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono text-slate-400 leading-none">
                  <span>ESTIMATED LOSS RECLAIMED YEARLY:</span>
                  <span className="text-red-400 font-bold">{calculatorSummary.leakRevenueLoss} value</span>
                </div>
              </div>

            </div>

            <div className="pt-8 border-t border-slate-850 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-[11px] text-slate-400 leading-tight">These projections are fully detailed in our diagnostics reports.</span>
              
              <button
                onClick={() => onNavigate('audit')}
                id="calc-cta-trigger-full-scan"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold px-5 py-2.5 flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span>Crawl My Website Free</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 4. EXECUTIVE SERVICES PITCH PANEL */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/60 transition-colors border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-5 relative h-64 sm:h-[400px] rounded-3xl overflow-hidden border shadow-2xl order-last lg:order-first">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" 
                alt="Case Study Showcase Mockup" 
                className="absolute inset-0 w-full h-full object-cover filter contrast-[1.04]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white text-xs font-mono">
                <span className="bg-blue-600 px-3 py-1 rounded-sm shadow-md text-[9px] font-black uppercase tracking-widest font-mono">CASE HIGHLIGHT</span>
                <p className="text-base font-serif mt-2 font-medium">Eko Haven Bedsides reservations overhaul</p>
                <p className="text-slate-400">Direct booking increased by +295% in Lagos</p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-100 dark:bg-blue-950 px-3 py-1.5 rounded-full font-medium">
                THE EXECUTION MODEL
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 dark:text-white font-normal tracking-tight">
                An Elite Partner to Help You outrank and Outsell.
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl">
                I do not sell commodity web files or low-end layouts. Every solution VXTGrid Services deploys is fully tailored around premium user experiences and conversion rates optimizations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t">
                <div className="space-y-1">
                  <h4 className="text-sm font-serif font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-blue-600 rounded-full"></span>
                    Premium Layout Design
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    Awwwards-style typography-rich interfaces styled for absolute corporate authority and luxury. No typical pre-made generic layouts.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-serif font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-blue-600 rounded-full"></span>
                    Advanced MTN Mobile Speed SLA
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    React and CDN edge configurations to raise mobile loading times to standard milliseconds speed.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-serif font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-blue-600 rounded-full"></span>
                    High-Intensive SEO Maps
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    Micro JSON-LD Schema structures, ranking your locational landing pages on target corporate terms.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-serif font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-blue-600 rounded-full"></span>
                    Full Client Milestones Dash
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    Track timeline details, print invoices bills, message Udochukwu, and upload outlines transparently.
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onNavigate('services')}
                  id="home-services-read-features"
                  className="bg-slate-900 hover:bg-slate-950 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-xs font-bold px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Premium Packages</span>
                  <ArrowRight className="w-4 h-4 text-white dark:text-slate-950" />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Africa Section */}
        <AfricaSection />

        {/* Final CTA SECTION */}
        <section className="py-20 bg-blue-600 dark:bg-blue-900 text-white text-center">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight">Ready to Build a Website That Works as Hard as You Do?</h2>
            <p className="max-w-xl mx-auto mt-4 text-blue-100">Let's create a website that earns trust, attracts customers and supports your business growth across Africa.</p>
            <div className="mt-8 flex gap-4 justify-center">
                <button onClick={() => onNavigate('contact')} className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl cursor-pointer">Book Consultation</button>
                <button onClick={() => onNavigate('audit')} className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl cursor-pointer">Get Free Website Audit</button>
            </div>
        </section>

      </section>

    </div>
  );
}
