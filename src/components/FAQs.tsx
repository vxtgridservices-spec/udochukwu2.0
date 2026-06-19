import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';

interface FAQsProps {
  onNavigate: (page: string) => void;
}

export default function FAQs({ onNavigate }: FAQsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Why are you more expensive than standard WordPress web designers?',
      a: 'Standard designers install heavy pre-made WordPress templates and visual page builders (like Elementor or Divi). These bloated tools load dozens of unoptimized scripts, taking 5 to 10 seconds to compile on local MTN/Airtel mobile networks. That slowness leaks half of your prospects immediately. We hand-code our frontends from scratch using React, Vite, and Tailwind, producing pages that snap open in standard milliseconds. We do not build digital brochures—we construct secure client acquisition engines designed directly for ROI.'
    },
    {
      q: 'What is the average timeline to build and launch an Enterprise Website?',
      a: 'For our Enterprise Growth packages, the average timeline is 4 to 6 weeks. This includes custom brand positioning strategy session, copywriter script-writes, interactive UI layout design cycles, production coding in React, and setup of all rich local SEO metadata indices. For landing page and rapid funnel setups, we deliver highly optimized solutions in roughly 2 weeks.'
    },
    {
      q: 'How do you guarantee websites will load fast on MTN and Airtel mobile networks?',
      a: 'We implement high-end performance engineering: compressing layout photographs to next-gen WebP/AVIF formats, eliminating bloated third-party trackers, utilizing code-splitting methodologies to only fetch resources immediately requested, and setting up localized edge CDNs with endpoint servers right in Lagos and Johannesburg so content delivers within standard milliseconds across the country.'
    },
    {
      q: 'Will we be able to post blog articles, update prices, or manage products ourselves?',
      a: 'Absolutely! We configure high-fidelity, secure administrative consoles or link modern lightweight headless CMS systems (like Sanity or Strapi). This lets your in-house teams post company news, upload suites pictures, modify pricing, or retrieve sales log entries effortlessly, without needing any technical programming background.'
    },
    {
      q: 'How does your SEO strategy differ from generic keywords insertion?',
      a: 'Generic designers simply write default tags inside standard pages. We target high-value purchase intent micro-queries. We write complete JSON-LD Structured Schema code blocks behind your layers. This directly feeds Google crawlers with precise local business tags, address points, and client testaments, establishing rank priority under search engines.'
    },
    {
      q: 'Do you offer ongoing support, maintenance, and website safety protocols?',
      a: 'Yes, we do. Laying the baseline code is only Phase 1. Every system includes first-year standard SLA coverage: daily cloud backups, weekly theme speed checkups, security patch applications, DDoS protections, and dedicated consultation hours to launch promotional campaigns. We stay beside your brand to scale operations securely.'
    }
  ];

  return (
    <div className="py-16 md:py-24 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Intro */}
        <div className="text-left md:text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-[0.25em] block mb-3">
            RESOLVING OBJECTIONS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white mt-1 font-semibold tracking-tight uppercase leading-none">
            Frequently Asked Objections
          </h2>
          <p className="text-slate-400 mt-4 text-xs sm:text-sm font-sans leading-relaxed">
            Everything you need to know about our visual craft, local optimization architectures, and payment parameters.
          </p>
        </div>

        {/* FAQ Accordions stack - Pure list line dividers style (matching layout and current style) */}
        <div className="divide-y divide-white/10 border-t border-b border-white/10 mt-12 mb-20">
          {faqs.map((f, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className="group overflow-hidden transition-colors duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left py-6 sm:py-8 flex justify-between items-start gap-4 focus:outline-hidden cursor-pointer group"
                >
                  <span className="font-serif font-medium text-slate-200 group-hover:text-white text-base sm:text-lg leading-tight transition-colors flex items-start gap-4">
                    <span className="font-mono text-xs text-blue-400 font-bold tracking-widest shrink-0 mt-1">
                      {(idx + 1).toString().padStart(2, '0')}.
                    </span>
                    <span className="leading-snug">{f.q}</span>
                  </span>
                  <div className={`p-1.5 text-slate-400 group-hover:text-white transition-all transform shrink-0 mt-1 ${isOpen ? 'rotate-180 text-blue-400' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="pl-10 pr-6 pb-8 text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Objections Bottom Banner - Flat minimalist theme-aligned design */}
        <div className="bg-[#131620]/50 p-8 border border-white/10 flex flex-col sm:flex-row justify-between items-center gap-8 backdrop-blur-xs">
          <div className="flex items-center gap-4 text-left">
            <div className="h-10 w-10 bg-blue-950/40 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.18em] text-white">Have a highly tailored corporate concern?</h4>
              <p className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-wider">Let's hop on a brief call and resolve it in 5 minutes.</p>
            </div>
          </div>

          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            id="faq-objection-banner-book"
            className="w-full sm:w-auto bg-white text-slate-950 hover:bg-slate-100 text-[10px] font-mono font-bold uppercase tracking-[0.22em] px-6 py-4 border border-white transition-all duration-200 shrink-0 cursor-pointer text-center"
          >
            Ask Directly
          </button>
        </div>

      </div>
    </div>
  );
}
