import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { saveAudit } from '../utils/storage';
import { trackAction } from '../utils/tracker';
import { 
  CheckCircle2, 
  Search, 
  Sparkles, 
  AlertTriangle, 
  Check, 
  Smartphone, 
  Gauge, 
  Send, 
  Mail, 
  Loader2, 
  ArrowRight 
} from 'lucide-react';

interface FreeAuditProps {
  onNavigate: (page: string) => void;
}

export default function FreeAudit({ onNavigate }: FreeAuditProps) {
  // Form State
  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [industry, setIndustry] = useState('Hotels');
  const [challenges, setChallenges] = useState('');

  // Processing Animation State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any>(null);

  const steps = [
    'Parsing DNS mappings & server headers...',
    'Evaluating MTN 3G/4G local network mobile latencies...',
    'Scanning head tags for JSON-LD schema marks...',
    'Testing image scaling & responsive design parameters...',
    'Calculating visitor loss ratio based on speed leaks...'
  ];

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !website || !email || !phone) {
      alert('Please fill out all required field parameters.');
      return;
    }

    // Trigger analysis cycles
    setIsAnalyzing(true);
    setAnalysisStep(0);
    trackAction(`Requested FREE Speed & Latency Audit for "${businessName}" (${website})`);

    const interval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          
          // Complete submission & save
          const result = saveAudit({
            businessName,
            website,
            phone,
            email,
            industry,
            challenges
          });

          // Generate simulated real audit details
          setGeneratedReport({
            id: result.id,
            reportId: result.reportId,
            submittedAt: result.submittedAt,
            score: Math.floor(Math.random() * 25) + 35, // Score between 35 and 60 (needing help!)
            vitals: {
              mtnTime: (Math.random() * 3 + 4).toFixed(1) + 's', // 4s to 7s
              googlePerformance: Math.floor(Math.random() * 15) + 40 + '%',
              leakedVisitors: Math.floor(Math.random() * 15) + 55 + '%',
              warningCount: Math.floor(Math.random() * 3) + 4
            }
          });

          setIsAnalyzing(false);
          setIsSubmitted(true);
          return prev;
        }
        return prev + 1;
      });
    }, 900);
  };

  const handleReset = () => {
    setBusinessName('');
    setWebsite('');
    setPhone('');
    setEmail('');
    setIndustry('Hotels');
    setChallenges('');
    setIsSubmitted(false);
    setGeneratedReport(null);
  };

  return (
    <div className="min-h-screen py-16 sm:py-24 bg-[#131620] text-slate-100 transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Header Block unless completed */}
        {!isSubmitted && !isAnalyzing && (
          <div className="text-left w-full mb-16">
            <span className="text-[10px] font-mono text-blue-400 tracking-[0.25em] block uppercase font-bold mb-2">
              CONVERSION SCIENTIFIC CHECKUP
            </span>
            <div className="border-b border-white/20 pb-4 mb-8">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-wide uppercase relative inline-block pb-3 whitespace-normal">
                Discover What's Holding Your Website Back
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
              </h1>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm tracking-[0.12em] font-mono leading-relaxed max-w-3xl font-bold uppercase">
              Submit your corporate domain specs below to trigger a comprehensive system speed index, mobile network latency check, and automated SEO schema audit.
            </p>
          </div>
        )}

        {/* 1. THE MAIN LEAD FORM */}
        <AnimatePresence mode="wait">
          {!isSubmitted && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full bg-transparent p-0 mt-8"
            >
              <form onSubmit={handleAuditSubmit} className="space-y-8 font-sans">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Business Name */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono text-slate-400 font-extrabold tracking-widest uppercase block">
                      1. Business Name *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g., Palms Luxury Suites"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full bg-[#1E2333] text-white border border-white/10 px-5 py-4 focus:border-white focus:outline-none font-mono tracking-wider rounded-none text-xs uppercase"
                    />
                  </div>

                  {/* Website URL */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono text-slate-400 font-extrabold tracking-widest uppercase block">
                      2. Website Address *
                    </label>
                    <input 
                      type="url"
                      required
                      placeholder="https://mywebsite.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full bg-[#1E2333] text-white border border-white/10 px-5 py-4 focus:border-white focus:outline-none font-mono tracking-wider rounded-none text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Phone Number */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono text-slate-400 font-extrabold tracking-widest uppercase block">
                      3. WhatsApp / Phone Number *
                    </label>
                    <input 
                      type="tel"
                      required
                      placeholder="+234 803 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#1E2333] text-white border border-white/10 px-5 py-4 focus:border-white focus:outline-none font-mono tracking-wider rounded-none text-xs uppercase"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono text-slate-400 font-extrabold tracking-widest uppercase block">
                      4. Work Email *
                    </label>
                    <input 
                      type="email"
                      required
                      placeholder="admissions@palms.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#1E2333] text-white border border-white/10 px-5 py-4 focus:border-white focus:outline-none font-mono tracking-wider rounded-none text-xs"
                    />
                  </div>
                </div>

                {/* Industry Dropdown */}
                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-slate-400 font-extrabold tracking-widest uppercase block">
                    5. Sector Category *
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-[#1E2333] text-white border border-white/10 px-5 py-4 focus:border-white focus:outline-none font-mono tracking-wider rounded-none text-xs uppercase"
                  >
                    <option value="Hotels">Hotels & Apartments</option>
                    <option value="Churches">Churches & Ministries</option>
                    <option value="Schools">Schools & Education</option>
                    <option value="Restaurants">Restaurants & Hospitality</option>
                    <option value="Healthcare">Healthcare & Private Clinics</option>
                    <option value="Real Estate">Real Estate Developers</option>
                    <option value="Law Firms">Law Firms & Legal Practises</option>
                    <option value="Construction">Construction & Tenders</option>
                    <option value="Fashion">Fashion & Luxury Brands</option>
                    <option value="Small Businesses">SMEs & Local services</option>
                    <option value="Tech Startups">Tech SaaS & Logistics</option>
                  </select>
                </div>

                {/* Challenges */}
                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-slate-400 font-extrabold tracking-widest uppercase block">
                    6. How can a better website help your business growth? (Your goals)
                  </label>
                  <textarea 
                    rows={5}
                    placeholder="e.g., Increase online bookings, improve credibility with corporate clients, convert more visitor traffic..."
                    value={challenges}
                    onChange={(e) => setChallenges(e.target.value)}
                    className="w-full bg-[#1E2333] text-white border border-white/10 px-5 py-4 focus:border-white focus:outline-none font-mono tracking-wider rounded-none text-xs uppercase resize-none"
                  ></textarea>
                </div>

                {/* Action button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    id="submit-audit-form"
                    className="w-full border border-white bg-white text-slate-950 font-mono text-xs font-bold tracking-[0.2em] uppercase py-4.5 hover:bg-transparent hover:text-white transition-all cursor-pointer rounded-none text-center block"
                  >
                    TRIGGER COMPREHENSIVE LATENCY SCAN & AUDIT
                  </button>
                </div>

              </form>
            </motion.div>
          )}

          {/* 2. THE SCANNING SIMULATOR OVERLAY */}
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full text-center py-24 min-h-[400px] flex flex-col justify-center items-center font-mono border border-white/10 bg-[#1E2333] p-12 rounded-none animate-pulse"
            >
              <div className="relative h-16 w-16 mb-8 flex items-center justify-center">
                <span className="absolute inset-0 border border-white/20 animate-ping rounded-none"></span>
                <span className="absolute inset-2 border border-blue-400/30 animate-pulse rounded-none"></span>
                <Search className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em]">Scanning Digital Architecture...</h3>
              
              {/* Dynamic steps slider */}
              <div className="mt-8 font-mono text-xs text-blue-400 max-w-lg h-12 flex justify-center items-center tracking-wider uppercase">
                <span>[LOG] {steps[analysisStep]}</span>
              </div>

              {/* Progress bar line */}
              <div className="w-full max-w-sm bg-white/10 h-[1px] mt-6 overflow-hidden rounded-none">
                <div 
                  className="bg-white h-full transition-all duration-700"
                  style={{ width: `${((analysisStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
              
              <p className="text-[10px] text-slate-500 mt-8 max-w-md tracking-[0.1em] uppercase leading-relaxed font-light">
                Evaluating network hops over Lagos infrastructure nodes to confirm real-time subscriber load parameters.
              </p>
            </motion.div>
          )}

          {/* 3. COHESIVE CONVERSION AUDIT REPORT VIEW */}
          {isSubmitted && generatedReport && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Success confirmation and Badge */}
              <div className="bg-emerald-950/20 text-emerald-300 border border-emerald-900/40 p-6 rounded-none flex flex-col sm:flex-row items-center gap-5">
                <div className="h-10 w-10 bg-[#1E2333]/40 border border-emerald-500/40 flex items-center justify-center rounded-none shrink-0 font-bold">
                  ✓
                </div>
                <div className="text-center sm:text-left font-mono">
                  <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">Analysis Pipeline Completed</h3>
                  <p className="text-[10px] text-slate-350 leading-relaxed mt-1.5 uppercase tracking-wide">
                    The raw telemetry metrics have been compiled and secure notification sent. ID index saved to workspace registry.
                  </p>
                </div>
              </div>

              {/* Comprehensive Diagnostic Board */}
              <div className="bg-[#1E2333] border border-white/10 rounded-none overflow-hidden mt-8 shadow-2xl">
                
                {/* Header card with health score */}
                <div className="bg-[#181C2A] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/10 text-left">
                  <div className="space-y-2 font-mono">
                    <span className="text-[10px] font-bold text-blue-400 tracking-[0.2em] block uppercase">{website}</span>
                    <h4 className="text-xl sm:text-2xl font-serif text-white tracking-wide uppercase">{businessName}</h4>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Dossier: {generatedReport.reportId} | Verified VXT Registry Logs</p>
                  </div>

                  {/* High Tech score frame */}
                  <div className="flex items-center gap-5 bg-[#131620] p-5 border border-white/10 rounded-none w-full md:w-auto text-left justify-start">
                    <div className="text-center">
                      <p className="text-3xl sm:text-4xl font-serif font-black text-rose-500 leading-none">{generatedReport.score}</p>
                      <p className="text-[9px] font-mono text-slate-400 mt-2 font-bold tracking-[0.2em]">HEALTH SCORE</p>
                    </div>
                    <div className="text-slate-400 border-l border-white/10 pl-5 text-[10px] font-mono leading-relaxed max-w-[180px] uppercase font-light">
                      <span className="text-rose-400 font-bold block mb-0.5">⚠️ CRITICAL ALERT:</span>
                      Core web vitals underperforming Airtel network thresh.
                    </div>
                  </div>
                </div>

                {/* Audit points list */}
                <div className="p-8 space-y-10 text-left">
                  
                  {/* The key performance benchmarks */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#131620] p-6 border border-white/10 rounded-none flex flex-col justify-between">
                      <div>
                        <p className="text-[9px] font-mono text-[#7A889B] tracking-[0.15em] font-medium uppercase">MTN MOBILITY LATENCY</p>
                        <p className="text-3xl font-serif font-semibold text-rose-405 text-rose-450 mt-3">{generatedReport.vitals.mtnTime}</p>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 mt-4 uppercase tracking-wider">Unacceptable (Loss Limit: 2.0s)</span>
                    </div>

                    <div className="bg-[#131620] p-6 border border-white/10 rounded-none flex flex-col justify-between">
                      <div>
                        <p className="text-[9px] font-mono text-[#7A889B] tracking-[0.15em] font-medium uppercase">MOBILE PERFORMANCE SCORE</p>
                        <p className="text-3xl font-serif font-semibold text-rose-405 text-rose-405 mt-3">{generatedReport.vitals.googlePerformance}</p>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 mt-4 uppercase tracking-wider">Low Core Web Vitals score</span>
                    </div>

                    <div className="bg-[#131620] p-6 border border-white/10 rounded-none flex flex-col justify-between">
                      <div>
                        <p className="text-[9px] font-mono text-[#7A889B] tracking-[0.15em] font-bold uppercase">ESTIMATED TRAFFIC LEAKS</p>
                        <p className="text-3xl font-serif font-black text-rose-500 mt-3">{generatedReport.vitals.leakedVisitors}</p>
                      </div>
                      <span className="text-[9px] font-mono text-rose-400/90 mt-4 uppercase tracking-wider font-extrabold">Exiting due to delays</span>
                    </div>
                  </div>

                  {/* Structural red flags and objections */}
                  <div className="space-y-6">
                    <h5 className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-[0.25em] block">
                      • CONVERSION FRICTION DEPRECIATORS ({generatedReport.vitals.warningCount})
                    </h5>
                    
                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex gap-4 border border-rose-500/20 bg-rose-950/10 p-5 rounded-none text-rose-300">
                        <span className="text-rose-400 font-bold font-mono text-[10px] tracking-wider uppercase shrink-0 mt-0.5">[CRIT-01]</span>
                        <div>
                          <strong className="text-white block font-bold uppercase tracking-wider text-[10px] mb-1">Absence of Direct booking Engines</strong>
                          Your forms are too generic—not capturing high intent customers immediately. Unoptimized layout friction forces buyers back to OTA aggregators.
                        </div>
                      </div>

                      <div className="flex gap-4 border border-rose-500/20 bg-rose-950/10 p-5 rounded-none text-rose-300">
                        <span className="text-rose-400 font-bold font-mono text-[10px] tracking-wider uppercase shrink-0 mt-0.5">[CRIT-02]</span>
                        <div>
                          <strong className="text-white block font-bold uppercase tracking-wider text-[10px] mb-1">Uncompressed Assets & Heavy Templates</strong>
                          Images are processed with standard outdated encoders. Loading speeds suffer, triggering the sluggish {generatedReport.vitals.mtnTime} load latencies on Lagos network nodes.
                        </div>
                      </div>

                      <div className="flex gap-4 border border-blue-500/20 bg-blue-950/10 p-5 rounded-none text-blue-300">
                        <span className="text-blue-400 font-bold font-mono text-[10px] tracking-wider uppercase shrink-0 mt-0.5">[WARN-01]</span>
                        <div>
                          <strong className="text-white block font-bold uppercase tracking-wider text-[10px] mb-1">Sluggish Indexing metadata blocks</strong>
                          Local address mappings are lacking. Google spiders are unable to map local target terms properly, slashing organic growth opportunities.
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Report Footer Pitch with direct consultation booking */}
                <div className="bg-[#181C2A] p-8 text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-8 border-t border-white/10 text-left">
                  <div className="space-y-2 lg:max-w-xl">
                    <h5 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Fix Latency Bounces & Accelerate Bookings</h5>
                    <p className="text-slate-400 font-mono text-[10px] uppercase tracking-wider leading-relaxed">Book a direct, completely free 30-minute system planning review. We'll map out a custom VXT React setup engineered to resolve loading bottlenecks.</p>
                  </div>
                  
                  <button
                    onClick={() => onNavigate('contact')}
                    id="audit-results-book-now"
                    className="border border-white bg-white text-slate-950 font-mono text-xs font-bold tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-transparent hover:text-white transition-all cursor-pointer rounded-none text-center block w-full lg:w-auto"
                  >
                    BOOK SYSTEM PLANNING SLOT
                  </button>
                </div>

              </div>
              
              <div className="text-center pt-8">
                <button
                  onClick={handleReset}
                  className="bg-transparent hover:border-white border border-white/10 text-white font-mono text-[9px] font-bold tracking-[0.2em] px-6 py-3 transition-all rounded-none cursor-pointer uppercase"
                >
                  Analyze another URL domain
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
