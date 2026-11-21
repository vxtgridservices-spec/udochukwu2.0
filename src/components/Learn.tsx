import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Video,
  FolderKanban,
  Code2,
  Users,
  AtSign,
  Verified,
} from 'lucide-react';
import { saveNewsletterSubscriber } from '../utils/storage';

interface LearnProps {
  onNavigate: (page: string) => void;
  isHome?: boolean;
}

export default function Learn({ onNavigate, isHome }: LearnProps) {
  const [subEmail, setSubEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleSubscribeNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail || !subEmail.includes('@')) {
      setErrorText('Please enter a valid work email address.');
      return;
    }

    const success = saveNewsletterSubscriber(subEmail);
    if (success) {
      setIsSubscribed(true);
      setErrorText('');
      setSubEmail('');
    } else {
      setErrorText('Your email is already registered on the list.');
    }
  };

  if (isHome) {
    return (
      <section className="relative min-h-[42vh] flex flex-col justify-center items-start bg-[#4a628d] overflow-hidden">
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-16 text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold text-white tracking-tight">
            Learn With Udochukwu
          </h2>
          <div className="w-full max-w-2xl h-[1px] bg-white/80 my-5" />
          <p className="text-white/95 text-xs sm:text-sm tracking-[0.16em] font-mono leading-relaxed max-w-2xl uppercase">
            STRUCTURED CURRICULA COVERING REACT FRONTEND ARCHITECTURE, RESPONSIVE TAILWIND SYSTEMS, AND CLIENT WORKFLOWS.
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => onNavigate('learn')}
              className="border border-white text-white font-mono uppercase tracking-[0.18em] px-6 py-3 hover:bg-white hover:text-slate-950 transition-colors cursor-pointer font-semibold text-xs"
            >
              Explore Modules
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-[#181d2c] text-white">
      {/* 1. HERO BAND (Steel Blue Wash) */}
      <section className="bg-[#4a628d] py-20 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold text-white tracking-tight">
            Learn With Udochukwu
          </h1>
          <div className="w-full max-w-2xl h-[1px] bg-white/80 my-6" />
          <p className="text-white/95 text-xs sm:text-sm tracking-[0.16em] font-mono leading-relaxed max-w-2xl uppercase">
            PRACTICAL WEB ENGINEERING — COMPONENT ARCHITECTURE, RESPONSIVE TAILWIND CSS, AND PRODUCTION DELIVERY.
          </p>
        </div>
      </section>

      {/* 2. FLAGSHIP TRACK BAND (Deep Navy) */}
      <section className="bg-[#1b243b] py-16 sm:py-20">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="border border-white/25 bg-[#141a2b]/75 p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div className="space-y-5 md:w-2/3">
              <span className="text-xs font-mono text-white/80 uppercase tracking-[0.18em] block">
                Structured Curriculum
              </span>
              <h2 className="text-2xl sm:text-4xl font-sans font-semibold tracking-tight text-white">
                React, Tailwind &amp; Product Web Design Intensive
              </h2>
              <div className="w-40 h-[1px] bg-white/75" />
              <p className="text-white/85 text-sm leading-relaxed font-sans max-w-xl">
                A structured 6-week curriculum covering component design, responsive layouts, Express API persistence, and clean client scoping.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white px-6 py-3.5 font-mono uppercase tracking-[0.18em] font-semibold cursor-pointer transition-colors text-xs"
                >
                  Request Enrollment Info
                </button>
              </div>
            </div>

            <div className="border border-white/25 bg-[#181d2c] p-7 w-full md:w-1/3 text-center space-y-3">
              <Layers className="w-9 h-9 text-white mx-auto" />
              <p className="font-mono text-xs tracking-[0.16em] text-white/85 uppercase leading-relaxed">
                Hands-on React, TypeScript &amp; Vite Production Track
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CURRICULUM MODULES BAND (Slate-Cyan Wash) */}
      <section className="bg-[#3b6e82] py-16 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-sans font-semibold text-white tracking-tight">
              Curriculum Modules
            </h2>
            <div className="w-full max-w-2xl h-[1px] bg-white/80 my-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#141a2b]/65 border border-white/25 p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5 text-white" />
                <h3 className="text-xl font-sans font-semibold text-white">
                  Architecture Walkthroughs
                </h3>
              </div>
              <p className="text-white/85 text-sm leading-relaxed font-sans">
                Step-by-step build breakdowns showing how pages, layouts, and API endpoints fit together cleanly.
              </p>
              <ul className="space-y-2 mt-1 text-xs font-mono uppercase tracking-wider text-white/80 border-t border-white/15 pt-4">
                <li>01. Vite &amp; React component structure</li>
                <li>02. TypeScript state and API typing</li>
                <li>03. Responsive Tailwind styling systems</li>
              </ul>
            </div>

            <div className="bg-[#141a2b]/65 border border-white/25 p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <FolderKanban className="w-5 h-5 text-white" />
                <h3 className="text-xl font-sans font-semibold text-white">
                  Scoping &amp; Documentation Kit
                </h3>
              </div>
              <p className="text-white/85 text-sm leading-relaxed font-sans">
                Clear templates for project scoping, technical specifications, and launch checklists.
              </p>
              <ul className="space-y-2 mt-1 text-xs font-mono uppercase tracking-wider text-white/80 border-t border-white/15 pt-4">
                <li>01. Project scoping outlines</li>
                <li>02. Milestone &amp; delivery schedules</li>
                <li>03. Client onboarding questionnaires</li>
              </ul>
            </div>

            <div className="bg-[#141a2b]/65 border border-white/25 p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-white" />
                <h3 className="text-xl font-sans font-semibold text-white">
                  Modern Tooling Workflows
                </h3>
              </div>
              <p className="text-white/85 text-sm leading-relaxed font-sans">
                Combine structured human code review with modern developer tooling for reliable production output.
              </p>
              <ul className="space-y-2 mt-1 text-xs font-mono uppercase tracking-wider text-white/80 border-t border-white/15 pt-4">
                <li>01. Clean UI/UX component composition</li>
                <li>02. Express backend &amp; persistence routes</li>
                <li>03. Build linting and type verification</li>
              </ul>
            </div>

            <div className="bg-[#141a2b]/65 border border-white/25 p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-white" />
                <h3 className="text-xl font-sans font-semibold text-white">
                  Peer Code Reviews
                </h3>
              </div>
              <p className="text-white/85 text-sm leading-relaxed font-sans">
                Collaborate with builders across Nigeria, share live demos, and sharpen your engineering habits.
              </p>
              <ul className="space-y-2 mt-1 text-xs font-mono uppercase tracking-wider text-white/80 border-t border-white/15 pt-4">
                <li>01. Live code review sessions</li>
                <li>02. Bi-weekly technical Q&amp;A</li>
                <li>03. Portfolio critique &amp; feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NEWSLETTER BAND (Muted Violet Wash) */}
      <section className="bg-[#52497a] py-16 sm:py-20">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-md space-y-2">
            <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-white">
              Stay Informed
            </h2>
            <p className="text-white/85 text-sm font-sans">
              Receive new curriculum notes and engineering updates directly in your inbox.
            </p>
          </div>

          <div className="w-full md:max-w-md">
            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form
                  key="learn-newsletter-form"
                  onSubmit={handleSubscribeNewsletter}
                  className="space-y-3"
                >
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <AtSign className="absolute left-3.5 top-3.5 w-4 h-4 text-white/60" />
                      <input
                        type="email"
                        required
                        value={subEmail}
                        onChange={(e) => setSubEmail(e.target.value)}
                        placeholder="Your email address"
                        className="w-full bg-[#141a2b]/80 border border-white/25 pl-10 pr-4 py-3 text-white text-xs sm:text-sm font-mono focus:border-white focus:outline-hidden"
                      />
                    </div>
                    <button
                      type="submit"
                      className="border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white font-mono text-xs font-semibold uppercase tracking-[0.16em] px-6 py-3 transition-colors shrink-0 cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </div>
                  {errorText && <p className="text-rose-200 text-xs font-mono">{errorText}</p>}
                </motion.form>
              ) : (
                <motion.div
                  key="learn-newsletter-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#141a2b]/80 text-white p-5 border border-white/30 flex items-center gap-3"
                >
                  <Verified className="w-5 h-5 text-emerald-300 shrink-0" />
                  <span className="font-mono text-xs uppercase tracking-wider">
                    Subscribed to curriculum updates.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
