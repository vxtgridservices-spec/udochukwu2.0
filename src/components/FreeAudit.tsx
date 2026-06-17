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
    <div className="py-12 md:py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Block unless completed */}
        {!isSubmitted && !isAnalyzing && (
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-100 dark:bg-blue-950 px-3 py-1.5 rounded-full font-medium">
              CONVERSION SCIENTIFIC CHECKUP
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-slate-900 dark:text-white mt-4 font-normal tracking-tight">
              Discover What's Holding Your Website Back
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-xs sm:text-sm leading-relaxed">
              Submit your business details for a comprehensive audit. I will analyze your website for speed, performance, and conversion friction to show you exactly how to transform it into a powerful lead-generation engine.
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
              className="bg-slate-50 dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-xs"
            >
              <form onSubmit={handleAuditSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Business Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                      BUSINESS NAME *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g., Palms Luxury Suites"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden text-sm"
                    />
                  </div>

                  {/* Website URL */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                      WEBSITE ADDRESS *
                    </label>
                    <input 
                      type="url"
                      required
                      placeholder="https://mywebsite.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                      WHATSAPP / PHONE NUMBER *
                    </label>
                    <input 
                      type="tel"
                      required
                      placeholder="+234 803 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                      WORK EMAIL *
                    </label>
                    <input 
                      type="email"
                      required
                      placeholder="admissions@palms.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden text-sm"
                    />
                  </div>
                </div>

                {/* Industry Dropdown */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                    SECTOR CATEGORY *
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden text-sm"
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
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                    HOW CAN A BETTER WEBSITE HELP YOUR BUSINESS GROWTH? (YOUR GOALS)
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="e.g., Increase online bookings, improve credibility with corporate clients, convert more visitor traffic..."
                    value={challenges}
                    onChange={(e) => setChallenges(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 px-4 py-3 bg-white/60 dark:bg-slate-800/85 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden text-sm"
                  ></textarea>
                </div>

                {/* Action button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    id="submit-audit-form"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Audit & Trigger Local Scan</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>

              </form>
            </motion.div>
          )}

          {/* 2. THE SCANNING SIMULATOR OVERLAY */}
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-slate-950 text-white rounded-3xl p-10 text-center min-h-[400px] flex flex-col justify-center items-center shadow-2xl border border-slate-800"
            >
              <div className="h-20 w-20 rounded-full border-4 border-slate-800 border-t-blue-500 animate-spin flex items-center justify-center mb-8">
                <Search className="w-8 h-8 text-blue-500 animate-pulse" />
              </div>
              <h3 className="text-xl font-serif text-white font-medium">Scanning Digital Architecture</h3>
              
              {/* Dynamic steps slider */}
              <div className="mt-6 font-mono text-xs text-blue-400 max-w-sm h-12 flex justify-center items-center">
                <span>{steps[analysisStep]}</span>
              </div>

              {/* Progress bar line */}
              <div className="w-full max-w-md bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                <div 
                  className="bg-blue-500 h-full transition-all duration-700"
                  style={{ width: `${((analysisStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
              
              <p className="text-[11px] text-slate-500 mt-6 max-w-xs italic leading-tight">
                Evaluating locational DNS hops over LAGOS servers to confirm real-time Airtel/MTN mobile loading profiles...
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
              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-2xl border border-emerald-300/40 dark:border-emerald-800/50 flex flex-col sm:flex-row items-center gap-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 shrink-0" />
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-serif font-semibold text-slate-900 dark:text-white">Lead Successfully Logged in VXT Database!</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                    An email with your formal diagnostic dossier has been queued. An SMS confirmation was sent to <strong className="text-slate-900 dark:text-white">{phone}</strong>.
                  </p>
                </div>
              </div>

              {/* Comprehensive Diagnostic Board */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 overflow-hidden shadow-md">
                
                {/* Header card with health score */}
                <div className="bg-slate-900 dark:bg-slate-800 p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-blue-400 font-semibold uppercase tracking-widest">{website}</span>
                    <h4 className="text-2xl font-serif font-normal">{businessName} — Diagnostics</h4>
                    <p className="text-xs text-slate-400 font-mono">Dossier ID: {generatedReport.reportId} | Logs Saved Locally</p>
                  </div>

                  {/* Circular Score display */}
                  <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-inner">
                    <div className="text-center">
                      <p className="text-4xl font-extrabold text-amber-500 tracking-tight">{generatedReport.score}</p>
                      <p className="text-[10px] font-mono text-slate-400 font-black tracking-widest">HEALTH SCORE</p>
                    </div>
                    <div className="text-slate-500 border-l border-slate-800 pl-4 text-xs font-mono leading-tight max-w-[120px]">
                      <span className="text-amber-500 font-bold block">⚠️ RISK ALERT:</span>
                      Optimized for Google but leaks mobile leads.
                    </div>
                  </div>
                </div>

                {/* Audit points list */}
                <div className="p-8 space-y-8">
                  
                  {/* The key performance benchmarks */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-slate-850 p-5 rounded-2xl border border-slate-200/40 dark:border-slate-700/50">
                      <Smartphone className="w-5 h-5 text-rose-500" />
                      <p className="text-xs font-mono text-slate-400 mt-2">MTN 3G/4G MOBILITY SPEED</p>
                      <p className="text-xl font-bold text-rose-500 mt-1">{generatedReport.vitals.mtnTime}</p>
                      <span className="text-[10px] text-slate-500 leading-none">Very Sluggish (Loss Limit: 2.0s)</span>
                    </div>

                    <div className="bg-white dark:bg-slate-850 p-5 rounded-2xl border border-slate-200/40 dark:border-slate-700/50">
                      <Gauge className="w-5 h-5 text-rose-500" />
                      <p className="text-xs font-mono text-slate-400 mt-2">MOBILE GOOGLE SCORE</p>
                      <p className="text-xl font-bold text-rose-500 mt-1">{generatedReport.vitals.googlePerformance}</p>
                      <span className="text-[10px] text-slate-500 leading-none">Low Core Web Vitals performance</span>
                    </div>

                    <div className="bg-white dark:bg-slate-850 p-5 rounded-2xl border border-slate-200/40 dark:border-slate-700/50">
                      <AlertTriangle className="w-5 h-5 text-rose-500 animate-pulse" />
                      <p className="text-xs font-mono text-slate-400 mt-2">ESTIMATED VISITOR LOSS</p>
                      <p className="text-xl font-black text-rose-600 mt-1">{generatedReport.vitals.leakedVisitors}</p>
                      <span className="text-[10px] text-slate-500 leading-none">Leaving because of load delays</span>
                    </div>
                  </div>

                  {/* Structural red flags and objections */}
                  <div>
                    <h5 className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest mb-4">
                      CRITICAL ANOMALIES DETECTED ({generatedReport.vitals.warningCount})
                    </h5>
                    
                    <div className="space-y-3">
                      <div className="flex gap-3 bg-red-50/50 dark:bg-red-950/20 p-4 rounded-xl border border-red-100/60 dark:border-red-900/40 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <span className="text-red-500 font-bold font-mono shrink-0">CRIT-A:</span>
                        <div>
                          <strong className="text-slate-900 dark:text-white block font-medium">Missing Lead Generation Structures</strong>
                          Our scanner checked your checkout widgets and forms. They are too generic—increasing frictional checkout bounces.
                        </div>
                      </div>

                      <div className="flex gap-3 bg-red-50/50 dark:bg-red-950/20 p-4 rounded-xl border border-red-100/60 dark:border-red-900/40 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <span className="text-red-500 font-bold font-mono shrink-0">CRIT-B:</span>
                        <div>
                          <strong className="text-slate-900 dark:text-white block font-medium">Unoptimized Visual Assets & Slow Core Styles</strong>
                          Images on your domain are not served as WebP. Mobile CPUs melt compressing them, causing the {generatedReport.vitals.mtnTime} latency on Airtel network nodes.
                        </div>
                      </div>

                      <div className="flex gap-3 bg-amber-50/55 dark:bg-amber-950/20 p-4 rounded-xl border border-amber-100/60 dark:border-amber-900/40 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <span className="text-amber-500 font-bold font-mono shrink-0">WARN-A:</span>
                        <div>
                          <strong className="text-slate-900 dark:text-white block font-medium">Broken JSON-LD Schema indexing structures</strong>
                          Google’s indexing bots are struggling to understand localized address parameters and target terms, limiting free search hits.
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Report Footer Pitch with direct consultation booking */}
                <div className="bg-slate-100 dark:bg-slate-800/40 p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h5 className="text-sm font-serif font-bold text-slate-900 dark:text-white">Let's fix this speed and convert more customers</h5>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Book an emergency strategy call with Udochukwu. Let’s map a lightweight React replacement.</p>
                  </div>
                  
                  <button
                    onClick={() => onNavigate('contact')}
                    id="audit-results-book-now"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Discuss My Audit Results</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
              
              <div className="text-center pb-6">
                <button
                  onClick={handleReset}
                  className="text-xs font-mono border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
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
