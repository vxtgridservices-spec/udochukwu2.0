import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

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
    <div className="py-12 md:py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-100 dark:bg-blue-950 px-3 py-1.5 rounded-full font-medium">
            RESOLVING OBJECTIONS
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white mt-4 font-normal tracking-tight">
            Frequently Asked Objections
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 text-xs sm:text-sm">
            Everything you need to know about our visual craft, local optimization architectures, and payment parameters.
          </p>
        </div>

        {/* FAQ Accordions stack */}
        <div className="space-y-4">
          {faqs.map((f, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-205 dark:border-slate-700/50 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 focus:outline-hidden cursor-pointer group"
                >
                  <span className="font-serif font-semibold text-slate-900 dark:text-white text-sm sm:text-base leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-blue-500 shrink-0" />
                    {f.q}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-all transform shrink-0 ${isOpen ? 'rotate-180 bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400' : ''}`}>
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
                      <div className="px-6 pb-6 pt-1 text-slate-500 dark:text-slate-350 text-xs sm:text-sm leading-relaxed border-t border-slate-100 dark:border-slate-750">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Objections Bottom Banner */}
        <div className="mt-16 bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200/60 dark:border-slate-755/50 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-950 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-semibold text-slate-900 dark:text-white">Have a highly tailored corporate concern?</h4>
              <p className="text-xs text-slate-500 mt-0.5">Let's hop on a brief call and resolve it in 5 minutes.</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            id="faq-objection-banner-book"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
          >
            Ask Udochukwu Directly
          </button>
        </div>

      </div>
    </div>
  );
}
