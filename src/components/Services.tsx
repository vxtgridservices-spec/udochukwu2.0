import { useState } from 'react';
import { PRELOADED_SERVICES } from '../utils/storage';
import { useCurrency } from '../context/CurrencyContext';
import { GENERATED_ASSETS } from '../utils/generatedAssets';
import {
  Building2,
  UtensilsCrossed,
  Hotel,
  Landmark,
  BookOpen,
  HeartPulse,
  Hammer,
  Tag,
  Store,
  Cpu,
  Scale,
  MoveRight,
} from 'lucide-react';

interface ServicesProps {
  onNavigate: (page: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const { convertNairaString } = useCurrency();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('Hotels');

  const extraServices = [
    {
      title: 'Website Speed Tuning',
      desc: 'Remove bloated plugin overhead, compress media assets, and configure clean static bundling for crisp mobile loading.',
    },
    {
      title: 'SEO Optimization',
      desc: 'Structured Schema markup, clean semantic headings, Search Console readiness, and regional keyword architecture.',
    },
    {
      title: 'Brand Identity Strategy',
      desc: 'Cohesive visual systems, clear typography pairings, and consistent digital presentation guidelines.',
    },
    {
      title: 'Website Maintenance & Security SLA',
      desc: 'Scheduled backups, dependency updates, uptime checks, and ongoing technical support.',
    },
    {
      title: 'Technical Product Consultation',
      desc: 'One-on-one architecture reviews of existing web funnels, checkout UX, and lead capture workflows.',
    },
  ];

  const industries = [
    {
      name: 'Hotels',
      icon: Hotel,
      tagline: 'Direct Guest Reservations',
      challenge:
        'Relying solely on third-party booking aggregators cuts into room margins while slow mobile galleries frustrate direct visitors.',
      strategy:
        'Clean direct booking workflows synced with instant confirmation messages and lightweight room photo galleries.',
    },
    {
      name: 'Real Estate',
      icon: Building2,
      tagline: 'Credible Property Portfolios',
      challenge:
        'Sending messy chat links and heavy unformatted brochures weakens trust with serious local and diaspora buyers.',
      strategy:
        'Structured property catalog pages with neighborhood filters, clear payment breakdowns, and direct inspection forms.',
    },
    {
      name: 'Restaurants',
      icon: UtensilsCrossed,
      tagline: 'Fast Mobile Menus & Table Requests',
      challenge:
        'Heavy PDF menus are hard to read on phones and delay customer ordering decisions.',
      strategy:
        'Lightweight, readable web menus, quick table reservation forms, and direct WhatsApp ordering integration.',
    },
    {
      name: 'Schools',
      icon: BookOpen,
      tagline: 'Clear Admissions Hubs',
      challenge:
        'Parents struggle to locate fee guidelines, academic calendars, and broken enrollment forms.',
      strategy:
        'Organized admissions portals featuring clear program tracks, downloadable guides, and working inquiry forms.',
    },
    {
      name: 'Churches',
      icon: Landmark,
      tagline: 'Media Archives & Giving Portals',
      challenge:
        'Scattered sermon links and confusing online giving flows make it difficult for members to stay connected.',
      strategy:
        'Clean media libraries, service schedules, and straightforward local and international support channels.',
    },
    {
      name: 'Healthcare',
      icon: HeartPulse,
      tagline: 'Patient Scheduling & Department Guides',
      challenge:
        'Manual phone coordination creates reception bottlenecks and missed patient follow-ups.',
      strategy:
        'Structured appointment intake forms, clear specialist directories, and mobile-friendly clinic directions.',
    },
    {
      name: 'Law Firms',
      icon: Scale,
      tagline: 'Authoritative Practice Portals',
      challenge:
        'Dated template websites fail to reflect partner pedigree and practice area specialization.',
      strategy:
        'Disciplined editorial layouts highlighting practice areas, partner profiles, and confidential consultation intake.',
    },
    {
      name: 'Construction',
      icon: Hammer,
      tagline: 'Project Documentation & Tender Readiness',
      challenge:
        'Missing project documentation makes corporate and public procurement reviews harder to win.',
      strategy:
        'Structured project case logs, technical capability briefs, and clean corporate contact specifications.',
    },
    {
      name: 'Fashion Brands',
      icon: Tag,
      tagline: 'Editorial Lookbooks & E-Commerce',
      challenge:
        'Generic store themes flatten brand positioning and slow down product browsing on mobile.',
      strategy:
        'High-contrast product presentation, organized sizing/variant selection, and streamlined order checkout.',
    },
    {
      name: 'Small Businesses',
      icon: Store,
      tagline: 'Dependable Local Discovery',
      challenge:
        'Customers searching locally cannot verify offerings, pricing, or active contact channels quickly.',
      strategy:
        'Focused local landing pages, verified contact details, and instant WhatsApp inquiry buttons.',
    },
    {
      name: 'Tech Startups',
      icon: Cpu,
      tagline: 'Product Clarity & Waitlist Flows',
      challenge:
        'Overcomplicated landing copy confuses visitors instead of clearly explaining what the product does.',
      strategy:
        'Sharp React product pages, clear feature breakdowns, and responsive onboarding waitlists.',
    },
  ];

  const activeIndustryObj =
    industries.find((ind) => ind.name === selectedIndustry) || industries[0];
  const ActiveIndIcon = activeIndustryObj.icon;

  const packageTints = ['bg-[#1b243b]', 'bg-[#3c7b8c]', 'bg-[#4a628d]', 'bg-[#3b6e82]'];

  return (
    <div className="bg-[#181d2c] text-white">
      {/* 1. HERO BAND (Warm Sand-Amber Wash — Matches Home Services Section) */}
      <section className="relative min-h-[50vh] flex flex-col justify-center items-start bg-[#8f6f47] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={GENERATED_ASSETS.portfolioFintech}
            alt="Web Engineering Architecture"
            className="w-full h-full object-cover object-center opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-[#7f6039]/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#5e4628]/85 via-[#7f6039]/45 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-20 text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold text-white tracking-tight">
            VXTGrid Services
          </h1>
          <div className="w-full max-w-2xl h-[1px] bg-white/80 my-6" />
          <p className="text-white/95 text-xs sm:text-sm tracking-[0.16em] font-mono leading-relaxed max-w-2xl uppercase">
            CUSTOM REACT WEBSITES, MOBILE SPEED OPTIMIZATION, SEO FOUNDATIONS, AND CLEAN E-COMMERCE ARCHITECTURE.
          </p>
        </div>
      </section>

      {/* 2. SERVICE PACKAGES BANDS */}
      <div className="w-full flex flex-col">
        {PRELOADED_SERVICES.map((p, idx) => (
          <section
            key={p.id}
            id={`service-pkg-row-${idx}`}
            className={`relative py-16 sm:py-24 overflow-hidden ${packageTints[idx % packageTints.length]}`}
          >
            <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 text-left">
              {idx === 0 && (
                <span className="inline-block text-white/90 text-xs font-mono tracking-[0.18em] uppercase mb-3">
                  Core Engineering Track
                </span>
              )}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold text-white tracking-tight">
                {p.name}
              </h2>
              <div className="w-full max-w-2xl h-[1px] bg-white/80 my-5" />
              <p className="text-white/90 text-xs sm:text-sm tracking-[0.14em] font-mono leading-relaxed max-w-3xl uppercase mb-10">
                {p.tagline}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
                <div className="bg-[#141a2b]/50 border border-white/20 p-6 space-y-4">
                  <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-[0.18em] border-b border-white/20 pb-2">
                    Core Outcomes
                  </h3>
                  <ul className="space-y-3">
                    {p.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-white/85 font-sans">
                        <span className="font-mono font-bold text-white shrink-0 tabular-nums">
                          {(bIdx + 1).toString().padStart(2, '0')}.
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#141a2b]/50 border border-white/20 p-6 space-y-4">
                  <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-[0.18em] border-b border-white/20 pb-2">
                    Included Deliverables
                  </h3>
                  <ul className="space-y-3">
                    {p.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex gap-3 items-start text-xs sm:text-sm text-white/85 font-sans">
                        <span className="font-mono font-bold text-white/75 shrink-0">—</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="border border-white text-white font-mono uppercase tracking-[0.18em] px-6 py-3.5 hover:bg-white hover:text-slate-950 transition-colors inline-flex items-center gap-3 cursor-pointer font-semibold text-xs"
                >
                  <span>Start This Package</span>
                  <MoveRight className="w-4 h-4" />
                </button>
                <div className="flex flex-wrap gap-6 text-xs font-mono text-white/85 uppercase tracking-wider">
                  <span>
                    Timeline: <strong className="text-white">{p.timeline}</strong>
                  </span>
                  {p.priceRange && (
                    <span>
                      Starting At:{' '}
                      <strong className="text-white tabular-nums">
                        {convertNairaString(p.priceRange)}
                      </strong>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* 3. SECTOR BLUEPRINTS (Muted Violet Wash) */}
      <section className="bg-[#52497a] py-16 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 text-left">
          <h2 className="text-3xl sm:text-4xl font-sans font-semibold text-white tracking-tight">
            Sector Blueprints
          </h2>
          <div className="w-full max-w-2xl h-[1px] bg-white/80 my-5" />

          <div className="flex flex-wrap gap-2 mb-8">
            {industries.map((ind) => (
              <button
                key={ind.name}
                type="button"
                onClick={() => setSelectedIndustry(ind.name)}
                className={`py-2.5 px-4 text-xs font-mono font-semibold uppercase transition-colors tracking-[0.14em] border cursor-pointer whitespace-nowrap ${
                  selectedIndustry === ind.name
                    ? 'bg-white text-slate-950 border-white'
                    : 'border-white/25 bg-[#141a2b]/45 text-white/85 hover:border-white hover:text-white'
                }`}
              >
                {ind.name}
              </button>
            ))}
          </div>

          <div className="bg-[#141a2b]/75 p-6 sm:p-10 border border-white/25 text-white max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-white/10 border border-white/25 text-white">
                <ActiveIndIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-sans font-semibold tracking-tight">
                  {activeIndustryObj.name}: {activeIndustryObj.tagline}
                </h3>
                <p className="text-white/75 text-xs font-mono tracking-[0.16em] uppercase mt-0.5">
                  Engineering Approach
                </p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/25 my-5" />

            <div className="space-y-5 text-sm leading-relaxed text-white/85 font-sans">
              <div>
                <strong className="text-white font-mono text-xs uppercase block mb-1.5 tracking-[0.16em]">
                  Common Bottleneck
                </strong>
                {activeIndustryObj.challenge}
              </div>
              <div>
                <strong className="text-white font-mono text-xs uppercase block mb-1.5 tracking-[0.16em]">
                  Recommended System
                </strong>
                {activeIndustryObj.strategy}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ADDITIONAL SERVICES (Periwinkle Indigo Wash) */}
      <section className="bg-[#485180] py-16 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 text-left">
          <h2 className="text-3xl sm:text-4xl font-sans font-semibold text-white tracking-tight">
            Additional Services
          </h2>
          <div className="w-full max-w-2xl h-[1px] bg-white/80 my-5" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {extraServices.map((x, idx) => (
              <div key={idx} className="border border-white/25 bg-[#141a2b]/50 p-6 space-y-2">
                <h3 className="text-white font-sans font-semibold text-lg">{x.title}</h3>
                <p className="text-white/85 text-sm font-sans leading-relaxed">{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
