import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRELOADED_CASE_STUDIES } from '../utils/storage';
import { CaseStudy } from '../types';
import { ArrowRight, Sparkles, CheckCircle2, ChevronRight, Share2, PanelLeft, ExternalLink, RefreshCw, X, Monitor, Tablet, Smartphone, Search, Calendar, MapPin, Building, Check, TrendingUp } from 'lucide-react';

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
    <div className="py-12 md:py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-100 dark:bg-blue-950 px-3 py-1.5 rounded-full font-medium">
            OUTCOMES OVER SCREENSHOTS
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-900 dark:text-white mt-4 font-medium tracking-tight">
            Digital Success Stories
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            I partner with ambitious brands across Africa to construct high-performing digital systems that drive growth, increase trust, and turn visitors into long-term clients.
          </p>
        </div>

        {/* Project Selector Navigation Tab */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 border-b border-slate-200 dark:border-slate-800 pb-6">
          {PRELOADED_CASE_STUDIES.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCase(c);
                setSliderPosition(50);
              }}
              className={`px-5 py-3 rounded-xl font-medium tracking-tight text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                selectedCase.id === c.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <span>{c.client.split(' (')[0]}</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
          ))}
        </div>

        {/* Detailed Case Study Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: The metrics, slider & live demo */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Interactive Before vs After Visualizer */}
            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                  SLIDE TO COMPARE
                </span>
                <span className="text-xs font-mono font-semibold bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400 px-2.5 py-0.5 rounded-md">
                  BEFORE: Outdated & Slow
                </span>
                <span className="text-xs font-mono font-semibold bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400 px-2.5 py-0.5 rounded-md">
                  AFTER: 100% Coded Client Machine
                </span>
              </div>
              
              {/* Slider wrapper container */}
              <div 
                ref={containerRef}
                className="relative h-64 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-950 dark:border-slate-800 select-none cursor-ew-resize"
                onMouseDown={() => { isDragging.current = true; }}
                onTouchStart={() => { isDragging.current = true; }}
              >
                {/* AFTER image (Full cover underlying layer) */}
                <img 
                  src={selectedCase.afterImage} 
                  alt="Optimized Modern Website Redesign" 
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* BEFORE image (Left clipped overlay layer) */}
                <div 
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img 
                    src={selectedCase.beforeImage} 
                    alt="Legacy Unoptimized Template website" 
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: containerRef.current?.getBoundingClientRect().width }}
                    referrerPolicy="no-referrer"
                  />
                  {/* Before label tag */}
                  <div className="absolute top-4 left-4 bg-slate-950/80 text-white text-[10px] font-mono tracking-widest px-2 py-1 rounded-sm border border-slate-800">
                    LEGACY BROCHURE
                  </div>
                </div>

                {/* AFTER label tag (Permanent at the right) */}
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-mono tracking-widest px-2 py-1 rounded-sm shadow-md">
                  VXT-SYSTEM
                </div>

                {/* Slider Handle Divider Line */}
                <div 
                  className="absolute inset-y-0 w-1 bg-white hover:bg-blue-400 cursor-ew-resize shadow-md flex items-center justify-center transition-colors"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="h-10 w-10 bg-white hover:bg-blue-500 rounded-full border-4 border-slate-950 shadow-xl flex items-center justify-center transition-colors">
                    <span className="text-slate-900 font-bold hover:text-white text-xs select-none">↔</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 text-center italic mt-1 leading-none">
                Drag the divider left or right to compare the slow legacy blueprint vs Udochukwu’s high-precision design system
              </p>
            </div>

            {/* Measurable Results Metrics Grid */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/80">
              <h3 className="text-xs font-mono font-extrabold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-bounce" />
                VERIFIED CONVERSION METRICS
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-2xl sm:text-3xl font-serif font-black text-rose-600 dark:text-rose-500 tracking-tight leading-none">
                    {selectedCase.results.conversionIncrease.split(' ')[0]}
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 text-xs mt-1.5 font-sans font-medium">
                    {selectedCase.results.conversionIncrease.split(' ').slice(1).join(' ')}
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-serif font-black text-emerald-600 dark:text-emerald-500 tracking-tight leading-none">
                    {selectedCase.results.speedImprovement.split(' ')[0]}
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 text-xs mt-1.5 font-sans font-medium">
                    {selectedCase.results.speedImprovement.split(' ').slice(1).join(' ')}
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-serif font-black text-blue-600 dark:text-blue-500 tracking-tight leading-none">
                    {selectedCase.results.trafficIncrease.split(' ')[0]}
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 text-xs mt-1.5 font-sans font-medium">
                    {selectedCase.results.trafficIncrease.split(' ').slice(1).join(' ')}
                  </p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-serif font-black text-slate-900 dark:text-white tracking-tight leading-none">
                    {selectedCase.results.revenueGrowth.split(' ')[0]}
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 text-xs mt-1.5 font-sans font-medium">
                    {selectedCase.results.revenueGrowth.split(' ').slice(1).join(' ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial callout inside Case Study */}
            <div className="border-l-4 border-blue-600 pl-4 sm:pl-6 py-1 italic text-slate-600 dark:text-slate-300 font-sans text-sm sm:text-base">
              "{selectedCase.highlightText}"
            </div>

          </div>

          {/* RIGHT COLUMN: Problem, Solution, Tech Stack Case Study Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Meta Tags */}
            <div>
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">
                CLIENT BRIEF
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-slate-900 dark:text-white mt-1 leading-tight">
                {selectedCase.client}
              </h2>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-[11px] font-mono bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800">
                  {selectedCase.industry}
                </span>
                <span className="text-[11px] font-mono bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-200 px-2.5 py-1 rounded-md border border-blue-100 dark:border-blue-900/40">
                  Verified Case Study
                </span>
              </div>
            </div>

            {/* The Problem Narrative */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-semibold text-rose-500 uppercase tracking-widest flex items-center gap-1.5">
                ❌ THE OBSTACLE
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {selectedCase.problem}
              </p>
            </div>

            {/* The Solution Narrative */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-semibold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                ✓ THE STRATEGIC APPROACH
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {selectedCase.solution}
              </p>
            </div>

            {/* Technology Stack Badges */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest">
                CORE DIGITAL ASSETS
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedCase.technology.map((tech, idx) => (
                  <span 
                    key={idx}
                    className="text-xs font-mono bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 px-2.5 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA action to drive leads */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-900 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('contact')}
                id={`case-cta-${selectedCase.id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 group cursor-pointer"
              >
                Build My Direct Acquisition System
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => {
                  setEkoBooked(false);
                  setLeadSubmitted(false);
                  setShowcaseOpen(true);
                }}
                className="border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 px-5 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>View Project Showcase</span>
                <ExternalLink className="w-4 h-4 opacity-70" />
              </button>
            </div>

          </div>

        </div>

        {/* Global Consultation Pitch Banner */}
        <div className="mt-24 bg-slate-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/15 rounded-full filter blur-3xl"></div>
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold">
              ACQUIRE MORE PAYING CLIENTS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-white mt-2 tracking-tight">
              Ready to double your inbound digital sales?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
              Skip lazy templates and brokers. Ensure your hotel, private clinic, realty group, or corporate enterprise commands trust on local speeds. Book an executive planning slot directly with Udochukwu.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate('contact')}
                id="portfolio-banner-book"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                Book My Free Strategy Slot
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onNavigate('audit')}
                id="portfolio-banner-audit"
                className="text-xs sm:text-sm font-medium text-blue-400 hover:text-white px-4 py-3 rounded-xl transition-colors cursor-pointer"
              >
                Request Free Website Audit →
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic High-Fidelity Project Showcase Responsive Modal */}
        <AnimatePresence>
          {showcaseOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
              {/* Outer Centered Backdrop Wrapper */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-5xl overflow-hidden flex flex-col h-[90vh]"
              >
                {/* Modal Top Control Header */}
                <div className="bg-slate-900 text-white p-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-850 z-10">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="ml-1.5 font-mono text-[11px] font-bold tracking-widest text-slate-400 uppercase hidden sm:inline">
                      SECURE BRANDS SIMULATOR
                    </span>
                  </div>

                  {/* Responsive Switcher Actions */}
                  <div className="flex bg-slate-800/80 p-1 rounded-xl">
                    <button
                      onClick={() => setShowcaseDevice('desktop')}
                      className={`p-2 rounded-lg transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer ${
                        showcaseDevice === 'desktop'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Desktop Layout Standard View"
                    >
                      <Monitor className="w-4 h-4" />
                      <span className="hidden md:inline">Desktop</span>
                    </button>
                    <button
                      onClick={() => setShowcaseDevice('tablet')}
                      className={`p-2 rounded-lg transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer ${
                        showcaseDevice === 'tablet'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Tablet Layout View"
                    >
                      <Tablet className="w-4 h-4" />
                      <span className="hidden md:inline">Tablet</span>
                    </button>
                    <button
                      onClick={() => setShowcaseDevice('mobile')}
                      className={`p-2 rounded-lg transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer ${
                        showcaseDevice === 'mobile'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Mobile Grid Navigation"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span className="hidden md:inline">Mobile</span>
                    </button>
                  </div>

                  {/* Close Icon Button */}
                  <button
                    onClick={() => setShowcaseOpen(false)}
                    className="p-1.5 rounded-full bg-slate-800 text-slate-350 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
                    title="Exit Simulator"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Sub Header / Simulated Web Browser Title Bar */}
                <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800/80 px-4 py-2 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                  </div>
                  <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5 px-4 py-1 rounded-lg text-slate-400 text-xs font-mono flex-1 overflow-hidden">
                    <span className="text-emerald-500 font-bold">https://</span>
                    <span className="text-slate-650 dark:text-slate-300 truncate font-mono">
                      {selectedCase.id === 'case-01' ? 'eko-haven.vxtgrid.com' : 'landstone.vxtgrid.com'}
                    </span>
                  </div>
                </div>

                {/* Simulated Content Frame Canvas Container */}
                <div className="bg-slate-50 dark:bg-slate-900 p-6 flex-1 overflow-y-auto flex justify-center items-start">
                  
                  {/* Viewport resizing wrapper container */}
                  <div
                    className={`transition-all duration-500 w-full h-full ${
                      showcaseDevice === 'desktop'
                        ? 'max-w-4xl'
                        : showcaseDevice === 'tablet'
                        ? 'max-w-2xl'
                        : 'max-w-sm'
                    } bg-white dark:bg-slate-950 shadow-xl border border-slate-200 dark:border-slate-800 rounded-2xl overflow-y-auto min-h-[500px] flex flex-col`}
                  >
                    
                    {/* CASE-01: EKO HAVEN LUXURY APARTMENTS AND BOUTIQUE RESORT */}
                    {selectedCase.id === 'case-01' ? (
                      <div className="font-sans text-slate-900 dark:text-slate-150 flex flex-col min-h-full">
                        {/* Simulation Navbar */}
                        <header className="border-b border-slate-100 dark:border-slate-900/65 bg-white dark:bg-slate-950 px-5 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                          <span className="font-serif font-black tracking-widest text-[#1e293b] dark:text-white text-sm">
                            EKO HAVEN
                          </span>
                          <span className="text-[10px] font-mono tracking-wider text-emerald-600 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full font-bold">
                            Direct Booking Engine
                          </span>
                        </header>

                        {/* Simulation Hero Block */}
                        <div className="p-6 sm:p-10 text-center bg-slate-55 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80">
                          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                            VIP ESCAPE IN LAGOS
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-white mt-2 font-medium tracking-tight">
                            Escape to Atlantic Sunset Prestige
                          </h3>
                          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto leading-relaxed">
                            Bypass middleman broker channels taking 18% commissions. Grab direct reservation bonuses including priority private airport concierge shuttles and high-speed satellite workspace nodes.
                          </p>
                        </div>

                        {/* Interactive Direct Rate Pricing Calculator Widget */}
                        <div className="p-6 flex-1 space-y-6">
                          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
                            <h4 className="text-xs font-mono font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
                              Interactive Direct Booking Matrix
                            </h4>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {/* Selection 1: Room category */}
                              <div>
                                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                                  SUITE OR RESIDENCE TYPE
                                </label>
                                <select
                                  value={ekoRoom}
                                  onChange={(e: any) => setEkoRoom(e.target.value)}
                                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl font-sans text-xs tracking-tight text-slate-800 dark:text-white outline-none focus:border-blue-600"
                                >
                                  <option value="deluxe">Deluxe Studio Cabin (₦120k / Night)</option>
                                  <option value="suite">Ocean Sanctuary Master Suite (₦220k / Night)</option>
                                  <option value="penthouse">Presidential Signature Penthouse (₦380k / Night)</option>
                                </select>
                              </div>

                              {/* Selection 2: Nights Count */}
                              <div>
                                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                                  DURATION OF STAY
                                </label>
                                <select
                                  value={ekoNights}
                                  onChange={(e: any) => setEkoNights(Number(e.target.value))}
                                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl font-sans text-xs tracking-tight text-slate-800 dark:text-white outline-none focus:border-blue-600"
                                >
                                  <option value={1}>1 Premium Night</option>
                                  <option value={2}>2 Nights Package</option>
                                  <option value={3}>3 Nights Getaway (Recommended)</option>
                                  <option value={5}>5 Complete Vacation Business package</option>
                                  <option value={7}>7 Weeks Executive Retreat</option>
                                </select>
                              </div>
                            </div>

                            {/* ROI Saving Display Block */}
                            <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-5 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                              <div className="md:col-span-7 space-y-2">
                                <div className="flex justify-between items-center text-xs text-slate-500">
                                  <span>Standard OTA Aggregate Listing Rate:</span>
                                  <span className="line-through">₦{totalRaw.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs text-slate-500">
                                  <span>Direct bedside booking discount (10%):</span>
                                  <span className="text-emerald-600 font-semibold">-₦{directGuestDiscount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-mono font-bold text-rose-500">
                                  <span>Middleman Broker Commission Saved:</span>
                                  <span>₦{otaCom.toLocaleString()} (Saved by Eko Haven!)</span>
                                </div>
                              </div>

                              <div className="md:col-span-5 bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-100 dark:border-blue-900/60 text-center">
                                <span className="text-[9px] font-mono text-blue-600 dark:text-blue-400 block font-bold uppercase tracking-widest">
                                  DIRECT PRICE SECURED
                                </span>
                                <span className="text-xl sm:text-2xl font-serif font-black text-blue-700 dark:text-blue-300 block mt-1">
                                  ₦{finalPrice.toLocaleString()}
                                </span>
                              </div>
                            </div>

                            {/* SIMULATION ACTION BUTTON */}
                            <div className="mt-6">
                              {ekoBooked ? (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="bg-emerald-50 dark:bg-emerald-950/45 text-emerald-800 dark:text-emerald-300 text-xs p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/80 flex items-start gap-2.5"
                                >
                                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-500" />
                                  <div>
                                    <strong className="font-bold block text-emerald-900 dark:text-emerald-200">
                                      ✓ Direct Rates Reservation Checklist Simulated!
                                    </strong>
                                    Saved ₦{otaCom.toLocaleString()} directly back to Eko Haven's treasury. In Udochukwu's actual live setup, this instantly routes a pre-populated secure booking payload to their private front desk WhatsApp node with real credit reservation checks!
                                  </div>
                                </motion.div>
                              ) : (
                                <button
                                  onClick={() => setEkoBooked(true)}
                                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                                >
                                  <Calendar className="w-4 h-4" />
                                  <span>Simulate Secure Bedside Booking</span>
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Quick features specs */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                            <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-800">
                              <span className="text-slate-450 dark:text-slate-500 font-mono text-[9px] tracking-widest uppercase block">
                                Load Time
                              </span>
                              <span className="text-sm font-bold text-slate-800 dark:text-white block mt-1">
                                0.7 Seconds
                              </span>
                            </div>
                            <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-800">
                              <span className="text-slate-450 dark:text-slate-500 font-mono text-[9px] tracking-widest uppercase block">
                                Core Web Vitals
                              </span>
                              <span className="text-sm font-bold text-emerald-600 block mt-1">
                                100/100 Core
                              </span>
                            </div>
                            <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-800">
                              <span className="text-slate-450 dark:text-slate-500 font-mono text-[9px] tracking-widest uppercase block">
                                Commission Outflow
                              </span>
                              <span className="text-sm font-bold text-rose-500 block mt-1">
                                Slashed 68%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      
                      /* CASE-02: LANDSTONE REALTY & PREMIUM INVESTMENTS */
                      <div className="font-sans text-slate-900 dark:text-slate-150 flex flex-col min-h-full">
                        {/* Simulation Navbar */}
                        <header className="border-b border-slate-100 dark:border-slate-900/65 bg-white dark:bg-slate-950 px-5 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                          <span className="font-serif font-serif tracking-widest text-[#1e293b] dark:text-white text-sm">
                            LANDSTONE
                          </span>
                          <span className="text-[10px] font-mono tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded-full font-bold">
                            Diaspora Investor Suite
                          </span>
                        </header>

                        {/* Simulation Hero Block */}
                        <div className="p-6 sm:p-10 text-center bg-slate-55 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80">
                          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                            HIGH-NET-WORTH CORRIDORS
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-white mt-1.5 font-medium tracking-tight leading-tight">
                            Prestige Curated Real Estates
                          </h3>
                          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-3.5 max-w-xl mx-auto leading-relaxed">
                            A curated lifestyle showcase engineered for the selective Diaspora eye. Hand-styled layouts, custom escrow pathways, and instant geolocational site surveys.
                          </p>
                        </div>

                        {/* Practical Property Catalog Filter Component */}
                        <div className="p-6 flex-1 space-y-6">
                          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                            
                            {/* Filter bar */}
                            <div className="flex flex-col sm:flex-row gap-3.5 items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                              <span className="text-xs font-mono font-bold text-slate-500 self-start sm:self-center uppercase flex items-center gap-1.5">
                                <Search className="w-3.5 h-3.5" />
                                Interactive Filter:
                              </span>
                              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                                <select
                                  value={landstoneNeighborhood}
                                  onChange={(e: any) => setLandstoneNeighborhood(e.target.value)}
                                  className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl font-sans text-xs outline-none flex-1 sm:flex-none focus:border-blue-600"
                                >
                                  <option value="All">All Regions</option>
                                  <option value="Lekki Phase 1">Lekki Phase 1</option>
                                  <option value="Ikoyi">Ikoyi</option>
                                  <option value="Maitama, Abuja">Maitama, Abuja</option>
                                </select>

                                <select
                                  value={landstoneBudget}
                                  onChange={(e: any) => setLandstoneBudget(e.target.value)}
                                  className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl font-sans text-xs outline-none flex-1 sm:flex-none focus:border-blue-600"
                                >
                                  <option value="All">All Budgets</option>
                                  <option value="₦150M - ₦200M">₦150M - ₦200M</option>
                                  <option value="₦200M - ₦350M">₦200M - ₦350M</option>
                                  <option value="₦350M+">₦350M+</option>
                                </select>
                              </div>
                            </div>

                            {/* Dynamic Listings Result Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                              {filteredProperties.length > 0 ? (
                                filteredProperties.map((p) => (
                                  <div 
                                    key={p.id}
                                    className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-950 shadow-sm hover:shadow-md transition-all flex flex-col"
                                  >
                                    <div className="h-28 relative bg-slate-100 overflow-hidden">
                                      <img src={p.img} alt={p.title} className="w-full h-full object-cover filter contrast-[1.03]" />
                                      <span className="absolute top-2 left-2 bg-slate-950/75 text-white text-[9px] font-mono px-2 py-0.5 rounded-sm capitalize">
                                        {p.neighborhood}
                                      </span>
                                    </div>
                                    <div className="p-3.5 flex-1 flex flex-col justify-between">
                                      <div>
                                        <h5 className="text-[13px] font-serif font-semibold text-slate-900 dark:text-white truncate">
                                          {p.title}
                                        </h5>
                                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{p.beds} Bed • {p.baths} Bath • {p.type}</span>
                                      </div>
                                      <span className="text-xs font-bold text-slate-900 dark:text-blue-400 block mt-2 text-right">
                                        ₦{p.price.toLocaleString()}
                                      </span>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="sm:col-span-2 text-center py-6 text-xs text-slate-450 italic">
                                  No simulated boutique listings match your selected values. Reset options to view properties.
                                </div>
                              )}
                            </div>

                            {/* Direct Lead Intake Form Submission */}
                            <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-5 space-y-4">
                              <h5 className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                                Simulated Lead Capture Hub
                              </h5>
                              
                              {leadSubmitted ? (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="bg-blue-50 dark:bg-blue-950/45 text-blue-800 dark:text-blue-300 text-xs p-4 rounded-xl border border-blue-100 dark:border-blue-900/80"
                                >
                                  <strong className="font-bold block text-blue-905 dark:text-blue-200 mb-1">
                                    ✓ VIP Lead Capture Successfully Simulated!
                                  </strong>
                                  Inbound inquiry logs injected immediately! In Udochukwu's custom full-stack builds, client records are structured securely, routed via secure HTTPS hooks, and saved inside the Administrative Console database for immediate executive follow-up.
                                </motion.div>
                              ) : (
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    if (leadFormData.name && leadFormData.email) {
                                      setLeadSubmitted(true);
                                    }
                                  }}
                                  className="space-y-3"
                                >
                                  <div className="grid grid-cols-2 gap-3">
                                    <input
                                      required
                                      type="text"
                                      placeholder="Full Name"
                                      value={leadFormData.name}
                                      onChange={(e) => setLeadFormData({ ...leadFormData, name: e.target.value })}
                                      className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-xs outline-none focus:border-blue-600"
                                    />
                                    <input
                                      required
                                      type="email"
                                      placeholder="Email Address"
                                      value={leadFormData.email}
                                      onChange={(e) => setLeadFormData({ ...leadFormData, email: e.target.value })}
                                      className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-xs outline-none focus:border-blue-600"
                                    />
                                  </div>
                                  <button
                                    type="submit"
                                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs py-2.5 rounded-xl font-semibold hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
                                  >
                                    Claim My Diaspora Client Portfolio Guide
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

                {/* Modal Footer Description */}
                <div className="bg-slate-100 dark:bg-slate-900 p-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center gap-3">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span>99% conversion fidelity simulated inside VXT Sandbox environment.</span>
                  </div>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-all shadow-sm cursor-pointer"
                  >
                    Build A Similar Pipeline For My Firm
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
