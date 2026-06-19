import Testimonials from './Testimonials';
import Learn from './Learn';
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
  ChevronRight,
  MonitorSmartphone,
  Repeat,
  ShoppingCart,
  Bot,
  SearchCheck,
  LineChart
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

  return (
    <div className="bg-slate-950 transition-colors duration-300">
      
      {/* 1. HERO MAIN FLAGSHIP ROW */}
      <section className="relative min-h-screen flex flex-col justify-center items-start">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImageUrl} 
            alt="Udochukwu" 
            className="w-full h-full object-cover object-top filter opacity-60 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-blue-950/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-32 text-left">
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] [text-shadow:_0_3px_8px_rgba(0,0,0,0.8)]">
            Udochukwu Official <br /> Website
          </h1>
          
          <div className="w-full max-w-3xl h-[1px] bg-white/30 my-8"></div>
          
          <p className="text-white text-xs sm:text-sm md:text-base tracking-[0.18em] font-mono leading-relaxed max-w-3xl font-normal uppercase opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Udochukwu is a Web Designer, Digital Strategist, Founder of VXTGrid Services, aiming to change the digital landscape of African businesses through innovations in design, AI, and systems engineering.
          </p>

          <button
            onClick={() => onNavigate('about')}
            className="mt-12 border border-white text-white font-mono uppercase tracking-[0.2em] px-6 py-2.5 hover:bg-white hover:text-slate-950 transition-all flex items-center justify-center gap-3.5 cursor-pointer font-bold text-[11px] sm:text-xs w-auto whitespace-nowrap"
          >
            LET'S GO <ArrowRight className="w-4 h-4" />
          </button>
          
        </div>
      </section>

      {/* 2. HOW I HELP BUSINESSES GROW */}
      <section className="relative min-h-[80vh] flex flex-col justify-center items-start">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80" 
            alt="Coding background" 
            className="w-full h-full object-cover object-center filter opacity-50 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-blue-500/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 text-left">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight">
            How I Help Businesses Grow
          </h2>
          
          <div className="w-full max-w-3xl h-0.5 bg-white/40 my-8"></div>
          
          <p className="text-white text-sm sm:text-base md:text-lg tracking-[0.15em] font-mono leading-relaxed max-w-3xl font-bold uppercase">
            EVERY BUSINESS IS UNIQUE, BUT THE GOAL IS THE SAME—BUILD TRUST, ATTRACT CUSTOMERS, AND GROW ONLINE. I COMBINE PREMIUM DESIGN, AI, AND STRATEGY FOR MEASURABLE RESULTS.
          </p>

          <button
            onClick={() => onNavigate('services')}
            className="mt-12 border-2 border-white text-white font-mono uppercase tracking-[0.2em] px-8 py-5 hover:bg-white hover:text-blue-900 transition-colors flex items-center justify-center gap-6 cursor-pointer font-bold text-sm w-full sm:w-auto"
          >
            EXPLORE SERVICES <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* 4. EXECUTIVE SERVICES PITCH PANEL (Case Studies) - IN ELON MUSK STYLE */}
      <section className="py-20 sm:py-28 bg-[#1E2333] border-b border-white/10 text-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Case Highlight Display Box */}
            <div className="lg:col-span-5 relative h-64 sm:h-[420px] rounded-none overflow-hidden border border-white/15 shadow-2xl order-last lg:order-first">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" 
                alt="Case Study Showcase Mockup" 
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-[0.4] opacity-40 mix-blend-luminosity"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#6B6899]/30 mix-blend-multiply"></div>
              <div className="absolute bottom-8 left-8 text-white text-xs font-mono">
                <span className="bg-white text-slate-950 px-3 py-1 font-black uppercase tracking-widest text-[9px] rounded-none">
                  CASE HIGHLIGHT
                </span>
                <p className="text-lg font-serif mt-3 font-medium text-white tracking-wide uppercase">
                  Eko Haven Bedsides Overhaul
                </p>
                <p className="text-slate-300 font-mono text-[10px] mt-1.5 uppercase tracking-wider">
                  Direct booking increased by +295% in Lagos
                </p>
              </div>
            </div>

            {/* Case Studies Description Column */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-[10px] font-mono text-blue-400 tracking-[0.25em] block uppercase font-bold mb-2">
                  THE DIRECT OUTCOMES
                </span>
                <div className="border-b border-white/20 pb-4 mb-6">
                  <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wide uppercase relative inline-block pb-3 whitespace-normal">
                    An Elite Partner to Help You outrank and Outsell
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
                  </h2>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl font-light font-sans">
                  I do not sell commodity web files or low-end layouts. Every solution VXTGrid Services deploys is fully tailored around premium user experiences and conversion rates optimizations.
                </p>
              </div>

              {/* Minimal Dark Cards for Key Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2 bg-[#23293D] p-5 border border-white/5 rounded-none hover:border-white/20 transition-all font-sans">
                  <h4 className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="h-2 w-2 bg-blue-400"></span>
                    Premium Layout Design
                  </h4>
                  <p className="text-slate-300 text-xs leading-relaxed font-light">
                    Awwwards-style typography-rich interfaces styled for absolute corporate authority and luxury. No typical pre-made generic layouts.
                  </p>
                </div>

                <div className="space-y-2 bg-[#23293D] p-5 border border-white/5 rounded-none hover:border-white/20 transition-all font-sans">
                  <h4 className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="h-2 w-2 bg-blue-400"></span>
                    Advanced MTN Speed SLA
                  </h4>
                  <p className="text-slate-300 text-xs leading-relaxed font-light">
                    React and CDN edge configurations to raise mobile loading times to standard milliseconds speed.
                  </p>
                </div>

                <div className="space-y-2 bg-[#23293D] p-5 border border-white/5 rounded-none hover:border-white/20 transition-all font-sans">
                  <h4 className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="h-2 w-2 bg-blue-400"></span>
                    High-Intensive SEO Maps
                  </h4>
                  <p className="text-slate-300 text-xs leading-relaxed font-light">
                    Micro JSON-LD Schema structures, ranking your locational landing pages on target corporate terms.
                  </p>
                </div>

                <div className="space-y-2 bg-[#23293D] p-5 border border-white/5 rounded-none hover:border-white/20 transition-all font-sans">
                  <h4 className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="h-2 w-2 bg-blue-400"></span>
                    Full Milestones Dash
                  </h4>
                  <p className="text-slate-300 text-xs leading-relaxed font-light">
                    Track timeline details, print invoices bills, message Udochukwu, and upload outlines transparently.
                  </p>
                </div>
              </div>

              {/* Elegant Sharp Button */}
              <div className="pt-4">
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="inline-flex items-center justify-center gap-3 border border-white bg-white text-slate-950 font-mono text-xs font-bold tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-transparent hover:text-white transition-all cursor-pointer rounded-none"
                >
                  <span>VIEW MORE CASE STUDIES</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE CONVERSION ENGINE & SALES MACHINE CALCULATOR - REDESIGNED IN ELON TECH MINIMALISM */}
      <section className="relative flex flex-col justify-center items-start border-b border-white/10 py-24 sm:py-32 bg-[#131620] text-slate-100 transition-colors">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 text-left">
          
          <span className="text-[10px] font-mono text-blue-400 tracking-[0.25em] block uppercase font-bold mb-2">
            REVENUE PROJECTION ENGINE
          </span>
          <div className="border-b border-white/20 pb-4 mb-8">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-wide uppercase relative inline-block pb-3 whitespace-normal">
              The Revenue Calculator
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
            </h2>
          </div>
          
          <p className="text-slate-400 text-xs sm:text-sm tracking-[0.12em] font-mono leading-relaxed max-w-3xl font-bold uppercase mb-12">
            Click below to calculate and project what the VXT-System captures for your business across different categories.
          </p>

          <div className="pt-4">
            <button
              onClick={() => onNavigate('calculator')}
              className="inline-flex items-center justify-center gap-3 border border-white bg-white text-slate-950 font-mono text-xs font-bold tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-transparent hover:text-white transition-all cursor-pointer rounded-none"
            >
              <span>ACCESS REVENUE CALCULATOR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Learn with Udochukwu */}
      <section className="relative flex flex-col justify-center items-start border-b border-white/10 py-24 sm:py-32 bg-[#1E2333] text-slate-100 transition-colors">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 text-left">
          
          <span className="text-[10px] font-mono text-blue-400 tracking-[0.25em] block uppercase font-bold mb-2">
            ACADEMY & CURRICULUM
          </span>
          <div className="border-b border-white/20 pb-4 mb-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-wide uppercase relative inline-block pb-3 whitespace-normal">
              LEARN WITH UDOCHUKWU
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
            </h2>
          </div>
          
          <p className="text-slate-400 text-xs sm:text-sm tracking-[0.12em] font-mono leading-relaxed max-w-3xl font-bold uppercase mb-12">
            Master the art of premium web design. Get access to exclusive curricula, strategies, and workflows used to build high-performing digital systems across Africa.
          </p>

          <div className="pt-4">
            <button
              onClick={() => onNavigate('learn')}
              className="inline-flex items-center justify-center gap-3 border border-white bg-white text-slate-950 font-mono text-xs font-bold tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-transparent hover:text-white transition-all cursor-pointer rounded-none"
            >
              <span>EXPLORE MODULES</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Latest Articles (Articles Redirect Block) */}
      <section className="relative flex flex-col justify-center items-start border-b border-white/10 py-24 sm:py-32 bg-[#131620] text-slate-100 transition-colors">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 text-left">
          
          <span className="text-[10px] font-mono text-blue-400 tracking-[0.25em] block uppercase font-bold mb-2">
            HIGH-TRACTION WRITTEN INSIGHTS
          </span>
          <div className="border-b border-white/20 pb-4 mb-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-wide uppercase relative inline-block pb-3 whitespace-normal">
              UDOCHUKWU LATEST ARTICLES
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
            </h2>
          </div>
          
          <p className="text-slate-400 text-xs sm:text-sm tracking-[0.12em] font-mono leading-relaxed max-w-3xl font-bold uppercase mb-12">
            Deep-dive business blueprints, SEO frameworks, performance checklists, and design tactics written for African business builders.
          </p>

          <div className="pt-4">
            <button
              onClick={() => onNavigate('blog')}
              className="inline-flex items-center justify-center gap-3 border border-white bg-white text-slate-950 font-mono text-xs font-bold tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-transparent hover:text-white transition-all cursor-pointer rounded-none animate-pulse"
            >
              <span>VIEW ALL ARTICLES</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Testimonials (Ratings Redirect Block) */}
      <section className="relative flex flex-col justify-center items-start border-b border-white/10 py-24 sm:py-32 bg-[#1E2333] text-slate-100 transition-colors">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 text-left">
          
          <span className="text-[10px] font-mono text-blue-400 tracking-[0.25em] block uppercase font-bold mb-2">
            CLIENT ATTESTATIONS & FEEDBACK
          </span>
          <div className="border-b border-white/20 pb-4 mb-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-wide uppercase relative inline-block pb-3 whitespace-normal">
              Verified Client Ratings
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
            </h2>
          </div>
          
          <p className="text-slate-400 text-xs sm:text-sm tracking-[0.12em] font-mono leading-relaxed max-w-3xl font-bold uppercase mb-12">
            Explore sincere success stories and verified ratings from managing directors and founders across Africa.
          </p>

          <div className="pt-4">
            <button
              onClick={() => onNavigate('testimonials')}
              className="inline-flex items-center justify-center gap-3 border border-white bg-white text-slate-950 font-mono text-xs font-bold tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-transparent hover:text-white transition-all cursor-pointer rounded-none animate-pulse"
            >
              <span>VIEW ALL RATINGS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* FAQs (FAQ Redirect Block) */}
      <section className="relative flex flex-col justify-center items-start border-b border-white/10 py-24 sm:py-32 bg-[#131620] text-slate-100 transition-colors">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 text-left">
          
          <span className="text-[10px] font-mono text-blue-400 tracking-[0.25em] block uppercase font-bold mb-2">
            RESOLVING OBJECTIONS & DETAILS
          </span>
          <div className="border-b border-white/20 pb-4 mb-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-wide uppercase relative inline-block pb-3 whitespace-normal">
              FREQUENTLY ASKED QUESTIONS
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
            </h2>
          </div>
          
          <p className="text-slate-400 text-xs sm:text-sm tracking-[0.12em] font-mono leading-relaxed max-w-3xl font-bold uppercase mb-12">
            Pricing benchmarks, development timelines, CMS access, search engine optimization support, and SLA post-launch agreements.
          </p>

          <div className="pt-4">
            <button
              onClick={() => onNavigate('faq')}
              className="inline-flex items-center justify-center gap-3 border border-white bg-white text-slate-950 font-mono text-xs font-bold tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-transparent hover:text-white transition-all cursor-pointer rounded-none animate-pulse"
            >
              <span>EXPLORE VXT KNOWLEDGE BASE [FAQ]</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Final CTA SECTION */}
      <section className="relative min-h-[60vh] flex flex-col justify-center items-start border-t border-white/10 py-24 sm:py-32 bg-slate-950 text-slate-100 transition-colors">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 text-left">
          
          <span className="text-[10px] font-mono text-blue-400 tracking-[0.25em] block uppercase font-bold mb-2">
            CONVERSION ENGINEERING ONBOARDING
          </span>
          <div className="border-b border-white/20 pb-4 mb-8">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-wide uppercase relative inline-block pb-3 whitespace-normal">
              READY TO BUILD?
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
            </h2>
          </div>
          
          <p className="text-slate-400 text-xs sm:text-sm tracking-[0.12em] font-mono leading-relaxed max-w-3xl font-bold uppercase mb-12">
            Let's create a modular, sub-millisecond production system that builds compound consumer trust, captures elite conversions, and cements growth across your business sectors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-3 border border-white bg-white text-slate-950 font-mono text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 hover:bg-transparent hover:text-white transition-all cursor-pointer rounded-none"
            >
              <span>BOOK CONSULTATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('audit')}
              className="inline-flex items-center justify-center gap-3 border border-white/25 bg-[#11141d] text-white font-mono text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 hover:border-white hover:bg-white hover:text-slate-950 transition-all cursor-pointer rounded-none"
            >
              <span>GET FREE SYSTEM AUDIT</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
