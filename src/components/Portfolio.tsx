import { useState, useEffect } from 'react';
import { getCaseStudies } from '../utils/storage';
import { CaseStudy } from '../types';
import { ExternalLink, Briefcase, SlidersHorizontal } from 'lucide-react';

interface PortfolioProps {
  onNavigate: (page: string) => void;
}

export default function Portfolio({ onNavigate }: PortfolioProps) {
  const [cases, setCases] = useState<CaseStudy[]>(() => getCaseStudies());
  const [selectedCase, setSelectedCase] = useState<CaseStudy>(() => getCaseStudies()[0]);

  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.projects) && data.projects.length > 0) {
          setCases(data.projects);
          setSelectedCase(data.projects[0]);
          localStorage.setItem('vxt_portfolio_cases', JSON.stringify(data.projects));
        }
      })
      .catch(() => {});
  }, []);

  if (!selectedCase) return null;

  return (
    <div className="bg-[#181d2c] text-white">
      {/* 1. HERO BAND (Steel Blue Wash — Matches Home Portfolio Section) */}
      <section className="relative min-h-[50vh] flex flex-col justify-center items-start bg-[#4a628d] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={selectedCase.image}
            alt={selectedCase.client}
            className="w-full h-full object-cover object-center opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-[#3d537b]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2c3f62]/85 via-[#3d537b]/45 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-20 text-left">
          <div className="flex items-center gap-2 text-white/85 text-xs font-mono uppercase tracking-[0.18em] mb-4">
            <Briefcase className="w-4 h-4" />
            <span>Production Web Systems</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold text-white tracking-tight">
            {selectedCase.client}
          </h1>

          <div className="w-full max-w-2xl h-[1px] bg-white/80 my-6" />

          <p className="text-white/95 text-xs sm:text-sm tracking-[0.16em] font-mono leading-relaxed max-w-2xl uppercase">
            {selectedCase.industry} · VERIFIED CLIENT PLATFORM BY UDOCHUKWU.
          </p>
        </div>
      </section>

      {/* 2. PROJECT SELECTOR & MAIN CASE DETAILS BAND (Deep Navy) */}
      <section className="bg-[#1b243b] py-16 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 space-y-12">
          {/* Selector */}
          <div className="border-b border-white/20 pb-8">
            <div className="flex items-center gap-2 text-xs font-mono text-white/80 uppercase tracking-[0.16em] mb-4">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Select Live Project</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {cases.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCase(c)}
                  className={`px-5 py-3 text-xs font-mono font-semibold uppercase tracking-[0.16em] transition-colors cursor-pointer border whitespace-nowrap ${
                    selectedCase.id === c.id
                      ? 'bg-white text-slate-950 border-white'
                      : 'bg-[#141a2b]/65 text-white border-white/30 hover:border-white'
                  }`}
                >
                  {c.client}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs font-mono text-white/75 tracking-[0.18em] uppercase block mb-2">
                  Project Overview
                </span>
                <h2 className="text-2xl sm:text-4xl font-sans font-semibold text-white tracking-tight">
                  {selectedCase.title}
                </h2>
                <div className="w-full max-w-xl h-[1px] bg-white/80 my-5" />
                <p className="text-white/85 text-sm sm:text-base leading-relaxed font-sans">
                  {selectedCase.solution}
                </p>
              </div>

              <div className="border border-white/25 bg-[#141a2b]/75 overflow-hidden">
                <img
                  src={selectedCase.image}
                  alt={selectedCase.title}
                  className="w-full h-72 sm:h-88 object-cover"
                />
                <div className="px-5 py-3.5 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-white/80">
                  <span>Client: {selectedCase.client}</span>
                  <span>Sector: {selectedCase.industry}</span>
                </div>
              </div>

              <div className="border border-white/20 bg-white/5 p-6 text-white/90 font-sans text-sm sm:text-base leading-relaxed">
                {selectedCase.summaryNote}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
              <div className="bg-[#141a2b]/75 p-6 sm:p-8 border border-white/25 space-y-5">
                <h3 className="text-xs font-mono font-semibold text-white tracking-[0.2em] uppercase">
                  Engineering Deliverables
                </h3>
                <div className="w-full h-[1px] bg-white/40" />
                <ul className="space-y-3">
                  {selectedCase.deliverables.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm font-mono text-white/90 border-b border-white/10 pb-2.5 last:border-b-0 last:pb-0"
                    >
                      <span className="text-white font-bold tabular-nums">
                        {(idx + 1).toString().padStart(2, '0')}.
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-mono font-semibold text-white/80 uppercase tracking-[0.18em]">
                  Project Brief
                </h4>
                <p className="text-white/85 text-sm leading-relaxed font-sans">
                  {selectedCase.problem}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/15">
                <h4 className="text-xs font-mono font-semibold text-white/80 uppercase tracking-[0.18em]">
                  Technology Stack
                </h4>
                <p className="text-xs font-mono text-white/90 tracking-[0.12em] uppercase leading-relaxed">
                  {selectedCase.technology.join(' · ')}
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  id={`case-cta-${selectedCase.id}`}
                  className="border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white font-mono text-xs font-semibold tracking-[0.18em] uppercase px-6 py-3.5 transition-colors flex items-center justify-center cursor-pointer flex-1"
                >
                  Discuss Similar Build
                </button>

                {selectedCase.liveUrl && selectedCase.liveUrl !== '#live-preview' && (
                  <a
                    href={selectedCase.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/40 bg-white/10 hover:bg-white hover:text-slate-950 text-white font-mono text-xs font-semibold tracking-[0.16em] uppercase px-5 py-3.5 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <span>Visit Site</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CTA BAND (Muted Violet Wash) */}
      <section className="bg-[#52497a] py-16 sm:py-20">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-sans font-semibold text-white tracking-tight">
              Ready to Build Your Next Platform
            </h2>
            <div className="w-full max-w-lg h-[1px] bg-white/80 my-5" />
            <p className="text-white/90 text-xs sm:text-sm font-mono uppercase tracking-[0.16em] leading-relaxed">
              CLEAN REACT CODE, SEARCH STRUCTURE, AND DEPENDABLE MOBILE PERFORMANCE.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              id="portfolio-banner-book"
              className="border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white font-mono text-xs font-semibold tracking-[0.18em] uppercase px-6 py-3.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              Book Consultation
            </button>
            <button
              type="button"
              onClick={() => onNavigate('audit')}
              id="portfolio-banner-audit"
              className="border border-white text-white hover:bg-white hover:text-slate-950 font-mono text-xs font-semibold tracking-[0.18em] uppercase px-6 py-3.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              Website Audit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
