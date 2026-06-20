import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageView } from '../types';
import { getBlogs, PRELOADED_SERVICES } from '../utils/storage';
import { useSettings } from '../context/ThemeContext';
import { 
  Sun, 
  Moon, 
  Search, 
  MessageSquare, 
  ArrowUp, 
  X, 
  ChevronRight, 
  Cookie, 
  Sparkles, 
  Menu, 
  FileText,
  Globe
} from 'lucide-react';


interface LayoutProps {
  children: React.ReactNode;
  activePage: PageView;
  onNavigate: (page: PageView) => void;
}

export default function Layout({ 
  children, 
  activePage, 
  onNavigate 
}: LayoutProps) {
  const { theme, toggleTheme, isWhatsAppEnabled } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  
  // Custom scroll states
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Cookie Consent state
  const [showCookieAlert, setShowCookieAlert] = useState(() => {
    return localStorage.getItem('vxt_cookie_agree') !== 'true';
  });

  // Global search overlays state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const blogsList = getBlogs();

  // Track page scrolling
  useEffect(() => {
    const handlePageScrolling = () => {
      const scrolled = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrolled / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowScrollTop(scrolled > 300);
      setHasScrolled(scrolled > 20);
    };

    window.addEventListener('scroll', handlePageScrolling);
    return () => window.removeEventListener('scroll', handlePageScrolling);
  }, []);

  // Sync SEO Strategy & Document metadata on active View change
  useEffect(() => {
    const metaTitles: Record<PageView, string> = {
      home: 'Websites That Help Businesses Win More Customers | Udochukwu',
      about: 'My Story, Strategy & Personal Philosophy | Udochukwu',
      portfolio: 'High ROI Web Engineering Case Studies | Udochukwu',
      services: 'Premium Packages & Strategic Solutions | Udochukwu',
      industries: 'Bespoke Sectors blueprints catalog | Udochukwu',
      testimonials: 'Verified Client Results & Google Reviews | Udochukwu',
      audit: 'Free Local Website Audit & Speed Checkup | Udochukwu',
      blog: 'High-Traction Web Design & Business Strategy Blog | Udochukwu',
      resources: 'Free Planners, Launch Checklists & Guides | Udochukwu',
      faq: 'Resolving Objections & SLA Support Pricing | Udochukwu',
      contact: 'Book a Consultation / Drop a Line | Udochukwu',
      dashboard: 'Interactive Client Transparencies Milestones Portal | Udochukwu',
      learn: 'Masterclass Hub: Learn Web Engineering & Strategy | Udochukwu',
      calculator: 'Advanced Revenue Projection Engine & Estimator | Udochukwu'
    };

    const metaDescriptions: Record<PageView, string> = {
      home: 'Udochukwu helps African hospitality, real-estate developers, private clinics & legal firms command high trust & acquire clients using React layouts and localized SEO.',
      about: 'A veteran digital strategist in Lagos. Read why I skip slow pre-made WordPress templates to hand-code ultra-fast customer acquisitions portals.',
      portfolio: 'See the numbers: slashed Booking.com commission rates, increased inbound lead captures, and high-converting real estate catalogs.',
      services: 'Premium digital systems starting at ₦850k. Explore fully custom architectures, speed tuning SLAs, and logo stylesheets guidelines.',
      industries: 'Bespoke web layouts and strategy parameters for Hotels, Restaurants, Schools, law firms, and tech SaaS firms in West Africa.',
      testimonials: 'Sincere corporate feedback from Managing Directors, clinic administrators, and diaspora investors praising our lightweight systems.',
      audit: 'Let’s perform local performance crawls. Check DNS latency over Airtel/MTN nodes and claim a detailed optimization diagnostic checklist.',
      blog: 'Actionable blueprints covering speed performance rules, local schema structures, pricing mastery, and SEO optimization targets.',
      resources: 'Download editable planning spreadsheets, sitemaps diagrams, and technical checklist logs designed personally by Udochukwu.',
      faq: 'Pricing benchmarks, timelines, CMS autonomies, and safety protocol updates. Find clear transparent answers to major objections.',
      contact: 'Reserve a brief exploratory Zoom slot or message Udochukwu directly. Get immediate feedback on web planning pipelines.',
      dashboard: 'VIP login access to upload resources files, print formal invoicing receipts, and audit live timeline developments.',
      learn: 'Free masterclass content on React layout components, high-speed CSS strategies, and client-acquisition conversion-trigger blueprints.',
      calculator: 'Calculate and model VXT production system ROI pipeline enhancements based on customizable organic visitors traffic and category values.'
    };

    // Update document head details
    document.title = metaTitles[activePage] || 'Udochukwu - Premium Personal Brand';
    
    // Attempt updating meta description element
    let metaDescriptionEl = document.querySelector('meta[name="description"]');
    if (metaDescriptionEl) {
      metaDescriptionEl.setAttribute('content', metaDescriptions[activePage]);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = metaDescriptions[activePage];
      document.head.appendChild(meta);
    }

    // Embed simulated Schema Markup parameters
    const schemaJSON = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Udochukwu",
      "jobTitle": "Lead Digital Strategist & Founder",
      "worksFor": {
        "@type": "Organization",
        "name": "VXTGrid Services"
      },
      "url": window.location.href,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lekki Phase 1",
        "addressRegion": "Lagos",
        "addressCountry": "NG"
      }
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

  // Handle Cookie Agree Close
  const handleAgreeCookie = () => {
    localStorage.setItem('vxt_cookie_agree', 'true');
    setShowCookieAlert(false);
  };

  // Live filter Search query
  const filteredSearchItems = searchQuery.trim() === '' ? [] : [
    ...blogsList.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase())).map(b => ({ type: 'Article', title: b.title, page: 'blog' as const, details: b.excerpt })),
    ...PRELOADED_SERVICES.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map(s => ({ type: 'Service Package', title: s.name, page: 'services' as const, details: s.tagline })),
    { type: 'Tool', title: 'Free Website Performance Audit', page: 'audit' as const, details: 'Analyze your active domain speed leaks' }
  ];

  const isHome = activePage === 'home';

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col justify-between transition-colors duration-300">
      
      {/* 1. SCROLLING PROGRESS SLIDER */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* 2. STICKY GLASSMORPHIC HEADER */}
      <header className={`z-40 transition-all duration-300 ${
        isHome 
          ? (hasScrolled 
              ? 'fixed top-0 left-0 w-full bg-[#141722]/90 backdrop-blur-md border-b border-white/10 shadow-md' 
              : 'absolute top-0 left-0 w-full bg-transparent border-b-0 shadow-none'
            ) 
          : 'sticky top-0 bg-[#141722]/75 backdrop-blur-md border-b border-white/10 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-14 md:h-16">
            
            {/* BRAND LOGO DESIGN (Minimal Badge in Elon Style) */}
            <div 
              onClick={() => { onNavigate('home'); }} 
              className="cursor-pointer group select-none"
              id="header-logo-brand"
            >
              <div className={`px-3 py-1 text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase transition-colors whitespace-nowrap ${
                isHome 
                  ? 'bg-white text-slate-950 border border-white' 
                  : 'bg-white text-slate-950 border border-white'
              }`}>
                UDOCHUKWU
              </div>
            </div>

            {/* DESKTOP NAVIGATION ROW */}
            <nav className="hidden md:flex items-center gap-6 text-[10px] sm:text-xs">
              {[
                { label: 'Case Studies', view: 'portfolio' },
                { label: 'Services', view: 'services' },
                { label: 'Diagnostic Audit', view: 'audit' },
                { label: 'Masterclass Blog', view: 'blog' },
                { label: 'Resources', view: 'resources' },
                { label: 'Learn Hub', view: 'learn' }
              ].map((link) => (
                <button
                  key={link.view}
                  onClick={() => onNavigate(link.view as PageView)}
                  id={`nav-link-${link.view}`}
                  className={`py-1 cursor-pointer transition-colors relative font-mono font-bold uppercase tracking-widest text-slate-400 hover:text-white ${
                    activePage === link.view ? 'text-white font-extrabold' : ''
                  }`}
                >
                  <span>{link.label}</span>
                  {activePage === link.view && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] rounded-none bg-white"></span>
                  )}
                </button>
              ))}
            </nav>

            {/* ACTION DOCK */}
            <div className="flex items-center gap-3 md:gap-4">
              
              {/* Day/Night Toggler */}
              <button
                onClick={toggleTheme}
                title={theme === 'dark' ? "Switch to High-Contrast Light Mode" : "Switch to Immersive Night Mode"}
                id="darkmode-header-toggle"
                className="p-2 rounded-none transition-all cursor-pointer text-slate-400 hover:text-white hover:bg-white/5"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-white" />}
              </button>

              {/* Free Consult Call to action (High Converting CTA) */}
              <button
                onClick={() => onNavigate('contact')}
                id="header-consultation-register"
                className="hidden sm:inline-flex text-[10px] tracking-[0.2em] font-mono font-bold uppercase cursor-pointer transition-all border border-white text-white px-5 py-2.5 hover:bg-white hover:text-slate-950 rounded-none bg-transparent"
              >
                Consultation
              </button>

              {/* Mobile side-bar Menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                title="Expand side menu..."
                id="mobile-drawer-trigger-btn"
                className="inline-flex lg:hidden p-2 rounded-none cursor-pointer transition-colors text-slate-300 hover:text-white hover:bg-white/5"
              >
                <Menu className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* 3. MOBILE SYSTEM OVERLAY MENU / DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-50 flex justify-end lg:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="bg-[#131620] text-slate-100 w-full max-w-sm h-full p-8 flex flex-col justify-between shadow-2xl relative border-l border-white/10 rounded-none"
            >
              
              {/* Close button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                id="mobile-drawer-close"
                className="absolute top-6 right-6 p-2 rounded-none border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Links List */}
              <div className="space-y-8 mt-12 overflow-y-auto pr-2">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-blue-400 font-extrabold uppercase tracking-[0.25em] block">NAVIGATIONAL DIRECTORY</span>
                  <p className="text-xl font-serif text-white leading-none font-black uppercase tracking-wider">Portal Directory</p>
                </div>

                <nav className="flex flex-col gap-1 text-xs">
                  {[
                    { label: 'Home Page', view: 'home' },
                    { label: 'Case Studies', view: 'portfolio' },
                    { label: 'About & Story', view: 'about' },
                    { label: 'Services Packages', view: 'services' },
                    { label: 'Performance Audit', view: 'audit' },
                    { label: 'Masterclass Blog', view: 'blog' },
                    { label: 'Planning Vault', view: 'resources' },
                    { label: 'Learn Hub', view: 'learn' },
                    { label: 'Frequently Asked FAQs', view: 'faq' },
                    { label: 'Book Consultation', view: 'contact' }
                  ].map((x) => (
                    <button
                      key={x.view}
                      onClick={() => {
                        onNavigate(x.view as PageView);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-left hover:text-white transition-all flex items-center justify-between cursor-pointer py-4 border-b border-white/5 font-mono text-[11px] uppercase tracking-[0.15em] font-extrabold ${
                        activePage === x.view ? 'text-white font-black' : 'text-slate-400'
                      }`}
                    >
                      <span className="relative">
                        {x.label}
                        {activePage === x.view && (
                          <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white"></span>
                        )}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
                    </button>
                  ))}
                </nav>
              </div>

              {/* Drawer Footer info */}
              <div className="pt-6 border-t border-white/10 font-mono text-[9px] text-slate-500 uppercase tracking-widest leading-relaxed">
                VXTGrid Services • Registered under RC-1925048 • Africa
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. MAIN PAGE CONTAINER WORKSTATION */}
      <main className="grow">
        {children}
      </main>

      {/* 5. HIGH STATUS COOKIE CONSENT ALERT */}
      <AnimatePresence>
        {showCookieAlert && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-45 bg-slate-950 text-white rounded-2xl p-5 shadow-2xl border border-slate-800 flex flex-col gap-4"
          >
            <div className="flex gap-3 items-start">
              <div className="p-2 bg-slate-900 rounded-lg text-amber-400 mt-0.5 shrink-0 border border-slate-800">
                <Cookie className="w-4 h-4" />
              </div>
              <div className="space-y-1 text-xs">
                <strong className="block text-white font-medium">Lekki Local Speed Consent</strong>
                <p className="text-slate-400 leading-relaxed font-light">
                  This platform sets active performance parameters in localStorage database files to secure lightweight client dashboards. No unapproved tracking scripts are loaded.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={handleAgreeCookie}
                id="cookie-alert-onboard-agree"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-all cursor-pointer"
              >
                Accept parameters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. PERSISTENT FLOATING WHATSAPP HUB & BACK-TO-TOP */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Sitemap Top"
            id="backt-to-top-arrow-btn"
            className="bg-slate-900 hover:bg-slate-950 dark:bg-white text-white dark:text-slate-950 p-2.5 rounded-full shadow-lg transition-transform hover:-translate-y-1 flex items-center justify-center cursor-pointer"
          >
            <ArrowUp className="w-4.5 h-4.5" />
          </button>
        )}
        
        {/* Persistent bubble pointing to Whatsapp */}
        {isWhatsAppEnabled && (
          <a
            href="https://wa.me/2347052199651?text=Hello%20VXTGrid%20Services,%20I%20am%20visiting%20from%20your%20premium%20brand%20website%20and%20want%2520to%20discuss%20a%20new%20web%20system."
            target="_blank"
            rel="noreferrer"
            title="Direct WhatsApp chat..."
            id="whatsapp-sticky-icon-button"
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl transition-transform hover:scale-105 flex items-center justify-center cursor-pointer animate-pulse-slow"
          >
            <MessageSquare className="w-5 h-5 text-white" />
          </a>
        )}
      </div>

      {/* 7. GLOBAL EXPLORATORY SEARCH CONSOLE OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-6"
          >
            {/* Close */}
            <button
              onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
              id="search-overlay-exit"
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 border border-slate-800 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full max-w-2xl space-y-8">
              
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-extrabold block">VXT-FAST SEARCH SYSTEM</span>
                <p className="text-2xl font-serif text-white">Find Masterclasses or Packages</p>
              </div>

              {/* Large Input */}
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  required
                  placeholder="Type anything (e.g., speed, SEO, boutique hotel)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border-2 border-slate-800 p-4 pl-12 text-white rounded-2xl h-14 sm:h-16 text-sm sm:text-base focus:border-blue-500 focus:outline-hidden"
                />
                <Search className="absolute left-4 top-5 w-6 h-6 text-slate-500" />
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto space-y-3">
                {searchQuery.trim() !== '' && filteredSearchItems.length === 0 && (
                  <p className="text-slate-500 text-xs text-center font-mono italic">No matches on search indexes. Try keywords like "speed", "SEO" or "boutique".</p>
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
                    className="bg-slate-900 p-4 rounded-xl border border-slate-800 hover:border-blue-500 cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-bold bg-blue-950 text-blue-400 border border-blue-900/50 px-2 py-0.5 rounded-md uppercase shrink-0">
                        {item.type}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Redirects to {item.page}</span>
                    </div>
                    <h4 className="text-slate-200 text-sm font-semibold mt-2">{item.title}</h4>
                    <p className="text-slate-500 text-xs mt-1 font-light truncate">{item.details}</p>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. GENERAL SITEMAP FOOTER */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl space-y-4 mb-12">
            
            {/* Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-white text-slate-950 px-3.5 py-1 text-xs font-mono font-bold tracking-[0.25em] uppercase border border-white whitespace-nowrap">
                  UDOCHUKWU
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Founder, Digital strategist & Principal of VXTGrid Services. We don't build generic brochure templates. We hand-code robust React systems that acquire clients.
              </p>
              <p className="text-[10px] text-slate-600 font-mono">RC-1925048 | Lekki 1, Lagos, NG</p>
            </div>

          </div>

          {/* Legal Bar */}
          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between text-[11px] text-slate-600 font-mono">
            <span>© 2026 Udochukwu - VXTGRID SERVICES. RCS RC-1925048. All rights reserved.</span>
            <span className="flex gap-4 mt-4 sm:mt-0 items-center">
              <a href="#privacy" className="hover:text-white">Privacy policy</a>
              <a href="#terms" className="hover:text-white">Terms of compliance</a>
              <button 
                onClick={() => {
                  onNavigate('dashboard');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }} 
                className="hover:text-white text-slate-700 dark:text-slate-800 text-[10px] font-mono hover:underline cursor-pointer transition-colors"
                title="Secure Workspace Access"
              >
                [VXT-Console]
              </button>
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}
