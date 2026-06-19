import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, Users, Video, FileText, Calendar, Check, Mail, Heart, ArrowRight } from 'lucide-react';
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
      setErrorText('Your email is already registered on our master list!');
    }
  };

  if (isHome) {
    return (
      <section className="relative min-h-[60vh] flex flex-col justify-center items-center text-center px-6 border-b border-white/20 bg-slate-900">
          <div className="relative z-10 w-full max-w-4xl mx-auto py-24">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight uppercase">
              Learn With Udochukwu
            </h2>
            <div className="w-24 h-1 bg-blue-600 my-8 mx-auto"></div>
            <p className="text-slate-300 text-xs sm:text-sm tracking-[0.1em] font-mono leading-relaxed mx-auto font-bold uppercase mb-12 max-w-2xl">
              MASTER THE ART OF PREMIUM WEB DESIGN. GET ACCESS TO EXCLUSIVE CURRICULA, STRATEGIES, AND WORKFLOWS USED TO BUILD HIGH-PERFORMING DIGITAL SYSTEMS ACROSS AFRICA.
            </p>
            <button
               onClick={() => onNavigate('learn')}
               className="border-2 border-blue-600 text-white font-mono uppercase tracking-[0.2em] px-8 py-5 hover:bg-blue-600 transition-colors flex items-center justify-center gap-4 cursor-pointer font-bold text-sm w-full sm:w-auto mx-auto"
            >
              EXPLORE MODULES <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
      </section>
    );
  }

  return (
    <div className="py-12 md:py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-100 dark:bg-blue-950 px-3 py-1.5 rounded-full font-bold">
            LEARN WITH UDOCHUKWU
          </span>
          <h1 className="text-4xl lg:text-6xl font-sans font-bold text-slate-900 dark:text-white mt-6 uppercase tracking-tight">
            Master the Art of Premium Web Design
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-6 text-sm sm:text-base leading-relaxed font-mono uppercase tracking-widest">
            As a practitioner building high-performing digital systems across Africa, I teach the rigorous strategies, workflows, and tools that help brands grow and convert. Elevate your design expertise beyond templates.
          </p>
        </div>

        {/* Masterclass Flagship */}
        <div className="mb-20 bg-slate-950 text-white relative shadow-2xl border-b border-t border-slate-800">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 p-8 sm:p-12 lg:p-16">
                <div className="space-y-6 md:w-2/3">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-sm font-bold">
                       New Flagship Curriculum
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight uppercase leading-tight">AI & Enterprise Website Design Masterclass</h2>
                    <p className="text-slate-400 max-w-xl text-sm sm:text-base leading-relaxed font-mono uppercase tracking-widest">
                       A comprehensive 6-week intensive designed for ambitious African creators. Learn to combine supreme human strategy with AI workflows. We cover client acquisition, high-ticket pricing psychology, modern React/Vite foundations, and conversion-focused aesthetic design. 
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button 
                        onClick={() => onNavigate('contact')} 
                        className="bg-white text-slate-950 hover:bg-slate-200 px-8 py-5 font-mono uppercase tracking-widest font-bold cursor-pointer transition-colors shadow-lg text-sm sm:w-auto w-full text-center"
                      >
                        Join the VIP Waitlist
                      </button>
                    </div>
                </div>
                <div className="bg-transparent border-2 border-slate-800 p-8 w-full md:w-1/3 text-center">
                    <Sparkles className="w-12 h-12 text-blue-400 mx-auto" />
                    <p className="mt-4 font-mono text-xs tracking-[0.2em] text-slate-300 uppercase leading-loose">Q3 Masterclass Enrollment cohort strictly limited to 50 slots.</p>
                </div>
            </div>
        </div>

        {/* Robust Modules Section */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-sans font-bold mb-12 text-center text-slate-900 dark:text-white uppercase tracking-tight">Curriculum Modules</h2>
          <div className="w-24 h-1 bg-blue-600 my-8 mx-auto"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
            
            {/* Module 1 */}
            <div className="bg-transparent border-t-2 border-slate-300 dark:border-slate-800 pt-8 flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-2">
                <Video className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-sans font-bold uppercase tracking-tight text-slate-900 dark:text-white">Core Video Tutorials</h3>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-mono uppercase tracking-widest">
                Step-by-step design walk-throughs breaking down live client builds. See exactly how we structure layouts, pick typography, and configure server-side routing.
              </p>
              <ul className="space-y-3 mt-4 text-xs font-mono uppercase tracking-widest font-bold text-slate-600 dark:text-slate-400">
                 <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-blue-500" /> 14 Hours of over-the-shoulder recording</li>
                 <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-blue-500" /> Vite / React component architecture</li>
                 <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-blue-500" /> Advanced Tailwind styling guidelines</li>
              </ul>
            </div>

            {/* Module 2 */}
            <div className="bg-transparent border-t-2 border-slate-300 dark:border-slate-800 pt-8 flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-2">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-sans font-bold uppercase tracking-tight text-slate-900 dark:text-white">Agency Asset Vault</h3>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-mono uppercase tracking-widest">
                Stop starting from scratch. Get access to the exact client proposals, pricing calculators, contracts, and design briefing documents we use to close ₦2M+ projects.
              </p>
              <ul className="space-y-3 mt-4 text-xs font-mono uppercase tracking-widest font-bold text-slate-600 dark:text-slate-400">
                 <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-blue-500" /> Plug-and-play Notion templates</li>
                 <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-blue-500" /> Value-based pricing frameworks</li>
                 <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-blue-500" /> Lead qualification scripts</li>
              </ul>
            </div>

            {/* Module 3 */}
            <div className="bg-transparent border-t-2 border-slate-300 dark:border-slate-800 pt-8 flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-2">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-sans font-bold uppercase tracking-tight text-slate-900 dark:text-white">The AI Prompt Library</h3>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-mono uppercase tracking-widest">
                Master the AI Coding era. Dedicated modules on utilizing tools like Gemini and AI Studio to 10x your development speed without compromising on layout quality.
              </p>
              <ul className="space-y-3 mt-4 text-xs font-mono uppercase tracking-widest font-bold text-slate-600 dark:text-slate-400">
                 <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-blue-500" /> Prompting for pristine UI/UX structure</li>
                 <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-blue-500" /> Full-stack backend integration</li>
                 <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-blue-500" /> Generating copywriting</li>
              </ul>
            </div>

            {/* Module 4 */}
            <div className="bg-transparent border-t-2 border-slate-300 dark:border-slate-800 pt-8 flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-2">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-sans font-bold uppercase tracking-tight text-slate-900 dark:text-white">VXT Mastermind</h3>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-mono uppercase tracking-widest">
                Design is not a solo journey. Network with other top-tier African agency owners and digital creators. Request portfolio reviews and exchange high-value referrals.
              </p>
              <ul className="space-y-3 mt-4 text-xs font-mono uppercase tracking-widest font-bold text-slate-600 dark:text-slate-400">
                 <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-blue-500" /> Private Discord community</li>
                 <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-blue-500" /> Bi-weekly live Q&A sessions</li>
                 <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-blue-500" /> Verified job opportunity board</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-24 text-center bg-slate-50 dark:bg-slate-900 p-12 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-2xl mx-auto">
            <h2 className="text-2xl font-serif mb-4 text-slate-900 dark:text-white">Stay Informed</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto text-sm">Sign up for my newsletter to get strategy, design, and AI insights directly to your inbox.</p>
            
            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form 
                  key="learn-newsletter-form"
                  onSubmit={handleSubscribeNewsletter}
                  className="space-y-3 max-w-md mx-auto"
                >
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                      <input 
                        type="email" 
                        required
                        value={subEmail}
                        onChange={(e) => setSubEmail(e.target.value)}
                        placeholder="Your professional email" 
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 pl-11 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden dark:text-white text-sm transition-shadow"
                      />
                    </div>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shrink-0 cursor-pointer">
                      Subscribe
                    </button>
                  </div>
                  {errorText && <p className="text-red-500 text-xs font-mono">{errorText}</p>}
                </motion.form>
              ) : (
                <motion.div 
                  key="learn-newsletter-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 max-w-md mx-auto flex items-center justify-center gap-3"
                >
                  <Heart className="w-5 h-5" />
                  <span className="font-semibold text-sm">Welcome to the inner circle!</span>
                </motion.div>
              )}
            </AnimatePresence>
            
            <p className="text-xs text-slate-400 font-mono mt-6">✓ No spam. Unsubscribe anytime.</p>
        </div>

      </div>
    </div>
  );
}

