import { useState, useEffect } from 'react';
import { Target, Eye, ShieldCheck, HeartHandshake, CalendarCheck } from 'lucide-react';
import { getSiteSettings } from '../utils/storage';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const [aboutImageUrl, setAboutImageUrl] = useState(
    'https://res.cloudinary.com/drghjqbak/image/upload/q_auto/f_auto/v1781913441/1781783831624_3_a1uctp.jpg'
  );

  useEffect(() => {
    const settings = getSiteSettings();
    if (settings && settings.aboutImageUrl) {
      setAboutImageUrl(settings.aboutImageUrl);
    }
  }, []);

  const values = [
    {
      icon: Target,
      title: 'Practical Business Outcomes',
      desc: 'Every interface and workflow is built around clear user tasks—product inquiries, bookings, and hardware purchases.',
    },
    {
      icon: ShieldCheck,
      title: 'Network-Aware Engineering',
      desc: 'Applications are optimized to load cleanly across varying Nigerian mobile data speeds without bloated dependencies.',
    },
    {
      icon: Eye,
      title: 'Radical Transparency',
      desc: 'Honest timelines, plain technical communication, and real project documentation without inflated claims.',
    },
    {
      icon: HeartHandshake,
      title: 'Long-Term Partnership',
      desc: 'Launching the codebase is only step one. Ongoing maintenance, iterations, and store management remain supported.',
    },
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Engineering Foundations',
      company: 'Early Web Craft',
      desc: 'Focused on frontend craftsmanship, semantic web standards, and building faster mobile-ready web interfaces.',
    },
    {
      year: '2022',
      title: 'VXTGrid Services Established',
      company: 'Founder & Principal',
      desc: 'Launched VXTGrid Services to help businesses move beyond slow, generic templates toward bespoke React applications.',
    },
    {
      year: '2024',
      title: 'Full-Stack Production Systems',
      company: 'Fintech & Commerce Builds',
      desc: 'Delivered production web platforms including wallet interfaces, service marketplaces, and corporate security portals.',
    },
    {
      year: '2026',
      title: 'Buyfromudochukwu Expansion',
      company: 'Web Engineering & Direct Commerce',
      desc: 'Expanded operations with Buyfromudochukwu, a multi-category tech and hardware marketplace serving customers nationwide.',
    },
  ];

  return (
    <div className="bg-[#181d2c] text-white">
      {/* 1. HERO BAND (Teal Wash — Matches Landing Page) */}
      <section className="relative min-h-[52vh] flex flex-col justify-center items-start bg-[#3c7b8c] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={aboutImageUrl}
            alt="Udochukwu Portrait"
            className="w-full h-full object-cover object-top opacity-25 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#2f6778]/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#245362]/85 via-[#2f6778]/45 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-20 text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold text-white tracking-tight">
            Who is Udochukwu
          </h1>

          <div className="w-full max-w-2xl h-[1px] bg-white/80 my-6" />

          <p className="text-white/95 text-xs sm:text-sm tracking-[0.16em] font-mono leading-relaxed max-w-2xl uppercase">
            WEB DESIGNER, DIGITAL STRATEGIST, PRINCIPAL AT VXTGRID SERVICES, AND FOUNDER OF BUYFROMUDOCHUKWU.
          </p>
        </div>
      </section>

      {/* 2. BIOGRAPHY BAND (Deep Navy) */}
      <section className="bg-[#1b243b] py-16 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-4xl font-sans font-semibold text-white tracking-tight">
                  Biography
                </h2>
                <div className="w-full max-w-xl h-[1px] bg-white/80 my-5" />
              </div>

              <div className="space-y-5 text-white/85 font-sans text-sm sm:text-base leading-relaxed">
                <p>
                  Udochukwu is a web designer, systems engineer, and Founder of VXTGrid Services focused on building fast, dependable web platforms for ambitious organizations across Nigeria and Africa.
                </p>
                <p>
                  Rather than relying on heavy pre-made templates, his engineering approach emphasizes clean React and TypeScript architecture, mobile performance under everyday cellular data speeds, and clear user conversion journeys.
                </p>
                <p>
                  Alongside client engineering work, Udochukwu operates Buyfromudochukwu—a multi-category marketplace offering curated workstations, studio audio gear, office hardware, and backup power solutions with nationwide dispatch.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  id="about-cta-book"
                  className="border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white px-6 py-3.5 font-mono font-semibold tracking-[0.18em] text-xs uppercase transition-colors inline-flex items-center gap-2.5 cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Consultation</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('portfolio')}
                  id="about-cta-portfolio"
                  className="border border-white/40 bg-white/10 hover:bg-white hover:text-slate-950 text-white px-6 py-3.5 font-mono font-semibold tracking-[0.18em] text-xs uppercase transition-colors cursor-pointer"
                >
                  View Portfolio
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-white/20 bg-[#141a2b]/80 overflow-hidden">
                <div className="aspect-[4/5] bg-[#101522] overflow-hidden border-b border-white/15">
                  <img
                    src={aboutImageUrl}
                    alt="Udochukwu"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[11px] font-mono text-white/75 tracking-[0.18em] uppercase block">
                    Founder &amp; Digital Strategist
                  </span>
                  <p className="text-xl font-sans font-semibold text-white">Udochukwu</p>
                  <p className="text-xs font-mono text-white/75 tracking-wider uppercase leading-relaxed">
                    VXTGrid Services · Buyfromudochukwu · Nigeria &amp; Remote
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE PRINCIPLES BAND (Steel Blue Wash) */}
      <section className="bg-[#4a628d] py-16 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="mb-12">
            <h2 className="text-2xl sm:text-4xl font-sans font-semibold text-white tracking-tight">
              Operational Principles
            </h2>
            <div className="w-full max-w-2xl h-[1px] bg-white/80 my-5" />
            <p className="text-white/95 text-xs sm:text-sm tracking-[0.16em] font-mono uppercase">
              FOUR PILLARS GUIDING EVERY BUILD AND CUSTOMER DELIVERY.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  id={`value-card-${i}`}
                  className="bg-[#181d2c]/45 border border-white/25 p-6 sm:p-7 space-y-3"
                >
                  <div className="h-9 w-9 border border-white/30 bg-white/10 text-white flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-sans font-semibold text-white tracking-tight">
                    {v.title}
                  </h3>
                  <p className="text-white/85 text-xs sm:text-sm leading-relaxed font-sans">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. TIMELINE BAND (Slate Cyan Wash) */}
      <section className="bg-[#3b6e82] py-16 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="mb-12">
            <h2 className="text-2xl sm:text-4xl font-sans font-semibold text-white tracking-tight">
              Engineering &amp; Business Timeline
            </h2>
            <div className="w-full max-w-2xl h-[1px] bg-white/80 my-5" />
          </div>

          <div className="divide-y divide-white/20 border-t border-b border-white/20">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="py-6 sm:py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-start"
              >
                <div className="sm:col-span-3 font-mono">
                  <span className="inline-block border border-white px-3 py-1 text-xs font-bold tracking-[0.18em] text-white tabular-nums">
                    {m.year}
                  </span>
                  <span className="block text-[11px] uppercase tracking-[0.14em] text-white/80 mt-2">
                    {m.company}
                  </span>
                </div>
                <div className="sm:col-span-9 space-y-2">
                  <h3 className="text-lg sm:text-xl font-sans font-semibold text-white">
                    {m.title}
                  </h3>
                  <p className="text-white/85 text-sm leading-relaxed font-sans">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BOTTOM INQUIRY BAND (Periwinkle Indigo Wash — Matches Home Contact Strip) */}
      <section className="bg-[#485180] py-16">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-white tracking-tight">
              Work With Udochukwu
            </h2>
            <div className="w-40 h-[1px] bg-white/80 my-4" />
            <p className="text-white/90 text-xs sm:text-sm tracking-[0.16em] font-mono uppercase">
              CUSTOM WEB PLATFORMS · DIRECT HARDWARE MARKETPLACE
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="border border-white text-white hover:bg-white hover:text-slate-950 font-mono text-xs font-semibold uppercase tracking-[0.18em] px-6 py-3.5 transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            Contact Desk
          </button>
        </div>
      </section>
    </div>
  );
}
