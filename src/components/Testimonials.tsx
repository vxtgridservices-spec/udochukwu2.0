import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, PenSquare, CircleX } from 'lucide-react';
import { getClientReviews, saveClientReview } from '../utils/storage';
import { ClientReview } from '../types';

interface TestimonialsProps {
  onNavigate: (page: string) => void;
  isHome?: boolean;
}

export default function Testimonials({ onNavigate }: TestimonialsProps) {
  const [reviews, setReviews] = useState<ClientReview[]>(() => getClientReviews());
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [formNotice, setFormNotice] = useState('');

  useEffect(() => {
    fetch('/api/reviews')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
          localStorage.setItem('vxt_client_reviews', JSON.stringify(data.reviews));
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !company.trim() || !comment.trim()) {
      setFormNotice('Please complete your name, organization, and review details.');
      return;
    }

    const updated = saveClientReview({
      name: name.trim(),
      role: role.trim() || 'Client',
      company: company.trim(),
      rating,
      comment: comment.trim(),
      projectUrl: projectUrl.trim() || undefined,
    });

    setReviews(updated);
    setName('');
    setRole('');
    setCompany('');
    setRating(5);
    setComment('');
    setProjectUrl('');
    setFormNotice('');
    setIsFormOpen(false);
  };

  return (
    <div className="bg-[#181d2c] text-white">
      {/* 1. HERO BAND (Muted Violet Wash — Matches Home Client Reviews & Audit Section) */}
      <section className="bg-[#52497a] py-20 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold text-white tracking-tight">
            Client Reviews
          </h1>
          <div className="w-full max-w-2xl h-[1px] bg-white/80 my-6" />
          <p className="text-white/95 text-xs sm:text-sm tracking-[0.16em] font-mono leading-relaxed max-w-2xl uppercase">
            AUTHENTIC FEEDBACK SUBMITTED DIRECTLY BY CLIENTS AND BUYFROMUDOCHUKWU CUSTOMERS. ZERO SYNTHETIC REVIEWS.
          </p>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => {
                setFormNotice('');
                setIsFormOpen(true);
              }}
              className="border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white font-mono font-semibold text-xs px-6 py-3.5 transition-colors cursor-pointer uppercase tracking-[0.18em] inline-flex items-center gap-2.5"
            >
              <PenSquare className="w-4 h-4" />
              <span>Submit Your Review</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. REVIEWS LEDGER BAND (Deep Navy) */}
      <section className="bg-[#1b243b] py-16 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-sans font-semibold text-white">
                {reviews.length > 0
                  ? `${reviews.length} Published Client Review${reviews.length === 1 ? '' : 's'}`
                  : 'Open Experience Ledger'}
              </h2>
              <p className="text-white/75 text-xs font-mono uppercase tracking-[0.14em] mt-1">
                Verified submissions only — updated live upon posting.
              </p>
            </div>
          </div>

          {reviews.length === 0 ? (
            <div className="bg-[#141a2b]/75 border border-white/25 p-10 sm:p-12 text-left space-y-5">
              <Quote className="w-7 h-7 text-white/70" />
              <h3 className="text-xl font-sans font-semibold text-white">
                No Client Reviews Published Yet
              </h3>
              <p className="text-sm text-white/80 max-w-xl leading-relaxed font-sans">
                Placeholder reviews have been removed so only genuine customer and project feedback appears here. Worked with Udochukwu or received an order from Buyfromudochukwu? Share your honest experience.
              </p>
              <button
                type="button"
                onClick={() => setIsFormOpen(true)}
                className="border border-white text-white hover:bg-white hover:text-slate-950 font-mono text-xs font-semibold uppercase tracking-[0.18em] px-6 py-3 cursor-pointer transition-colors"
              >
                Write First Review
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-[#141a2b]/75 border border-white/25 p-6 sm:p-7 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-white/80">
                      <span className="font-bold uppercase tracking-wider tabular-nums">
                        Rating: {rev.rating} / 5
                      </span>
                      <span className="text-white/60 text-[11px]">{rev.submittedAt}</span>
                    </div>

                    <blockquote className="text-white/90 text-sm font-sans leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </blockquote>
                  </div>

                  <div className="pt-4 border-t border-white/15">
                    <p className="text-xs font-semibold text-white uppercase font-mono tracking-wider">
                      {rev.name}
                    </p>
                    <p className="text-xs text-white/70 mt-1 font-sans">
                      {rev.role} — {rev.company}
                    </p>
                    {rev.projectUrl && (
                      <a
                        href={rev.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono text-white underline underline-offset-4 mt-2 inline-block"
                      >
                        {rev.projectUrl}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. BOTTOM CTA BAND (Periwinkle Indigo Wash) */}
      <section className="bg-[#485180] py-16">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-white tracking-tight">
              Start a Project With Udochukwu
            </h2>
            <div className="w-40 h-[1px] bg-white/80 my-4" />
            <p className="text-white/90 text-xs sm:text-sm font-mono uppercase tracking-[0.16em]">
              CUSTOM REACT APPLICATIONS OR BUYFROMUDOCHUKWU ORDERS.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            id="testimonial-cta-book-free"
            className="border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white font-semibold text-xs px-6 py-3.5 transition-colors cursor-pointer uppercase font-mono tracking-[0.18em] whitespace-nowrap self-start sm:self-auto"
          >
            Book Consultation
          </button>
        </div>
      </section>

      {/* REVIEW MODAL */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.97 }}
              className="bg-[#1b243b] w-full max-w-lg overflow-hidden border border-white/25 p-6 sm:p-8 space-y-6 relative text-white"
            >
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="absolute top-5 right-5 p-2 border border-white/25 hover:border-white text-white/75 hover:text-white cursor-pointer"
              >
                <CircleX className="w-4 h-4" />
              </button>

              <div className="space-y-1.5">
                <h2 className="text-2xl font-sans font-semibold text-white">
                  Submit a Client Review
                </h2>
                <p className="text-white/75 text-xs font-mono uppercase tracking-wider">
                  Share genuine feedback about your project or Buyfromudochukwu order.
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmitReview}>
                <div className="space-y-2">
                  <label className="text-[11px] font-mono font-semibold text-white/85 uppercase tracking-wider block">
                    Score Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className={`flex-1 py-2.5 text-xs font-mono font-bold border cursor-pointer transition-colors tabular-nums ${
                          rating >= num
                            ? 'bg-white border-white text-slate-950'
                            : 'bg-[#141a2b] border-white/25 text-white/70 hover:text-white'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono font-semibold text-white/85 uppercase block">
                      Full Name *
                    </label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full border border-white/25 bg-[#141a2b] px-4 py-3 text-xs font-mono text-white focus:border-white focus:outline-hidden"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono font-semibold text-white/85 uppercase block">
                      Role
                    </label>
                    <input
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Founder"
                      className="w-full border border-white/25 bg-[#141a2b] px-4 py-3 text-xs font-mono text-white focus:border-white focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono font-semibold text-white/85 uppercase block">
                      Company / City *
                    </label>
                    <input
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Organization or City"
                      className="w-full border border-white/25 bg-[#141a2b] px-4 py-3 text-xs font-mono text-white focus:border-white focus:outline-hidden"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono font-semibold text-white/85 uppercase block">
                      Website URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={projectUrl}
                      onChange={(e) => setProjectUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full border border-white/25 bg-[#141a2b] px-4 py-3 text-xs font-mono text-white focus:border-white focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-semibold text-white/85 uppercase block">
                    Your Experience *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share how your project or product delivery went..."
                    className="w-full border border-white/25 bg-[#141a2b] px-4 py-3 text-xs font-mono text-white focus:border-white focus:outline-hidden resize-none"
                  />
                </div>

                {formNotice && (
                  <p className="text-rose-300 text-xs font-mono">{formNotice}</p>
                )}

                <button
                  type="submit"
                  className="w-full border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white font-mono text-xs font-semibold uppercase tracking-[0.18em] py-3.5 cursor-pointer transition-colors"
                >
                  Publish Review
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
