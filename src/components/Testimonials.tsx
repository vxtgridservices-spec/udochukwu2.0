import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlayCircle, Star, Sparkles, CheckCircle, Video, User, X, Quote } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface TestimonialsProps {
  onNavigate: (page: string) => void;
}

export default function Testimonials({ onNavigate }: TestimonialsProps) {
  const [activeVideo, setActiveVideo] = useState<any | null>(null);
  const { convertNairaString } = useCurrency();

  const testifiers = [
    {
      id: 't-1',
      name: 'Dele Balogun',
      role: 'MD, Eko Haven Luxury Suites (Lagos)',
      type: 'Video Testimonial',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      thumbnail: '/assets/images/project01_mockup_1781715139906.jpg', // can use mockup
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
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      thumbnail: '/assets/images/project02_mockup_1781715156232.jpg',
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
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=50',
      quote: 'Our receptionist used to schedule appointments manually on WhatsApp, wasting 40+ hours a week. The patient calendar booking system VXTGrid coded integrates checkups, alerts our doctors, and drives organic patients without active monthly ad spends.',
      googleRating: 5,
      achievement: '45+ weekly staff hours saved',
      videoLength: 'Read Case'
    }
  ];

  return (
    <div className="py-12 md:py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-100 dark:bg-blue-950 px-3 py-1.5 rounded-full font-medium">
            CLIENT ATTESTATIONS
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-900 dark:text-white mt-4 font-normal tracking-tight">
            The Numbers Don't Lie. Sincere Corporate Success Stories.
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-xs sm:text-sm">
            I work with elite businesses to transform slow, unoptimized web profiles into high-ticket customer acquiring systems. Read reviews from serious Managing Directors and founders.
          </p>
        </div>

        {/* GOOGLE REVIEWS SUMMARY CARD */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-205 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8 mb-16 shadow-xs max-w-3xl mx-auto">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex gap-1 justify-center md:justify-start text-amber-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />)}
            </div>
            <h3 className="text-xl font-serif text-slate-1000 dark:text-white font-semibold">5.0 Star Rated on Google Business</h3>
            <p className="text-slate-500 text-xs font-mono">Based on 28+ verified corporate reviews across Lagos, Abuja & Port Harcourt</p>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 pt-6 md:pt-0 md:pl-8 text-center shrink-0">
            <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 block tracking-tight">100%</span>
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest block mt-0.5">ROI ENGAGEMENT RATING</span>
          </div>
        </div>

        {/* TESTIMONIAL CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testifiers.map((t) => (
            <div
              key={t.id}
              id={`testifier-card-${t.id}`}
              className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-xs group hover:border-blue-400 transition-colors"
            >
              
              <div className="space-y-6">
                
                {/* Visual Video Cover trigger */}
                <div 
                  onClick={() => setActiveVideo(t)}
                  className="relative h-44 rounded-2xl overflow-hidden cursor-pointer group shadow-inner border"
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
                  <div className="absolute bottom-3 left-3 bg-slate-950/90 text-white text-[9px] font-mono tracking-widest px-2.5 py-1 rounded-sm uppercase font-black uppercase">
                    📹 WATCH {t.type} ({t.videoLength})
                  </div>
                </div>

                {/* Sincere rating and Quote */}
                <div className="space-y-3">
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(t.googleRating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                  </div>
                  
                  <blockquote className="text-slate-600 dark:text-slate-350 text-xs sm:text-sm font-sans font-light italic leading-relaxed before:content-['“'] after:content-['”']">
                    {convertNairaString(t.quote)}
                  </blockquote>
                </div>

              </div>

              {/* Author profiles details */}
              <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/85 flex items-center gap-3">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="h-10 w-10 rounded-full object-cover shadow-xs border shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="text-xs font-bold text-slate-1000 dark:text-white leading-tight">{t.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-none">{t.role}</p>
                  <span className="text-[9px] font-mono text-emerald-500 font-bold block mt-1.5 uppercase tracking-wider">✓ TARGET: {convertNairaString(t.achievement)}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Global Pitch */}
        <div className="mt-20 text-center max-w-xl mx-auto space-y-4 bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-8 rounded-3xl">
          <Quote className="w-8 h-8 text-blue-500 mx-auto opacity-30 animate-pulse" />
          <p className="text-sm font-serif font-semibold text-slate-900 dark:text-white leading-snug">Let's build your own verified success report</p>
          <p className="text-slate-500 text-xs">Transform direct bookings, secure real-estate diaspora leads, and establish local ranking.</p>
          <button
            onClick={() => onNavigate('contact')}
            id="testimonial-cta-book-free"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md mt-2 cursor-pointer"
          >
            Schedule Free Exploratory call
          </button>
        </div>

      </div>

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
