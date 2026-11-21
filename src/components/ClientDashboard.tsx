import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/ThemeContext';
import {
  getBookings,
  getContacts,
  getAudits,
  getNewsletterSubscribers,
  getBlogs,
  saveBlog,
  deleteBlog,
  getSiteSettings,
  saveSiteSettings,
  getMarketplaceProducts,
  addMarketplaceProduct,
  deleteMarketplaceProduct,
  updateMarketplaceProduct,
  getMarketplaceOrders,
  updateMarketplaceOrderStatus,
  deleteMarketplaceOrder,
  syncMarketplaceFromServer,
  getCaseStudies,
  saveCaseStudy,
  deleteCaseStudy,
  getClientReviews,
  deleteClientReview,
} from '../utils/storage';
import {
  LayoutDashboard,
  Package,
  Inbox,
  FileEdit,
  LineChart,
  Lock,
  KeyRound,
  LogOut,
  Copy,
  Trash2,
  Paperclip,
  AlertTriangle,
} from 'lucide-react';
import VisitorTracker from './VisitorTracker';
import AIConversionMonitor from './AIConversionMonitor';
import { MarketplaceOrder, MarketplaceProduct, CaseStudy, ClientReview } from '../types';
import { GENERATED_ASSETS } from '../utils/generatedAssets';

type AdminPage = 'overview' | 'marketplace' | 'leads' | 'content' | 'analytics';

