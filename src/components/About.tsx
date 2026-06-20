import { motion } from 'motion/react';
import { Target, Eye, ShieldCheck, HeartPulse, Award, Sparkles, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getSiteSettings } from '../utils/storage';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const [aboutImageUrl, setAboutImageUrl] = useState('https://res.cloudinary.com/drghjqbak/image/upload/q_auto/f_auto/v1781913441/1781783831624_3_a1uctp.jpg');

  useEffect(() => {
    const settings = getSiteSettings();
    if (settings && settings.aboutImageUrl) {
      setAboutImageUrl(settings.aboutImageUrl);
    }
  }, []);

  const values = [
    {
      icon: Target,
      title: 'Measurable Outcomes',
      desc: 'We do not build digital ornaments. Every line of code and visual placement is directly tied to business growth, conversion performance, and revenue impact across African markets.'
    },
    {
      icon: ShieldCheck,
      title: 'Continental Performance Mastery',
      desc: 'We optimize for infrastructure diversity. Regardless of connectivity, your platform performs flawlessly, providing a world-class experience to users across the continent.'
    },
    {
      icon: Eye,
      title: 'Radical Transparency',
      desc: 'Clear, predictable strategy, verified milestones, and structural honesty. No confusing jargon—just focused business advisory.'
    },
    {
      icon: HeartPulse,
      title: 'Long-Term Partnership',
      desc: 'Building the platform is Phase 1. We remain your strategic digital partner, ensuring your business scales, evolves, and consistently converts at the highest levels.'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Vision for African Excellence',
      company: 'Founding Inspiration',
      desc: 'Inspired by the immense potential of ambitious African enterprises held back by subpar digital platforms. Set out to master high-stakes conversion science and world-class digital strategy.'
    },
    {
      year: '2022',
      title: 'VXTGrid Services Inception',
      company: 'Founder & Principal strategist',
      desc: 'Founded on a single promise: "Results, not just code." Partnered with innovative SMEs transform their customer acquisition, demonstrably increasing trust and revenue.'
    },
    {
      year: '2024',
      title: 'Trusted by Ambitious Brands',
      company: 'Corporate Growth Rollout',
      desc: 'Partnered with luxury hospitality and real estate leaders across the continent to upgrade mission-critical digital funnels, scaling sales pipelines and fostering investor trust.'
    },
    {
      year: '2026',
      title: 'Continental Digital Strategist',
      company: 'Strategic Consultancy Focus',
      desc: 'Recognized as one of Africa’s premier digital consultants. Committed to helping ambitious African businesses turn their websites into powerful sales engines and brand credibility assets.'
    }
  ];

  return (
    <div className="bg-[#1E2333] min-h-screen text-slate-100 transition-colors duration-300">
      
      {/* 1. ELON-STYLE HEADER SPLASH (Muted Slate-Purple Banner) */}
      <section className="relative min-h-[50vh] flex flex-col justify-center items-start px-6 sm:px-12 md:px-24 py-20 bg-[#6B6899] overflow-hidden">
        {/* Grayscale Background portrait overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={aboutImageUrl} 
            alt="Udochukwu Background" 
            className="w-full h-full object-cover object-top filter grayscale contrast-125 brightness-[0.7] opacity-[0.4] mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#6B6899]/30 mix-blend-multiply" />
        </div>

        {/* Text Area */}
        <div className="relative z-10 w-full max-w-6xl">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl text-white font-serif tracking-[0.01em] leading-tight font-medium"
          >
            Who is mister <br className="hidden sm:inline" /> Udochukwu
          </motion.h1>
          
          <div className="w-full max-w-2xl h-[1px] bg-white/40 my-6"></div>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white text-xs sm:text-sm md:text-base tracking-[0.24em] font-mono uppercase font-bold opacity-95 [text-shadow:_0_1px_2px_rgba(0,0,0,0.4)]"
          >
            VISIONARY STRATEGIST REVOLUTIONIZING DIGITAL SYSTEMS
          </motion.p>
        </div>
      </section>

      {/* 2. BIOGRAPHY SECTION WITH WHITE UNDERLINE CONTAINER */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 md:px-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Biography text block */}
          <div className="lg:col-span-8 space-y-8">
            <div className="border-b border-white/20 pb-4 mb-8">
              <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wide uppercase relative inline-block pb-3 whitespace-nowrap">
                Udochukwu biography
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
              </h2>
            </div>

            <div className="space-y-6 text-slate-300 font-sans text-sm sm:text-base leading-relaxed tracking-wide">
              <p>
                Udochukwu, a name synonymous with digital systems innovation and forward-thinking engineering, has become an influential figure in the digital landscape of African business. Driven by an insatiable curiosity and a relentless pursuit of high-performance architecture, his journey is marked by a refusal to build standard templates, choosing instead to engineer conversion systems with pristine code structure.
              </p>
              <p>
                From an early age, Udochukwu exhibited an exceptional aptitude for systems thinking, digital strategy, and high-impact web design. This passion led to the founding of VXTGrid Services, a premier consultancy that has revitalized the digital sales pipelines of luxury real estate, hospitality, and B2B corporate enterprises across the continent.
              </p>
              <p>
                Today, he continues to bridge the gap between high-stakes marketing science and clean code execution. His vision remains resolute: to build digital platforms that establish unquestionable authority, command investment trust, and enable African organizations to compete confidently on a global stage.
              </p>
            </div>

            <div className="pt-6 flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate('contact')}
                id="about-cta-book"
                className="bg-white text-[#1E2333] hover:bg-slate-100 px-6 py-3 font-mono font-bold tracking-widest text-[#1E2333] text-xs uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer border border-white"
              >
                BOOK CONSULTATION
                <Sparkles className="w-4 h-4 text-[#1E2333]" />
              </button>
              <button 
                onClick={() => onNavigate('portfolio')}
                id="about-cta-portfolio"
                className="px-6 py-3 border border-white/30 hover:border-white hover:bg-white/5 text-white font-mono font-bold tracking-widest text-xs uppercase transition-all cursor-pointer"
              >
                VIEW PORTFOLIO
              </button>
            </div>
          </div>

          {/* Right sidebar profile card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-[#23293D] rounded-2xl border border-white/10 p-6 shadow-xl relative overflow-hidden group">
              <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-slate-950 mb-6">
                <img 
                  src={aboutImageUrl} 
                  alt="Udochukwu Portrait" 
                  className="w-full h-full object-cover object-top filter grayscale contrast-110 brightness-90 transition-transform group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-blue-400 tracking-wider">
                  FOUNDER & DIGITAL STRATEGIST
                </span>
                <p className="text-xl font-serif mt-1 font-medium text-white">Udochukwu</p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Premium Digital Strategy Consultant & Principal at VXTGrid Services</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE VALUES SEGMENT */}
      <section className="bg-[#181C2A] py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-24">
          <div className="text-left mb-16 max-w-3xl">
            <span className="text-[10px] font-mono text-blue-400 tracking-[0.25em] uppercase font-bold">
              OPERATIONAL CODE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mt-4 font-normal tracking-wide uppercase">
              Four Core Values That Drive 10x ROI
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div 
                  key={i}
                  id={`value-card-${i}`}
                  className="bg-[#212739] p-6 rounded-xl border border-white/5 hover:border-white/10 shadow-xs hover:shadow-lg transition-all group hover:-translate-y-1"
                >
                  <div className="h-10 w-10 bg-white/5 group-hover:bg-white group-hover:text-slate-900 text-white rounded-lg flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-serif font-bold text-white mt-4 tracking-wide uppercase">{v.title}</h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed font-light">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. HISTORIC MILESTONES (CHRONICLE) */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-6 sm:px-12 md:px-24">
        <div className="text-left mb-16 max-w-3xl">
          <span className="text-[10px] font-mono text-blue-400 tracking-[0.25em] uppercase font-bold">
            THE CHRONICLE
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-white mt-4 font-normal tracking-wide uppercase">
            A History of Client Wins & Breakthroughs
          </h2>
        </div>

        <div className="relative border-l border-white/10 ml-4 sm:ml-12">
          {milestones.map((m, idx) => (
            <div key={idx} className="mb-10 ml-6 sm:ml-10 relative">
              {/* Year dot label */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 bg-white text-slate-950 text-[10px] font-mono font-bold px-2 py-0.5 shadow-sm">
                {m.year}
              </div>
              
              <div className="bg-[#23293D] p-6 rounded-xl border border-white/5 hover:border-white/20 transition-all">
                <span className="text-[10px] font-mono font-semibold text-slate-400 inline-block uppercase tracking-wider">
                  {m.company}
                </span>
                <h3 className="text-base sm:text-lg font-serif font-medium text-white mt-1">
                  {m.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
