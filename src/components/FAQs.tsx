import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, LifeBuoy } from 'lucide-react';

interface FAQsProps {
  onNavigate: (page: string) => void;
}

export default function FAQs({ onNavigate }: FAQsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Why build custom React sites instead of installing WordPress page-builder themes?',
      a: 'Heavy visual page builders often load dozens of unused stylesheets and third-party scripts that slow down page rendering on mobile networks. Hand-coded React and Vite frontends ship only the code needed for your interface, keeping pages responsive and straightforward to maintain.',
    },
    {
      q: 'What is the typical timeline for a custom business website?',
      a: 'Focused landing pages and product storefronts typically launch in around 2 weeks. Multi-page corporate systems and custom portals usually take 4 to 6 weeks depending on content readiness and integration requirements.',
    },
    {
      q: 'How do you handle mobile performance on MTN and Airtel data connections?',
      a: 'We optimize image dimensions and compression, minimize JavaScript bundle size, split routes cleanly, and serve static assets through edge CDN caching so first loads remain responsive over everyday cellular connections.',
    },
    {
      q: 'Can we manage products, articles, and client inquiries ourselves after launch?',
      a: 'Yes. The built-in Admin Console lets you post products directly to Buyfromudochukwu, manage customer orders, publish articles, add portfolio projects, and review client inquiries.',
    },
    {
      q: 'How do Buyfromudochukwu shipping and the itel Power Tank Enugu offer work?',
      a: 'Buyfromudochukwu carries multi-category tech gear, workstations, power hardware, and accessories delivered nationwide across Nigeria. Specifically for our featured itel Power Tank Full Setup (₦550,000) promotion, buyers in Enugu cities (Independence Layout, New Haven, GRA, Trans-Ekulu, Achara Layout, Uwani, Abakpa Nike, Emene, Coal Camp) qualify for Free Delivery and Payment on Delivery after physical inspection.',
    },
    {
      q: 'Do you provide ongoing maintenance and technical support?',
      a: 'Yes. Ongoing maintenance covers security updates, cloud backups, asset updates, and feature enhancements under an agreed support plan.',
    },
  ];

  return (
    <div className="bg-[#181d2c] text-white">
      {/* 1. HERO BAND (Muted Violet Wash) */}
      <section className="bg-[#52497a] py-20 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-white/85 uppercase tracking-[0.18em] mb-4">
            <ChevronDown className="w-4 h-4" />
            <span>Answers &amp; Specifications</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <div className="w-full max-w-2xl h-[1px] bg-white/80 my-6" />
          <p className="text-white/95 text-xs sm:text-sm tracking-[0.16em] font-mono leading-relaxed max-w-2xl uppercase">
            CLEAR DETAILS ON WEB ENGINEERING, TIMELINES, ADMIN MANAGEMENT, AND BUYFROMUDOCHUKWU MARKETPLACE POLICIES.
          </p>
        </div>
      </section>

      {/* 2. ACCORDION BAND (Deep Navy) */}
      <section className="bg-[#1b243b] py-16 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="divide-y divide-white/20 border-t border-b border-white/20">
            {faqs.map((f, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} id={`faq-item-${idx}`} className="overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full text-left py-6 sm:py-8 flex justify-between items-start gap-4 focus:outline-hidden cursor-pointer group"
                  >
                    <span className="font-sans font-semibold text-white text-base sm:text-lg leading-snug flex items-start gap-4">
                      <span className="font-mono text-xs text-white/75 font-bold tracking-widest shrink-0 mt-1 tabular-nums">
                        {(idx + 1).toString().padStart(2, '0')}.
                      </span>
                      <span>{f.q}</span>
                    </span>
                    <span className="text-lg font-mono text-white/80 group-hover:text-white shrink-0 px-2">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                      >
                        <div className="pl-10 pr-6 pb-8 text-white/85 text-sm leading-relaxed font-sans max-w-3xl">
                          {f.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. BOTTOM CTA BAND (Periwinkle Indigo Wash) */}
      <section className="bg-[#485180] py-16">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 border border-white/30 bg-white/10 flex items-center justify-center text-white shrink-0">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-sans font-semibold text-white">
                Have a specific project or order question?
              </h2>
              <p className="text-xs font-mono text-white/85 mt-1 uppercase tracking-wider">
                Reach out directly and get a clear response.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            id="faq-objection-banner-book"
            className="border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white text-xs font-mono font-semibold uppercase tracking-[0.18em] px-6 py-3.5 transition-colors shrink-0 cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            Ask Directly
          </button>
        </div>
      </section>
    </div>
  );
}
