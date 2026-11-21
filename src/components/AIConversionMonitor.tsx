import { useState, useEffect, useMemo } from 'react';
import { TrendingUp, UserCheck, UserX, AlertCircle, CheckCircle } from 'lucide-react';

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
        setSessions(data || []);
      }
    } catch {
      // silent fallback
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const insights = useMemo(() => {
    if (!sessions.length) return null;

    const totalVisitors = sessions.length;
    let conversions = 0;
    let bounces = 0;

    const dropOffPages: Record<string, number> = {};
    const convertedSessions: ActiveSession[] = [];

    sessions.forEach((session) => {
      const hasConversion = session.actions.some(
        (a) =>
          a.action.includes('Requested') ||
          a.action.includes('Submitted') ||
          a.action.includes('Booked') ||
          a.action.includes('Order') ||
          a.action.includes('Buyfromudochukwu')
      );

      if (hasConversion) {
        conversions++;
        convertedSessions.push(session);
      } else if (Date.now() - session.lastPing > 10 * 60 * 1000) {
        bounces++;
        const path = session.path || '/home';
        dropOffPages[path] = (dropOffPages[path] || 0) + 1;
      }
    });

    const conversionRate = totalVisitors > 0 ? ((conversions / totalVisitors) * 100).toFixed(1) : '0.0';
    const sortedDropOffPages = Object.entries(dropOffPages)
      .sort((a, b) => b[1] - a[1])
      .map(([page, count]) => ({ page, count }));

    return {
      totalVisitors,
      conversions,
      conversionRate,
      bounces,
      convertedSessions,
      sortedDropOffPages,
    };
  }, [sessions]);

  if (isLoading) {
    return (
      <div className="bg-[#141a2b]/75 border border-white/20 p-12 text-center text-xs font-mono text-slate-400">
        Loading funnel metrics...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#141a2b]/75 border border-white/20 p-5">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <div>
            <h3 className="text-sm font-bold text-white">Conversion & Funnel Insights</h3>
            <p className="text-xs text-slate-400 font-mono">
              Real session actions, drop-off routes, and completed leads over the past 24 hours.
            </p>
          </div>
        </div>
        <button
          onClick={fetchSessions}
          disabled={isRefreshing}
          className="border border-white/20 hover:border-white text-white px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer disabled:opacity-50"
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh Metrics'}
        </button>
      </div>

      {!insights ? (
        <div className="bg-[#141a2b]/75 border border-white/20 p-12 text-center text-xs font-mono text-slate-400">
          No recorded sessions in the last 24 hours yet.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#141a2b]/75 border border-white/20 p-5">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Total Sessions</span>
              <p className="text-2xl font-bold text-white mt-1 tabular-nums">{insights.totalVisitors}</p>
            </div>
            <div className="bg-[#141a2b]/75 border border-white/20 p-5">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 uppercase">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Action Leads</span>
              </div>
              <p className="text-2xl font-bold text-white mt-1 tabular-nums">{insights.conversions}</p>
            </div>
            <div className="bg-[#141a2b]/75 border border-white/20 p-5">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-rose-400 uppercase">
                <UserX className="w-3.5 h-3.5" />
                <span>Inactive Exits</span>
              </div>
              <p className="text-2xl font-bold text-white mt-1 tabular-nums">{insights.bounces}</p>
            </div>
            <div className="bg-[#141a2b]/75 border border-white/20 p-5">
              <span className="text-[10px] font-mono text-blue-400 uppercase block">Conversion Rate</span>
              <p className="text-2xl font-bold text-white mt-1 tabular-nums">{insights.conversionRate}%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#141a2b]/75 border border-white/20 p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
                  Exit Routes
                </h4>
              </div>

              {insights.sortedDropOffPages.length === 0 ? (
                <p className="text-xs font-mono text-slate-400">No inactive exit patterns recorded yet.</p>
              ) : (
                <div className="space-y-3">
                  {insights.sortedDropOffPages.map((item, idx) => (
                    <div key={item.page} className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300">
                        0{idx + 1}. {item.page}
                      </span>
                      <span className="text-white font-bold tabular-nums">{item.count} exits</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-[#141a2b]/75 border border-white/20 p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
                  Recent Action Sessions
                </h4>
              </div>

              {insights.convertedSessions.length === 0 ? (
                <p className="text-xs font-mono text-slate-400">No form, order, or booking actions recorded yet.</p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {insights.convertedSessions.map((sess) => (
                    <div key={sess.sessionId} className="bg-[#131620] border border-white/10 p-3 text-xs font-mono space-y-1">
                      <div className="flex justify-between text-slate-400">
                        <span>{sess.ip}</span>
                        <span>{sess.country} · {sess.device}</span>
                      </div>
                      <p className="text-emerald-400">
                        {sess.actions[sess.actions.length - 1]?.action}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
