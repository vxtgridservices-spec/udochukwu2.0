import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  Monitor,
  Smartphone,
  Tablet,
  MapPin,
  History,
  RefreshCw,
  MousePointerClick,
  Scroll,
  HardDrive,
  Share2,
  LockKeyhole,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface SessionLog {
  timestamp: string;
  action: string;
}

interface GeoDetails {
  ip: string;
  country: string;
  city: string;
  region: string;
  org: string;
  timezone: string;
  latitude: number;
  longitude: number;
  postal: string;
}

interface SystemDetails {
  userAgent: string;
  language: string;
  referrer: string;
  browser: string;
  os: string;
  cores: number;
  memory: string;
}

interface ActiveSession {
  sessionId: string;
  ip: string;
  country: string;
  device: string;
  screenSize: string;
  path: string;
  title: string;
  lastPing: number;
  joinedAt: number;
  durationSeconds: number;
  actions: SessionLog[];
  scrollPercent: number;
  geo?: GeoDetails;
  system?: SystemDetails;
}

export default function VisitorTracker() {
  const [sessions, setSessions] = useState<ActiveSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSseActive, setIsSseActive] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string>('');

  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('vxt_tracker_sound_alerts') !== 'false';
  });

  const hasInitializedSessions = useRef(false);
  const knownSessionIds = useRef<Set<string>>(new Set());
  const knownActionCounts = useRef<Record<string, number>>({});

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline'>('all');
  const [deviceFilter, setDeviceFilter] = useState<string>('all');
  const [browserFilter, setBrowserFilter] = useState<string>('all');

  const playIncomingChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!(window as any).__vxtAudioCtx) {
        (window as any).__vxtAudioCtx = new AudioContextClass();
      }
      const ctx = (window as any).__vxtAudioCtx;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const playTone = (freq: number, startTime: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.25, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      playTone(660, now, 0.14);
      playTone(880, now + 0.16, 0.18);
    } catch {
      // Ignore autoplay errors
    }
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('vxt_tracker_sound_alerts', String(next));
      if (next) {
        setTimeout(() => playIncomingChime(), 50);
      }
      return next;
    });
  };

  useEffect(() => {
    if (isLoading) return;
    const currentIds = sessions.map((s) => s.sessionId);

    if (hasInitializedSessions.current) {
      let shouldChime = false;
      for (const session of sessions) {
        const id = session.sessionId;
        if (!knownSessionIds.current.has(id)) {
          shouldChime = true;
          break;
        }
        const prevCount = knownActionCounts.current[id] || 0;
        if (session.actions.length > prevCount) {
          const newActions = session.actions.slice(prevCount);
          if (newActions.some((a) => a.action.startsWith('Arrived on'))) {
            shouldChime = true;
            break;
          }
        }
      }
      if (shouldChime && soundEnabled) {
        playIncomingChime();
      }
    } else {
      hasInitializedSessions.current = true;
    }

    knownSessionIds.current = new Set(currentIds);
    const newCounts: Record<string, number> = {};
    sessions.forEach((s) => {
      newCounts[s.sessionId] = s.actions.length;
    });
    knownActionCounts.current = newCounts;
  }, [sessions, soundEnabled, isLoading]);

  const fetchSessionsDirect = async () => {
    try {
      const res = await fetch('/api/tracker/sessions');
      if (res.ok) {
        const data = await res.json();
        setSessions(data || []);
        setLastRefreshedAt(new Date().toLocaleTimeString('en-US', { hour12: false }));
      }
    } catch {
      // ignore offline
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let sse: EventSource | null = null;
    let pollInterval: ReturnType<typeof setInterval> | null = null;

    try {
      sse = new EventSource('/api/tracker/live-sse');
      sse.onopen = () => {
        setIsSseActive(true);
        setIsLoading(false);
      };
      sse.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload && payload.type === 'sessions_list') {
            setSessions(payload.data || []);
            setLastRefreshedAt(new Date().toLocaleTimeString('en-US', { hour12: false }));
          }
        } catch {
          // ignore
        }
      };
      sse.onerror = () => {
        setIsSseActive(false);
        fetchSessionsDirect();
      };
    } catch {
      // fallback
    }

    pollInterval = setInterval(fetchSessionsDirect, 4000);
    fetchSessionsDirect();

    return () => {
      if (sse) sse.close();
      if (pollInterval) clearInterval(pollInterval);
    };
  }, []);

  const now = Date.now();
  const sortedSessions = useMemo(
    () => [...sessions].sort((a, b) => b.lastPing - a.lastPing),
    [sessions]
  );

  const stats = useMemo(() => {
    const total = sessions.length;
    let onlineCount = 0;
    let offlineCount = 0;
    const countries = new Set<string>();
    const pageHits: Record<string, number> = {};

    sessions.forEach((s) => {
      if (now - s.lastPing < 15000) onlineCount++;
      else offlineCount++;
      if (s.country) countries.add(s.country);
      if (s.path) pageHits[s.path] = (pageHits[s.path] || 0) + 1;
    });

    const topRoute = Object.entries(pageHits).reduce(
      (a, b) => (a[1] > b[1] ? a : b),
      ['/home', 0]
    )[0];

    return { total, onlineCount, offlineCount, uniqueCountries: countries.size, topRoute };
  }, [sessions, now]);

  const availableDevices = useMemo(
    () => ['all', ...new Set(sessions.map((s) => s.device || 'Desktop'))],
    [sessions]
  );

  const availableBrowsers = useMemo(
    () => ['all', ...new Set(sessions.map((s) => s.system?.browser || 'Chrome'))],
    [sessions]
  );

  const filteredSessions = useMemo(() => {
    return sortedSessions.filter((sess) => {
      const isOnline = now - sess.lastPing < 15000;
      if (statusFilter === 'online' && !isOnline) return false;
      if (statusFilter === 'offline' && isOnline) return false;

      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const hit =
          sess.ip?.toLowerCase().includes(q) ||
          sess.country?.toLowerCase().includes(q) ||
          sess.geo?.city?.toLowerCase().includes(q) ||
          sess.geo?.org?.toLowerCase().includes(q) ||
          sess.path?.toLowerCase().includes(q);
        if (!hit) return false;
      }

      if (deviceFilter !== 'all' && sess.device !== deviceFilter) return false;
      if (browserFilter !== 'all' && sess.system?.browser !== browserFilter) return false;
      return true;
    });
  }, [sortedSessions, now, searchTerm, statusFilter, deviceFilter, browserFilter]);

  const selectedSession = sessions.find((s) => s.sessionId === selectedSessionId) || null;

  const getTimelineIcon = (action: string) => {
    const act = action.toLowerCase();
    if (act.includes('clicked')) return MousePointerClick;
    if (act.includes('scrolled')) return Scroll;
    return Activity;
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#141a2b]/75 border border-white/20 p-4">
        <div>
          <h3 className="text-sm font-bold text-white">Real-Time Visitor Monitor</h3>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            {isSseActive ? 'Live stream connected' : 'Polling active'} · Last sync: {lastRefreshedAt || 'Waiting'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={toggleSound}
            className={`px-3 py-1.5 flex items-center gap-1.5 border cursor-pointer transition-colors ${
              soundEnabled
                ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-400'
                : 'border-white/15 bg-[#131620] text-slate-400'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{soundEnabled ? 'Chime On' : 'Muted'}</span>
          </button>

          <button
            onClick={fetchSessionsDirect}
            className="p-2 border border-white/15 bg-[#131620] hover:border-white text-slate-300 cursor-pointer"
            title="Refresh sessions"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-[#141a2b]/75 border border-white/20 p-4">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">24h Sessions</span>
          <p className="text-2xl font-bold text-white mt-1 tabular-nums">{stats.total}</p>
        </div>
        <div className="bg-[#141a2b]/75 border border-white/20 p-4">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Online Now</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1 tabular-nums">{stats.onlineCount}</p>
        </div>
        <div className="bg-[#141a2b]/75 border border-white/20 p-4">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Previous</span>
          <p className="text-2xl font-bold text-slate-300 mt-1 tabular-nums">{stats.offlineCount}</p>
        </div>
        <div className="bg-[#141a2b]/75 border border-white/20 p-4">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Countries</span>
          <p className="text-2xl font-bold text-blue-400 mt-1 tabular-nums">{stats.uniqueCountries}</p>
        </div>
        <div className="bg-[#141a2b]/75 border border-white/20 p-4 col-span-2 lg:col-span-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Top Route</span>
          <p className="text-xs font-mono font-bold text-white mt-2 truncate">{stats.topRoute}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#141a2b]/75 border border-white/20 p-4 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Filter by IP, city, ISP, or route..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-[#131620] border border-white/15 px-3 py-2 text-xs font-mono text-white focus:border-white focus:outline-none"
        />

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-[#131620] border border-white/10 p-0.5">
            {(['all', 'online', 'offline'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-[11px] font-mono font-bold uppercase cursor-pointer ${
                  statusFilter === st ? 'bg-white text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <select
            value={deviceFilter}
            onChange={(e) => setDeviceFilter(e.target.value)}
            className="bg-[#131620] border border-white/15 px-3 py-2 text-xs font-mono text-slate-300"
          >
            <option value="all">All Devices</option>
            {availableDevices.filter((d) => d !== 'all').map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={browserFilter}
            onChange={(e) => setBrowserFilter(e.target.value)}
            className="bg-[#131620] border border-white/15 px-3 py-2 text-xs font-mono text-slate-300"
          >
            <option value="all">All Browsers</option>
            {availableBrowsers.filter((b) => b !== 'all').map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sessions & Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-3">
          {filteredSessions.length === 0 ? (
            <div className="bg-[#141a2b]/75 border border-white/20 p-10 text-center space-y-2">
              <h4 className="text-sm font-semibold text-white">No Matching Sessions</h4>
              <p className="text-xs text-slate-400">
                No visitor sessions match your active filter criteria.
              </p>
            </div>
          ) : (
            filteredSessions.map((sess) => {
              const isSelected = selectedSessionId === sess.sessionId;
              const isOnline = now - sess.lastPing < 15000;
              return (
                <div
                  key={sess.sessionId}
                  onClick={() => setSelectedSessionId(sess.sessionId)}
                  className={`p-4 border cursor-pointer transition-colors space-y-3 ${
                    isSelected
                      ? 'bg-[#23293D] border-white'
                      : 'bg-[#1A1F2E] border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-[#131620] border border-white/10 text-slate-300">
                        {sess.device === 'Mobile' ? (
                          <Smartphone className="w-4 h-4" />
                        ) : sess.device === 'Tablet' ? (
                          <Tablet className="w-4 h-4" />
                        ) : (
                          <Monitor className="w-4 h-4" />
                        )}
                      </span>
                      <div>
                        <p className="text-xs font-bold text-white">
                          {sess.geo?.city ? `${sess.geo.city}, ${sess.country}` : sess.country}
                          <span className="ml-2 text-[10px] font-mono text-slate-400">
                            · {isOnline ? 'Online' : 'Offline'}
                          </span>
                        </p>
                        <p className="text-[11px] font-mono text-slate-400">
                          {sess.ip} · {sess.geo?.org || 'Network Provider'}
                        </p>
                      </div>
                    </div>

                    <div className="text-right font-mono text-[11px]">
                      <span className="text-blue-400 font-bold block">{sess.path}</span>
                      <span className="text-slate-400 tabular-nums">{sess.durationSeconds}s active</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/10">
                    <span className="truncate max-w-[70%]">
                      {sess.actions[sess.actions.length - 1]?.action || 'Session started'}
                    </span>
                    <span className="tabular-nums">Scroll {sess.scrollPercent}%</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="bg-[#141a2b]/75 border border-white/20 p-5 space-y-5 sticky top-6">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <History className="w-4 h-4 text-blue-400" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
                Session Timeline
              </h4>
            </div>

            <AnimatePresence mode="wait">
              {!selectedSession ? (
                <div className="py-12 text-center text-xs font-mono text-slate-400">
                  Select a session row to inspect location, device specs, and activity history.
                </div>
              ) : (
                <motion.div
                  key={selectedSession.sessionId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 text-xs font-mono"
                >
                  <div className="bg-[#131620] border border-white/10 p-4 space-y-2.5 text-slate-300">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>
                        {selectedSession.geo?.city || 'Unknown'}, {selectedSession.geo?.region || ''}{' '}
                        ({selectedSession.country})
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <HardDrive className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>
                        {selectedSession.device} · {selectedSession.system?.os} ·{' '}
                        {selectedSession.system?.browser}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Share2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="truncate">
                        {selectedSession.system?.referrer || 'Direct entry'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {selectedSession.actions.map((act, idx) => {
                      const IconComp = getTimelineIcon(act.action);
                      return (
                        <div key={idx} className="flex items-start gap-2.5 border-b border-white/5 pb-2">
                          <IconComp className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] text-slate-500 block tabular-nums">
                              {act.timestamp}
                            </span>
                            <span className="text-slate-200">{act.action}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-[#131620] border border-white/10 p-3 flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <LockKeyhole className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>First-party session metrics without third-party ad cookies.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
