import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRELOADED_SERVICES } from '../utils/storage';
import { useCurrency } from '../context/CurrencyContext';
import { 
  Check, 
  HelpCircle, 
  ShieldCheck, 
  Building2, 
  UtensilsCrossed, 
  Hotel, 
  Sparkles, 
  BookOpen, 
  HeartPulse, 
  Briefcase, 
  Hammer, 
  Tag, 
  Store, 
  Cpu, 
  Scale, 
  Calendar, 
  DollarSign, 
  Hourglass 
} from 'lucide-react';

interface ServicesProps {
  onNavigate: (page: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const { convertNairaString } = useCurrency();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('Hotels');

  const extraServices = [
    { title: 'Website Speed Tuning', desc: 'Squeeze bloated server response overhead. Compress images and setup edge CDNs to raise Google Core Web Vitals to 98%.' },
    { title: 'SEO Optimization', desc: 'Schema markup mappings, Google Search console indexings, and contextual keywords mapping to secure ranking on intent queries.' },
    { title: 'Brand Identity Strategy', desc: 'Elite corporate logo creation, high-end visual stylesheets, font pairings, and unified brand manuals.' },
    { title: 'Website Maintenance & Security SLA', desc: 'Weekly backups, immediate core updates, malware scans, DDoS protection, and continuous SLA support hours.' },
    { title: 'Premium Business Consultation', desc: 'One-on-one direct audits of existing pipelines, traffic analytics breakdown, and customized CTA re-trigger strategy maps.' }
  ];

  const industries = [
    {
      name: 'Hotels',
      icon: Hotel,
      tagline: 'Direct Bedside Reservations',
      challenge: 'Losing 18%+ bookings gross profit margins to heavy OTA aggregators (Booking.com/Expedia) and slow loading galleries.',
      strategy: 'Deploy ultra-light booking funnels synced to local bank wire/card gateways and automatic checkout confirmation flows.'
    },
    {
      name: 'Real Estate',
      icon: Building2,
      tagline: 'High-Net-Worth Lead Pipelines',
      challenge: 'Relying strictly on messy Instagram messages and bulky PDFs that diaspora buyers find untrustworthy.',
      strategy: 'Prestige catalog grids with virtual cinematic walkthrough embeds, lifestyle maps, and secure Diaspora Lead Capture Kits.'
    },
    {
      name: 'Restaurants',
      icon: UtensilsCrossed,
      tagline: 'Mobile Ordering & Table Bookings',
      challenge: 'Slow, unreadable mobile menus causing massive lunch or evening booking bounces.',
      strategy: 'Light mobile menus that load in 0.5 seconds, interactive calendar reservation forms, and direct WhatsApp reservation alerts.'
    },
    {
      name: 'Schools',
      icon: BookOpen,
      tagline: 'Nursery & Secondary Admissions',
      challenge: 'Confused parents leaving because enrollment details and fee download links are broken or slow.',
      strategy: 'Elegant "Admissions Hub" pages containing streamlined forms, interactive prospectus viewports, and school values timelines.'
    },
    {
      name: 'Churches',
      icon: Sparkles,
      tagline: 'Digital Ministry and Media Archives',
      challenge: 'Scattered sermon records, laggy video embeds, and confusing options to donate locally or from abroad.',
      strategy: 'Optimized video sermon streams, seamless secure online offering hubs, and simplified digital weekly bulletin downloads.'
    },
    {
      name: 'Healthcare',
      icon: HeartPulse,
      tagline: 'Patient Enrollment & Doctor Schedules',
      challenge: 'Manual phone scheduling draining front-desk energy, forcing patients to wait for appointments.',
      strategy: 'Hacker-proof appointment engines with real-time slot selection, SMS alerts, and professional department directories.'
    },
    {
      name: 'Law Firms',
      icon: Scale,
      tagline: 'Elite Consultation Closers',
      challenge: 'Brochure sites that fail to represent trial pedigree, making elite corporations negotiate lower rates.',
      strategy: 'Sleek, heavy white-and-gold editorial pages detailing key partner accolades, high-profile victory reports, and calendar forms.'
    },
    {
      name: 'Construction',
      icon: Hammer,
      tagline: 'Bid-Winning Portal Layouts',
      challenge: 'Losing massive government or private tenders because portfolios look unpolished or outdated.',
      strategy: 'Case-study layouts of past architectural contracts, site telemetry stats, and high-fidelity project gallery carousels.'
    },
    {
      name: 'Fashion Brands',
      icon: Tag,
      tagline: 'Prestige Identity & E-commerce',
      challenge: 'Standard Shopify setups that strip your clothes of luxury feeling, resulting in low average orders.',
      strategy: 'High-contrast magazine layouts, integrated rich shopping experiences, and premium local payout automations.'
    },
    {
      name: 'Small Businesses',
      icon: Store,
      tagline: 'Immediate Automated Inbounds',
      challenge: 'Zero local visibility, failing to convince prospects coming from local search terms.',
      strategy: 'Highly localized SEO blueprints, prominent trust indicators, and frictionless direct Call/WhatsApp trigger modules.'
    },
    {
      name: 'Tech Startups',
      icon: Cpu,
      tagline: 'SaaS Traction & Lead Funnels',
      challenge: 'Heavy layouts with confusing text, leading to poor visitor conversions and expensive ad budgets.',
      strategy: 'Modern single-page react funnels, dynamic service visualizers, and structured interactive pricing tables.'
    }
  ];

  return (
    <div className="py-12 md:py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-100 dark:bg-blue-950 px-3 py-1.5 rounded-full font-medium">
            OUTCOME-DRIVEN PRICING PACKAGES
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-900 dark:text-white mt-4 font-medium tracking-tight">
            Premium Packages Built to Spark Performance
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            We don’t charge hourly rates or sell empty blocks of web layouts. We offer comprehensive customer acquisition funnels mapped to direct business benefits.
          </p>
        </div>

        {/* Mega Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {PRELOADED_SERVICES.map((p, idx) => (
            <div
              key={p.id}
              id={`service-pkg-card-${idx}`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/60 dark:border-slate-700/50 p-8 shadow-xs hover:shadow-xl transition-all relative flex flex-col justify-between ${
                idx === 0 
                  ? 'ring-2 ring-blue-600 dark:ring-blue-500 lg:scale-[1.03] lg:z-10' 
                  : 'hover:-translate-y-1'
              }`}
            >
              {idx === 0 && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-mono tracking-widest uppercase font-semibold px-4 py-1.5 rounded-full shadow-md">
                  ★ MOST POPULAR ENTERPRISE SYSTEM
                </span>
              )}
              
              <div>
                {/* Title Block */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    {p.name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-3 leading-relaxed">
                    {p.tagline}
                  </p>
                </div>

                {/* Logistics Badges */}
                <div className="mt-6 flex flex-wrap gap-2 py-4 border-y border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-slate-300">
                    <Hourglass className="w-3.5 h-3.5 text-blue-600" />
                    <span>TIMELINE: <strong>{p.timeline}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>STARTING AT: <strong className="text-blue-600 dark:text-blue-400 font-bold">{convertNairaString(p.priceRange)}</strong></span>
                  </div>
                </div>

                {/* Who is it for */}
                <div className="mt-6">
                  <h4 className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest mb-1.5">
                    IDEAL CLIENT MATCH:
                  </h4>
                  <p className="text-slate-800 dark:text-slate-200 text-xs bg-slate-50 dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-100 dark:border-slate-800/80 leading-relaxed font-sans font-medium">
                    {p.targetAudience}
                  </p>
                </div>

                {/* Benefits / Outcomes */}
                <div className="mt-6">
                  <h4 className="text-[10px] font-mono font-black text-blue-500 uppercase tracking-widest mb-3">
                    BUSINESS ADVANTAGES:
                  </h4>
                  <ul className="space-y-2.5">
                    {p.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features included */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700/50">
                  <h4 className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest mb-3">
                    WHAT IS CODED & REVALUATED:
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    {p.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex gap-2 items-center">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Conversion focus and CTA */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700/50">
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-700/50 p-3.5 rounded-xl text-[11px] text-slate-500 leading-relaxed mb-6 font-mono">
                  <strong className="text-slate-800 dark:text-slate-200 block uppercase mb-1">🎯 Primary Conversion Focus:</strong>
                  {p.conversionFocus}
                </div>
                
                <button
                  onClick={() => onNavigate('contact')}
                  id={`pkg-button-cta-${p.id}`}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-tight transition-all cursor-pointer ${
                    idx === 0 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-slate-900 hover:bg-slate-950 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100'
                  }`}
                >
                  Acquire This Package System
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* INDUSTRIES SHOWCASE PAGE */}
        <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 sm:p-12 border border-slate-200/60 dark:border-slate-800/80 shadow-xs mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side info block */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <span className="text-xs font-mono text-blue-600 dark:text-blue-400 tracking-widest uppercase">
                  EXPERTISE SPECTRUM
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-white mt-1.5 font-medium leading-none">
                  Tailored To Your Industry
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 leading-relaxed">
                  Different sectors appeal to unique customer profiles. We tailor search positioning and layout design to match your specific customer demands.
                </p>
              </div>

              {/* Select list of buttons */}
              <div className="grid grid-cols-2 gap-2 h-72 overflow-y-auto pr-2 border-r border-slate-100 dark:border-slate-800 scrollbar-thin">
                {industries.map((ind) => {
                  const Icon = ind.icon;
                  return (
                    <button
                      key={ind.name}
                      onClick={() => setSelectedIndustry(ind.name)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium tracking-tight transition-all text-left cursor-pointer ${
                        selectedIndustry === ind.name
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 ring-1 ring-blue-600/20'
                          : 'bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0 text-blue-600" />
                      <span className="truncate">{ind.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right side content detailing industry strategies */}
            <div className="lg:col-span-8 bg-slate-50 dark:bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-850/80">
              <AnimatePresence mode="wait">
                {industries.map((ind) => {
                  if (ind.name !== selectedIndustry) return null;
                  const Icon = ind.icon;
                  return (
                    <motion.div
                      key={ind.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-4 border-b border-slate-200/60 dark:border-slate-800 pb-4">
                        <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">{ind.tagline}</p>
                          <h3 className="text-xl font-serif text-slate-900 dark:text-white font-medium">{ind.name} Solutions Blueprint</h3>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono text-rose-500 font-bold uppercase tracking-widest block">⚠️ COMMON SECTOR LEAKS</span>
                          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">{ind.challenge}</p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest block">✓ THE CONVERSION STRATEGY</span>
                          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">{ind.strategy}</p>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 flex flex-wrap justify-between items-center gap-4">
                        <div>
                          <p className="text-xs font-mono font-medium text-slate-400">Targeting high-net worth leads in {ind.name}?</p>
                          <p className="text-xs font-sans text-slate-700 dark:text-slate-300 mt-1">Get an specialized industry blueprint mock for your company.</p>
                        </div>
                        <button
                          onClick={() => onNavigate('contact')}
                          id="industry-blueprint-cta"
                          className="bg-slate-900 hover:bg-slate-950 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Unlock Industry Strategy
                        </button>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* EXTRA SMALLER SECTOR CHEATS & PLUGINS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {extraServices.map((x, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-750/50 shadow-xs hover:border-blue-400 transition-colors"
            >
              <h4 className="text-sm font-serif font-semibold text-slate-900 dark:text-white mb-2">{x.title}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{x.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
