import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageView } from '../types';
import { GENERATED_ASSETS } from '../utils/generatedAssets';

interface ItelFlashSaleBannerAdProps {
  activePage: PageView;
  onNavigate: (page: PageView) => void;
}

const AD_SCENES = [
  {
    id: 'deal',
    badge: '₦146,000 Off · 21% Sponsored Flash Sale',
    line: 'Keep TV, Fan, Laptop & Freezer ON in Silence — ₦550,000',
  },
  {
    id: 'bundle',
    badge: '300W Solar Panel + 20m Cable Included',
    line: 'Complete 3-in-1 Box Ready to Mount From Roof to Room.',
  },
  {
    id: 'enugu',
    badge: 'Enugu Cities · ₦0 Delivery Fee',
    line: 'Test Live With Your Appliances at Your Gate Before Paying.',
  },
  {
    id: 'warranty',
    badge: '6,000+ Cycles · 2-Year Warranty',
    line: 'Zero Fuel Queues, Zero Noise — Official Replacement Cover.',
  },
];

function MinimizeMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7H11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}

function ExpandMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2.5 7.75L6 4.25L9.5 7.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function ItelFlashSaleBannerAd({
  activePage,
  onNavigate,
}: ItelFlashSaleBannerAdProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    return sessionStorage.getItem('vxt_itel_ad_minimized') !== 'true';
  });
  const [sceneIdx, setSceneIdx] = useState(0);
  const [countdownSecs, setCountdownSecs] = useState(4 * 3600 + 38 * 60 + 22);

  useEffect(() => {
    const timer = setInterval(() => {
      setSceneIdx((prev) => (prev + 1) % AD_SCENES.length);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const clock = setInterval(() => {
      setCountdownSecs((prev) => (prev > 60 ? prev - 1 : 4 * 3600 + 38 * 60));
    }, 1000);
    return () => clearInterval(clock);
  }, []);

  // Keep Admin Dashboard workspace clean
  if (activePage === 'dashboard') return null;

  const toggleMinimize = (nextExpanded: boolean) => {
    setIsExpanded(nextExpanded);
    sessionStorage.setItem('vxt_itel_ad_minimized', nextExpanded ? 'false' : 'true');
  };

  const triggerAction = (mode: 'view' | 'claim') => {
    sessionStorage.setItem('vxt_itel_pending_action', mode);
    if (activePage !== 'buyfromudochukwu') {
      onNavigate('buyfromudochukwu');
    } else {
      window.dispatchEvent(new CustomEvent('vxt-itel-action', { detail: { mode } }));
    }
    toggleMinimize(false);
  };

  const formatCountdown = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}h:${String(m).padStart(2, '0')}m:${String(s).padStart(2, '0')}s`;
  };

  return (
    <AnimatePresence mode="wait">
      {isExpanded ? (
        <motion.aside
          key="itel-ad-expanded"
          aria-label="itel Sponsored Flash Sale Flyer"
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-3 left-3 right-20 sm:left-6 sm:right-auto sm:bottom-6 sm:w-[348px] z-40 bg-[#141824]/95 backdrop-blur-md border border-white/25 shadow-2xl overflow-hidden"
        >
          {/* Animated Shimmer Header */}
          <div className="bg-[#191f30] border-b border-white/15 px-3 py-2 flex items-center justify-between gap-2 relative overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '220%'] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: 'linear' }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-amber-300/20 to-transparent pointer-events-none"
            />
            <div className="flex items-center gap-2 min-w-0 relative z-10">
              <motion.span
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                className="bg-amber-400 text-slate-950 px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider shrink-0"
              >
                21% OFF
              </motion.span>
              <span className="text-[10px] font-mono text-amber-300 truncate tabular-nums">
                itel Flash · {formatCountdown(countdownSecs)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => toggleMinimize(false)}
              aria-label="Minimize flash deal"
              title="Minimize"
              className="p-1 text-slate-300 hover:text-white cursor-pointer relative z-10 shrink-0"
            >
              <MinimizeMark />
            </button>
          </div>

          {/* Animated Flyer Visual */}
          <div
            onClick={() => triggerAction('view')}
            className="relative aspect-[16/10] bg-[#0e111a] overflow-hidden cursor-pointer group"
          >
            <motion.img
              src={GENERATED_ASSETS.itelEnuguFlyer}
              alt="itel Power Tank 500W ESS + 300W Solar Panel + 20m Cable"
              animate={{ scale: [1, 1.07, 1] }}
              transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
              className="w-full h-full object-cover object-center"
            />

            <motion.div
              animate={{ x: ['-120%', '220%'] }}
              transition={{ repeat: Infinity, duration: 4.4, ease: 'easeInOut' }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 pointer-events-none"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#141824] via-[#141824]/20 to-transparent" />

            <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[9px] font-mono text-amber-300 uppercase tracking-wider block truncate">
                  itel Energy × Buyfromudochukwu
                </span>
                <p className="text-xs font-sans font-semibold text-white truncate">
                  500W ESS + 300W Panel + 20m Cable
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm font-sans font-bold text-white block leading-none tabular-nums">
                  ₦550,000
                </span>
                <span className="text-[9px] font-mono text-slate-400 line-through tabular-nums">
                  ₦696,000
                </span>
              </div>
            </div>
          </div>

          {/* Rotating Conversion Highlights + Action Row */}
          <div className="p-3 space-y-2.5 bg-[#141824]">
            <AnimatePresence mode="wait">
              <motion.div
                key={AD_SCENES[sceneIdx].id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-[11px] font-sans text-slate-200 leading-snug"
              >
                <span className="text-emerald-300 font-mono text-[10px] uppercase block mb-0.5 truncate">
                  {AD_SCENES[sceneIdx].badge}
                </span>
                <span className="line-clamp-2">{AD_SCENES[sceneIdx].line}</span>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-1">
              {AD_SCENES.map((sc, idx) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setSceneIdx(idx)}
                  className={`h-0.5 transition-all cursor-pointer ${
                    sceneIdx === idx ? 'flex-1 bg-amber-300' : 'w-4 bg-white/20'
                  }`}
                  aria-label={`Promo highlight ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => triggerAction('claim')}
                className="flex-1 bg-white text-slate-950 hover:bg-slate-200 py-2 px-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
              >
                Claim ₦550k COD
              </button>
              <button
                type="button"
                onClick={() => triggerAction('view')}
                className="border border-white/25 hover:border-white text-white py-2 px-2.5 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
              >
                View Item
              </button>
            </div>
          </div>
        </motion.aside>
      ) : (
        <motion.button
          key="itel-ad-minimized"
          type="button"
          onClick={() => toggleMinimize(true)}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="fixed bottom-3 left-3 sm:bottom-6 sm:left-6 z-40 max-w-[calc(100vw-5.75rem)] bg-[#141824]/95 backdrop-blur-md border border-white/25 hover:border-white/50 shadow-2xl px-2.5 py-2 flex items-center gap-2.5 cursor-pointer transition-colors"
        >
          <img
            src={GENERATED_ASSETS.itelPowerTankSetup}
            alt="itel Power Tank"
            className="w-8 h-7 object-cover bg-[#0e111a] shrink-0"
          />
          <div className="min-w-0 text-left">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span className="text-[10px] font-mono text-amber-300 font-semibold uppercase tracking-wider truncate">
                21% OFF · itel 500W + Solar
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-300 block truncate">
              ₦550,000 · Enugu Free COD
            </span>
          </div>
          <span className="text-slate-300 pl-1 shrink-0">
            <ExpandMark />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
