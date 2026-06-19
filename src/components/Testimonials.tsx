import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlayCircle, Star, Sparkles, CheckCircle, Video, User, X, Quote } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface TestimonialsProps {
  onNavigate: (page: string) => void;
  isHome?: boolean;
}

export default function Testimonials({ onNavigate, isHome }: TestimonialsProps) {
  const [activeVideo, setActiveVideo] = useState<any | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { convertNairaString } = useCurrency();

  const testifiers = [
    {
      id: 't-1',
      name: 'Dele Balogun',
      role: 'MD, Eko Haven Luxury Suites (Lagos)',
      type: 'Video Testimonial',
      avatar: 'https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?auto=format&fit=crop&w=120&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      quote: 'Direct bedside reservations grew by 295%. Handing over 18% of our cash to international booking aggregators was slowly eroding our margins. Udochukwu hand-coded our portal from scratch. MTN mobile guests book suites from bed under 1 second.',
      googleRating: 5,
      achievement: '₦24.8M direct direct boking savings',
      videoLength: '2 min read'
    },
    {
      id: 't-2',
      name: 'Chief Dr. Chinedu Okafor',
      role: 'Founder, Landstone Premium Properties (Abuja)',
      type: 'Written Case Study',
      avatar: 'https://images.unsplash.com/photo-1543269664-76bc3997d9ea?auto=format&fit=crop&w=120&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      quote: 'Diaspora investors usually doubt local builders due to subpar slow websites. Udochukwus team didn’t just build a real estate grid—they styled a prestige lifestyle collection. In four months, target Google terms landed us ₦180M in direct diaspora wire queries.',
      googleRating: 5,
      achievement: '₦180M diaspora sales pipeline',
      videoLength: 'Read Case'
    },
    {
      id: 't-3',
      name: 'Dr. Amina Bello',
      role: 'Principal, RelyHealth Specialist Clinic (Port Harcourt)',
      type: 'Clinic Success story',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&w=120&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=50',
      quote: 'Our receptionist used to schedule appointments manually on WhatsApp, wasting 40+ hours a week. The patient calendar booking system VXTGrid coded integrates checkups, alerts our doctors, and drives organic patients without active monthly ad spends.',
      googleRating: 5,
      achievement: '45+ weekly staff hours saved',
      videoLength: 'Read Case'
    }
  ];

  const displayTestimonials = isHome ? testifiers.slice(0, 3) : testifiers;

  return (
    <div className={`transition-colors duration-300 ${isHome ? 'py-24 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800' : 'py-12 md:py-20 bg-white dark:bg-slate-950'}`}>
      <div className={`${isHome ? 'w-full px-6 sm:px-8 lg:px-12' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
        
        {/* Intro */}
        <div className={isHome ? "text-center sm:text-left border-b-2 border-slate-800 pb-6 text-slate-900 dark:text-white" : "text-center max-w-3xl mx-auto mb-16"}>
          <span className={`text-xs font-mono uppercase font-bold tracking-widest ${isHome ? 'text-blue-600 dark:text-blue-400' : 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 px-3 py-1.5 rounded-full'}`}>
            CLIENT ATTESTATIONS
          </span>
          <h1 className={`font-sans font-bold tracking-tight uppercase ${isHome ? 'text-3xl sm:text-5xl mt-2' : 'text-3xl sm:text-4xl lg:text-5xl font-serif mt-4 font-normal'}`}>
            The Numbers Don't Lie. Sincere Corporate Success Stories.
          </h1>
          {!isHome && (
            <p className="text-slate-500 dark:text-slate-400 mt-4 text-xs sm:text-sm">
              I work with elite businesses to transform slow, unoptimized web profiles into high-ticket customer acquiring systems. Read reviews from serious Managing Directors and founders.
            </p>
          )}
        </div>

        {/* GOOGLE REVIEWS SUMMARY CARD */}
        <div className={`${isHome ? 'bg-transparent py-8 my-8 border-b-2 border-t-2 border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8' : 'bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-205 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8 mb-16 shadow-xs max-w-3xl mx-auto'}`}>
          <div className="space-y-2 text-center md:text-left">
            <div className="flex gap-1 justify-center md:justify-start text-amber-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />)}
            </div>
            <h3 className={`text-xl font-bold text-slate-900 dark:text-white ${isHome ? 'font-sans uppercase tracking-tight' : 'font-serif'}`}>5.0 Star Rated on Google Business</h3>
            <p className="text-slate-500 text-xs font-mono">Based on 28+ verified corporate reviews across Lagos, Abuja & Port Harcourt</p>
          </div>

          <div className={`pt-6 md:pt-0 md:pl-8 text-center shrink-0 space-y-4 ${isHome ? '' : 'border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800'}`}>
            <div>
              <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 block tracking-tight">100%</span>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest block mt-0.5">ROI ENGAGEMENT RATING</span>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className={`${isHome ? 'border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white px-4 py-2 text-[10px] sm:text-xs font-mono uppercase font-bold text-center transition-colors hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 block mx-auto' : 'bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-4 py-2 rounded-lg transition-all shadow-md cursor-pointer uppercase tracking-wider block mx-auto'}`}
            >
              Drop a Rating
            </button>
          </div>
        </div>

        {/* TESTIMONIAL CARDS GRID */}
        <div className={`grid grid-cols-1 ${isHome ? 'lg:grid-cols-3 gap-12 max-w-5xl mx-auto mt-16 pb-16' : 'lg:grid-cols-3 gap-8'}`}>
          {displayTestimonials.map((t) => (
            <div
              key={t.id}
              id={`testifier-card-${t.id}`}
              className={`${isHome ? 'bg-transparent border border-slate-300 dark:border-slate-800 p-8 flex flex-col justify-between group hover:border-blue-500 transition-colors' : 'bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-xs group hover:border-blue-400 transition-colors'}`}
            >
              
              <div className="space-y-6">
                
                {/* Visual Video Cover trigger */}
                <div 
                  onClick={() => setActiveVideo(t)}
                  className={`relative cursor-pointer group shadow-inner border ${isHome ? 'h-56 filter grayscale group-hover:grayscale-0 transition-all' : 'h-44 rounded-2xl overflow-hidden'}`}
                >
                  <img 
                    src={t.thumbnail} 
                    alt={t.name}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 filter contrast-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-all flex items-center justify-center">
                    <PlayCircle className="w-12 h-12 text-white fill-blue-600/60 group-hover:scale-105 transition-transform" />
                  </div>
                  
                  {/* Interactive Badge Type */}
                  <div className="absolute bottom-3 left-3 bg-slate-950/90 text-white text-[9px] font-mono tracking-widest px-2.5 py-1 rounded-sm uppercase font-black">
                    📹 WATCH {t.type} ({t.videoLength})
                  </div>
                </div>

                {/* Sincere rating and Quote */}
                <div className="space-y-3">
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(t.googleRating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                  </div>
                  
                  <blockquote className={`text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-sans font-light italic leading-relaxed before:content-['“'] after:content-['”'] ${isHome ? 'tracking-wider' : ''}`}>
                    {convertNairaString(t.quote)}
                  </blockquote>
                </div>

              </div>

              {/* Author profiles details */}
              <div className={`mt-8 pt-6 border-t flex items-center gap-3 ${isHome ? 'border-slate-300 dark:border-slate-800' : 'border-slate-200/60 dark:border-slate-800/85'}`}>
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className={`h-10 w-10 object-cover shadow-xs border shrink-0 ${isHome ? 'filter grayscale group-hover:grayscale-0 transition-all' : 'rounded-full'}`}
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight uppercase font-mono tracking-widest">{t.name}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-none">{t.role}</p>
                  <span className="text-[9px] font-mono text-blue-600 dark:text-blue-500 font-bold block mt-1.5 uppercase tracking-wider">✓ TARGET: {convertNairaString(t.achievement)}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Global Pitch */}
        <div className={`mt-16 text-center max-w-xl mx-auto space-y-4 ${isHome ? 'bg-transparent border-t-2 border-slate-800 pt-8' : 'bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-8 rounded-3xl'}`}>
          <Quote className={`w-8 h-8 text-blue-500 mx-auto opacity-30 animate-pulse ${isHome ? 'hidden' : ''}`} />
          <p className={`text-slate-900 dark:text-white leading-snug uppercase ${isHome ? 'text-xl font-sans font-black tracking-tight' : 'text-sm font-serif font-semibold'}`}>Let's build your own verified success report</p>
          <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">Transform direct bookings, secure real-estate diaspora leads, and establish local ranking.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <button
              onClick={() => onNavigate('contact')}
              id="testimonial-cta-book-free"
              className={`${isHome ? 'border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 px-6 py-4 font-mono font-bold tracking-widest uppercase transition-colors' : 'bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer'}`}
            >
              Schedule Exploratory call
            </button>
            {isHome && (
              <button
                onClick={() => onNavigate('testimonials')}
                className="bg-blue-600 hover:bg-blue-700 border-2 border-blue-600 text-white font-mono font-bold tracking-widest uppercase text-xs px-6 py-4 cursor-pointer transition-colors"
              >
                View All Ratings
              </button>
            )}
          </div>
        </div>

      </div>

      {/* RATING FORM LIGHTBOX (For /testimonials page) */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white dark:bg-slate-950 rounded-3xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 relative"
            >
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2">
                 <h2 className="text-2xl font-serif text-slate-900 dark:text-white">Drop a Rating</h2>
                 <p className="text-slate-500 text-sm">Share your experience working with VXTGrid Services.</p>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsFormOpen(false); alert("Thank you for your rating! It has been submitted for review."); }}>
                <div className="flex justify-center gap-1 text-slate-300 dark:text-slate-700 cursor-pointer mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-8 h-8 hover:text-amber-500 hover:fill-amber-500 transition-colors" />)}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Your Name & Role</label>
                  <input required placeholder="e.g. John Doe, CEO" className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden dark:text-white" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Business Name</label>
                  <input required placeholder="Your Company Ltd" className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden dark:text-white" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Your Experience</label>
                  <textarea required rows={4} placeholder="How did Udochukwu help you outrank and outsell?" className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden resize-none dark:text-white"></textarea>
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl cursor-pointer shadow-md transition-colors">
                  Submit Rating
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAILED INTERACTIVE TESTIMONIAL VIDEO THEATER LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-slate-900 text-white rounded-3xl w-full max-w-2xl overflow-hidden border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 relative"
            >
              {/* Close */}
              <button
                onClick={() => setActiveVideo(null)}
                id="testimonial-video-lightbox-exit"
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <span className="text-[10px] font-mono text-blue-400 font-extrabold uppercase bg-blue-950/60 border border-blue-900/40 px-3 py-1 rounded-sm tracking-widest">
                  📹 TRANSMITTING SECURE CLIENT VIDEO TESTIMONIAL
                </span>
                
                {/* Visual player theater layout */}
                <div className="relative h-60 sm:h-80 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-center items-center text-center p-6 space-y-4">
                  <div className="h-14 w-14 bg-blue-600 rounded-full flex items-center justify-center animate-bounce shadow-xl">
                    <Video className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold tracking-tight">Connecting to Direct Stream...</h4>
                    <p className="text-[11px] text-slate-500 mt-1 italic">Interactive media player ready: playback feedback of Dele Balogun (MD, Eko Haven)</p>
                  </div>

                  {/* Play statistics line */}
                  <div className="w-full max-w-xs bg-slate-800 h-1 rounded-full overflow-hidden absolute bottom-4">
                    <div className="bg-blue-500 h-full w-[35%] animate-pulse"></div>
                  </div>
                </div>

                {/* Video Narrative */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <h5 className="text-xs font-mono text-slate-400 font-bold uppercase">OUTCOME PROFILE BRIEFING:</h5>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                    "{activeVideo.quote}"
                  </p>
                  <p className="text-slate-400 text-[10px] font-mono pt-1">
                    CLIENT SIGN: <strong className="text-white">{activeVideo.name}</strong> ({activeVideo.role})
                  </p>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
