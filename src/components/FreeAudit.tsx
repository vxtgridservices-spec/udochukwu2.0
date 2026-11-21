import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { saveAudit } from '../utils/storage';
import { trackAction } from '../utils/tracker';
import { Radar, BadgeCheck, AlertOctagon, Gauge } from 'lucide-react';
import { AuditSubmission } from '../types';

interface FreeAuditProps {
  onNavigate: (page: string) => void;
}

export default function FreeAudit({ onNavigate }: FreeAuditProps) {
  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [industry, setIndustry] = useState('Hotels');
  const [challenges, setChallenges] = useState('');
  const [validationError, setValidationError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<AuditSubmission | null>(null);

  const steps = [
    'Validating website URL and domain protocol...',
    'Logging technical scope & sector classification...',
    'Queuing manual Core Web Vitals & mobile speed review...',
    'Registering audit ticket in VXTGrid operations queue...',
  ];

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !website.trim() || !email.trim() || !phone.trim()) {
      setValidationError('Please complete all required business, URL, phone, and email fields.');
      return;
    }

    setValidationError('');
    setIsSubmitting(true);
    setSubmissionStep(0);
    trackAction(`Submitted Technical Audit Request for "${businessName}" (${website})`);

    const interval = setInterval(() => {
      setSubmissionStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          const result = saveAudit({
            businessName: businessName.trim(),
            website: website.trim(),
            phone: phone.trim(),
            email: email.trim(),
            industry,
            challenges: challenges.trim(),
          });
          setSubmittedRecord(result);
          setIsSubmitting(false);
          setIsSubmitted(true);
          return prev;
        }
        return prev + 1;
      });
    }, 500);
  };

  const handleReset = () => {
    setBusinessName('');
    setWebsite('');
    setPhone('');
    setEmail('');
    setIndustry('Hotels');
    setChallenges('');
    setValidationError('');
    setIsSubmitted(false);
    setSubmittedRecord(null);
  };

  return (
    <div className="bg-[#181d2c] text-white">
      {/* 1. HERO BAND (Slate-Cyan Wash) */}
      <section className="bg-[#3b6e82] py-20 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-white/85 tracking-[0.18em] uppercase mb-4">
            <Radar className="w-4 h-4" />
            <span>Technical Audit Intake</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold text-white tracking-tight">
            Technical Website Review
          </h1>

          <div className="w-full max-w-2xl h-[1px] bg-white/80 my-6" />

          <p className="text-white/95 text-xs sm:text-sm tracking-[0.16em] font-mono leading-relaxed max-w-2xl uppercase">
            SUBMIT YOUR WEBSITE URL. UDOCHUKWU PERSONALLY INSPECTS LOADING BOTTLENECKS, MOBILE USABILITY, AND TECHNICAL SEO STRUCTURE.
          </p>
        </div>
      </section>

      {/* 2. AUDIT FORM BAND (Deep Navy) */}
      <section className="bg-[#1b243b] py-16 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14">
          <AnimatePresence mode="wait">
            {!isSubmitted && !isSubmitting && (
              <motion.div
                key="audit-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full max-w-3xl"
              >
                <form onSubmit={handleAuditSubmit} className="space-y-6 font-sans">
                  {validationError && (
                    <div className="border border-rose-400/50 bg-rose-950/40 p-4 text-xs font-mono text-rose-200 flex items-center gap-2">
                      <AlertOctagon className="w-4 h-4 shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono text-white/85 font-semibold tracking-[0.16em] uppercase block">
                        1. Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Palms Suites Ltd"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full bg-[#141a2b]/80 text-white border border-white/25 px-4 py-3.5 focus:border-white focus:outline-none font-mono text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-mono text-white/85 font-semibold tracking-[0.16em] uppercase block">
                        2. Website Address *
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="https://mybusiness.com"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full bg-[#141a2b]/80 text-white border border-white/25 px-4 py-3.5 focus:border-white focus:outline-none font-mono text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono text-white/85 font-semibold tracking-[0.16em] uppercase block">
                        3. WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 803 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#141a2b]/80 text-white border border-white/25 px-4 py-3.5 focus:border-white focus:outline-none font-mono text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-mono text-white/85 font-semibold tracking-[0.16em] uppercase block">
                        4. Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="team@mybusiness.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#141a2b]/80 text-white border border-white/25 px-4 py-3.5 focus:border-white focus:outline-none font-mono text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-white/85 font-semibold tracking-[0.16em] uppercase block">
                      5. Sector Category *
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full bg-[#141a2b]/80 text-white border border-white/25 px-4 py-3.5 focus:border-white focus:outline-none font-mono text-xs sm:text-sm uppercase"
                    >
                      <option value="Hotels">Hotels &amp; Apartments</option>
                      <option value="Churches">Churches &amp; Ministries</option>
                      <option value="Schools">Schools &amp; Education</option>
                      <option value="Restaurants">Restaurants &amp; Hospitality</option>
                      <option value="Healthcare">Healthcare &amp; Private Clinics</option>
                      <option value="Real Estate">Real Estate Developers</option>
                      <option value="Law Firms">Law Firms &amp; Legal Practice</option>
                      <option value="Construction">Construction &amp; Engineering</option>
                      <option value="Fashion">Fashion &amp; Retail Brands</option>
                      <option value="Small Businesses">SMEs &amp; Local Services</option>
                      <option value="Tech Startups">Tech SaaS &amp; Logistics</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-white/85 font-semibold tracking-[0.16em] uppercase block">
                      6. Key Goals or Issues Noticed
                    </label>
                    <textarea
                      rows={5}
                      placeholder="e.g., Slow mobile load time, unclear booking flow, missing Google visibility..."
                      value={challenges}
                      onChange={(e) => setChallenges(e.target.value)}
                      className="w-full bg-[#141a2b]/80 text-white border border-white/25 px-4 py-3.5 focus:border-white focus:outline-none font-mono text-xs sm:text-sm resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      id="submit-audit-form"
                      className="border border-white bg-white text-slate-950 font-mono text-xs font-semibold tracking-[0.18em] uppercase px-8 py-4 hover:bg-transparent hover:text-white transition-colors cursor-pointer"
                    >
                      Submit Website for Review
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {isSubmitting && (
              <motion.div
                key="audit-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-3xl text-center py-20 min-h-[320px] flex flex-col justify-center items-center font-mono border border-white/25 bg-[#141a2b]/80 p-10"
              >
                <Gauge className="w-9 h-9 text-white mb-6" />
                <h2 className="text-sm font-semibold text-white uppercase tracking-[0.18em]">
                  Logging Technical Audit Request
                </h2>
                <div className="mt-5 font-mono text-xs text-white/85 max-w-lg uppercase tracking-wider">
                  {steps[submissionStep]}
                </div>
                <div className="w-full max-w-sm bg-white/15 h-[2px] mt-6 overflow-hidden">
                  <div
                    className="bg-white h-full transition-all duration-300"
                    style={{ width: `${((submissionStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </motion.div>
            )}

            {isSubmitted && submittedRecord && (
              <motion.div
                key="audit-confirmed"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="bg-emerald-950/35 text-white border border-emerald-400/40 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="h-10 w-10 bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center shrink-0">
                    <BadgeCheck className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div className="font-mono">
                    <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
                      Audit Request Registered ({submittedRecord.reportId})
                    </h2>
                    <p className="text-xs text-white/85 leading-relaxed mt-1.5 font-sans">
                      Your website has been queued for hands-on inspection. We review actual loading assets, DOM depth, and search structure directly before replying.
                    </p>
                  </div>
                </div>

                <div className="bg-[#141a2b]/75 border border-white/25 overflow-hidden">
                  <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/15">
                    <div className="space-y-1.5 font-mono">
                      <span className="text-xs text-white/75 tracking-[0.16em] block uppercase">
                        {submittedRecord.website}
                      </span>
                      <h3 className="text-2xl font-sans font-semibold text-white">
                        {submittedRecord.businessName}
                      </h3>
                      <p className="text-[11px] text-white/70 uppercase tracking-wider">
                        Status: {submittedRecord.status} · Sector: {submittedRecord.industry}
                      </p>
                    </div>
                    <span className="px-3.5 py-2 border border-white/30 text-xs font-mono uppercase tracking-widest text-white">
                      Ticket: {submittedRecord.reportId}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 space-y-6">
                    <h4 className="text-xs font-mono font-semibold text-white/80 uppercase tracking-[0.18em]">
                      What We Inspect During Your Review
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                      <div className="bg-[#181d2c] p-5 border border-white/15 space-y-2">
                        <span className="font-mono text-white font-bold uppercase block">
                          01. Asset &amp; Bundle Weight
                        </span>
                        <p className="text-white/80 font-sans text-xs leading-relaxed">
                          Inspecting unoptimized images, script blocking, and mobile page weight over cellular networks.
                        </p>
                      </div>
                      <div className="bg-[#181d2c] p-5 border border-white/15 space-y-2">
                        <span className="font-mono text-white font-bold uppercase block">
                          02. Mobile UX &amp; Lead Flow
                        </span>
                        <p className="text-white/80 font-sans text-xs leading-relaxed">
                          Checking tap targets, layout clarity, and friction points inside booking or inquiry forms.
                        </p>
                      </div>
                      <div className="bg-[#181d2c] p-5 border border-white/15 space-y-2">
                        <span className="font-mono text-white font-bold uppercase block">
                          03. Search &amp; Schema Markup
                        </span>
                        <p className="text-white/80 font-sans text-xs leading-relaxed">
                          Auditing heading hierarchy, meta descriptions, and structured Schema.org data for search visibility.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#485180] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-t border-white/15">
                    <div className="space-y-1.5 lg:max-w-xl">
                      <h4 className="text-lg font-sans font-semibold text-white">
                        Want to Discuss Immediate Fixes
                      </h4>
                      <p className="text-white/85 font-mono text-xs uppercase tracking-wider leading-relaxed">
                        Book a direct consultation slot to walk through your current site architecture.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => onNavigate('contact')}
                        id="audit-results-book-now"
                        className="border border-white bg-white text-slate-950 font-mono text-xs font-semibold tracking-[0.18em] uppercase px-6 py-3.5 hover:bg-transparent hover:text-white transition-colors cursor-pointer"
                      >
                        Book Consultation
                      </button>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="border border-white text-white hover:bg-white hover:text-slate-950 font-mono text-xs font-semibold tracking-[0.18em] px-6 py-3.5 transition-colors cursor-pointer uppercase"
                      >
                        Another URL
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
