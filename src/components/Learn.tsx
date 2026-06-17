import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, Users, Video, FileText, Calendar, Check, Mail, Heart } from 'lucide-react';
import { saveNewsletterSubscriber } from '../utils/storage';

export default function Learn({ onNavigate }: { onNavigate: (page: string) => void }) {
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

  return (
    <div className="py-12 md:py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-100 dark:bg-blue-950 px-3 py-1.5 rounded-full font-medium">
            LEARN WITH UDOCHUKWU
          </span>
          <h1 className="text-4xl lg:text-6xl font-serif text-slate-900 dark:text-white mt-6 font-normal tracking-tight">
            Master the Art of Premium Web Design
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-6 text-base leading-relaxed">
            As a practitioner building high-performing digital systems across Africa, I teach the strategies, workflows, and tools that help brands grow and convert.
          </p>
        </div>

        {/* Masterclass Teaser */}
        <div className="mb-20 bg-slate-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4">
                    <h2 className="text-3xl font-serif">AI Website Design Masterclass</h2>
                    <p className="text-slate-400 max-w-lg">Learn to combine human strategy with AI workflows to build websites that command authority, trust, and high-paying clients.</p>
                    <button 
                      onClick={() => onNavigate('contact')} 
                      className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold cursor-pointer transition-colors shadow-lg"
                    >
                      Join the Waitlist
                    </button>
                </div>
                <div className="bg-slate-800 p-8 rounded-2xl w-full md:w-auto text-center border border-slate-700 shadow-inner">
                    <Sparkles className="w-12 h-12 text-blue-400 mx-auto" />
                    <p className="mt-4 font-mono text-sm tracking-widest text-slate-300 uppercase">Coming Soon</p>
                </div>
            </div>
        </div>

        {/* Learning Modules */}
        <h2 className="text-2xl font-serif mb-8 text-center text-slate-900 dark:text-white">Educational Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
              { icon: FileText, title: 'Downloadable Templates', desc: 'Pre-built site structures.' },
              { icon: Sparkles, title: 'AI Prompt Library', desc: 'Strategies for brand, UI, and copy.' },
              { icon: Video, title: 'Video Tutorials', desc: 'Step-by-step design walk-throughs.' },
              { icon: Users, title: 'Community', desc: 'Connect with African digital creators.' },
              { icon: Calendar, title: 'Live Workshops', desc: 'Interactive strategy sessions.' },
              { icon: BookOpen, title: 'Insights & Blog', desc: 'Deep-dives into growth strategy.', action: () => onNavigate('blog') },
          ].map(item => (
            <div key={item.title} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:border-blue-500 transition-colors shadow-sm group">
              <item.icon className="w-10 h-10 text-blue-600 mb-6" />
              <h3 className="text-lg font-serif font-semibold">{item.title}</h3>
              <p className="text-slate-500 text-sm mt-2">{item.desc}</p>
              {item.action && (
                  <button onClick={item.action} className="mt-4 text-blue-600 text-xs font-bold cursor-pointer">Explore →</button>
              )}
            </div>
          ))}
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
                      <input 
                        type="email" 
                        required
                        placeholder="ceo@company.ng" 
                        value={subEmail}
                        onChange={(e) => setSubEmail(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-3 pl-10 rounded-xl border border-slate-200 dark:border-slate-800 text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden" 
                      />
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    </div>
                    <button 
                      type="submit"
                      className="bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold cursor-pointer transition-colors shadow-sm text-sm"
                    >
                      Subscribe
                    </button>
                  </div>
                  {errorText && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-rose-500 text-xs font-mono"
                    >
                      {errorText}
                    </motion.p>
                  )}
                </motion.form>
              ) : (
                <motion.div 
                  key="learn-newsletter-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-blue-50 dark:bg-blue-950/40 p-6 rounded-2xl border border-blue-150 dark:border-blue-900/50 text-center space-y-3 max-w-md mx-auto"
                >
                  <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Registered Successfully!</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-tight flex items-center justify-center gap-1">
                    Welcome to VXT elite circles <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
