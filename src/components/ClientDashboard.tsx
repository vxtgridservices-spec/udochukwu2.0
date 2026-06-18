import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  getBookings,
  getContacts,
  getAudits,
  getNewsletterSubscribers,
  saveBlog,
  getSiteSettings,
  saveSiteSettings
} from '../utils/storage';
import { 
  Lock, 
  ShieldCheck, 
  Activity, 
  Calendar, 
  Mail, 
  FileText, 
  Users, 
  BookOpen, 
  Sparkles, 
  Sliders, 
  Trash2, 
  LogOut, 
  Copy, 
  Check, 
  AlertCircle,
  Eye,
  Brain
} from 'lucide-react';
import VisitorTracker from './VisitorTracker';
import AIConversionMonitor from './AIConversionMonitor';

export default function ClientDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('vxt_admin_logged') === 'true');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorText, setErrorText] = useState('');

  // Loaded administrative records
  const [bookings, setBookings] = useState<any[]>(() => getBookings());
  const [contacts, setContacts] = useState<any[]>(() => getContacts());
  const [audits, setAudits] = useState<any[]>(() => getAudits());
  const [subscribers, setSubscribers] = useState<string[]>(() => getNewsletterSubscribers());
  const [adminTab, setAdminTab] = useState<'overview' | 'visitorTracker' | 'aiMonitor' | 'bookings' | 'contacts' | 'audits' | 'subscribers' | 'settings' | 'blogPost' | 'siteAssets'>('overview');
  const [copiedSubscribers, setCopiedSubscribers] = useState(false);
  
  // Blog form states
  const [newBlog, setNewBlog] = useState({ 
    title: '', 
    slug: '', 
    excerpt: '', 
    content: '', 
    category: 'Web Design' as any, 
    readTime: '', 
    image: '', 
    tags: '' 
  });
  
  // Settings configurations
  const [siteSettings, setSiteSettings] = useState(() => getSiteSettings());
  const [discordWebhookUrl, setDiscordWebhookUrl] = useState(() => localStorage.getItem('vxt_discord_webhook_url') || '');
  const [discordEnabled, setDiscordEnabled] = useState(() => localStorage.getItem('vxt_discord_webhook_enabled') === 'true');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailInput.trim().toLowerCase();
    const password = passwordInput.trim();

    if (email === 'vxtgridservices@gmail.com' && password === 'Holy5346') {
      localStorage.setItem('vxt_admin_logged', 'true');
      setIsLoggedIn(true);
      setErrorText('');
      // Reload states
      setBookings(getBookings());
      setContacts(getContacts());
      setAudits(getAudits());
      setSubscribers(getNewsletterSubscribers());
    } else if (email !== 'vxtgridservices@gmail.com') {
      setErrorText('Access Denied: Unrecognized administrator email credentials.');
    } else {
      setErrorText('Access Denied: Invalid Master Access Key.');
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('vxt_admin_logged');
    setIsLoggedIn(false);
    setEmailInput('');
    setPasswordInput('');
  };

  const handleSaveDiscordSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('vxt_discord_webhook_url', discordWebhookUrl);
    localStorage.setItem('vxt_discord_webhook_enabled', discordEnabled ? 'true' : 'false');
    alert('Owner notification parameters saved! CRM system alert flows are online.');
  };

  const handleDeleteBooking = (id: string) => {
    if (!window.confirm('Do you want to archive this consultation record?')) return;
    const fresh = bookings.filter(b => b.id !== id);
    setBookings(fresh);
    localStorage.setItem('vxt_bookings', JSON.stringify(fresh));
  };

  const handleDeleteContact = (id: string) => {
    if (!window.confirm('Do you want to archive this message inquiry?')) return;
    const fresh = contacts.filter(c => c.id !== id);
    setContacts(fresh);
    localStorage.setItem('vxt_contacts', JSON.stringify(fresh));
  };

  const handleDeleteAudit = (id: string) => {
    if (!window.confirm('Do you want to archive this audit submission?')) return;
    const fresh = audits.filter(a => a.id !== id);
    setAudits(fresh);
    localStorage.setItem('vxt_audits', JSON.stringify(fresh));
  };

  const handleCopyToClipboard = () => {
    if (subscribers.length === 0) return;
    navigator.clipboard.writeText(subscribers.join(', '));
    setCopiedSubscribers(true);
    setTimeout(() => setCopiedSubscribers(false), 2000);
  };

  const handleCreateBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.slug || !newBlog.content) {
      alert('Please fill in the title, slug, and markdown content.');
      return;
    }

    const tagsArray = newBlog.tags
      ? newBlog.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      : ['Web Tech'];

    const formattedBlog = {
      title: newBlog.title,
      slug: newBlog.slug.replace(/\s+/g, '-').toLowerCase(),
      excerpt: newBlog.excerpt || 'Learn more about building fast web experiences.',
      content: newBlog.content,
      category: newBlog.category,
      readTime: newBlog.readTime || '4 min read',
      image: newBlog.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
      tags: tagsArray,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    saveBlog(formattedBlog);
    alert('Excellent! New high-fidelity blog post published live on the website feed.');
    
    // Clear Form inputs
    setNewBlog({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Web Design',
      readTime: '',
      image: '',
      tags: ''
    });
  };

  const handleUpdateAssets = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteSettings(siteSettings);
    alert('Site assets settings saved successfully!');
  };

  return (
    <div className="py-12 md:py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            /* SECURE ACCESS LOCK SCREEN */
            <motion.div
              key="auth-gate"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-md mx-auto bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-2xl space-y-8"
            >
              <div className="text-center space-y-3">
                <div className="h-14 w-14 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-serif text-slate-900 dark:text-white font-medium">VXT Master Command</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                  Please securely authenticate with your registered administrator credentials.
                </p>
              </div>

              {errorText && (
                <div className="bg-red-50 dark:bg-red-950/40 p-3.5 rounded-xl text-red-700 dark:text-red-400 text-xs flex items-center gap-2 border border-red-150">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorText}</span>
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-extrabold tracking-widest block uppercase">ADMINISTRATIVE EMAIL</label>
                  <input
                    type="email"
                    required
                    placeholder="vxtgridservices@gmail.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-extrabold tracking-widest block uppercase font-bold">SECURITY ACCESS KEY</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-950 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Unlock Workspace</span>
                </button>
              </form>
            </motion.div>
          ) : (
            /* MAIN ADMIN COMMAND CONSOLE WRAPPER */
            <motion.div
              key="dashboard-frame"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Dashboard Console Header */}
              <div className="bg-slate-900 dark:bg-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-mono text-blue-400 tracking-widest font-extrabold uppercase">VXT SECURE MASTER CONSOLE</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">Welcome Back, Administrator</h2>
                  <p className="text-xs text-slate-400 font-mono">LOGGED IN SENDER AS: <strong className="text-blue-400">vxtgridservices@gmail.com</strong></p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAdminLogout}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-750 dark:bg-slate-900 dark:hover:bg-slate-800 text-xs font-mono text-slate-350 hover:text-white px-4 py-2.5 rounded-xl transition-colors border border-slate-700/60 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-450" />
                    <span>SECURE LOGOUT</span>
                  </button>
                </div>
              </div>

              {/* Console Navigation Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
                {[
                  { id: 'overview', label: 'Console Overview', icon: Activity },
                  { id: 'visitorTracker', label: 'Monitor Live', icon: Eye },
                  { id: 'aiMonitor', label: 'AI Analytics Insights', icon: Brain },
                  { id: 'bookings', label: 'Consultations booked', icon: Calendar, badge: bookings.length },
                  { id: 'contacts', label: 'Inbox Inquiries', icon: Mail, badge: contacts.length },
                  { id: 'audits', label: 'Audit Submissions', icon: FileText, badge: audits.length },
                  { id: 'subscribers', label: 'Newsletter Users', icon: Users, badge: subscribers.length },
                  { id: 'blogPost', label: 'Post New Blog', icon: BookOpen },
                  { id: 'siteAssets', label: 'Site Assets', icon: Sparkles },
                  { id: 'settings', label: 'CRM Alerts Hooks', icon: Sliders },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = adminTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setAdminTab(tab.id as any)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/15' 
                          : 'bg-white dark:bg-slate-850 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-800/40'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                      {tab.badge !== undefined && tab.badge > 0 && (
                        <span className={`text-[10px] rounded-full px-1.5 py-0.5 font-bold font-mono ${
                          isActive ? 'bg-white/20 text-white' : 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                        }`}>
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Console Active Panel Screen */}
              {/* VISITOR TRACKER LIVE MONITOR TAB (Always mounted outside AnimatePresence to run background audio persistently) */}
              <div className={adminTab === 'visitorTracker' ? 'block' : 'hidden'}>
                <VisitorTracker />
              </div>

              <AnimatePresence mode="wait">
                {adminTab !== 'visitorTracker' && (
                  <motion.div
                    key={adminTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                  
                  {/* OVERVIEW TAB */}
                  {adminTab === 'overview' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white dark:bg-slate-850 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-xs">
                          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Consultations</p>
                          <p className="text-3xl font-bold text-slate-850 dark:text-white mt-1.5">{bookings.length}</p>
                          <span className="text-[10px] text-emerald-500 font-mono font-semibold block mt-1">● Synced with local database</span>
                        </div>
                        <div className="bg-white dark:bg-slate-850 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-xs">
                          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Inbox Inquiries</p>
                          <p className="text-3xl font-bold text-slate-850 dark:text-white mt-1.5">{contacts.length}</p>
                          <span className="text-[10px] text-blue-500 font-mono font-semibold block mt-1">● Live form listener connected</span>
                        </div>
                        <div className="bg-white dark:bg-slate-850 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-xs">
                          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Audit Requests</p>
                          <p className="text-3xl font-bold text-slate-850 dark:text-white mt-1.5">{audits.length}</p>
                          <span className="text-[10px] text-indigo-500 font-mono font-semibold block mt-1">● Landing audit flows active</span>
                        </div>
                        <div className="bg-white dark:bg-slate-850 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-xs">
                          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Subscribers</p>
                          <p className="text-3xl font-bold text-slate-850 dark:text-white mt-1.5">{subscribers.length}</p>
                          <span className="text-[10px] text-violet-500 font-mono font-semibold block mt-1">● Active newsletter leads</span>
                        </div>
                      </div>

                      {/* Diagnostic Status Box */}
                      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 bg-emerald-500 rounded-full animate-ping"></span>
                          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Console System Diagnostics</h4>
                        </div>
                        <div className="text-xs text-slate-400 space-y-1">
                          <p>● Live Platform State: <span className="text-emerald-400 font-semibold">Active & Healthy</span></p>
                          <p>● DB Client Hooks: <span className="text-blue-400">LocalStorage Engine</span></p>
                          <p>● Server Node Connection: <span className="text-slate-200">Production Bundle API</span></p>
                          <p>● Admin Session Token: <span className="text-yellow-400 font-bold">Secure Local Key Established</span></p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI MONITOR TAB */}
                  {adminTab === 'aiMonitor' && (
                    <AIConversionMonitor />
                  )}

                  {/* BOOKINGS CORNER TAB */}
                  {adminTab === 'bookings' && (
                    <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-200/50 dark:border-slate-800/60 shadow-xs overflow-hidden">
                      <div className="p-6 border-b border-slate-100 dark:border-slate-800/80">
                        <h3 className="text-base font-serif font-black text-slate-950 dark:text-white">Active Strategic Consultation Bookings</h3>
                        <p className="text-xs text-slate-500 mt-1">These leads requested live calendar discussions regarding project overhauls.</p>
                      </div>

                      <div className="p-6 space-y-4">
                        {bookings.length === 0 ? (
                          <p className="text-xs text-slate-400 italic py-4 text-center">No active direct consultations booked found in database.</p>
                        ) : (
                          bookings.map((b: any) => (
                            <div key={b.id} className="p-5 border border-slate-150 dark:border-slate-800 rounded-2xl hover:border-blue-500/30 transition-all space-y-3 dark:bg-slate-900/40">
                              <div className="flex justify-between items-start gap-4">
                                <div className="space-y-1">
                                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{b.name}</h4>
                                  <p className="text-xs text-slate-500 font-mono">{b.email}</p>
                                </div>
                                <button 
                                  onClick={() => handleDeleteBooking(b.id)} 
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 p-2 rounded-xl transition-all cursor-pointer border border-transparent hover:border-red-100"
                                >
                                  <Trash2 className="w-4 h-4"/>
                                </button>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs border-t border-slate-100 dark:border-slate-800/60">
                                <div>
                                  <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider block">Scheduled Slot</span>
                                  <span className="font-medium text-slate-850 dark:text-slate-200 block mt-0.5">Date: {b.date}</span>
                                  <span className="font-medium text-slate-850 dark:text-slate-200 block mt-0.5">Time: {b.timeSlot}</span>
                                </div>
                                <div>
                                  <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider block">Submission Timestamp</span>
                                  <span className="font-mono text-slate-500 block mt-0.5">{b.createdAt || 'N/A'}</span>
                                </div>
                              </div>

                              {b.notes && (
                                <div className="bg-slate-50 dark:bg-slate-900/65 p-3.5 rounded-xl text-xs border border-slate-150 dark:border-slate-800/60">
                                  <strong className="font-bold text-slate-450 uppercase text-[9px] font-mono tracking-wider block mb-1">PROSPECT CUSTOM NOTES / COMMENTS</strong>
                                  <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{b.notes}</p>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* INBOX INQUIRIES TAB */}
                  {adminTab === 'contacts' && (
                    <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-200/50 dark:border-slate-800/60 shadow-xs overflow-hidden">
                      <div className="p-6 border-b border-slate-100 dark:border-slate-800/80">
                        <h3 className="text-base font-serif font-black text-slate-950 dark:text-white">General Inquiries & Messages Inbox</h3>
                        <p className="text-xs text-slate-500 mt-1">General questions or custom project messages received via the Contact Form.</p>
                      </div>

                      <div className="p-6 space-y-4">
                        {contacts.length === 0 ? (
                          <p className="text-xs text-slate-400 italic py-4 text-center">No messages available in inbox database.</p>
                        ) : (
                          contacts.map((c: any) => (
                            <div key={c.id} className="p-5 border border-slate-150 dark:border-slate-800 rounded-2xl hover:border-blue-500/30 transition-all dark:bg-slate-900/40 space-y-4">
                              <div className="flex justify-between items-start gap-4">
                                <div className="space-y-1">
                                  <span className="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[10px] font-mono px-2 py-0.5 rounded-sm font-bold uppercase">
                                    {c.subject || 'Website Inquiry'}
                                  </span>
                                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white pt-1">{c.name}</h4>
                                  <p className="text-xs text-slate-500 font-mono">Email: {c.email} {c.phone && `• Tel: ${c.phone}`}</p>
                                </div>
                                
                                <button 
                                  onClick={() => handleDeleteContact(c.id)} 
                                  className="text-red-500 hover:text-red-705 hover:bg-rose-50 dark:hover:bg-red-950/40 p-2 rounded-xl transition-all cursor-pointer border border-transparent hover:border-red-100"
                                >
                                  <Trash2 className="w-4 h-4"/>
                                </button>
                              </div>

                              <div className="bg-slate-50 dark:bg-slate-900/65 p-4 rounded-xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 border font-normal leading-relaxed whitespace-pre-wrap">
                                {c.message}
                              </div>

                              <div className="text-right">
                                <span className="text-[10px] font-mono text-slate-400">Received At: {c.submittedAt || 'N/A'}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* AUDIT REQUESTS TAB */}
                  {adminTab === 'audits' && (
                    <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-200/50 dark:border-slate-800/60 shadow-xs overflow-hidden">
                      <div className="p-6 border-b border-slate-100 dark:border-slate-800/80">
                        <h3 className="text-base font-serif font-black text-slate-950 dark:text-white">Lead Magnet: Audit Submission Form Logs</h3>
                        <p className="text-xs text-slate-500 mt-1">High conversion prospects looking for diagnostic analysis on their business speed parameters.</p>
                      </div>

                      <div className="p-6 space-y-4">
                        {audits.length === 0 ? (
                          <p className="text-xs text-slate-400 italic py-4 text-center">No audit responses found in database.</p>
                        ) : (
                          audits.map((a: any) => (
                            <div key={a.id} className="p-5 border border-slate-150 dark:border-slate-800 rounded-2xl hover:border-blue-500/30 transition-all dark:bg-slate-900/40 space-y-3">
                              <div className="flex justify-between items-start gap-4">
                                <div className="space-y-1">
                                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{a.businessName}</h4>
                                  <p className="text-xs text-blue-600 dark:text-blue-400 underline font-mono">
                                    <a href={a.website.startsWith('http') ? a.website : `https://${a.website}`} target="_blank" rel="noopener noreferrer">
                                      {a.website}
                                    </a>
                                  </p>
                                </div>
                                <button 
                                  onClick={() => handleDeleteAudit(a.id)} 
                                  className="text-red-500 hover:text-red-750 p-2 rounded-xl transition-all cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4"/>
                                </button>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs pt-1">
                                <div>
                                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">Industry Profile</span>
                                  <span className="font-medium text-slate-800 dark:text-slate-200">{a.industry || 'General Business'}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">Contact Details</span>
                                  <span className="font-mono text-slate-800 dark:text-slate-200 block">{a.email}</span>
                                  {a.phone && <span className="font-mono text-slate-800 dark:text-slate-200 block">{a.phone}</span>}
                                </div>
                                <div>
                                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">Audit Status</span>
                                  <span className="inline-block bg-yellow-100 dark:bg-yellow-905 text-yellow-800 dark:text-yellow-400 px-1.5 py-0.5 rounded text-[10px] font-semibold mt-0.5">
                                    {a.status || 'Pending Analysis'}
                                  </span>
                                </div>
                              </div>

                              {a.challenges && (
                                <div className="bg-slate-50 dark:bg-slate-900/65 p-3 rounded-xl text-xs border">
                                  <strong className="font-bold text-slate-450 uppercase text-[9px] font-mono tracking-wider block mb-1">PROSPECT CORE CHALLENGES</strong>
                                  <p className="text-slate-700 dark:text-slate-350">{a.challenges}</p>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* NEWSLETTER SUBSCRIBERS TAB */}
                  {adminTab === 'subscribers' && (
                    <div className="bg-white dark:bg-slate-850 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 shadow-xs space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b">
                        <div>
                          <h3 className="text-base font-serif font-black text-slate-950 dark:text-white">Newsletter Leads list ({subscribers.length})</h3>
                          <p className="text-xs text-slate-500 mt-1">Export list containing emails of subscribers signed up for premium blueprints.</p>
                        </div>

                        {subscribers.length > 0 && (
                          <button 
                            onClick={handleCopyToClipboard} 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                          >
                            {copiedSubscribers ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            <span>{copiedSubscribers ? 'Formatted Emails Copied!' : 'Copy to Clipboard'}</span>
                          </button>
                        )}
                      </div>

                      {subscribers.length === 0 ? (
                        <p className="text-xs text-slate-400 italic text-center py-4">No subscribers currently logged in system storage.</p>
                      ) : (
                        <div className="space-y-4">
                          <div className="text-xs font-mono p-4 bg-slate-50 dark:bg-slate-900 border text-slate-700 dark:text-slate-350 rounded-2xl break-all leading-relaxed whitespace-pre-line shadow-xs">
                            {subscribers.join(', ')}
                          </div>

                          <div className="border border-slate-100 dark:border-slate-800 rounded-2xl divide-y">
                            {subscribers.map((email, idx) => (
                              <div key={idx} className="p-3 text-sm text-slate-800 dark:text-slate-200 flex items-center justify-between font-mono">
                                <span>{email}</span>
                                <span className="text-[10px] text-slate-400 font-mono">Lead ID: #{idx + 1}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* POST NEW BLOG TAB */}
                  {adminTab === 'blogPost' && (
                    <div className="bg-white dark:bg-slate-850 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 shadow-xs space-y-6">
                      <div>
                        <h3 className="text-base font-serif font-black text-slate-950 dark:text-white">Publish New Dynamic Blog</h3>
                        <p className="text-xs text-slate-500 mt-1">Draft articles with rich markdown features directly loaded on the main Blog feeds.</p>
                      </div>

                      <form onSubmit={handleCreateBlogPost} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-slate-400 font-extrabold tracking-widest block uppercase">Article Title *</label>
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. 5 Crucial SEO Paradigms for 2026" 
                              className="w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden" 
                              value={newBlog.title} 
                              onChange={(e) => setNewBlog({...newBlog, title: e.target.value})} 
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-slate-400 font-extrabold tracking-widest block uppercase font-bold">Post URL Slug *</label>
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. five-seo-paradigms-2026" 
                              className="w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden" 
                              value={newBlog.slug} 
                              onChange={(e) => setNewBlog({...newBlog, slug: e.target.value})} 
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-slate-400 font-extrabold tracking-widest block uppercase font-bold">Post Category</label>
                            <select 
                              className="w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden" 
                              value={newBlog.category} 
                              onChange={(e) => setNewBlog({...newBlog, category: e.target.value as any})}
                            >
                              <option value="Web Design">Web Design</option>
                              <option value="Business Growth">Business Growth</option>
                              <option value="SEO">SEO</option>
                              <option value="Marketing">Marketing</option>
                              <option value="Branding">Branding</option>
                              <option value="AI">AI</option>
                              <option value="Technology">Technology</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-slate-400 font-extrabold tracking-widest block uppercase font-bold">Read Duration Estimate *</label>
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. 5 min read" 
                              className="w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden" 
                              value={newBlog.readTime} 
                              onChange={(e) => setNewBlog({...newBlog, readTime: e.target.value})} 
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-slate-400 font-extrabold tracking-widest block uppercase font-bold">Article Tags (comma-separated)</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Web Speed, performance, UX" 
                              className="w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden" 
                              value={newBlog.tags} 
                              onChange={(e) => setNewBlog({...newBlog, tags: e.target.value})} 
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-400 font-extrabold tracking-widest block uppercase font-bold">Cover Photo Illustration URL</label>
                          <input 
                            type="text" 
                            placeholder="e.g. https://images.unsplash.com/photo-..." 
                            className="w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden" 
                            value={newBlog.image} 
                            onChange={(e) => setNewBlog({...newBlog, image: e.target.value})} 
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-400 font-extrabold tracking-widest block uppercase font-bold">Post Excerpt Paragraph Summary *</label>
                          <textarea 
                            required
                            placeholder="A concise, enticing summary of the blog post. This will serve as the card meta details on listings." 
                            className="w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden h-20 resize-none" 
                            value={newBlog.excerpt} 
                            onChange={(e) => setNewBlog({...newBlog, excerpt: e.target.value})} 
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-400 font-extrabold tracking-widest block uppercase font-bold">Full Markdown Body Content *</label>
                          <textarea 
                            required
                            placeholder="Write your beautiful post body here using standard Markdown markup templates... (e.g., # Header, ## Subhead, **bold**)" 
                            className="w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-4 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden h-72 font-mono leading-relaxed" 
                            value={newBlog.content} 
                            onChange={(e) => setNewBlog({...newBlog, content: e.target.value})} 
                          />
                        </div>

                        <button 
                          type="submit" 
                          className="bg-blue-600 hover:bg-blue-750 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl cursor-pointer shadow-md shadow-blue-500/10 transition-colors"
                        >
                          Publish Premium Post Live
                        </button>
                      </form>
                    </div>
                  )}

                  {/* SITE ASSETS & IMAGES TAB */}
                  {adminTab === 'siteAssets' && (
                    <div className="bg-white dark:bg-slate-850 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 shadow-xs space-y-6">
                      <div>
                        <h3 className="text-base font-serif font-black text-slate-950 dark:text-white">Site Assets Config</h3>
                        <p className="text-xs text-slate-500 mt-1">Configure layout illustration URLs across the primary website screens dynamically.</p>
                      </div>

                      <form onSubmit={handleUpdateAssets} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-400 font-extrabold tracking-widest block uppercase font-bold">Hero Portait Illustration URL</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden" 
                            value={siteSettings.heroImageUrl} 
                            onChange={(e) => setSiteSettings({...siteSettings, heroImageUrl: e.target.value})} 
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-400 font-extrabold tracking-widest block uppercase font-bold">About Section Illustration URL</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden" 
                            value={siteSettings.aboutImageUrl} 
                            onChange={(e) => setSiteSettings({...siteSettings, aboutImageUrl: e.target.value})} 
                          />
                        </div>

                        <button 
                          type="submit" 
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all cursor-pointer"
                        >
                          Save Layout Assets
                        </button>
                      </form>
                    </div>
                  )}

                  {/* CRM SYSTEM ALERTS SETTINGS TAB */}
                  {adminTab === 'settings' && (
                    <div className="bg-white dark:bg-slate-850 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 shadow-xs space-y-6">
                      <div>
                        <h3 className="text-base font-serif font-black text-slate-950 dark:text-white">CRM Live Action Alerts Hooks</h3>
                        <p className="text-xs text-slate-500 mt-1">Receive webhook pings directly to Discord when users book consultations or complete contact forms.</p>
                      </div>

                      <form onSubmit={handleSaveDiscordSettings} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-400 font-extrabold tracking-widest block uppercase font-bold">Discord webhook API endpoint</label>
                          <input 
                            type="url" 
                            placeholder="https://discord.com/api/webhooks/..."
                            className="w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden" 
                            value={discordWebhookUrl} 
                            onChange={(e) => setDiscordWebhookUrl(e.target.value)} 
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            id="discord-enable-toggle" 
                            className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4 bg-slate-50 dark:bg-slate-900 cursor-pointer"
                            checked={discordEnabled} 
                            onChange={(e) => setDiscordEnabled(e.target.checked)} 
                          />
                          <label htmlFor="discord-enable-toggle" className="text-xs text-slate-755 dark:text-slate-300 font-medium select-none cursor-pointer">
                            Enable active Discord live stream alerts
                          </label>
                        </div>

                        <button 
                          type="submit" 
                          className="bg-blue-600 hover:bg-blue-750 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl cursor-pointer"
                        >
                          Synchronize Alerts Hook
                        </button>
                      </form>
                    </div>
                  )}

                </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