export default function ClientDashboard() {
  const { isWhatsAppEnabled, toggleWhatsApp } = useSettings();
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('vxt_admin_logged') === 'true'
  );
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorText, setErrorText] = useState('');

  // Clean multi-page navigation state
  const [activeSection, setActiveSection] = useState<AdminPage>('overview');
  const [marketSubTab, setMarketSubTab] = useState<'orders' | 'products' | 'addProduct'>('orders');
  const [leadsSubTab, setLeadsSubTab] = useState<'bookings' | 'contacts' | 'audits' | 'subscribers'>('bookings');
  const [contentSubTab, setContentSubTab] = useState<'blog' | 'portfolio' | 'reviews' | 'assets'>('blog');
  const [analyticsSubTab, setAnalyticsSubTab] = useState<'visitors' | 'funnel' | 'email' | 'webhooks'>('visitors');

  // Inline notification banner
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const showNotice = (text: string, type: 'success' | 'error' = 'success') => {
    setNotice({ text, type });
    setTimeout(() => setNotice(null), 4000);
  };

  // Data States
  const [bookings, setBookings] = useState<any[]>(() => getBookings());
  const [contacts, setContacts] = useState<any[]>(() => getContacts());
  const [audits, setAudits] = useState<any[]>(() => getAudits());
  const [subscribers, setSubscribers] = useState<string[]>(() => getNewsletterSubscribers());
  const [blogs, setBlogs] = useState(() => getBlogs());
  const [portfolio, setPortfolio] = useState<CaseStudy[]>(() => getCaseStudies());
  const [reviews, setReviews] = useState<ClientReview[]>(() => getClientReviews());
  const [products, setProducts] = useState<MarketplaceProduct[]>(() => getMarketplaceProducts());
  const [orders, setOrders] = useState<MarketplaceOrder[]>(() => getMarketplaceOrders());

  // Blog Form
  const [newBlog, setNewBlog] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Web Design' as any,
    readTime: '',
    image: '',
    tags: '',
  });

  // Marketplace Add Product Form
  const [newProd, setNewProd] = useState({
    title: '',
    subtitle: '',
    category: 'Power & Solar' as MarketplaceProduct['category'],
    price: '',
    compareAtPrice: '',
    description: '',
    specs: '',
    imageUrl: '',
    promoVideoUrl: '',
    warranty: 'Official Manufacturer Warranty',
    freeDeliveryEnugu: false,
    paymentOnDeliveryEnugu: false,
  });

  // Portfolio Add Project Form
  const [newCase, setNewCase] = useState({
    title: '',
    client: '',
    industry: '',
    problem: '',
    solution: '',
    technology: '',
    deliverables: '',
    liveUrl: '',
    summaryNote: '',
  });

  // Site Assets & Webhooks
  const [siteSettings, setSiteSettings] = useState(() => getSiteSettings());
  const [discordWebhookUrl, setDiscordWebhookUrl] = useState(
    () => localStorage.getItem('vxt_discord_webhook_url') || ''
  );
  const [discordEnabled, setDiscordEnabled] = useState(
    () => localStorage.getItem('vxt_discord_webhook_enabled') === 'true'
  );

  // Email Sender
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [emailAttachment, setEmailAttachment] = useState<File | null>(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const reloadAllData = () => {
    setBookings(getBookings());
    setContacts(getContacts());
    setAudits(getAudits());
    setSubscribers(getNewsletterSubscribers());
    setBlogs(getBlogs());
    setPortfolio(getCaseStudies());
    setReviews(getClientReviews());
    setProducts(getMarketplaceProducts());
    setOrders(getMarketplaceOrders());
    syncMarketplaceFromServer().then(({ products: p, orders: o }) => {
      if (p) setProducts(p);
      if (o) setOrders(o);
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      reloadAllData();
    }
  }, [isLoggedIn]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailInput.trim().toLowerCase();
    const password = passwordInput.trim();

    if (email === 'hello@udochukwu.com.ng' && password === 'Holy5346') {
      localStorage.setItem('vxt_admin_logged', 'true');
      setIsLoggedIn(true);
      setErrorText('');
      reloadAllData();
    } else {
      setErrorText('Invalid administrator email or security access key.');
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('vxt_admin_logged');
    setIsLoggedIn(false);
    setEmailInput('');
    setPasswordInput('');
  };

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setNewProd((prev) => ({ ...prev, imageUrl: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = Number(newProd.price.replace(/[^0-9.]/g, ''));
    if (!newProd.title.trim() || !numericPrice || !newProd.description.trim()) {
      showNotice('Enter product title, valid price, and description.', 'error');
      return;
    }

    const compareVal = newProd.compareAtPrice
      ? Number(newProd.compareAtPrice.replace(/[^0-9.]/g, ''))
      : undefined;

    const specsArr = newProd.specs
      .split(/\n|,/)
      .map((s) => s.trim())
      .filter(Boolean);

    const updated = addMarketplaceProduct({
      title: newProd.title.trim(),
      subtitle: newProd.subtitle.trim() || 'Official Buyfromudochukwu Listing',
      category: newProd.category,
      price: numericPrice,
      compareAtPrice: compareVal && compareVal > numericPrice ? compareVal : undefined,
      description: newProd.description.trim(),
      specs: specsArr.length > 0 ? specsArr : ['Verified Quality', 'Enugu Delivery Available'],
      images: [newProd.imageUrl.trim() || GENERATED_ASSETS.itelPowerTankCloseup],
      promoVideoUrl: newProd.promoVideoUrl.trim() || undefined,
      promoType: newProd.promoVideoUrl.trim() ? 'custom-video' : 'showcase',
      inStock: true,
      isFeatured: false,
      freeDeliveryEnugu: newProd.freeDeliveryEnugu,
      paymentOnDeliveryEnugu: newProd.paymentOnDeliveryEnugu,
      warranty: newProd.warranty.trim() || 'Official Warranty',
    });

    setProducts(updated);
    setNewProd({
      title: '',
      subtitle: '',
      category: 'Power & Solar',
      price: '',
      compareAtPrice: '',
      description: '',
      specs: '',
      imageUrl: '',
      promoVideoUrl: '',
      warranty: 'Official Manufacturer Warranty',
      freeDeliveryEnugu: false,
      paymentOnDeliveryEnugu: false,
    });
    setMarketSubTab('products');
    showNotice('Product published to Buyfromudochukwu marketplace.');
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailTo || !emailSubject || !emailMessage) {
      showNotice('Please complete recipient, subject, and message.', 'error');
      return;
    }

    setIsSendingEmail(true);
    const formData = new FormData();
    formData.append('to', emailTo);
    formData.append('subject', emailSubject);
    formData.append('message', emailMessage);
    if (emailAttachment) formData.append('attachment', emailAttachment);

    try {
      const response = await fetch('/api/send-email', { method: 'POST', body: formData });
      const result = await response.json();
      if (response.ok && result.success) {
        showNotice('Email dispatched via Resend.');
        setEmailTo('');
        setEmailSubject('');
        setEmailMessage('');
        setEmailAttachment(null);
      } else {
        showNotice(result.error || 'Failed to send email.', 'error');
      }
    } catch {
      showNotice('Network error while sending email.', 'error');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleCreateBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.slug || !newBlog.content) {
      showNotice('Fill in article title, slug, and content.', 'error');
      return;
    }

    const updated = saveBlog({
      title: newBlog.title,
      slug: newBlog.slug.replace(/\s+/g, '-').toLowerCase(),
      excerpt: newBlog.excerpt || 'Engineering insights and web strategy.',
      content: newBlog.content,
      category: newBlog.category,
      readTime: newBlog.readTime || '4 min read',
      image: newBlog.image || GENERATED_ASSETS.portfolioFintech,
      tags: newBlog.tags
        ? newBlog.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : ['Web Engineering'],
      date: new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    });
    setBlogs(updated);
    setNewBlog({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Web Design',
      readTime: '',
      image: '',
      tags: '',
    });
    showNotice('Blog post published.');
  };

  const handleCreatePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCase.client || !newCase.title || !newCase.solution) {
      showNotice('Client name, title, and solution are required.', 'error');
      return;
    }

    const updated = saveCaseStudy({
      client: newCase.client.trim(),
      title: newCase.title.trim(),
      industry: newCase.industry.trim() || 'Digital Engineering',
      problem: newCase.problem.trim() || 'Needed a custom responsive web platform.',
      solution: newCase.solution.trim(),
      technology: newCase.technology
        ? newCase.technology.split(',').map((t) => t.trim()).filter(Boolean)
        : ['React', 'TypeScript', 'Tailwind CSS'],
      deliverables: newCase.deliverables
        ? newCase.deliverables.split(',').map((d) => d.trim()).filter(Boolean)
        : ['Custom UI Architecture', 'Responsive Frontend'],
      image: GENERATED_ASSETS.portfolioSecurity,
      liveUrl: newCase.liveUrl.trim() || 'https://udochukwu.com.ng',
      summaryNote: newCase.summaryNote.trim() || 'Engineered for performance and clarity.',
    });
    setPortfolio(updated);
    setNewCase({
      title: '',
      client: '',
      industry: '',
      problem: '',
      solution: '',
      technology: '',
      deliverables: '',
      liveUrl: '',
      summaryNote: '',
    });
    showNotice('Portfolio project added.');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[82vh] bg-[#1b243b] flex items-center justify-center px-6 py-20 text-white">
        <div className="w-full max-w-md bg-[#141a2b]/85 border border-white/25 p-8 sm:p-10 space-y-6">
          <div className="space-y-3 text-left">
            <div className="h-11 w-11 bg-white/10 border border-white/25 flex items-center justify-center text-white">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-sans font-semibold text-white tracking-tight">
              Admin Console
            </h1>
            <div className="w-24 h-[1px] bg-white/80" />
            <p className="text-xs text-white/80 font-mono uppercase tracking-[0.14em] leading-relaxed">
              Sign in to manage Buyfromudochukwu inventory, orders, leads, and articles.
            </p>
          </div>

          {errorText && (
            <div className="bg-rose-950/40 border border-rose-400/50 p-3 text-xs font-mono text-rose-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorText}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-white/80 uppercase tracking-wider block">
                Administrator Email
              </label>
              <input
                type="email"
                required
                placeholder="hello@udochukwu.com.ng"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-[#181d2c] border border-white/25 px-4 py-3 text-xs font-mono text-white focus:border-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-white/80 uppercase tracking-wider block">
                Access Key
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-[#181d2c] border border-white/25 px-4 py-3 text-xs font-mono text-white focus:border-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <KeyRound className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  const sidebarItems: { id: AdminPage; label: string; icon: any; count?: number }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    {
      id: 'marketplace',
      label: 'Buyfromudochukwu',
      icon: Package,
      count: orders.filter((o) => o.status === 'Pending Confirmation').length,
    },
    {
      id: 'leads',
      label: 'Leads & Inbox',
      icon: Inbox,
      count: bookings.length + contacts.length + audits.length,
    },
    { id: 'content', label: 'Content & Portfolio', icon: FileEdit },
    { id: 'analytics', label: 'Analytics & Tools', icon: LineChart },
  ];

  const sectionTitles: Record<AdminPage, string> = {
    overview: 'Operations Overview',
    marketplace: 'Buyfromudochukwu Storefront',
    leads: 'Leads, Bookings & Inquiries',
    content: 'Articles, Portfolio & Site Media',
    analytics: 'Visitor Analytics & Tools',
  };

  return (
    <div className="min-h-[85vh] bg-[#1b243b] text-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[85vh]">
        {/* LEFT SIDEBAR NAVIGATION */}
        <aside className="lg:w-64 shrink-0 bg-[#141a2b] border-b lg:border-b-0 lg:border-r border-white/15 p-6 flex flex-col justify-between gap-6">
          <div className="space-y-6">
            <div className="border-b border-white/15 pb-4">
              <span className="text-[10px] font-mono text-white/70 uppercase tracking-[0.18em] block">
                Udochukwu Console
              </span>
              <h1 className="text-xl font-sans font-semibold text-white mt-1">Admin Dashboard</h1>
              <p className="text-[11px] font-mono text-white/65 truncate mt-0.5">
                hello@udochukwu.com.ng
              </p>
            </div>

            <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-1 lg:pb-0">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center justify-between gap-3 px-3.5 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                      isActive
                        ? 'bg-white text-slate-950 border-white'
                        : 'text-white/80 border-transparent hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </span>
                    {item.count !== undefined && item.count > 0 && (
                      <span
                        className={`text-[10px] tabular-nums px-1.5 py-0.5 ${
                          isActive ? 'bg-slate-950 text-white' : 'bg-white/15 text-white'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <button
            type="button"
            onClick={handleAdminLogout}
            className="hidden lg:flex items-center justify-center gap-2 border border-white/25 hover:border-white hover:bg-white hover:text-slate-950 text-white py-2.5 px-4 text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </aside>

        {/* MAIN CONTENT VIEWPORT */}
        <div className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 min-w-0">
          {/* Top Header Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-5">
            <div>
              <h2 className="text-2xl font-sans font-semibold text-white tracking-tight">
                {sectionTitles[activeSection]}
              </h2>
              <div className="w-24 h-[1px] bg-white/75 mt-3" />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleWhatsApp}
                className={`px-3.5 py-2 text-xs font-mono font-semibold uppercase border cursor-pointer transition-colors ${
                  isWhatsAppEnabled
                    ? 'border-white bg-white/10 text-white'
                    : 'border-white/25 bg-[#141a2b] text-white/65'
                }`}
              >
                WhatsApp: {isWhatsAppEnabled ? 'Visible' : 'Hidden'}
              </button>
              <button
                type="button"
                onClick={handleAdminLogout}
                className="lg:hidden border border-white/30 px-3.5 py-2 text-xs font-mono font-semibold uppercase text-white cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Inline Notification */}
          {notice && (
            <div
              className={`p-4 border text-xs font-mono ${
                notice.type === 'success'
                  ? 'bg-emerald-950/40 border-emerald-400/50 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-400/50 text-rose-200'
              }`}
            >
              {notice.text}
            </div>
          )}

          {/* PAGE 1: OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-[#141a2b]/75 border border-white/20 p-5">
                  <span className="text-[11px] font-mono text-white/75 uppercase block">
                    Marketplace Products
                  </span>
                  <p className="text-3xl font-sans font-semibold text-white mt-2 tabular-nums">
                    {products.length}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection('marketplace');
                      setMarketSubTab('products');
                    }}
                    className="text-xs font-mono text-white/85 hover:underline underline-offset-4 mt-3 cursor-pointer"
                  >
                    Manage inventory →
                  </button>
                </div>

                <div className="bg-[#141a2b]/75 border border-white/20 p-5">
                  <span className="text-[11px] font-mono text-white/75 uppercase block">
                    Store Orders
                  </span>
                  <p className="text-3xl font-sans font-semibold text-white mt-2 tabular-nums">
                    {orders.length}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection('marketplace');
                      setMarketSubTab('orders');
                    }}
                    className="text-xs font-mono text-white/85 hover:underline underline-offset-4 mt-3 cursor-pointer"
                  >
                    View Enugu COD orders →
                  </button>
                </div>

                <div className="bg-[#141a2b]/75 border border-white/20 p-5">
                  <span className="text-[11px] font-mono text-white/75 uppercase block">
                    Consultations
                  </span>
                  <p className="text-3xl font-sans font-semibold text-white mt-2 tabular-nums">
                    {bookings.length}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection('leads');
                      setLeadsSubTab('bookings');
                    }}
                    className="text-xs font-mono text-white/85 hover:underline underline-offset-4 mt-3 cursor-pointer"
                  >
                    Open bookings →
                  </button>
                </div>

                <div className="bg-[#141a2b]/75 border border-white/20 p-5">
                  <span className="text-[11px] font-mono text-white/75 uppercase block">
                    Inbox Inquiries
                  </span>
                  <p className="text-3xl font-sans font-semibold text-white mt-2 tabular-nums">
                    {contacts.length}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection('leads');
                      setLeadsSubTab('contacts');
                    }}
                    className="text-xs font-mono text-white/85 hover:underline underline-offset-4 mt-3 cursor-pointer"
                  >
                    Read messages →
                  </button>
                </div>

                <div className="bg-[#141a2b]/75 border border-white/20 p-5">
                  <span className="text-[11px] font-mono text-white/75 uppercase block">
                    Audit Requests
                  </span>
                  <p className="text-3xl font-sans font-semibold text-white mt-2 tabular-nums">
                    {audits.length}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection('leads');
                      setLeadsSubTab('audits');
                    }}
                    className="text-xs font-mono text-white/85 hover:underline underline-offset-4 mt-3 cursor-pointer"
                  >
                    Review audits →
                  </button>
                </div>

                <div className="bg-[#141a2b]/75 border border-white/20 p-5">
                  <span className="text-[11px] font-mono text-white/75 uppercase block">
                    Newsletter Emails
                  </span>
                  <p className="text-3xl font-sans font-semibold text-white mt-2 tabular-nums">
                    {subscribers.length}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection('leads');
                      setLeadsSubTab('subscribers');
                    }}
                    className="text-xs font-mono text-white/85 hover:underline underline-offset-4 mt-3 cursor-pointer"
                  >
                    Export list →
                  </button>
                </div>
              </div>

              <div className="bg-[#141a2b]/75 border border-white/20 p-6 space-y-4">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-white">
                  Quick Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection('marketplace');
                      setMarketSubTab('addProduct');
                    }}
                    className="border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white px-5 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    Post New Product
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection('content');
                      setContentSubTab('blog');
                    }}
                    className="border border-white/30 hover:border-white text-white px-5 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    Write Blog Article
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection('analytics');
                      setAnalyticsSubTab('email');
                    }}
                    className="border border-white/30 hover:border-white text-white px-5 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    Send Client Email
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection('analytics');
                      setAnalyticsSubTab('visitors');
                    }}
                    className="border border-white/30 hover:border-white text-white px-5 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    Live Visitor Monitor
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 2: MARKETPLACE */}
          {activeSection === 'marketplace' && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-1 bg-[#141a2b] p-1 border border-white/20 w-fit">
                {[
                  { id: 'orders', label: `Customer Orders (${orders.length})` },
                  { id: 'products', label: `Products (${products.length})` },
                  { id: 'addProduct', label: 'Post New Product' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setMarketSubTab(tab.id as any)}
                    className={`px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
                      marketSubTab === tab.id ? 'bg-white text-slate-950' : 'text-white/75 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {marketSubTab === 'orders' && (
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <div className="bg-[#141a2b]/75 border border-white/20 p-10 text-center text-xs font-mono text-white/70">
                      No orders placed on Buyfromudochukwu yet.
                    </div>
                  ) : (
                    orders.map((ord) => (
                      <div key={ord.id} className="bg-[#141a2b]/75 border border-white/20 p-5 space-y-4">
                        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/15 pb-3">
                          <div>
                            <span className="text-xs font-mono text-white/75 font-bold">
                              {ord.orderNumber}
                            </span>
                            <h3 className="text-base font-sans font-semibold text-white mt-0.5">
                              {ord.customerName} · {ord.phone}
                            </h3>
                            <p className="text-xs font-mono text-white/70">
                              {ord.city} — {ord.address}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={ord.status}
                              onChange={(e) => {
                                const updated = updateMarketplaceOrderStatus(
                                  ord.id,
                                  e.target.value as MarketplaceOrder['status']
                                );
                                setOrders(updated);
                                showNotice(`Order ${ord.orderNumber} status updated.`);
                              }}
                              className="bg-[#181d2c] border border-white/25 px-3 py-1.5 text-xs font-mono text-white"
                            >
                              <option value="Pending Confirmation">Pending Confirmation</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                            <button
                              type="button"
                              onClick={() => {
                                setOrders(deleteMarketplaceOrder(ord.id));
                                showNotice(`Order ${ord.orderNumber} removed.`);
                              }}
                              className="p-2 text-rose-300 hover:bg-rose-950/40 border border-white/20 cursor-pointer"
                              title="Delete order"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap justify-between items-center gap-4 text-xs font-mono">
                          <div className="space-y-1 text-white/85">
                            {ord.items.map((it, idx) => (
                              <div key={idx}>
                                {it.title} × {it.quantity} — ₦{(it.price * it.quantity).toLocaleString()}
                              </div>
                            ))}
                          </div>
                          <div className="text-right">
                            <span className="text-white/70 block">{ord.paymentMethod}</span>
                            <span className="text-lg font-bold text-white tabular-nums">
                              Total: ₦{ord.totalAmount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {marketSubTab === 'products' && (
                <div className="space-y-4">
                  <div className="bg-[#141a2b]/75 border border-white/20 p-4 text-xs font-mono text-white/80 flex flex-wrap items-center justify-between gap-3">
                    <span>
                      Admin-Only Catalog: Click any product on Buyfromudochukwu while logged in as Admin to edit full item details directly on its preview page, or toggle stock here.
                    </span>
                  </div>
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-[#141a2b]/75 border border-white/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <img
                          src={prod.images[0] || GENERATED_ASSETS.marketplaceHeroCollection}
                          alt={prod.title}
                          className="w-16 h-12 object-cover border border-white/20 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm font-sans font-semibold text-white truncate">
                            {prod.title}
                          </h4>
                          <p className="text-xs font-mono text-white/70 tabular-nums">
                            ₦{prod.price.toLocaleString()} · {prod.category} ·{' '}
                            {prod.inStock ? 'In Stock' : 'Out of Stock'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = updateMarketplaceProduct({
                              ...prod,
                              inStock: !prod.inStock,
                            });
                            setProducts(updated);
                            showNotice('Product stock status updated.');
                          }}
                          className="border border-white/25 hover:border-white px-3 py-1.5 text-xs font-mono text-white cursor-pointer"
                        >
                          {prod.inStock ? 'Mark Sold Out' : 'Mark In Stock'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setProducts(deleteMarketplaceProduct(prod.id));
                            showNotice('Product removed.');
                          }}
                          className="border border-rose-400/40 text-rose-300 hover:bg-rose-950/40 px-3 py-1.5 text-xs font-mono cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {marketSubTab === 'addProduct' && (
                <form
                  onSubmit={handleCreateProduct}
                  className="bg-[#141a2b]/75 border border-white/20 p-6 sm:p-8 space-y-4 max-w-3xl"
                >
                  <h3 className="text-lg font-sans font-semibold text-white">
                    Post Product to Buyfromudochukwu
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Product Title *"
                      value={newProd.title}
                      onChange={(e) => setNewProd({ ...newProd, title: e.target.value })}
                      className="bg-[#181d2c] border border-white/25 px-4 py-3 text-xs font-mono text-white focus:border-white focus:outline-none"
                    />
                    <select
                      value={newProd.category}
                      onChange={(e) => setNewProd({ ...newProd, category: e.target.value as any })}
                      className="bg-[#181d2c] border border-white/25 px-4 py-3 text-xs font-mono text-white focus:border-white focus:outline-none"
                    >
                      <option value="Power & Solar">Power &amp; Solar</option>
                      <option value="Gadgets & Tech">Gadgets &amp; Tech</option>
                      <option value="Office Systems">Office Systems</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="number"
                      required
                      placeholder="Price in NGN (e.g. 550000) *"
                      value={newProd.price}
                      onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                      className="bg-[#181d2c] border border-white/25 px-4 py-3 text-xs font-mono text-white focus:border-white focus:outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Compare Price (Optional)"
                      value={newProd.compareAtPrice}
                      onChange={(e) => setNewProd({ ...newProd, compareAtPrice: e.target.value })}
                      className="bg-[#181d2c] border border-white/25 px-4 py-3 text-xs font-mono text-white focus:border-white focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Warranty"
                      value={newProd.warranty}
                      onChange={(e) => setNewProd({ ...newProd, warranty: e.target.value })}
                      className="bg-[#181d2c] border border-white/25 px-4 py-3 text-xs font-mono text-white focus:border-white focus:outline-none"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Short Subtitle"
                    value={newProd.subtitle}
                    onChange={(e) => setNewProd({ ...newProd, subtitle: e.target.value })}
                    className="w-full bg-[#181d2c] border border-white/25 px-4 py-3 text-xs font-mono text-white focus:border-white focus:outline-none"
                  />

                  <textarea
                    rows={3}
                    required
                    placeholder="Full Product Description *"
                    value={newProd.description}
                    onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                    className="w-full bg-[#181d2c] border border-white/25 px-4 py-3 text-xs font-mono text-white focus:border-white focus:outline-none resize-none"
                  />

                  <textarea
                    rows={2}
                    placeholder="Specs (comma or newline separated)"
                    value={newProd.specs}
                    onChange={(e) => setNewProd({ ...newProd, specs: e.target.value })}
                    className="w-full bg-[#181d2c] border border-white/25 px-4 py-3 text-xs font-mono text-white focus:border-white focus:outline-none resize-none"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Image URL or upload →"
                        value={newProd.imageUrl}
                        onChange={(e) => setNewProd({ ...newProd, imageUrl: e.target.value })}
                        className="flex-1 bg-[#181d2c] border border-white/25 px-3 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none"
                      />
                      <label className="border border-white/25 px-3 py-2.5 text-xs font-mono text-white cursor-pointer hover:bg-white hover:text-slate-950 transition-colors">
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleProductImageUpload}
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="Promo Video URL (.mp4)"
                      value={newProd.promoVideoUrl}
                      onChange={(e) => setNewProd({ ...newProd, promoVideoUrl: e.target.value })}
                      className="bg-[#181d2c] border border-white/25 px-3 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-wrap gap-6 text-xs font-mono text-white/85">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newProd.freeDeliveryEnugu}
                        onChange={(e) =>
                          setNewProd({ ...newProd, freeDeliveryEnugu: e.target.checked })
                        }
                        className="accent-white"
                      />
                      <span>Free Delivery in Enugu Cities</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newProd.paymentOnDeliveryEnugu}
                        onChange={(e) =>
                          setNewProd({ ...newProd, paymentOnDeliveryEnugu: e.target.checked })
                        }
                        className="accent-white"
                      />
                      <span>Payment on Delivery in Enugu</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] cursor-pointer transition-colors"
                  >
                    Publish Product
                  </button>
                </form>
              )}
            </div>
          )}

          {/* PAGE 3: LEADS & INBOX */}
          {activeSection === 'leads' && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-1 bg-[#141a2b] p-1 border border-white/20 w-fit">
                {[
                  { id: 'bookings', label: `Bookings (${bookings.length})` },
                  { id: 'contacts', label: `Inquiries (${contacts.length})` },
                  { id: 'audits', label: `Audits (${audits.length})` },
                  { id: 'subscribers', label: `Subscribers (${subscribers.length})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setLeadsSubTab(tab.id as any)}
                    className={`px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
                      leadsSubTab === tab.id ? 'bg-white text-slate-950' : 'text-white/75 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {leadsSubTab === 'bookings' && (
                <div className="space-y-3">
                  {bookings.length === 0 ? (
                    <div className="bg-[#141a2b]/75 border border-white/20 p-10 text-center text-xs font-mono text-white/70">
                      No consultation bookings found.
                    </div>
                  ) : (
                    bookings.map((b) => (
                      <div
                        key={b.id}
                        className="bg-[#141a2b]/75 border border-white/20 p-5 flex justify-between items-start gap-4"
                      >
                        <div className="space-y-1">
                          <h4 className="text-sm font-sans font-semibold text-white">{b.name}</h4>
                          <p className="text-xs font-mono text-white/70">{b.email}</p>
                          <p className="text-xs font-mono text-white/90">
                            {b.date} · {b.timeSlot}
                          </p>
                          {b.notes && <p className="text-xs text-white/80 pt-2">{b.notes}</p>}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const next = bookings.filter((x) => x.id !== b.id);
                            setBookings(next);
                            localStorage.setItem('vxt_bookings', JSON.stringify(next));
                            showNotice('Booking removed.');
                          }}
                          className="p-2 text-rose-300 hover:bg-rose-950/40 border border-white/20 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {leadsSubTab === 'contacts' && (
                <div className="space-y-3">
                  {contacts.length === 0 ? (
                    <div className="bg-[#141a2b]/75 border border-white/20 p-10 text-center text-xs font-mono text-white/70">
                      No inbox inquiries found.
                    </div>
                  ) : (
                    contacts.map((c) => (
                      <div key={c.id} className="bg-[#141a2b]/75 border border-white/20 p-5 space-y-3">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <span className="text-[11px] font-mono text-white/75 uppercase">
                              {c.subject || 'Inquiry'}
                            </span>
                            <h4 className="text-sm font-sans font-semibold text-white">{c.name}</h4>
                            <p className="text-xs font-mono text-white/70">
                              {c.email} {c.phone ? `· ${c.phone}` : ''}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const next = contacts.filter((x) => x.id !== c.id);
                              setContacts(next);
                              localStorage.setItem('vxt_contacts', JSON.stringify(next));
                              showNotice('Inquiry removed.');
                            }}
                            className="p-2 text-rose-300 hover:bg-rose-950/40 border border-white/20 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-white/85 bg-[#181d2c] p-3.5 border border-white/15">
                          {c.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {leadsSubTab === 'audits' && (
                <div className="space-y-3">
                  {audits.length === 0 ? (
                    <div className="bg-[#141a2b]/75 border border-white/20 p-10 text-center text-xs font-mono text-white/70">
                      No audit requests found.
                    </div>
                  ) : (
                    audits.map((a) => (
                      <div
                        key={a.id}
                        className="bg-[#141a2b]/75 border border-white/20 p-5 flex justify-between items-start gap-4"
                      >
                        <div className="space-y-1">
                          <h4 className="text-sm font-sans font-semibold text-white">
                            {a.businessName}
                          </h4>
                          <p className="text-xs font-mono text-white/90">{a.website}</p>
                          <p className="text-xs font-mono text-white/70">
                            {a.email} · {a.phone} · {a.industry}
                          </p>
                          {a.challenges && <p className="text-xs text-white/80 pt-1">{a.challenges}</p>}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const next = audits.filter((x) => x.id !== a.id);
                            setAudits(next);
                            localStorage.setItem('vxt_audits', JSON.stringify(next));
                            showNotice('Audit request removed.');
                          }}
                          className="p-2 text-rose-300 hover:bg-rose-950/40 border border-white/20 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {leadsSubTab === 'subscribers' && (
                <div className="bg-[#141a2b]/75 border border-white/20 p-6 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-mono font-semibold text-white uppercase">
                      Newsletter Subscribers ({subscribers.length})
                    </h3>
                    {subscribers.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(subscribers.join(', '));
                          showNotice('Subscriber emails copied to clipboard.');
                        }}
                        className="inline-flex items-center gap-2 border border-white bg-white text-slate-950 px-4 py-2 text-xs font-mono font-semibold uppercase cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy All</span>
                      </button>
                    )}
                  </div>
                  {subscribers.length === 0 ? (
                    <p className="text-xs font-mono text-white/70">No subscribers recorded yet.</p>
                  ) : (
                    <div className="divide-y divide-white/15 border border-white/15">
                      {subscribers.map((email, idx) => (
                        <div key={idx} className="p-3 text-xs font-mono text-white/85 flex justify-between">
                          <span>{email}</span>
                          <span className="text-white/50 tabular-nums">#{idx + 1}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* PAGE 4: CONTENT & PORTFOLIO */}
          {activeSection === 'content' && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-1 bg-[#141a2b] p-1 border border-white/20 w-fit">
                {[
                  { id: 'blog', label: `Blog (${blogs.length})` },
                  { id: 'portfolio', label: `Portfolio (${portfolio.length})` },
                  { id: 'reviews', label: `Reviews (${reviews.length})` },
                  { id: 'assets', label: 'Site Images' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setContentSubTab(tab.id as any)}
                    className={`px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
                      contentSubTab === tab.id ? 'bg-white text-slate-950' : 'text-white/75 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {contentSubTab === 'blog' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <form
                    onSubmit={handleCreateBlogPost}
                    className="lg:col-span-7 bg-[#141a2b]/75 border border-white/20 p-6 space-y-4"
                  >
                    <h3 className="text-lg font-sans font-semibold text-white">
                      Publish Blog Article
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="Title *"
                        value={newBlog.title}
                        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                        className="bg-[#181d2c] border border-white/25 px-3 py-2.5 text-xs font-mono text-white"
                      />
                      <input
                        type="text"
                        required
                        placeholder="URL Slug *"
                        value={newBlog.slug}
                        onChange={(e) => setNewBlog({ ...newBlog, slug: e.target.value })}
                        className="bg-[#181d2c] border border-white/25 px-3 py-2.5 text-xs font-mono text-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <select
                        value={newBlog.category}
                        onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value as any })}
                        className="bg-[#181d2c] border border-white/25 px-3 py-2.5 text-xs font-mono text-white"
                      >
                        <option value="Web Design">Web Design</option>
                        <option value="Business Growth">Business Growth</option>
                        <option value="SEO">SEO</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Branding">Branding</option>
                        <option value="Technology">Technology</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Read time (e.g. 4 min read)"
                        value={newBlog.readTime}
                        onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
                        className="bg-[#181d2c] border border-white/25 px-3 py-2.5 text-xs font-mono text-white"
                      />
                      <input
                        type="text"
                        placeholder="Tags (comma separated)"
                        value={newBlog.tags}
                        onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
                        className="bg-[#181d2c] border border-white/25 px-3 py-2.5 text-xs font-mono text-white"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Excerpt *"
                      value={newBlog.excerpt}
                      onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                      className="w-full bg-[#181d2c] border border-white/25 px-3 py-2.5 text-xs font-mono text-white"
                    />
                    <textarea
                      rows={6}
                      required
                      placeholder="Markdown Content *"
                      value={newBlog.content}
                      onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                      className="w-full bg-[#181d2c] border border-white/25 px-3 py-2.5 text-xs font-mono text-white"
                    />
                    <button
                      type="submit"
                      className="border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      Publish Article
                    </button>
                  </form>

                  <div className="lg:col-span-5 bg-[#141a2b]/75 border border-white/20 p-6 space-y-3">
                    <h4 className="text-xs font-mono font-semibold uppercase text-white/75">
                      Published Articles
                    </h4>
                    <div className="divide-y divide-white/15">
                      {blogs.map((b) => (
                        <div key={b.id} className="py-3 flex justify-between items-start gap-3">
                          <div>
                            <p className="text-xs font-semibold text-white">{b.title}</p>
                            <span className="text-[11px] font-mono text-white/65">{b.date}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setBlogs(deleteBlog(b.id));
                              showNotice('Blog article removed.');
                            }}
                            className="text-rose-300 text-xs font-mono cursor-pointer shrink-0"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {contentSubTab === 'portfolio' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <form
                    onSubmit={handleCreatePortfolio}
                    className="lg:col-span-7 bg-[#141a2b]/75 border border-white/20 p-6 space-y-4"
                  >
                    <h3 className="text-lg font-sans font-semibold text-white">
                      Add Real Portfolio Project
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="Client Name *"
                        value={newCase.client}
                        onChange={(e) => setNewCase({ ...newCase, client: e.target.value })}
                        className="bg-[#181d2c] border border-white/25 px-3 py-2.5 text-xs font-mono text-white"
                      />
                      <input
                        type="text"
                        placeholder="Industry"
                        value={newCase.industry}
                        onChange={(e) => setNewCase({ ...newCase, industry: e.target.value })}
                        className="bg-[#181d2c] border border-white/25 px-3 py-2.5 text-xs font-mono text-white"
                      />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Project Title *"
                      value={newCase.title}
                      onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                      className="w-full bg-[#181d2c] border border-white/25 px-3 py-2.5 text-xs font-mono text-white"
                    />
                    <input
                      type="url"
                      placeholder="Live URL (https://...)"
                      value={newCase.liveUrl}
                      onChange={(e) => setNewCase({ ...newCase, liveUrl: e.target.value })}
                      className="w-full bg-[#181d2c] border border-white/25 px-3 py-2.5 text-xs font-mono text-white"
                    />
                    <textarea
                      rows={2}
                      placeholder="Project Brief / Problem"
                      value={newCase.problem}
                      onChange={(e) => setNewCase({ ...newCase, problem: e.target.value })}
                      className="w-full bg-[#181d2c] border border-white/25 px-3 py-2.5 text-xs font-mono text-white"
                    />
                    <textarea
                      rows={3}
                      required
                      placeholder="Engineering Solution *"
                      value={newCase.solution}
                      onChange={(e) => setNewCase({ ...newCase, solution: e.target.value })}
                      className="w-full bg-[#181d2c] border border-white/25 px-3 py-2.5 text-xs font-mono text-white"
                    />
                    <input
                      type="text"
                      placeholder="Tech Stack (comma separated)"
                      value={newCase.technology}
                      onChange={(e) => setNewCase({ ...newCase, technology: e.target.value })}
                      className="w-full bg-[#181d2c] border border-white/25 px-3 py-2.5 text-xs font-mono text-white"
                    />
                    <button
                      type="submit"
                      className="border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      Save Project
                    </button>
                  </form>

                  <div className="lg:col-span-5 bg-[#141a2b]/75 border border-white/20 p-6 space-y-3">
                    <h4 className="text-xs font-mono font-semibold uppercase text-white/75">
                      Active Portfolio Projects
                    </h4>
                    <div className="divide-y divide-white/15">
                      {portfolio.map((p) => (
                        <div key={p.id} className="py-3 flex justify-between items-start gap-3">
                          <div>
                            <p className="text-xs font-semibold text-white">{p.client}</p>
                            <span className="text-[11px] font-mono text-white/65">{p.industry}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setPortfolio(deleteCaseStudy(p.id));
                              showNotice('Portfolio project removed.');
                            }}
                            className="text-rose-300 text-xs font-mono cursor-pointer shrink-0"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {contentSubTab === 'reviews' && (
                <div className="bg-[#141a2b]/75 border border-white/20 p-6 space-y-4">
                  <h3 className="text-lg font-sans font-semibold text-white">
                    Submitted Client Reviews ({reviews.length})
                  </h3>
                  {reviews.length === 0 ? (
                    <p className="text-xs font-mono text-white/70">
                      No client reviews have been submitted yet.
                    </p>
                  ) : (
                    <div className="divide-y divide-white/15">
                      {reviews.map((rev) => (
                        <div key={rev.id} className="py-4 flex justify-between items-start gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-white">
                              {rev.name} — {rev.role}, {rev.company}
                            </p>
                            <p className="text-xs text-white/80">{rev.comment}</p>
                            <span className="text-[11px] font-mono text-white/65">
                              Rating: {rev.rating}/5 · {rev.submittedAt}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setReviews(deleteClientReview(rev.id));
                              showNotice('Review deleted.');
                            }}
                            className="text-rose-300 text-xs font-mono cursor-pointer shrink-0"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {contentSubTab === 'assets' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveSiteSettings(siteSettings);
                    showNotice('Site image URLs saved.');
                  }}
                  className="bg-[#141a2b]/75 border border-white/20 p-6 space-y-4 max-w-2xl"
                >
                  <h3 className="text-lg font-sans font-semibold text-white">
                    Site Portrait Image URLs
                  </h3>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-white/80 uppercase block">
                      Hero Portrait URL
                    </label>
                    <input
                      type="text"
                      value={siteSettings.heroImageUrl}
                      onChange={(e) =>
                        setSiteSettings({ ...siteSettings, heroImageUrl: e.target.value })
                      }
                      className="w-full bg-[#181d2c] border border-white/25 px-4 py-3 text-xs font-mono text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-white/80 uppercase block">
                      About Portrait URL
                    </label>
                    <input
                      type="text"
                      value={siteSettings.aboutImageUrl}
                      onChange={(e) =>
                        setSiteSettings({ ...siteSettings, aboutImageUrl: e.target.value })
                      }
                      className="w-full bg-[#181d2c] border border-white/25 px-4 py-3 text-xs font-mono text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    Save Media URLs
                  </button>
                </form>
              )}
            </div>
          )}

          {/* PAGE 5: ANALYTICS & TOOLS */}
          {activeSection === 'analytics' && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-1 bg-[#141a2b] p-1 border border-white/20 w-fit">
                {[
                  { id: 'visitors', label: 'Live Visitors' },
                  { id: 'funnel', label: 'Funnel Insights' },
                  { id: 'email', label: 'Send Email' },
                  { id: 'webhooks', label: 'Discord Alerts' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setAnalyticsSubTab(tab.id as any)}
                    className={`px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
                      analyticsSubTab === tab.id ? 'bg-white text-slate-950' : 'text-white/75 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className={analyticsSubTab === 'visitors' ? 'block' : 'hidden'}>
                <VisitorTracker />
              </div>

              {analyticsSubTab === 'funnel' && <AIConversionMonitor />}

              {analyticsSubTab === 'email' && (
                <form
                  onSubmit={handleSendEmail}
                  className="bg-[#141a2b]/75 border border-white/20 p-6 space-y-4 max-w-2xl"
                >
                  <h3 className="text-lg font-sans font-semibold text-white">
                    Send Branded Email (Resend)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="email"
                      required
                      placeholder="Recipient Email *"
                      value={emailTo}
                      onChange={(e) => setEmailTo(e.target.value)}
                      className="bg-[#181d2c] border border-white/25 px-4 py-3 text-xs font-mono text-white"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Subject *"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="bg-[#181d2c] border border-white/25 px-4 py-3 text-xs font-mono text-white"
                    />
                  </div>
                  <textarea
                    rows={6}
                    required
                    placeholder="Email message *"
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    className="w-full bg-[#181d2c] border border-white/25 px-4 py-3 text-xs font-mono text-white"
                  />
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 border border-white/25 px-4 py-2 text-xs font-mono text-white cursor-pointer hover:border-white">
                      <Paperclip className="w-4 h-4" />
                      <span>{emailAttachment ? emailAttachment.name : 'Attach File'}</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setEmailAttachment(e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={isSendingEmail}
                    className="border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer disabled:opacity-50 transition-colors"
                  >
                    {isSendingEmail ? 'Sending...' : 'Send Email'}
                  </button>
                </form>
              )}

              {analyticsSubTab === 'webhooks' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    localStorage.setItem('vxt_discord_webhook_url', discordWebhookUrl);
                    localStorage.setItem(
                      'vxt_discord_webhook_enabled',
                      discordEnabled ? 'true' : 'false'
                    );
                    showNotice('Discord alert settings saved.');
                  }}
                  className="bg-[#141a2b]/75 border border-white/20 p-6 space-y-4 max-w-2xl"
                >
                  <h3 className="text-lg font-sans font-semibold text-white">
                    Discord Webhook Alerts
                  </h3>
                  <input
                    type="url"
                    placeholder="https://discord.com/api/webhooks/..."
                    value={discordWebhookUrl}
                    onChange={(e) => setDiscordWebhookUrl(e.target.value)}
                    className="w-full bg-[#181d2c] border border-white/25 px-4 py-3 text-xs font-mono text-white"
                  />
                  <label className="flex items-center gap-2 text-xs font-mono text-white/85 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={discordEnabled}
                      onChange={(e) => setDiscordEnabled(e.target.checked)}
                      className="accent-white"
                    />
                    <span>Enable Discord webhook notifications</span>
                  </label>
                  <button
                    type="submit"
                    className="border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    Save Webhook Settings
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
