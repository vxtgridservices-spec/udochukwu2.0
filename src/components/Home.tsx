import { useState, useEffect } from 'react';
import { PageView } from '../types';
import { getSiteSettings } from '../utils/storage';
import { GENERATED_ASSETS } from '../utils/generatedAssets';
import { ArrowRight, ShoppingBag } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageView) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [heroImageUrl, setHeroImageUrl] = useState(
    'https://res.cloudinary.com/drghjqbak/image/upload/q_auto/f_auto/v1781921383/20260620_030810_tod4tg.jpg'
  );
  const [aboutImageUrl, setAboutImageUrl] = useState(
    'https://res.cloudinary.com/drghjqbak/image/upload/q_auto/f_auto/v1781913441/1781783831624_3_a1uctp.jpg'
  );

  useEffect(() => {
    const settings = getSiteSettings();
    if (settings.heroImageUrl) setHeroImageUrl(settings.heroImageUrl);
    if (settings.aboutImageUrl) setAboutImageUrl(settings.aboutImageUrl);
  }, []);

  const scrollToOverview = () => {
    const target = document.getElementById('who-is-udochukwu');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('about');
    }
  };

  return (
    <div className="bg-[#181d2c] text-white">
      {/* 1. HERO BAND (Deep Navy Wash — InvestInMusk Style) */}
      <section className="relative min-h-[78vh] sm:min-h-[85vh] flex flex-col justify-center items-start bg-[#1b243b] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImageUrl}
            alt="Udochukwu"
            className="w-full h-full object-cover object-top opacity-70"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#1a2540]/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141c30]/85 via-[#1a2540]/45 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-28 text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold text-white tracking-tight">
            Udochukwu
          </h1>

          <div className="w-full max-w-2xl h-[1px] bg-white/80 my-6" />

          <p className="text-white text-xs sm:text-sm tracking-[0.18em] font-mono leading-relaxed max-w-2xl uppercase">
            OFFICIAL RESOURCE ABOUT UDOCHUKWU, VXTGRID SERVICES, AND THE BUYFROMUDOCHUKWU MARKETPLACE.
          </p>

          <p className="text-white/90 text-[11px] sm:text-xs tracking-[0.18em] font-mono uppercase mt-6">
            VXTGRID SERVICES · BUYFROMUDOCHUKWU · WEB DESIGN · NIGERIA &amp; REMOTE
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={scrollToOverview}
              className="border border-white text-white font-mono uppercase tracking-[0.18em] px-6 py-3 hover:bg-white hover:text-slate-950 transition-colors inline-flex items-center gap-4 cursor-pointer font-semibold text-xs whitespace-nowrap"
            >
              <span>LET&apos;S GO</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('buyfromudochukwu')}
              className="border border-white/40 bg-white/10 hover:bg-white hover:text-slate-950 text-white font-mono uppercase tracking-[0.16em] px-5 py-3 transition-colors inline-flex items-center gap-2.5 cursor-pointer font-semibold text-xs whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>BUYFROMUDOCHUKWU</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. WHO IS UDOCHUKWU (Teal Wash) */}
      <section
        id="who-is-udochukwu"
        onClick={() => onNavigate('about')}
        className="relative min-h-[42vh] flex flex-col justify-center items-start bg-[#3c7b8c] hover:brightness-105 transition-all cursor-pointer overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={aboutImageUrl}
            alt="Udochukwu Portrait"
            className="w-full h-full object-cover object-top opacity-25 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#2f6778]/55" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-16 text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold text-white tracking-tight">
            Who is Udochukwu
          </h2>
          <div className="w-full max-w-2xl h-[1px] bg-white/80 my-5" />
          <p className="text-white/95 text-xs sm:text-sm tracking-[0.16em] font-mono leading-relaxed max-w-2xl uppercase">
            A WEB DESIGNER AND DIGITAL STRATEGIST BUILDING CLEAN, RELIABLE WEB SYSTEMS AND HARDWARE COMMERCE FOR NIGERIAN BUSINESSES.
          </p>
        </div>
      </section>

      {/* 3. BUYFROMUDOCHUKWU MARKETPLACE (Warm Coral-Rose Wash — Marketplace Introduction) */}
      <section
        onClick={() => onNavigate('buyfromudochukwu')}
        className="relative min-h-[44vh] flex flex-col justify-center items-start bg-[#9e5356] hover:brightness-105 transition-all cursor-pointer overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={GENERATED_ASSETS.marketplaceHeroCollection}
            alt="Buyfromudochukwu Marketplace Collection"
            className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-[#8d4548]/55" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-16 text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold text-white tracking-tight">
            Buyfromudochukwu
          </h2>
          <div className="w-full max-w-2xl h-[1px] bg-white/80 my-5" />
          <p className="text-white/95 text-xs sm:text-sm tracking-[0.16em] font-mono leading-relaxed max-w-2xl uppercase">
            A PREMIUM MULTI-CATEGORY MARKETPLACE FOR VERIFIED TECH GEAR, WORKSTATIONS, POWER HARDWARE, AND SEASONAL DISCOUNT DEALS.
          </p>
        </div>
      </section>

      {/* 4. VXTGRID SERVICES (Warm Sand-Amber Wash — Zero AI Claims) */}
      <section
        onClick={() => onNavigate('services')}
        className="relative min-h-[42vh] flex flex-col justify-center items-start bg-[#8f6f47] hover:brightness-105 transition-all cursor-pointer overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={GENERATED_ASSETS.portfolioFintech}
            alt="Web Engineering Architecture"
            className="w-full h-full object-cover object-center opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-[#7f6039]/55" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-16 text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold text-white tracking-tight">
            VXTGrid Services
          </h2>
          <div className="w-full max-w-2xl h-[1px] bg-white/80 my-5" />
          <p className="text-white/95 text-xs sm:text-sm tracking-[0.16em] font-mono leading-relaxed max-w-2xl uppercase">
            CUSTOM REACT WEBSITES, MOBILE SPEED OPTIMIZATION, SEO FOUNDATIONS, AND CLEAN E-COMMERCE ARCHITECTURE.
          </p>
        </div>
      </section>

      {/* 5. PORTFOLIO & LIVE PROJECTS (Steel Blue Wash) */}
      <section
        onClick={() => onNavigate('portfolio')}
        className="relative min-h-[42vh] flex flex-col justify-center items-start bg-[#4a628d] hover:brightness-105 transition-all cursor-pointer overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={GENERATED_ASSETS.portfolioSecurity}
            alt="Live Client Systems"
            className="w-full h-full object-cover object-center opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-[#3d537b]/55" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-16 text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold text-white tracking-tight">
            Portfolio &amp; Live Systems
          </h2>
          <div className="w-full max-w-2xl h-[1px] bg-white/80 my-5" />
          <p className="text-white/95 text-xs sm:text-sm tracking-[0.16em] font-mono leading-relaxed max-w-2xl uppercase">
            TRUISPAY.CO · OMNIXMARKET.ONLINE · GLOBAL SENTINEL GROUP — ENGINEERED DIGITAL PLATFORMS BUILT FOR REAL BUSINESS USE.
          </p>
        </div>
      </section>

      {/* 6. LATEST ARTICLES (Slate-Cyan Wash) */}
      <section
        onClick={() => onNavigate('blog')}
        className="relative min-h-[40vh] flex flex-col justify-center items-start bg-[#3b6e82] hover:brightness-105 transition-all cursor-pointer overflow-hidden"
      >
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-16 text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold text-white tracking-tight">
            Udochukwu Latest Articles
          </h2>
          <div className="w-full max-w-2xl h-[1px] bg-white/80 my-5" />
          <p className="text-white/95 text-xs sm:text-sm tracking-[0.16em] font-mono leading-relaxed max-w-2xl uppercase">
            PRACTICAL NOTES ON WEBSITE LOADING SPEED, SEARCH VISIBILITY, AND STRUCTURING CLEAR BUSINESS PORTALS.
          </p>
        </div>
      </section>

      {/* 7. REVIEWS, AUDIT & LEARN (Muted Violet Wash) */}
      <section
        onClick={() => onNavigate('testimonials')}
        className="relative min-h-[40vh] flex flex-col justify-center items-start bg-[#52497a] hover:brightness-105 transition-all cursor-pointer overflow-hidden"
      >
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-16 text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold text-white tracking-tight">
            Client Reviews &amp; Audit
          </h2>
          <div className="w-full max-w-2xl h-[1px] bg-white/80 my-5" />
          <p className="text-white/95 text-xs sm:text-sm tracking-[0.16em] font-mono leading-relaxed max-w-2xl uppercase">
            READ REAL CLIENT FEEDBACK, SHARE YOUR EXPERIENCE, OR REQUEST A FREE WEBSITE PERFORMANCE AUDIT.
          </p>
          <div
            className="mt-6 flex flex-wrap gap-6 text-xs font-mono uppercase tracking-[0.16em] text-white/90"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => onNavigate('testimonials')}
              className="underline underline-offset-4 hover:text-white cursor-pointer"
            >
              Client Reviews
            </button>
            <button
              type="button"
              onClick={() => onNavigate('audit')}
              className="underline underline-offset-4 hover:text-white cursor-pointer"
            >
              Website Audit
            </button>
            <button
              type="button"
              onClick={() => onNavigate('learn')}
              className="underline underline-offset-4 hover:text-white cursor-pointer"
            >
              Learn Hub
            </button>
            <button
              type="button"
              onClick={() => onNavigate('faq')}
              className="underline underline-offset-4 hover:text-white cursor-pointer"
            >
              FAQs
            </button>
          </div>
        </div>
      </section>

      {/* 8. CONTACT / INQUIRIES (Periwinkle Slate Wash — Matching InvestInMusk Bottom Block) */}
      <section
        onClick={() => onNavigate('contact')}
        className="relative min-h-[36vh] flex flex-col justify-center items-start bg-[#485180] hover:brightness-105 transition-all cursor-pointer overflow-hidden"
      >
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-16 text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-semibold text-white tracking-tight">
            Contact / Inquiries
          </h2>
          <div className="w-48 h-[1px] bg-white/80 my-5" />
          <p className="text-white/95 text-xs sm:text-sm tracking-[0.18em] font-mono uppercase">
            HELLO@UDOCHUKWU.COM.NG · +234 705 219 9651
          </p>
        </div>
      </section>
    </div>
  );
}
