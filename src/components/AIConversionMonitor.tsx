import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Brain, Activity, UserX, UserCheck, TrendingUp, AlertCircle, RefreshCw, Layers, CheckCircle2, ChevronRight } from 'lucide-react';

interface SessionLog {
  timestamp: string;
  action: string;
}

interface ActiveSession {
  sessionId: string;
  ip: string;
  country: string;
  device: string;
  path: string;
  durationSeconds: number;
  actions: SessionLog[];
  scrollPercent: number;
  lastPing: number;
}

export default function AIConversionMonitor() {
  const [sessions, setSessions] = useState<ActiveSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchSessions = async () => {
    setIsRefreshing(true);
    try {
      const resp = await fetch('/api/tracker/sessions');
      if (resp.ok) {
        const data = await resp.json();
        setSessions(data);
      }
    } catch (err) {
      console.error('Failed to fetch sessions for AI Monitor:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // AI-like heuristics & computation
  const insights = useMemo(() => {
    if (!sessions.length) return null;

    let totalVisitors = sessions.length;
    let conversions = 0;
    let bounces = 0;
    
    // Maps to track where users drop off
    const dropOffPages: Record<string, number> = {};
    const dropOffScroll: Record<string, number> = {}; // Track common bounce scroll depths

    const convertedSessions: ActiveSession[] = [];
    const bouncedSessions: ActiveSession[] = [];

    // Analyze each session
    sessions.forEach(session => {
      // Find conversion actions
      const hasTakenAction = session.actions.some(a => 
        a.action.includes('Requested FREE') || 
        a.action.includes('Submitted an Inbound') || 
        a.action.includes('Booked:') || 
        a.action.includes('Clicked: "')
      );

      const hasConversion = session.actions.some(a => 
        a.action.includes('Requested FREE') || 
        a.action.includes('Submitted an Inbound') || 
        a.action.includes('Booked:')
      );

      if (hasConversion) {
        conversions++;
        convertedSessions.push(session);
      } else {
        const durationMin = session.durationSeconds / 60;
        const now = Date.now();
        // If inactive for > 10m and no conversion, consider a bounce
        if (now - session.lastPing > 10 * 60 * 1000) {
          bounces++;
          bouncedSessions.push(session);
          
          // Track where they dropped off
          const path = session.path || '/home';
          dropOffPages[path] = (dropOffPages[path] || 0) + 1;

          // Track scroll drop-off
          let lastScrollContent = "Top of page";
          const scrollActions = session.actions.filter(a => a.action.includes('Scrolled'));
          if (scrollActions.length > 0) {
            lastScrollContent = scrollActions[scrollActions.length - 1].action;
          }
          dropOffScroll[lastScrollContent] = (dropOffScroll[lastScrollContent] || 0) + 1;
        }
      }
    });

    const conversionRate = totalVisitors > 0 ? ((conversions / totalVisitors) * 100).toFixed(1) : '0';
    
    // Sort drop-off pages
    const sortedDropOffPages = Object.entries(dropOffPages)
      .sort((a, b) => b[1] - a[1])
      .map(([page, count]) => ({ page, count }));

    // Sort drop-off scroll levels
    const sortedDropOffScroll = Object.entries(dropOffScroll)
      .sort((a, b) => b[1] - a[1])
      .map(([scroll, count]) => ({ scroll, count }));

    return {
      totalVisitors,
      conversions,
      conversionRate,
      bounces,
      bouncedSessions,
      convertedSessions,
      sortedDropOffPages,
      sortedDropOffScroll
    };

  }, [sessions]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white dark:bg-slate-850 rounded-3xl border border-slate-200 dark:border-slate-800">
        <Activity className="h-8 w-8 text-indigo-500 animate-spin" />
        <span className="ml-3 text-slate-500 font-medium">Initializing AI Engine...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-slate-850 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/60 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Brain className="h-6 w-6 text-indigo-500" />
            AI Conversion Monitor
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Analyzing behavioral friction points and mapping the 7-day conversion trajectory.
          </p>
        </div>
        <button 
          onClick={fetchSessions}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-bold transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Run Analysis
        </button>
      </div>

      {insights ? (
        <>
          {/* Main Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-850 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/60 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-indigo-50 dark:bg-indigo-500/10 p-2 rounded-xl text-indigo-600 dark:text-indigo-400">
                  <Activity className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Traffic</h3>
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{insights.totalVisitors}</p>
              <p className="text-xs text-slate-500 mt-1">Past 24 Hours</p>
            </div>

            <div className="bg-white dark:bg-slate-850 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/60 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-emerald-50 dark:bg-emerald-500/10 p-2 rounded-xl text-emerald-600 dark:text-emerald-400">
                  <UserCheck className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Direct Actions</h3>
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{insights.conversions}</p>
              <p className="text-xs text-slate-500 mt-1">Bookings & Inquiries</p>
            </div>

            <div className="bg-white dark:bg-slate-850 p-6 rounded-3xl border border-rose-200/50 dark:border-rose-900/40 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-rose-50 dark:bg-rose-500/10 p-2 rounded-xl text-rose-600 dark:text-rose-400">
                  <UserX className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Passive Bounces</h3>
              </div>
              <p className="text-3xl font-black text-rose-600 dark:text-rose-400">{insights.bounces}</p>
              <p className="text-xs text-slate-500 mt-1">Left without action</p>
            </div>

            <div className="bg-white dark:bg-slate-850 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/60 shadow-sm relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <TrendingUp className="h-24 w-24 text-indigo-500" />
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-indigo-50 dark:bg-indigo-500/10 p-2 rounded-xl text-indigo-600 dark:text-indigo-400">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Conversion</h3>
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{insights.conversionRate}%</p>
              <p className="text-xs text-slate-500 mt-1">7-Day target: 8.5%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Diagnostics / Action Areas */}
            <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-200/50 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-rose-500" />
                  Friction Analysis (Why They Left)
                </h3>
              </div>
              <div className="p-6 flex-1 space-y-6">
                
                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Layers className="h-4 w-4" /> Drop-off By Page (Highest Friction)
                  </h4>
                  {insights.sortedDropOffPages.length > 0 ? (
                    <div className="space-y-3">
                      {insights.sortedDropOffPages.slice(0, 3).map((item, i) => (
                        <div key={item.page} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-slate-400 font-mono text-xs">{(i + 1).toString().padStart(2, '0')}</span>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.page}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-rose-500 rounded-full" 
                                style={{ width: `${(item.count / insights.bounces) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-8 text-right">{item.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 border border-slate-200 border-dashed rounded-xl p-4 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" /> No significant drop-offs recorded.
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Activity className="h-4 w-4" /> Reading Depth Friction
                  </h4>
                  {insights.sortedDropOffScroll.length > 0 ? (
                    <div className="space-y-3">
                      {insights.sortedDropOffScroll.slice(0, 3).map((item, i) => (
                        <div key={item.scroll} className="flex items-center justify-between">
                          <div className="flex justify-start">
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">{item.scroll}</span>
                          </div>
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.count} lost here</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">Insufficient scrolling data.</p>
                  )}
                </div>

              </div>
              <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-4 border-t border-indigo-100 dark:border-indigo-900/30">
                <p className="text-xs font-medium text-indigo-700 dark:text-indigo-400">
                  <strong>AI Suggestion:</strong> Add stronger Call-to-Actions (CTAs) immediately before the primary drop-off depth identified above. Simplify the messaging if visitors are leaving within 30 seconds.
                </p>
              </div>
            </div>

            {/* Converted actions breakdown */}
            <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-200/50 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  Successful Triggers (What Worked)
                </h3>
              </div>
              <div className="p-6 flex-1 overflow-y-auto max-h-[360px] custom-scrollbar">
                {insights.convertedSessions.length > 0 ? (
                  <div className="space-y-4">
                    {insights.convertedSessions.map(session => (
                      <div key={session.sessionId} className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex justify-between items-start mb-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                          <div>
                            <span className="font-mono text-xs font-bold text-slate-400">{session.ip}</span>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-1">{session.country} • {session.device}</p>
                          </div>
                          <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full text-xs font-bold">
                            Converted
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {session.actions
                            .filter(a => a.action.includes('Requested') || a.action.includes('Booked') || a.action.includes('Submitted') || a.action.includes('Clicked'))
                            .map((act, idx) => (
                            <li key={idx} className="flex gap-2 items-start text-sm">
                              <ChevronRight className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="text-slate-600 dark:text-slate-400 font-medium leading-tight">
                                {act.action}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-60 px-8 py-12">
                    <UserX className="h-12 w-12 text-slate-400" />
                    <p className="text-slate-500 text-sm font-medium">No direct conversions logged yet. Wait for traffic to flow in or test your CTAs.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center p-12 bg-white dark:bg-slate-850 rounded-3xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 font-medium">Not enough data to generate AI insights yet.</p>
        </div>
      )}
    </div>
  );
}
