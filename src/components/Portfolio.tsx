import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRELOADED_CASE_STUDIES } from '../utils/storage';
import { CaseStudy } from '../types';
import { ArrowRight, Sparkles, ChevronRight, ExternalLink, RefreshCw, X, Monitor, Tablet, Smartphone, Search, Calendar, Check, TrendingUp } from 'lucide-react';

interface PortfolioProps {
  onNavigate: (page: string) => void;
}

export default function Portfolio({ onNavigate }: PortfolioProps) {
  const [selectedCase, setSelectedCase] = useState<CaseStudy>(PRELOADED_CASE_STUDIES[0]);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Simulated Interactive States for Showcase Modal
  const [showcaseOpen, setShowcaseOpen] = useState(false);
  const [showcaseDevice, setShowcaseDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  // Simulated Interactive States for Eko Haven (case-01)
  const [ekoRoom, setEkoRoom] = useState<'deluxe' | 'suite' | 'penthouse'>('suite');
  const [ekoNights, setEkoNights] = useState<number>(3);
  const [ekoBooked, setEkoBooked] = useState(false);

  // Simulated Interactive States for Landstone Realty (case-02)
  const [landstoneNeighborhood, setLandstoneNeighborhood] = useState<string>('All');
  const [landstoneBudget, setLandstoneBudget] = useState<string>('All');
  const [leadFormData, setLeadFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const getEkoRate = () => {
    if (ekoRoom === 'deluxe') return 120000;
    if (ekoRoom === 'penthouse') return 380000;
    return 220000;
  };
  const roomPrice = getEkoRate();
  const totalRaw = roomPrice * ekoNights;
  const otaCom = Math.round(totalRaw * 0.18);
  const directGuestDiscount = Math.round(totalRaw * 0.10);
  const finalPrice = totalRaw - directGuestDiscount;

  const ALL_LANDSTONE_PROPERTIES = [
    { id: 'p1', title: 'The Oakwood Premium Duplex', neighborhood: 'Lekki Phase 1', budget: '₦200M - ₦350M', price: 210000000, beds: 3, baths: 4, type: 'Premium Duplex', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' },
    { id: 'p2', title: 'The Onyx Water Penthouse', neighborhood: 'Ikoyi', budget: '₦350M+', price: 420000000, beds: 4, baths: 5, type: 'Waterfront Penthouse', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
    { id: 'p3', title: 'The Diplomatic Villa', neighborhood: 'Maitama, Abuja', budget: '₦200M - ₦350M', price: 310000000, beds: 5, baths: 6, type: 'Prestige Villa', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80' },
    { id: 'p4', title: 'The Elite Crescent Garden', neighborhood: 'Lekki Phase 1', budget: '₦150M - ₦200M', price: 185000000, beds: 3, baths: 4, type: 'Luxury Townhouse', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80' }
  ];

  const filteredProperties = ALL_LANDSTONE_PROPERTIES.filter(p => {
    const matchRegion = landstoneNeighborhood === 'All' || p.neighborhood === landstoneNeighborhood;
    const matchBudget = landstoneBudget === 'All' || p.budget === landstoneBudget;
    return matchRegion && matchBudget;
  });

  // Before/After slider dragging handle logic
  const handleSliderMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    if (e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleSliderMove(e.clientX);
  };

  const handleStopDragging = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => handleStopDragging();
    const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const handleGlobalTouchMove = (e: TouchEvent) => handleTouchMove(e);

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('touchend', handleGlobalMouseUp);
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('touchend', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
    };
  }, []);

  return (
    <div className="bg-[#1E2333] min-h-screen text-slate-100 transition-colors duration-300">
      
      {/* 1. ELON-STYLE HEAD SPLASH BANNER */}
      <section className="relative min-h-[50vh] flex flex-col justify-center items-start px-6 sm:px-12 md:px-24 py-20 bg-[#6B6899] overflow-hidden">
        {/* Grayscale overlay with project imagery */}
        <div className="absolute inset-0 z-0">
          <img 
            src={selectedCase.afterImage} 
            alt={selectedCase.client} 
            className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-[0.4] opacity-35 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#6B6899]/50 mix-blend-multiply" />
        </div>

        {/* Text details */}
        <div className="relative z-10 w-full max-w-6xl">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl md:text-6xl text-white font-serif tracking-[0.01em] leading-tight font-medium"
          >
            {selectedCase.client.split(' (')[0]}
          </motion.h1>
          
          <div className="w-full max-w-2xl h-[1px] bg-white/40 my-6"></div>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white text-xs sm:text-sm md:text-base tracking-[0.24em] font-mono uppercase font-bold opacity-95 [text-shadow:_0_1px_2px_rgba(0,0,0,0.4)]"
          >
            OUTCOMES OVER SCREENSHOTS • CASE STUDY
          </motion.p>
        </div>
      </section>

      {/* 2. CASE STUDY SELECTOR (Crisp Rectangular Navigation) */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-24 py-12">
        <div className="flex flex-wrap justify-start gap-3.5 border-b border-white/10 pb-6">
          {PRELOADED_CASE_STUDIES.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCase(c);
                setSliderPosition(50);
              }}
              className={`px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer border rounded-none ${
                selectedCase.id === c.id
                  ? 'bg-white text-slate-950 border-white'
                  : 'bg-[#23293D] text-slate-300 border-white/10 hover:border-white/35 hover:text-white'
              }`}
            >
              <span>{c.client.split(' (')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. CASE STUDY DETAILED CHRONICLE */}
      <section className="pb-24 px-6 sm:px-12 md:px-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* CLIENT BRIEF & STORIES (Left Dynamic Column) */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* White Underlined Layout Title */}
            <div>
              <div className="border-b border-white/20 pb-4 mb-8">
                <span className="text-[10px] font-mono text-blue-400 tracking-[0.25em] block uppercase font-bold mb-1">
                  THE DIRECT CHRONICLE
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wide uppercase relative inline-block pb-3 whitespace-nowrap">
                  Digital transformation
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
                </h2>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                {selectedCase.solution}
              </p>
            </div>

            {/* Interactive Before/After Comparisons with minimal borders */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-slate-400 tracking-[0.15em] flex items-center gap-1.5 uppercase">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                  DRAG SLIDER TO VERIFY PERFORMANCE GAP
                </span>
                <div className="flex gap-2">
                  <span className="text-[9px] font-mono font-black bg-rose-950/50 text-rose-300 border border-rose-900/40 px-2.5 py-0.5 uppercase tracking-widest">
                    Legacy Draft
                  </span>
                  <span className="text-[9px] font-mono font-black bg-emerald-950/50 text-emerald-300 border border-emerald-900/40 px-2.5 py-0.5 uppercase tracking-widest">
                    VXT System
                  </span>
                </div>
              </div>

              {/* Slider viewport box */}
              <div 
                ref={containerRef}
                className="relative h-64 sm:h-96 rounded-none overflow-hidden border border-white/10 select-none cursor-ew-resize"
                onMouseDown={() => { isDragging.current = true; }}
                onTouchStart={() => { isDragging.current = true; }}
              >
                {/* AFTER image */}
                <img 
                  src={selectedCase.afterImage} 
                  alt="VXT Redesign output" 
                  className="absolute inset-0 w-full h-full object-cover filter contrast-[1.05]"
                  referrerPolicy="no-referrer"
                />
                
                {/* BEFORE image (Left clipped layer) */}
                <div 
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img 
                    src={selectedCase.beforeImage} 
                    alt="Outdated Legacy Template" 
                    className="absolute inset-0 w-full h-full object-cover max-w-none filter contrast-90 brightness-75 grayscale"
                    style={{ width: containerRef.current?.getBoundingClientRect().width }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-slate-950/90 text-white text-[9px] font-mono tracking-widest px-2.5 py-1 border border-white/25 rounded-none uppercase">
                    LEGACY BROCHURE
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-white text-slate-950 text-[9px] font-mono tracking-widest px-2.5 py-1 font-bold border border-white rounded-none uppercase">
                  VXT AUTOMATION
                </div>

                {/* Divider Line & Square handle node */}
                <div 
                  className="absolute inset-y-0 w-[2px] bg-white cursor-ew-resize flex items-center justify-center"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="h-8 w-8 bg-white text-slate-950 border border-slate-950 shadow-2xl flex items-center justify-center hover:bg-slate-250 transition-colors">
                    <span className="text-slate-950 font-bold text-xs">↔</span>
                  </div>
                </div>
              </div>
            </div>

            {/* stark Testimonial block */}
            <div className="border-l-2 border-white pl-6 py-2 italic text-slate-300 font-sans text-sm sm:text-base leading-relaxed tracking-wide">
              "{selectedCase.highlightText}"
            </div>

          </div>

          {/* SIDEBAR METRICS & DETAIL DIRECTIVES (Right Column) */}
          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-28">
            
            {/* Conversion performance stats card */}
            <div className="bg-[#23293D] p-6 sm:p-8 rounded-none border border-white/10 shadow-xl">
              <h3 className="text-xs font-mono font-bold text-blue-400 tracking-[0.25em] uppercase mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                VERIFIED PERFORMANCE MULTIPLIER
              </h3>
              
              <div className="grid grid-cols-2 gap-y-8 gap-x-6">
                <div>
                  <p className="text-2xl sm:text-3xl font-serif font-black text-rose-400 tracking-tight leading-none">
                    {selectedCase.results.conversionIncrease.split(' ')[0]}
                  </p>
                  <p className="text-slate-400 text-[10px] mt-1.5 font-mono uppercase tracking-widest leading-normal font-medium">
                    {selectedCase.results.conversionIncrease.split(' ').slice(1).join(' ')}
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-serif font-black text-emerald-400 tracking-tight leading-none">
                    {selectedCase.results.speedImprovement.split(' ')[0]}
                  </p>
                  <p className="text-slate-400 text-[10px] mt-1.5 font-mono uppercase tracking-widest leading-normal font-medium">
                    {selectedCase.results.speedImprovement.split(' ').slice(1).join(' ')}
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-serif font-black text-blue-400 tracking-tight leading-none">
                    {selectedCase.results.trafficIncrease.split(' ')[0]}
                  </p>
                  <p className="text-slate-400 text-[10px] mt-1.5 font-mono uppercase tracking-widest leading-normal font-medium">
                    {selectedCase.results.trafficIncrease.split(' ').slice(1).join(' ')}
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight leading-none">
                    {selectedCase.results.revenueGrowth.split(' ')[0]}
                  </p>
                  <p className="text-slate-400 text-[10px] mt-1.5 font-mono uppercase tracking-widest leading-normal font-medium">
                    {selectedCase.results.revenueGrowth.split(' ').slice(1).join(' ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Narratives of Obstacles vs Solutions */}
            <div className="space-y-6">
              
              {/* Obstacle box */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-[0.25em] block">
                  • THE BLOCKING OBSTACLE
                </h4>
                <p className="text-slate-350 text-xs sm:text-sm leading-relaxed font-light">
                  {selectedCase.problem}
                </p>
              </div>

              {/* Technology details */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.25em] block">
                  • DIGITAL INFRASTRUCTURE ASSETS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCase.technology.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] font-mono bg-white/5 border border-white/10 text-white/90 px-2.5 py-1 rounded-none uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* STARK ELON-STYLE CTAS */}
            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('contact')}
                id={`case-cta-${selectedCase.id}`}
                className="border border-white bg-white text-slate-950 font-mono text-xs font-bold tracking-[0.2em] uppercase px-6 py-3 hover:bg-transparent hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer rounded-none flex-1 text-center"
              >
                BOOK PLANNING SLOT
                <ArrowRight className="w-4 h-4" />
              </button>
              
              {selectedCase.liveUrl !== '#live-preview' ? (
                <a
                  href={selectedCase.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/20 text-white font-mono text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-3 hover:border-white hover:bg-white/5 transition-all flex items-center justify-center gap-2 cursor-pointer rounded-none"
                >
                  <span>LIVE PLATFORM</span>
                  <ExternalLink className="w-4 h-4 opacity-75" />
                </a>
              ) : (
                <button
                  onClick={() => {
                    setEkoBooked(false);
                    setLeadSubmitted(false);
                    setShowcaseOpen(true);
                  }}
                  className="border border-white/20 text-white font-mono text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-3 hover:border-white hover:bg-white/5 transition-all flex items-center justify-center gap-2 cursor-pointer rounded-none"
                >
                  <span>PROJECT SHOWCASE</span>
                  <ExternalLink className="w-4 h-4 opacity-75" />
                </button>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 4. EXECUTIVE CALL TO ACTION GRID (Stark & Minimal Pitch) */}
      <section className="bg-[#181C2A] py-16 sm:py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] font-mono text-blue-400 tracking-[0.25em] uppercase font-bold">
                COMMERCE AUTOMATION MODULES
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white uppercase tracking-wide">
                Secure 10X Inbound Acquirers Now
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
                We bypass broker platforms extracting heavy percentages from your bookings or luxury estates. Every layout is hand-coded to load in milliseconds across remote locations. Book a secure, completely free 30-minute system planning review.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button 
                onClick={() => onNavigate('contact')}
                id="portfolio-banner-book"
                className="border border-white bg-white text-slate-950 font-mono text-xs font-bold tracking-[0.2em] uppercase px-6 py-3.5 hover:bg-transparent hover:text-white transition-all text-center cursor-pointer rounded-none"
              >
                BOOK FREE SLOT
              </button>
              <button 
                onClick={() => onNavigate('audit')}
                id="portfolio-banner-audit"
                className="border border-white/10 hover:border-white bg-transparent text-white font-mono text-[10px] font-bold tracking-[0.2em] uppercase px-6 py-3 transition-all text-center cursor-pointer rounded-none"
              >
                REQUEST PERFORMANCE AUDIT
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. DYNAMIC SIMULATOR PROJECT SHOWCASE MODAL */}
      <AnimatePresence>
        {showcaseOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative bg-[#1E2333] border border-white/10 rounded-none w-full max-w-5xl overflow-hidden flex flex-col h-[90vh]"
            >
              
              {/* Modal Control Header */}
              <div className="bg-[#23293D] text-white p-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-rose-500 rounded-none"></span>
                  <span className="w-2.5 h-2.5 bg-yellow-500 rounded-none"></span>
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-none"></span>
                  <span className="ml-2.5 font-mono text-[10px] font-bold tracking-[0.25em] text-slate-400 uppercase hidden sm:inline">
                    VXT SANDBOX METRIC ENGINE
                  </span>
                </div>

                {/* Device switches */}
                <div className="flex bg-[#1E2333] p-1 border border-white/5">
                  <button
                    onClick={() => setShowcaseDevice('desktop')}
                    className={`px-3 py-1.5 transition-all flex items-center gap-1.5 text-[10px] font-mono font-black uppercase tracking-wider cursor-pointer ${
                      showcaseDevice === 'desktop'
                        ? 'bg-white text-slate-950'
                        : 'text-slate-450 hover:text-white'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Desktop</span>
                  </button>
                  <button
                    onClick={() => setShowcaseDevice('tablet')}
                    className={`px-3 py-1.5 transition-all flex items-center gap-1.5 text-[10px] font-mono font-black uppercase tracking-wider cursor-pointer ${
                      showcaseDevice === 'tablet'
                        ? 'bg-white text-slate-950'
                        : 'text-slate-450 hover:text-white'
                    }`}
                  >
                    <Tablet className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Tablet</span>
                  </button>
                  <button
                    onClick={() => setShowcaseDevice('mobile')}
                    className={`px-3 py-1.5 transition-all flex items-center gap-1.5 text-[10px] font-mono font-black uppercase tracking-wider cursor-pointer ${
                      showcaseDevice === 'mobile'
                        ? 'bg-white text-slate-950'
                        : 'text-slate-450 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Mobile</span>
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowcaseOpen(false)}
                  className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Exit Simulator"
                >
                  <X className="w-5 h-5 bg-white/5 p-1 border border-white/10" />
                </button>
              </div>

              {/* URL address box */}
              <div className="bg-[#181C2A] border-b border-white/10 px-4 py-2 flex items-center gap-3">
                <div className="bg-[#1E2333] border border-white/10 flex items-center gap-2.5 px-4 py-1 text-slate-400 text-xs font-mono w-full overflow-hidden">
                  <span className="text-emerald-400 font-bold">HTTPS://</span>
                  <span className="text-slate-350 truncate font-mono">
                    {selectedCase.id === 'case-01' ? 'eko-haven.vxtgrid.com' : 'landstone.vxtgrid.com'}
                  </span>
                </div>
              </div>

              {/* Content Frame */}
              <div className="bg-[#131620] p-6 flex-1 overflow-y-auto flex justify-center items-start">
                <div
                  className={`transition-all duration-300 w-full h-full ${
                    showcaseDevice === 'desktop'
                      ? 'max-w-4xl'
                      : showcaseDevice === 'tablet'
                      ? 'max-w-2xl'
                      : 'max-w-sm'
                  } bg-[#1E2333] border border-white/10 rounded-none overflow-y-auto min-h-[500px] flex flex-col`}
                >
                  
                  {/* CASE-01: EKO HAVEN DIRECT RESERVATION ENGINE */}
                  {selectedCase.id === 'case-01' ? (
                    <div className="font-sans text-slate-100 flex flex-col min-h-full">
                      <header className="border-b border-white/10 bg-[#23293D] px-5 py-4 flex items-center justify-between sticky top-0 z-10">
                        <span className="font-serif tracking-widest text-white text-xs uppercase font-black">
                          EKO HAVEN
                        </span>
                        <span className="text-[9px] font-mono tracking-widest text-[#1E2333] bg-white px-2.5 py-0.5 font-bold uppercase">
                          Direct Matrix Coded
                        </span>
                      </header>

                      <div className="p-6 sm:p-10 text-left bg-[#181C2A] border-b border-white/10">
                        <h3 className="text-xl sm:text-2xl font-serif text-white tracking-wide uppercase">
                          Bypass Booking Middlemen
                        </h3>
                        <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
                          We bypass standard OTA broker aggregators who drain up to 18% in commission pipelines. Grab direct exclusive stay parameters instantly here.
                        </p>
                      </div>

                      {/* Math Widget */}
                      <div className="p-6 flex-1 space-y-6">
                        <div className="bg-[#23293D] border border-white/10 p-5 rounded-none shadow-sm space-y-4">
                          <h4 className="text-[9px] font-mono font-bold text-blue-400 uppercase tracking-[0.2em]">
                            CHOOSE PREFERENCE & RESIDENCE TYPE:
                          </h4>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                                Suite Category
                              </label>
                              <select
                                value={ekoRoom}
                                onChange={(e: any) => setEkoRoom(e.target.value)}
                                className="w-full bg-[#1E2333] border border-white/10 p-2 text-xs font-mono text-white outline-none focus:border-white rounded-none"
                              >
                                <option value="deluxe">Deluxe Studio (₦120k / Night)</option>
                                <option value="suite">Ocean Master Suite (₦220k / Night)</option>
                                <option value="penthouse">Presidential Penthouse (₦380k / Night)</option>
                              </select>
                            </div>

                            <div>
                              <label className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                                Stay Days
                              </label>
                              <select
                                value={ekoNights}
                                onChange={(e: any) => setEkoNights(Number(e.target.value))}
                                className="w-full bg-[#1E2333] border border-white/10 p-2 text-xs font-mono text-white outline-none focus:border-white rounded-none"
                              >
                                <option value={1}>1 Night</option>
                                <option value={2}>2 Nights</option>
                                <option value={3}>3 Nights Getaway</option>
                                <option value={5}>5 Complete Days Stay</option>
                                <option value={7}>7 Weeks Luxury Retreat</option>
                              </select>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-white/5 space-y-2">
                            <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                              <span>Broker Listing Estimate:</span>
                              <span className="line-through">₦{totalRaw.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                              <span>Direct Client Saving Bonus (10%):</span>
                              <span className="text-emerald-400 font-bold">-₦{directGuestDiscount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-rose-400 font-mono font-bold">
                              <span>Commission Preserved In Group Treasury:</span>
                              <span>+₦{otaCom.toLocaleString()} (18%)</span>
                            </div>
                          </div>

                          <div className="p-4 bg-[#1E2333] border border-white/10 text-center">
                            <span className="text-[8px] font-mono text-slate-400 block tracking-[0.2em] font-medium uppercase">
                              CLEAN DIRECT CONTRACT FEE
                            </span>
                            <span className="text-2xl font-serif font-bold text-white block mt-1">
                              ₦{finalPrice.toLocaleString()}
                            </span>
                          </div>

                          <div>
                            {ekoBooked ? (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-emerald-950/20 text-emerald-300 border border-emerald-900/40 p-4 text-xs font-mono"
                              >
                                ✓ DIRECT SYSTEM BOOKING INITIATED SUCCESSFULLY.<br />
                                In a live VXT custom system build, this constructs a payload validation that triggers immediate alerts inside Eko Haven's property console.
                              </motion.div>
                            ) : (
                              <button
                                onClick={() => setEkoBooked(true)}
                                className="w-full border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white font-mono text-[10px] font-bold tracking-[0.2em] py-3 uppercase cursor-pointer rounded-none"
                              >
                                SIMULATE BED RESERVATION
                              </button>
                            )}
                          </div>

                        </div>
                      </div>
                    </div>
                  ) : (
                    
                    /* CASE-02: LANDSTONE REALTY DIASPORA PORTFOLIO */
                    <div className="font-sans text-slate-100 flex flex-col min-h-full">
                      <header className="border-b border-white/10 bg-[#23293D] px-5 py-4 flex items-center justify-between sticky top-0 z-10">
                        <span className="font-serif tracking-widest text-white text-xs uppercase font-black">
                          LANDSTONE
                        </span>
                        <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold">
                          Diaspora Gate
                        </span>
                      </header>

                      <div className="p-6 sm:p-10 text-left bg-[#181C2A] border-b border-white/10">
                        <h3 className="text-xl sm:text-2xl font-serif text-white tracking-wide uppercase">
                          Boutique Real Estate
                        </h3>
                        <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
                          Diaspora-curated premium properties. Clean rectangular layouts, verified escrow tracking milestones, and responsive speeds.
                        </p>
                      </div>

                      <div className="p-6 flex-1 space-y-6">
                        <div className="bg-[#23293D] border border-white/10 p-5 rounded-none space-y-4">
                          
                          <div className="flex flex-col sm:flex-row gap-3.5 items-center justify-between pb-3 border-b border-white/5">
                            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
                              <Search className="w-3 h-3" /> Filters:
                            </span>
                            <div className="flex gap-2 w-full sm:w-auto">
                              <select
                                value={landstoneNeighborhood}
                                onChange={(e: any) => setLandstoneNeighborhood(e.target.value)}
                                className="bg-[#1E2333] border border-white/10 p-1.5 text-xs text-white font-mono rounded-none flex-1"
                              >
                                <option value="All">All Locations</option>
                                <option value="Lekki Phase 1">Lekki Phase 1</option>
                                <option value="Ikoyi">Ikoyi</option>
                                <option value="Maitama, Abuja">Maitama, Abuja</option>
                              </select>

                              <select
                                value={landstoneBudget}
                                onChange={(e: any) => setLandstoneBudget(e.target.value)}
                                className="bg-[#1E2333] border border-white/10 p-1.5 text-xs text-white font-mono rounded-none flex-1"
                              >
                                <option value="All">All Budgets</option>
                                <option value="₦150M - ₦200M">₦150M - ₦200M</option>
                                <option value="₦200M - ₦350M">₦200M - ₦350M</option>
                                <option value="₦350M+">₦350M+</option>
                              </select>
                            </div>
                          </div>

                          {/* catalog rendering */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredProperties.length > 0 ? (
                              filteredProperties.map((p) => (
                                <div key={p.id} className="border border-white/5 bg-[#1E2333] p-3 rounded-none">
                                  <div className="h-24 bg-slate-950 overflow-hidden relative border border-white/5">
                                    <img src={p.img} alt={p.title} className="w-full h-full object-cover grayscale contrast-110 brightness-90" />
                                  </div>
                                  <h5 className="text-xs font-bold text-white uppercase tracking-wide truncate mt-2">
                                    {p.title}
                                  </h5>
                                  <div className="flex justify-between items-center mt-2.5 text-[8px] font-mono text-slate-400">
                                    <span>{p.neighborhood}</span>
                                    <span className="text-white font-bold">₦{p.price.toLocaleString()}</span>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="sm:col-span-2 text-center py-6 text-xs text-slate-400">
                                No simulated listings match selection.
                              </div>
                            )}
                          </div>

                          <div className="pt-4 border-t border-white/5">
                            {leadSubmitted ? (
                              <div className="bg-blue-950/20 text-blue-300 border border-white/10 p-4 text-[11px] font-mono">
                                ✓ LEAD CAPTURE SIMULATED.<br />
                                Diaspora client metadata recorded for immediate VIP concierge follow-up.
                              </div>
                            ) : (
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  if (leadFormData.name && leadFormData.email) {
                                    setLeadSubmitted(true);
                                  }
                                }}
                                className="space-y-2.5"
                              >
                                <div className="grid grid-cols-2 gap-2">
                                  <input
                                    required
                                    type="text"
                                    placeholder="Full Name"
                                    value={leadFormData.name}
                                    onChange={(e) => setLeadFormData({ ...leadFormData, name: e.target.value })}
                                    className="bg-[#1E2333] border border-white/10 p-2 text-xs font-mono text-white outline-none rounded-none"
                                  />
                                  <input
                                    required
                                    type="email"
                                    placeholder="Email Address"
                                    value={leadFormData.email}
                                    onChange={(e) => setLeadFormData({ ...leadFormData, email: e.target.value })}
                                    className="bg-[#1E2333] border border-white/10 p-2 text-xs font-mono text-white outline-none rounded-none"
                                  />
                                </div>
                                <button
                                  type="submit"
                                  className="w-full border border-white bg-white text-slate-950 font-mono text-[9px] font-bold tracking-[0.2em] py-2.5 uppercase cursor-pointer rounded-none"
                                >
                                  DOWNLOAD DIASPORA PORTFOLIO GUIDE
                                </button>
                              </form>
                            )}
                          </div>

                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-[#23293D] p-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>99% Sandbox conversion fidelity simulated.</span>
                </div>
                <button
                  onClick={() => {
                    setShowcaseOpen(false);
                    onNavigate('contact');
                  }}
                  className="bg-white hover:bg-transparent hover:text-white text-slate-950 border border-white font-mono text-[9px] font-bold tracking-[0.15em] px-4 py-2 uppercase transition-all rounded-none cursor-pointer"
                >
                  ACQUIRE A SIMILAR PLATFORM
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
