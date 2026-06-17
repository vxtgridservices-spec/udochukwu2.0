import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Globe, 
  Monitor, 
  Smartphone, 
  Tablet, 
  MapPin, 
  Clock, 
  History, 
  Sparkles, 
  RefreshCw, 
  MousePointerClick, 
  Scroll,
  HelpCircle,
  User,
  Cpu,
  Search,
  Compass,
  Server,
  ExternalLink,
  Shield,
  CheckCircle,
  Hash,
  Volume2,
  VolumeX
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

  // Sound alert configuration
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('vxt_tracker_sound_alerts') !== 'false';
  });

  // Trackers to detect changes without triggering chime on initial loaded sessions list
  const hasInitializedSessions = useRef(false);
  const knownSessionIds = useRef<Set<string>>(new Set());

  // Filtering / Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline'>('all');
  const [deviceFilter, setDeviceFilter] = useState<string>('all');
  const [browserFilter, setBrowserFilter] = useState<string>('all');

  // Dynamic high-fidelity procedural notification synthesizer chime (Dual-Tone E5 -> A5)
  const playIncomingChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      // Tone 1: E5 (659.25 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, ctx.currentTime);
      gain1.gain.setValueAtTime(0.12, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.35);

      // Tone 2: A5 (880.00 Hz) with an elegant micro-offset dynamic transition delay
      setTimeout(() => {
        try {
          if (ctx.state === 'closed') return;
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(880.00, ctx.currentTime);
          gain2.gain.setValueAtTime(0.12, ctx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
          
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start();
          osc2.stop(ctx.currentTime + 0.45);
        } catch (e) {
          // Safety fallback for closed contexts
        }
      }, 100);

    } catch (e) {
      console.warn('Audio Context interaction limited by client autoplay policies:', e);
    }
  };

  const toggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      localStorage.setItem('vxt_tracker_sound_alerts', String(next));
      if (next) {
        // Play sample chime to confirm sound is active and browser audio context is warmed up
        setTimeout(() => playIncomingChime(), 50);
      }
      return next;
    });
  };

  // Chronological chime listener trigger
  useEffect(() => {
    if (sessions.length === 0) {
      hasInitializedSessions.current = true;
      return;
    }

    const currentIds = sessions.map(s => s.sessionId);

    if (hasInitializedSessions.current) {
      let containsNew = false;
      for (const id of currentIds) {
        if (!knownSessionIds.current.has(id)) {
          containsNew = true;
          break;
        }
      }

      if (containsNew && soundEnabled) {
        playIncomingChime();
      }
    } else {
      hasInitializedSessions.current = true;
    }

    knownSessionIds.current = new Set(currentIds);
  }, [sessions, soundEnabled]);

  const fetchSessionsDirect = async () => {
    try {
      const res = await fetch('/api/tracker/sessions');
      if (res.ok) {
        const data = await res.json();
        setSessions(data || []);
        setLastRefreshedAt(new Date().toLocaleTimeString('en-US', { hour12: false }));
      }
    } catch (e) {
      console.warn('Direct analytics polling offline.', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let sse: EventSource | null = null;
    let pollInterval: NodeJS.Timeout | null = null;

    // 1. Establish SSE streaming
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
        } catch (e) {
          console.error('SSE parsed data error:', e);
        }
      };

      sse.onerror = () => {
        console.warn('SSE stream disconnected. Re-routing through standard database syncing...');
        setIsSseActive(false);
        fetchSessionsDirect();
      };
    } catch (err) {
      console.warn('Realtime streaming socket unsupported. Defaulting to poll-syncer.', err);
    }

    // 2. Continuous 3-second database synchronizer
    pollInterval = setInterval(() => {
      fetchSessionsDirect();
    }, 3000);

    fetchSessionsDirect();

    return () => {
      if (sse) sse.close();
      if (pollInterval) clearInterval(pollInterval);
    };
  }, []);

  // Compute live aggregates dynamically
  const now = Date.now();
  const sortedSessions = useMemo(() => {
    return [...sessions].sort((a, b) => b.lastPing - a.lastPing);
  }, [sessions]);

  const stats = useMemo(() => {
    const total = sessions.length;
    let onlineCount = 0;
    let offlineCount = 0;
    const countries = new Set<string>();
    const pageHits: Record<string, number> = {};

    sessions.forEach(s => {
      const isOnline = now - s.lastPing < 15000;
      if (isOnline) {
        onlineCount++;
      } else {
        offlineCount++;
      }
      
      if (s.country) countries.add(s.country);
      if (s.path) pageHits[s.path] = (pageHits[s.path] || 0) + 1;
    });

    const topRoute = Object.entries(pageHits).reduce((a, b) => (a[1] > b[1] ? a : b), ['/home', 0])[0];

    return {
      total,
      onlineCount,
      offlineCount,
      uniqueCountries: countries.size,
      topRoute
    };
  }, [sessions, now]);

  // Extract unique filter lists
  const availableDevices = useMemo(() => {
    return ['all', ...new Set(sessions.map(s => s.device || 'Desktop'))];
  }, [sessions]);

  const availableBrowsers = useMemo(() => {
    return ['all', ...new Set(sessions.map(s => s.system?.browser || 'Chrome'))];
  }, [sessions]);

  // Filters mapping
  const filteredSessions = useMemo(() => {
    return sortedSessions.filter(sess => {
      // 1. Live status matching
      const isOnline = now - sess.lastPing < 15000;
      if (statusFilter === 'online' && !isOnline) return false;
      if (statusFilter === 'offline' && isOnline) return false;

      // 2. Search matches (IP, Country, City, Region, ISP, route, ID)
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesIP = sess.ip && sess.ip.toLowerCase().includes(query);
        const matchesCountry = sess.country && sess.country.toLowerCase().includes(query);
        const matchesCity = sess.geo?.city && sess.geo.city.toLowerCase().includes(query);
        const matchesRegion = sess.geo?.region && sess.geo.region.toLowerCase().includes(query);
        const matchesOrg = sess.geo?.org && sess.geo.org.toLowerCase().includes(query);
        const matchesRoute = sess.path && sess.path.toLowerCase().includes(query);
        const matchesId = sess.sessionId && sess.sessionId.toLowerCase().includes(query);

        if (!matchesIP && !matchesCountry && !matchesCity && !matchesRegion && !matchesOrg && !matchesRoute && !matchesId) {
          return false;
        }
      }

      // 3. Device match
      if (deviceFilter !== 'all' && sess.device !== deviceFilter) return false;

      // 4. Browser match
      if (browserFilter !== 'all' && sess.system?.browser !== browserFilter) return false;

      return true;
    });
  }, [sortedSessions, now, searchTerm, statusFilter, deviceFilter, browserFilter]);

  const selectedSession = sessions.find(s => s.sessionId === selectedSessionId) || null;

  // Render a neat detailed timeline icon depending on the recorded action type
  const getTimelineIconAndColor = (action: string) => {
    const act = action.toLowerCase();
    if (act.includes('arrived') || act.includes('welcome')) {
      return { icon: Compass, color: 'text-sky-500 bg-sky-500/10 border-sky-500/30' };
    }
    if (act.includes('clicked')) {
      return { icon: MousePointerClick, color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' };
    }
    if (act.includes('scrolled') || act.includes('reading')) {
      return { icon: Scroll, color: 'text-violet-500 bg-violet-500/10 border-violet-500/30' };
    }
    if (act.includes('calculator') || act.includes('roi')) {
      return { icon: Activity, color: 'text-blue-500 bg-blue-500/10 border-blue-500/30' };
    }
    if (act.includes('audit') || act.includes('inquiry') || act.includes('booked') || act.includes('submitted')) {
      return { icon: CheckCircle, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30 hover:scale-105 transition-transform' };
    }
    return { icon: Sparkles, color: 'text-slate-400 bg-slate-500/10 border-slate-500/20' };
  };

  return (
    <div className="space-y-6">
      
      {/* Tracker Status Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-900 border border-slate-800 p-4 rounded-3xl">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSseActive ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isSseActive ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Full-Stack Realtime Analytics</span>
              <span className="text-[10px] font-mono text-slate-400">Node v18 INGRESS</span>
            </h2>
            <p className="text-[10px] text-slate-400">Active server cache logging all visits over the past 24 hours.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          
          {/* Sound Alerts Controls */}
          <button
            onClick={toggleSound}
            className={`p-[7px] rounded-lg flex items-center gap-1.5 text-[10px] font-bold cursor-pointer transition-all duration-200 border uppercase ${
              soundEnabled 
                ? 'bg-emerald-500/10 hover:bg-emerald-500/25 border-emerald-500/30 text-emerald-400' 
                : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/60 text-slate-400'
            }`}
            title={soundEnabled ? 'Live Sound Alerts are ENABLED' : 'Live Sound Alerts are MUTED'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                <span className="hidden sm:inline">Chime Active</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Muted</span>
              </>
            )}
          </button>

          <span className="text-slate-500 text-[10px] hidden md:inline">SYNC: {lastRefreshedAt || 'Wait...'}</span>
          
          <button 
            onClick={fetchSessionsDirect}
            className="p-[7px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer transition-colors"
            title="Force immediate database query"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Numerical Metrics Grid Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Total Cohort */}
        <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 text-left">
          <span className="text-[10px] font-mono font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Cohort (24 Hrs)</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{stats.total}</p>
          <span className="text-[9px] text-slate-400 font-mono">Unique session keys</span>
        </div>

        {/* Live Active */}
        <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-emerald-500/20 dark:border-emerald-950 text-left relative overflow-hidden">
          <div className="absolute right-3 top-3 h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Online Now</span>
          <p className="text-2xl font-black text-emerald-650 dark:text-emerald-400 mt-1">{stats.onlineCount}</p>
          <span className="text-[9px] text-slate-400 font-mono">Actions within 15s</span>
        </div>

        {/* Total Left */}
        <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 text-left">
          <span className="text-[10px] font-mono font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Inactive Logged</span>
          <p className="text-2xl font-black text-slate-500 mt-1">{stats.offlineCount}</p>
          <span className="text-[9px] text-slate-400 font-mono">Retained for history audits</span>
        </div>

        {/* Markets Targeted */}
        <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 text-left">
          <span className="text-[10px] font-mono font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Country Channels</span>
          <p className="text-2xl font-black text-blue-650 dark:text-blue-400 mt-1 flex items-center gap-1.5">
            <Globe className="w-5 h-5 opacity-70 shrink-0" />
            <span>{stats.uniqueCountries}</span>
          </p>
          <span className="text-[9px] text-slate-400 font-mono">IP physical mappings</span>
        </div>

        {/* Top Destination */}
        <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 text-left col-span-2 lg:col-span-1">
          <span className="text-[10px] font-mono font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Highest Engagement</span>
          <p className="text-[11px] font-mono font-bold text-slate-900 dark:text-white mt-2 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-sm truncate">
            {stats.topRoute.toUpperCase()}
          </p>
          <span className="text-[9px] text-slate-400 font-mono block mt-1">Most visited page route</span>
        </div>

      </div>

      {/* Smart Controllers Toolbar */}
      <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-xs flex flex-col md:flex-row gap-3">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by IP, country, state, provider, route..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filter controls Row */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Status filters selection */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-xl p-1 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 text-[11px] font-mono font-bold rounded-lg cursor-pointer ${
                statusFilter === 'all' 
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
              }`}
            >
              ALL ({stats.total})
            </button>
            <button
              onClick={() => setStatusFilter('online')}
              className={`px-3 py-1 text-[11px] font-mono font-bold rounded-lg flex items-center gap-1 cursor-pointer ${
                statusFilter === 'online' 
                  ? 'bg-emerald-500 text-white shadow-xs' 
                  : 'text-emerald-550 dark:text-emerald-400 hover:bg-emerald-500/10'
              }`}
            >
              ONLINE ({stats.onlineCount})
            </button>
            <button
              onClick={() => setStatusFilter('offline')}
              className={`px-3 py-1 text-[11px] font-mono font-bold rounded-lg cursor-pointer ${
                statusFilter === 'offline' 
                  ? 'bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
              }`}
            >
              OFFLINE ({stats.offlineCount})
            </button>
          </div>

          {/* Device dropdown */}
          <select
            value={deviceFilter}
            onChange={(e) => setDeviceFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 outline-hidden focus:ring-0 focus:border-blue-500 cursor-pointer"
          >
            <option value="all">Devices: All Platform</option>
            {availableDevices.filter(d => d !== 'all').map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Browser dropdown */}
          <select
            value={browserFilter}
            onChange={(e) => setBrowserFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 outline-hidden focus:ring-0 focus:border-blue-500 cursor-pointer"
          >
            <option value="all">Browsers: All Engine</option>
            {availableBrowsers.filter(b => b !== 'all').map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

        </div>

      </div>

      {/* Main Grid: Visitor Rows and User Inspection Side panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Visitor log rows list */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-3">
          {filteredSessions.length === 0 ? (
            <div className="bg-white dark:bg-slate-850 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-12 text-center space-y-2">
              <p className="text-4xl text-slate-400">🕵️‍♂️</p>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">No Matching Visitors Found</h4>
              <p className="text-[10px] text-slate-400 max-w-sm mx-auto">
                No sessions match your search/filtering parameters. Try adjusting the toggles or open a new browser tab to log fresh metrics.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredSessions.map((sess) => {
                const isSelected = selectedSessionId === sess.sessionId;
                const isOnline = now - sess.lastPing < 15000;
                
                // Formatted Session active elapsed duration or clock
                const arrivalTime = new Date(sess.joinedAt).toLocaleTimeString('en-US', { hour12: false });
                
                return (
                  <div
                    key={sess.sessionId}
                    onClick={() => setSelectedSessionId(sess.sessionId)}
                    className={`p-4 border rounded-2xl transition-all cursor-pointer text-left space-y-3 relative overflow-hidden group ${
                      isSelected 
                        ? 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-500 shadow-xs ring-1 ring-blue-500/10' 
                        : 'bg-white dark:bg-slate-850 border-slate-200/60 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
                    }`}
                  >
                    {/* Top Header info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      
                      {/* Brand Info, Country Flag & IP */}
                      <div className="flex items-center gap-2">
                        <span className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800">
                          {sess.device === 'Mobile' ? (
                            <Smartphone className="w-4 h-4 text-rose-500" />
                          ) : sess.device === 'Tablet' ? (
                            <Tablet className="w-4 h-4 text-violet-500" />
                          ) : (
                            <Monitor className="w-4 h-4 text-blue-500" />
                          )}
                        </span>
                        
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <strong className="text-xs text-slate-900 dark:text-white font-bold">
                              {sess.geo?.city ? `${sess.geo.city}, ${sess.country}` : sess.country}
                            </strong>
                            
                            {/* LIVE / OFFLINE Status element */}
                            <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-sm font-black flex items-center gap-1 ${
                              isOnline 
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-400' 
                                : 'bg-slate-100 text-slate-550 dark:bg-slate-900 dark:text-slate-400'
                            }`}>
                              <span className={`h-1 w-1 rounded-full ${isOnline ? 'bg-emerald-500 animate-ping' : 'bg-slate-450'}`} />
                              <span>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
                            </span>

                            {/* Conversion marker */}
                            {sess.actions.some(a => a.action.toLowerCase().includes('consultation') || a.action.toLowerCase().includes('audit')) && (
                              <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[8px] font-mono px-1.5 py-0.5 rounded-sm font-black animate-pulse">
                                ★ VIP LEAD
                              </span>
                            )}
                          </div>

                          {/* IP Details row */}
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300">
                              IP: {sess.ip || '127.0.0.1'}
                            </span>
                            <span className="text-[9px] text-slate-400 truncate max-w-[140px] md:max-w-[200px]" title={sess.geo?.org}>
                              ({sess.geo?.org || 'Local Network Provider'})
                            </span>
                          </div>
                        </div>

                      </div>

                      {/* Right Details: Router and Time metrics */}
                      <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 shrink-0 font-mono text-[9px]">
                        <div className="bg-blue-50/80 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md border border-blue-150 dark:border-blue-900/40 font-bold">
                          ROUTE: {sess.path.toUpperCase()}
                        </div>
                        <div className="text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>Arrived {arrivalTime} • Active {sess.durationSeconds}s</span>
                        </div>
                      </div>

                    </div>

                    {/* Middle Content: Scrolling progress gauge and system OS specifications */}
                    <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/60 grid grid-cols-1 md:grid-cols-12 gap-3 pb-0.5">
                      
                      {/* Scroll progress gauge */}
                      <div className="md:col-span-5">
                        <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 mb-1">
                          <span className="flex items-center gap-1">
                            <Scroll className="w-3 h-3 text-slate-400" />
                            <span>PAGE VIEW SCROLLDEPTH</span>
                          </span>
                          <span>{sess.scrollPercent}%</span>
                        </div>
                        <div className="w-full h-1 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${sess.scrollPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Client Operating settings tags */}
                      <div className="md:col-span-7 flex flex-wrap items-center md:justify-end gap-1.5 text-[9px] font-mono text-slate-500 dark:text-slate-400">
                        <span className="px-1.5 py-0.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80">
                          {sess.system?.os || 'System Spec'}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80">
                          {sess.system?.browser || 'Browser Log'}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 hidden sm:inline" title="CPU Cores / RAM size">
                          {sess.system?.cores ? `CPU: ${sess.system.cores} Cores` : 'Unknown CPU'} / RAM: {sess.system?.memory || 'N/A'}
                        </span>
                      </div>

                    </div>

                    {/* Quick Preview of latest action */}
                    <div className="bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/40 flex justify-between items-center text-xs">
                      <div className="truncate flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-450">Latest Activity:</span>
                        <span className="text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 italic truncate pl-0.5">
                          "{sess.actions[sess.actions.length - 1]?.action || 'Just active'}"
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-400 group-hover:text-blue-500 transition-colors">
                        Inspect journey &rarr;
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Visitor detailed profile drawer & timeline */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="bg-slate-950 text-left border border-slate-900 rounded-3xl p-5 sticky top-6 h-[calc(100vh-140px)] min-h-[520px] flex flex-col justify-between overflow-hidden">
            
            {/* Context Profile Header */}
            <div className="border-b border-slate-900 pb-4">
              <div className="flex items-center gap-2">
                <History className="w-4.5 h-4.5 text-blue-500 shrink-0" />
                <h3 className="text-xs font-mono font-bold text-slate-100 uppercase tracking-widest">
                  Chronological Journey Map
                </h3>
              </div>
              <p className="text-[10px] text-slate-400 font-mono mt-1 leading-normal">
                Double-click any visitor session matrix row on the left grid to trace active action logs.
              </p>
            </div>

            {/* Inspect Main Body */}
            <div className="flex-1 overflow-y-auto py-4 space-y-5 scrollbar-thin scrollbar-thumb-slate-800">
              <AnimatePresence mode="wait">
                {!selectedSession ? (
                  <motion.div
                    key="select-first"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col justify-center items-center text-center space-y-3 py-16"
                  >
                    <User className="w-8 h-8 text-slate-800 animate-pulse" />
                    <p className="text-xs font-mono font-bold text-slate-200">Inspect Node Context</p>
                    <p className="text-[10px] text-slate-500 font-mono max-w-[200px] leading-relaxed mx-auto">
                      Click any card to load full geolocation IP headers, System configurations, and complete chronological event logs.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={selectedSession.sessionId}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    
                    {/* Visitor Info Summary Card */}
                    <div className="bg-slate-900/60 rounded-2xl border border-slate-900/60 p-4 space-y-3 font-mono text-[10px] text-slate-300">
                      
                      <div className="pb-2 border-b border-slate-950 flex justify-between items-center text-[9px] text-slate-400">
                        <span>● TRANSACTION CREDENTIALS</span>
                        <span className="text-blue-400 font-bold">{selectedSession.sessionId.substring(9, 14).toUpperCase()}</span>
                      </div>

                      {/* Expanded Network properties specs */}
                      <div className="grid grid-cols-1 gap-2.5">
                        
                        <div className="flex items-start gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-slate-500 block uppercase font-extrabold text-[8px] tracking-wider">Geolocation Bounds</span>
                            <span className="text-white block font-sans font-semibold text-xs leading-tight">
                              {selectedSession.geo?.city || 'Lagos'}, {selectedSession.geo?.region || 'Lagos State'}
                            </span>
                            <span className="text-slate-450 block mt-0.5">
                              {selectedSession.geo?.country || 'Africa'} (Postal: {selectedSession.geo?.postal || '100001'})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-slate-500 block uppercase font-extrabold text-[8px] tracking-wider">ISP Provider (AS Host)</span>
                            <span className="text-white block uppercase leading-tight">
                              {selectedSession.geo?.org || 'Local Network Provider'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-violet-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-slate-500 block uppercase font-extrabold text-[8px] tracking-wider">Device Architecture</span>
                            <span className="text-white block uppercase leading-tight">
                              {selectedSession.device} (CPU: {selectedSession.system?.cores} Cores / Memory RAM: {selectedSession.system?.memory})
                            </span>
                            <span className="text-slate-450 block mt-0.5">
                              Screen resolution: {selectedSession.screenSize} • Language: {selectedSession.system?.language}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-slate-500 block uppercase font-extrabold text-[8px] tracking-wider">Source Referrer Referral</span>
                            {selectedSession.system?.referrer && selectedSession.system.referrer.startsWith('http') ? (
                              <a 
                                href={selectedSession.system.referrer} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-blue-400 hover:underline flex items-center gap-1 leading-normal"
                              >
                                <span>{selectedSession.system.referrer.substring(0, 40)}...</span>
                                <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                              </a>
                            ) : (
                              <span className="text-slate-350 block leading-tight">
                                {selectedSession.system?.referrer || 'Direct Link / Bookmark Entry'}
                              </span>
                            )}
                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Timeline Activity Trace list */}
                    <div className="space-y-4">
                      
                      <div className="text-[9px] font-mono text-slate-400 flex items-center justify-between px-1 uppercase tracking-wider">
                        <span>● HISTORICAL TRACE EVENTS CONTINUUM</span>
                        <span>{selectedSession.actions?.length || 0} TOTAL</span>
                      </div>

                      <div className="relative border-l border-slate-900 pl-4 ml-3.5 space-y-5 my-2">
                        {selectedSession.actions && selectedSession.actions.map((act, ax) => {
                          const conf = getTimelineIconAndColor(act.action);
                          const IconComp = conf.icon;

                          return (
                            <div key={ax} className="relative group/timeline">
                              {/* Glowing event timeline icon marker */}
                              <div className={`absolute -left-[27.5px] top-0.5 h-6 w-6 rounded-full border flex items-center justify-center transition-all ${conf.color}`}>
                                <IconComp className="w-3.5 h-3.5" />
                              </div>

                              <div className="pl-1 text-left">
                                <span className="text-[8px] text-slate-500 block font-mono">{act.timestamp}</span>
                                <span className={`block text-[11px] leading-relaxed mt-0.5 ${
                                  act.action.toLowerCase().includes('inquiry') || act.action.toLowerCase().includes('booked')
                                    ? 'text-emerald-400 font-extrabold shadow-sm'
                                    : 'text-slate-300'
                                }`}>
                                  {act.action}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Diagnostics help and tips footer */}
            <div className="bg-slate-900/40 border border-slate-900 p-3.5 rounded-2xl flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
              <p className="text-[10px] font-mono text-slate-450 leading-relaxed">
                Matches are captured without trackers cookies. Security and performance measurements load through standard headers validation.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
