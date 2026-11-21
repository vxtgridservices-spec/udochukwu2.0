import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageView } from '../types';
import { getBlogs, PRELOADED_SERVICES, getMarketplaceProducts } from '../utils/storage';
import { useSettings } from '../context/ThemeContext';
import { Search, MessageSquare, ArrowUp, X, Menu } from 'lucide-react';
import ItelFlashSaleBannerAd from './ItelFlashSaleBannerAd';

interface LayoutProps {
  children: React.ReactNode;
  activePage: PageView;
  onNavigate: (page: PageView) => void;
}

export default function Layout({ children, activePage, onNavigate }: LayoutProps) {
  const { isWhatsAppEnabled } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const blogsList = getBlogs();
  const productsList = getMarketplaceProducts();

  useEffect(() => {
    const handlePageScrolling = () => {
      const scrolled = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrolled / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowScrollTop(scrolled > 350);
      setHasScrolled(scrolled > 24);
    };

    window.addEventListener('scroll', handlePageScrolling, { passive: true });
    return () => window.removeEventListener('scroll', handlePageScrolling);
  }, []);

  useEffect(() => {
    const metaTitles: Record<PageView, string> = {
      home: 'Udochukwu — Official Website & Buyfromudochukwu',
      about: 'Who is Udochukwu | Biography & Background',
      portfolio: 'Portfolio & Live Systems | Udochukwu',
      services: 'VXTGrid Services & Solutions | Udochukwu',
      industries: 'Sector Blueprints | Udochukwu',
      testimonials: 'Client Reviews | Udochukwu',
      audit: 'Free Technical Website Audit | Udochukwu',
      blog: 'Latest Articles & Field Notes | Udochukwu',
      resources: 'Free Checklists & Guides | Udochukwu',
      faq: 'Frequently Asked Questions | Udochukwu',
      contact: 'Contact & Inquiries | Udochukwu',
      dashboard: 'Admin Dashboard | Udochukwu',
      learn: 'Learn With Udochukwu',
      calculator: 'Revenue Scenario Estimator | Udochukwu',
      buyfromudochukwu: 'Buyfromudochukwu — Curated Multi-Category Marketplace',
    };

    const metaDescriptions: Record<PageView, string> = {
      home: 'Official platform of Udochukwu — custom web engineering, VXTGrid Services, and the Buyfromudochukwu curated marketplace.',
      about: 'Biography and background of Udochukwu, web designer and digital strategist.',
      portfolio: 'Live web platforms built by Udochukwu including Truispay, OmnixMarket, and Global Sentinel Group.',
      services: 'Custom React engineering, speed tuning, and SEO services.',
      industries: 'Sector blueprints for hospitality, real estate, clinics, schools, and local commerce.',
      testimonials: 'Client reviews submitted directly by customers and business partners.',
      audit: 'Request a hands-on website speed and technical SEO review.',
      blog: 'Practical articles on website performance, local search, and clear design.',
      resources: 'Download planning templates and launch checklists.',
      faq: 'Clear answers about web engineering and Buyfromudochukwu marketplace policies.',
      contact: 'Contact Udochukwu directly or schedule a strategy session.',
      dashboard: 'Admin operations portal for Buyfromudochukwu inventory, orders, leads, and content.',
      learn: 'Structured frontend engineering curriculum and modules.',
      calculator: 'Interactive scenario estimator based on traffic and conversion inputs.',
      buyfromudochukwu: 'Buyfromudochukwu — a multi-category marketplace for tech gear, workstations, power hardware, seasonal discount deals, and transparent buyer policies.',
    };

    document.title = metaTitles[activePage] || 'Udochukwu';

    const metaDescriptionEl = document.querySelector('meta[name="description"]');
    if (metaDescriptionEl) {
      metaDescriptionEl.setAttribute('content', metaDescriptions[activePage]);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = metaDescriptions[activePage];
      document.head.appendChild(meta);
    }

    const schemaJSON = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Udochukwu',
      jobTitle: 'Web Designer & Digital Strategist',
      worksFor: {
        '@type': 'Organization',
        name: 'VXTGrid Services',
      },
      url: window.location.href,
    };

    let schemaScript = document.getElementById('vxt-schema-json');
    if (schemaScript) {
      schemaScript.innerHTML = JSON.stringify(schemaJSON);
    } else {
      const script = document.createElement('script');
      script.id = 'vxt-schema-json';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schemaJSON);
      document.head.appendChild(script);
    }
  }, [activePage]);

  const filteredSearchItems =
    searchQuery.trim() === ''
      ? []
      : [
          ...productsList
            .filter(
              (p) =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((p) => ({
              type: 'Buyfromudochukwu',
              title: p.title,
              page: 'buyfromudochukwu' as const,
              details: `₦${p.price.toLocaleString()} — ${p.subtitle}`,
            })),
          ...blogsList
            .filter((b) => b.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((b) => ({
              type: 'Article',
              title: b.title,
              page: 'blog' as const,
              details: b.excerpt,
            })),
          ...PRELOADED_SERVICES.filter((s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((s) => ({
            type: 'Service',
            title: s.name,
            page: 'services' as const,
            details: s.tagline,
          })),
        ];

  const isHome = activePage === 'home';

  const desktopNavLinks: { label: string; view: PageView }[] = [
    { label: 'Buyfromudochukwu', view: 'buyfromudochukwu' },
    { label: 'About', view: 'about' },
    { label: 'Portfolio', view: 'portfolio' },
    { label: 'Services', view: 'services' },
    { label: 'Blog', view: 'blog' },
    { label: 'Contact', view: 'contact' },
  ];

  const directoryLinks: { label: string; view: PageView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Buyfromudochukwu', view: 'buyfromudochukwu' },
    { label: 'Who is Udochukwu', view: 'about' },
    { label: 'Portfolio & Systems', view: 'portfolio' },
    { label: 'Services', view: 'services' },
    { label: 'Latest Articles', view: 'blog' },
    { label: 'Client Reviews', view: 'testimonials' },
    { label: 'Technical Audit', view: 'audit' },
    { label: 'Learn', view: 'learn' },
    { label: 'Resources', view: 'resources' },
    { label: 'FAQs', view: 'faq' },
    { label: 'Contact', view: 'contact' },
    { label: 'Admin Dashboard', view: 'dashboard' },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#181d2c] text-slate-100 font-sans flex flex-col justify-between transition-colors duration-300">
      {/* Subtle Top Scroll Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-white/80 z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* CLEAN PLAIN HEADER (InvestInMusk Style) */}
      <header
        className={`z-40 transition-all duration-300 ${
          isHome
            ? hasScrolled
              ? 'fixed top-0 left-0 w-full bg-[#181d2c]/90 backdrop-blur-md border-b border-white/10'
              : 'absolute top-0 left-0 w-full bg-transparent'
            : 'sticky top-0 bg-[#181d2c]/95 backdrop-blur-md border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 gap-8">
            {/* Boxed Wordmark Badge */}
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="cursor-pointer select-none shrink-0 text-left"
              id="header-logo-brand"
            >
              <span className="inline-block px-3 py-1 text-[11px] font-mono font-bold tracking-[0.22em] uppercase bg-white text-slate-950 whitespace-nowrap">
                UDOCHUKWU
              </span>
            </button>

            {/* Clean Text Navigation */}
            <nav className="hidden lg:flex items-center gap-7 text-[11px]">
              {desktopNavLinks.map((link) => (
                <button
                  key={link.view}
                  type="button"
                  onClick={() => onNavigate(link.view)}
                  id={`nav-link-${link.view}`}
                  className={`py-1 cursor-pointer transition-colors relative font-mono font-medium uppercase tracking-[0.16em] whitespace-nowrap shrink-0 ${
                    activePage === link.view
                      ? 'text-white'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {activePage === link.view && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white" />
                  )}
                </button>
              ))}
            </nav>

            {/* Quiet Action Controls + Menu Drawer Trigger */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                title="Search platform"
                className="p-2 transition-colors cursor-pointer text-white/75 hover:text-white"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                title="Open navigation menu"
                id="mobile-drawer-trigger-btn"
                className="p-2 cursor-pointer transition-colors text-white hover:bg-white/10"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* SLIDE-OVER NAVIGATION DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs z-50 flex justify-end"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.22 }}
              className="bg-[#181d2c] text-slate-100 w-full max-w-sm h-full p-8 flex flex-col justify-between shadow-2xl relative border-l border-white/10"
            >
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                id="mobile-drawer-close"
                className="absolute top-6 right-6 p-2 border border-white/15 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6 mt-10 overflow-y-auto pr-2">
                <span className="inline-block px-3 py-1 text-[10px] font-mono font-bold tracking-[0.22em] uppercase bg-white text-slate-950">
                  UDOCHUKWU
                </span>

                <nav className="flex flex-col">
                  {directoryLinks.map((x) => (
                    <button
                      key={x.view}
                      type="button"
                      onClick={() => {
                        onNavigate(x.view);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-left hover:text-white transition-colors cursor-pointer py-3 border-b border-white/10 font-mono text-xs uppercase tracking-[0.16em] ${
                        activePage === x.view ? 'text-white font-bold' : 'text-slate-300'
                      }`}
                    >
                      {x.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-white/10 font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                © Udochukwu.com.ng
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className="grow">{children}</main>

      {/* SITEWIDE NON-BLOCKING ITEL FLASH SALE AD FLYER */}
      <ItelFlashSaleBannerAd activePage={activePage} onNavigate={onNavigate} />

      {/* FLOATING WHATSAPP & BACK TO TOP */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {showScrollTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Back to top"
            id="backt-to-top-arrow-btn"
            className="bg-slate-900 hover:bg-slate-800 text-white p-2.5 rounded-full shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center cursor-pointer border border-white/20"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {isWhatsAppEnabled && (
          <a
            href="https://wa.me/2347052199651?text=Hello%20Udochukwu%2C%20I%20am%20visiting%20your%20website%20and%20would%20like%20to%20inquire."
            target="_blank"
            rel="noreferrer"
            title="Message on WhatsApp"
            id="whatsapp-sticky-icon-button"
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-xl transition-transform hover:scale-105 flex items-center justify-center cursor-pointer"
          >
            <MessageSquare className="w-5 h-5 text-white" />
          </a>
        )}
      </div>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-6"
          >
            <button
              type="button"
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery('');
              }}
              id="search-overlay-exit"
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 border border-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full max-w-2xl space-y-6">
              <div className="text-center space-y-2">
                <p className="text-2xl font-sans font-semibold text-white">Quick Search</p>
              </div>

              <input
                type="text"
                autoFocus
                placeholder="Search Buyfromudochukwu, services, or articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 px-5 py-4 text-white text-sm sm:text-base focus:border-white focus:outline-hidden"
              />

              <div className="max-h-72 overflow-y-auto space-y-2">
                {searchQuery.trim() !== '' && filteredSearchItems.length === 0 && (
                  <p className="text-slate-400 text-xs text-center font-mono py-4">
                    No matching items found.
                  </p>
                )}
                {filteredSearchItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      onNavigate(item.page);
                      setSearchOpen(false);
                      setSearchQuery('');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                    className="bg-slate-900 p-4 border border-slate-800 hover:border-white cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase">
                      <span>{item.type}</span>
                      <span>/{item.page}</span>
                    </div>
                    <h4 className="text-white text-sm font-medium mt-1">{item.title}</h4>
                    <p className="text-slate-400 text-xs mt-1 truncate">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ELONMUSK-STYLE MINIMAL FOOTER */}
      <footer className="bg-[#23283d] text-slate-300 py-8 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-center gap-4 text-xs font-sans tracking-wide">
          <span>© Udochukwu.com.ng</span>
          <span className="text-white/25" aria-hidden="true">
            ·
          </span>
          <button
            type="button"
            onClick={() => {
              onNavigate('dashboard');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Open Admin Dashboard"
          >
            Admin
          </button>
        </div>
      </footer>
    </div>
  );
}
