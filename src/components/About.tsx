import { motion } from 'motion/react';
import { Target, Eye, ShieldCheck, HeartPulse, GraduationCap, Award, Briefcase, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getSiteSettings } from '../utils/storage';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const [aboutImageUrl, setAboutImageUrl] = useState('/assets/images/udochukwu_portrait_1781715122799.jpg');

  useEffect(() => {
    const settings = getSiteSettings();
    setAboutImageUrl(settings.aboutImageUrl);
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
    <div className="py-12 md:py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative group rounded-3xl overflow-hidden bg-slate-950 shadow-2xl border-4 border-white dark:border-slate-800 transition-transform hover:scale-[1.01]">
              <img 
                src={aboutImageUrl} 
                alt="Udochukwu Portrait" 
                className="w-full h-auto object-cover object-top filter contrast-[1.05]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-mono text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-900/50 backdrop-blur-xs">
                  FOUNDER & DIGITAL STRATEGIST
                </span>
                <p className="text-xl font-serif mt-2 font-medium">Udochukwu</p>
                <p className="text-xs text-slate-300 mt-1">Premium Digital Strategy Consultant</p>
              </div>
            </div>
            
            {/* Ambient visual badge */}
            <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-4 rounded-2xl shadow-xl z-10 hidden sm:flex items-center gap-3 animate-bounce" style={{ animationDuration: '6s' }}>
              <div className="bg-blue-500/50 p-2 rounded-xl">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-mono text-blue-100 leading-none">STRATEGY RATING</p>
                <p className="text-lg font-bold leading-tight">100% Growth</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-blue-600"></span>
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400 tracking-widest uppercase">STRATEGY & DIGITAL PARTNER</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-900 dark:text-white font-medium tracking-tight leading-tight">
              I don't just build websites. I construct digital systems that scale African businesses.
            </h1>
            
            <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-300 font-sans text-base leading-relaxed">
              <p>
                My name is <strong className="text-slate-900 dark:text-white font-medium">Udochukwu</strong>, and I am the founder of <strong className="text-blue-600 dark:text-blue-400 font-medium">VXTGrid Services</strong>. My work is dedicated to helping ambitious African brands build world-class digital experiences that drive measurable growth.
              </p>
              <p>
                I have seen too many promising brands held back by digital platforms that are slow, uninspiring, or disconnected from the reality of their customers. High-value clients and corporate partners require immediacy, and they require unwavering trust. If your digital presence doesn't load instantly and communicate authority instantly, they will look elsewhere.
              </p>
              <p>
                My consultancy combines high-stakes conversion strategy, elite design, and ultra-performing infrastructure. We create clear, high-speed, and high-trust digital assets that translate visitor interest into concrete business outcomes.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate('contact')}
                id="about-cta-book"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2 group cursor-pointer"
              >
                Book Free Consultation
                <Sparkles className="w-4 h-4 text-white group-hover:animate-pulse" />
              </button>
              <button 
                onClick={() => onNavigate('portfolio')}
                id="about-cta-portfolio"
                className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium transition-all cursor-pointer"
              >
                View Case Studies
              </button>
            </div>
          </motion.div>
        </div>

        {/* Mission / Vision Statement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-3xl border border-slate-200/60 dark:border-slate-700/50 shadow-xs">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-medium text-slate-900 dark:text-white mb-3">Our Core Mission</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              To empower elite corporate businesses and ambitious local agencies in Africa to double their revenue using optimized speed, clear positioning, and world-class conversion engineering, completely removing dependence on costly booking platforms and unstable advertisement spikes.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-3xl border border-slate-200/60 dark:border-slate-700/50 shadow-xs">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-medium text-slate-900 dark:text-white mb-3">Our Vision</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              To establish VXTGrid Services as the gold standard of high-ticket web engineering in Sub-Saharan Africa. We envision a digital landscape where local products command global trust, backed by speed and design structures that easily match those of Silicon Valley companies.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-100 dark:bg-blue-950 px-3 py-1.5 rounded-full font-medium">
              OPERATIONAL CODE
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white mt-4 font-medium tracking-tight">
              Four Core Values That Drive 10x ROI
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm sm:text-base">
              We stand apart because we do not treat code like a commodity, but as a critical revenue activator.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div 
                  key={i}
                  id={`value-card-${i}`}
                  className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 shadow-xs hover:shadow-md transition-all group hover:-translate-y-1"
                >
                  <div className="h-10 w-10 bg-slate-100 dark:bg-slate-700 group-hover:bg-blue-600 group-hover:text-white text-slate-700 dark:text-slate-300 rounded-xl flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-serif font-semibold text-slate-900 dark:text-white mt-4">{v.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline of Achievements */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-100 dark:bg-blue-950 px-3 py-1.5 rounded-full font-medium">
              THE CHRONICLE
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white mt-4 font-medium tracking-tight">
              A History of Client Wins & Breakthroughs
            </h2>
          </div>

          <div className="relative border-l border-slate-300 dark:border-slate-700 ml-4 sm:ml-12 md:max-w-4xl md:mx-auto">
            {milestones.map((m, idx) => (
              <div key={idx} className="mb-10 ml-6 sm:ml-10 relative">
                {/* Year dot label */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 bg-blue-600 text-white text-xs font-mono font-bold px-2 py-0.5 rounded-md shadow-sm">
                  {m.year}
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 shadow-xs hover:border-blue-400 transition-colors">
                  <span className="text-xs font-mono font-semibold text-slate-400 inline-block uppercase">
                    {m.company}
                  </span>
                  <h3 className="text-lg font-serif font-medium text-slate-900 dark:text-white mt-1">
                    {m.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
