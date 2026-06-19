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
  Hourglass,
  ArrowRight
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
    <div className="w-full bg-slate-950 transition-colors duration-300 overflow-hidden">
      
      {/* Intro - Full Bleed */}
      <section className="relative min-h-[50vh] flex flex-col justify-center items-center text-center px-6 border-b border-white/20">
        <div className="absolute inset-0 z-0 bg-slate-900"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-sans font-bold text-white tracking-tight uppercase">
            Services & Packages
          </h1>
          <div className="w-24 h-1 bg-white my-8 mx-auto"></div>
          <p className="text-white text-xs sm:text-sm tracking-[0.2em] font-mono leading-relaxed max-w-2xl mx-auto font-bold uppercase">
            WE DON’T CHARGE HOURLY RATES OR SELL EMPTY BLOCKS OF WEB LAYOUTS. WE OFFER COMPREHENSIVE CUSTOMER ACQUISITION FUNNELS MAPPED TO DIRECT BUSINESS BENEFITS.
          </p>
        </div>
      </section>

      {/* Mega Packages Block */}
      <div className="w-full flex flex-col">
        {PRELOADED_SERVICES.map((p, idx) => (
          <section
            key={p.id}
            id={`service-pkg-row-${idx}`}
            className="relative min-h-[80vh] flex flex-col justify-center items-start border-b border-white/20 py-24"
          >
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80" 
                alt="Service background" 
                className="w-full h-full object-cover object-center filter opacity-30 mix-blend-luminosity grayscale"
                referrerPolicy="no-referrer"
              />
              <div className={`absolute inset-0 ${idx % 2 === 0 ? 'bg-slate-900/90' : 'bg-blue-950/90'} mix-blend-multiply`} />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
              {idx === 0 && (
                <span className="inline-block text-emerald-400 text-sm font-mono tracking-widest uppercase font-bold mb-4 border border-emerald-400/30 px-3 py-1">
                  ★ MOST POPULAR
                </span>
              )}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight">
                {p.name}
              </h2>
              <div className="w-full max-w-2xl h-0.5 bg-white/40 my-6"></div>
              <p className="text-slate-300 text-sm sm:text-base tracking-[0.1em] font-mono leading-relaxed max-w-3xl font-bold uppercase mb-8">
                {p.tagline}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
                <div>
                  <h4 className="text-xs font-mono font-black text-white uppercase tracking-widest mb-4 border-b border-white/20 pb-2">
                    BUSINESS ADVANTAGES
                  </h4>
                  <ul className="space-y-3">
                    {p.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-sm text-slate-300 font-mono">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-mono font-black text-white uppercase tracking-widest mb-4 border-b border-white/20 pb-2">
                    WHAT IS INCLUDED
                  </h4>
                  <ul className="space-y-3">
                    {p.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex gap-3 items-center text-sm text-slate-300 font-mono">
                        <span className="w-1.5 h-1.5 bg-white rounded-full shrink-0"></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <button
                  onClick={() => onNavigate('contact')}
                  className="border-2 border-white text-white font-mono uppercase tracking-[0.2em] px-8 py-4 hover:bg-white hover:text-slate-950 transition-colors flex items-center justify-center gap-4 cursor-pointer font-bold text-sm"
                >
                  ACQUIRE SYSTEM <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <div className="flex flex-col gap-1 text-xs font-mono text-slate-400">
                  <span>TIMELINE: <strong className="text-white">{p.timeline}</strong></span>
                  {p.priceRange && (
                    <span>STARTING AT: <strong className="text-white">{convertNairaString(p.priceRange)}</strong></span>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

        {/* INDUSTRIES SHOWCASE PAGE */}
        <section className="relative min-h-[50vh] flex flex-col justify-center items-start border-b border-white/20 py-24 bg-slate-900">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-sans font-bold text-white tracking-tight uppercase">
              Bespoke Vertical Solutions
            </h2>
            <div className="w-full max-w-2xl h-0.5 bg-white/40 my-6"></div>
            
            <div className="flex flex-wrap gap-2 mb-12 max-w-4xl">
              {industries.map(ind => (
                <button
                  key={ind.name}
                  onClick={() => setSelectedIndustry(ind.name)}
                  className={`py-3 px-4 text-xs font-mono font-bold uppercase transition-all tracking-widest border border-white/10 ${
                    selectedIndustry === ind.name 
                      ? 'bg-white text-slate-900 border-white' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {ind.name}
                </button>
              ))}
            </div>

            <div className="bg-slate-950 p-8 md:p-12 border border-white/10 text-white max-w-4xl">
              {industries.filter(ind => ind.name === selectedIndustry).map(ind => (
                <div key={ind.name}>
                  <h3 className="text-2xl font-bold font-sans uppercase tracking-tight mb-2">{ind.name}: {ind.tagline}</h3>
                  <p className="text-emerald-400 text-sm font-mono tracking-widest uppercase mb-8">THE STRATEGY</p>
                  
                  <div className="space-y-8 text-sm font-mono leading-relaxed text-slate-300">
                    <div>
                      <strong className="text-white block mb-2 tracking-widest">THE LEAK:</strong>
                      {ind.challenge}
                    </div>
                    <div>
                      <strong className="text-white block mb-2 tracking-widest">THE FIX:</strong>
                      {ind.strategy}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </section>

        {/* EXTRA SMALLER SECTOR CHEATS & PLUGINS */}
        <section className="relative min-h-[50vh] flex flex-col justify-center items-start border-b border-white/20 py-24 bg-slate-950">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight uppercase">
              Add-On Services
            </h2>
            <div className="w-full max-w-2xl h-0.5 bg-white/40 my-6"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 mt-12 max-w-5xl">
              {extraServices.map((x, idx) => (
                <div key={idx} className="border-l-2 border-white/20 pl-6 py-2">
                  <h4 className="text-white font-mono font-bold uppercase tracking-widest mb-3">
                    {x.title}
                  </h4>
                  <p className="text-slate-400 text-sm font-mono leading-relaxed">
                    {x.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
  );
}
