import { 
  BlogPost, 
  BlogComment,
  CaseStudy, 
  ServicePackage, 
  ResourceItem,
  AuditSubmission,
  ContactSubmission,
  Booking,
  ClientDashboardProgress
} from '../types';

// Pre-loaded Case Studies (Fully Detailed Case Studies, African Business Oriented)
export const PRELOADED_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-01',
    title: 'How Eko Haven Resorts Slashed Broker Commissions by 68% with a 0.7s Direct Booking Engine',
    client: 'Eko Haven Luxury Apartments & Boutique Hotel (Lagos)',
    industry: 'Hospitality & Real Estate',
    problem: 'Eko Haven relied heavily on Booking.com and Expedia, giving away 18-20% commission on every stay. Their previous website was slow, taking 6.4 seconds to load on local MTN and Airtel mobile networks, causing an 82% booking cart bounce rate.',
    solution: 'We fully redesigned the hotel portal as a lightweight, lightning-fast progressive direct-booking web app. We removed bloated third-party widgets, implemented ultra-low latency image delivery, and optimized a 2-step bedside reservation check-out mapped to an automated local WhatsApp reservation confirmation system.',
    technology: ['React', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Cloudflare CDN'],
    results: {
      conversionIncrease: '+295% Direct Reservations',
      speedImprovement: '0.7s MTN Mobile Load Speed',
      trafficIncrease: '144% Google organic uplift',
      revenueGrowth: '₦24.8M Saved in annual commissions'
    },
    beforeImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=50', // placeholder or we can use project mockup
    afterImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', // Our generated asset!
    liveUrl: '#live-preview',
    highlightText: 'The redesign transformed their brand image, making them look like a five-star global destination, while transferring critical profits back to their local operations.'
  },
  {
    id: 'case-02',
    title: 'Transforming Landstone Realty into an Africa Lead Generation Machine: ₦180M in High-Net-Worth Sales Pipelines',
    client: 'Landstone Premium Properties (Abuja & Lekki)',
    industry: 'Real Estate & Construction',
    problem: 'Landstone was hunting for high-net-worth real estate buyers using Instagram DMs and static PDF brochures. Serious corporate clients and diaspora investors doubted their credibility due to an outdated, insecure website with buggy search filters.',
    solution: 'We designed a modern, prestige-tier real estate catalog styled on European minimalist layouts. We deployed specialized virtual tours, a dynamic neighborhood lifestyle guide, and integrated a subtle, high-converting "Diaspora Investment Kit" lead capture modal.',
    technology: ['React', 'Tailwind', 'Search Schema', 'D3.js Market Trends', 'Intercom API'],
    results: {
      conversionIncrease: '+412% Inbound Lead Count',
      speedImprovement: '98/100 Core Web Vitals',
      trafficIncrease: '340% increase in diaspora traffic',
      revenueGrowth: '₦180M generated in organic sales pipeline'
    },
    beforeImage: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=50',
    afterImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', // Our generated luxury real estate asset!
    liveUrl: '#live-preview',
    highlightText: 'Udochukwu understood our elite customer profile. Every element on the platform exudes trust, making diaspora wire transfers frictionless.'
  }
];

// Premium Packages
export const PRELOADED_SERVICES: ServicePackage[] = [
  {
    id: 'svc-01',
    name: 'The Enterprise Growth System',
    tagline: 'Best for established African businesses wanting to build trust, command higher fees, and automate client acquisition.',
    priceRange: '₦1,850,000+',
    timeline: '4 - 6 Weeks',
    targetAudience: 'Real Estate Developers, Hotels, Elite Law Firms, Private Schools, Private Hospitals',
    benefits: [
      'Position your business as the premium market leader',
      'Slash customer acquisition cost by getting direct organic leads',
      'Double or triple corporate credibility for high-ticket contracts'
    ],
    features: [
      'Tailored Premium Brand Strategy & Copywriting',
      'Ultra-Premium Custom Layout Design (No templates)',
      '100% Responsive React Coding',
      'Advanced Speed & Local Network Optimization (MTN/Airtel load-times <1.5s)',
      'Full Local SEO Architecture (Schema, Keywords matching)',
      '2-Year Enterprise Support, SLA, & Security updates'
    ],
    conversionFocus: 'High-intent consult booking, direct sales funnel, customized interactive calculator.'
  },
  {
    id: 'svc-02',
    name: 'High-Converting Landing & Funnel Kit',
    tagline: 'Perfect for fast-growing startups and coaches looking to launch a product, service, or advertisement campaign instantly.',
    priceRange: '₦850,000+',
    timeline: '2 Weeks',
    targetAudience: 'SaaS Startups, Brand Consultants, Professional Services, Restaurants, Fashion Brands',
    benefits: [
      'Maximized conversion rate on paid traffic (Google/Meta ADS)',
      'Clean, authoritative presentation of single value propositions',
      'Instant trust metrics and micro-transaction setups'
    ],
    features: [
      'Conversion-centered visual hierarchy & layout styling',
      'Deep Customer Psychographics Copywriting',
      'Interactive form & quiz builder integration',
      'Blazing fast cloud deployment for instant mobile access',
      'Social proof, badging, and automated lead responders setup'
    ],
    conversionFocus: 'Instant contact submissions, lead magnet requests, direct WhatsApp bookings.'
  },
  {
    id: 'svc-03',
    name: 'Website Redesigns & Performance Optimization',
    tagline: 'Specifically for companies with slow, outdated platforms that lose half of their organic visitors to competitors.',
    priceRange: '₦1,200,000+',
    timeline: '3 Weeks',
    targetAudience: 'E-commerce Brands, Logistics, Hotels needing a performance overhaul',
    benefits: [
      'Reclaim lost customers leaving due to 4s+ load times',
      'Modernize brand-trust and meet safety compliances',
      'Dramatic rank increases on Google Search console'
    ],
    features: [
      'Complete structural and visual UX rewrite',
      'Mobile core optimization (compression of assets, code-splitting)',
      'SEO audit, transition maps, redirection setups',
      'Core Web Vitals scoring raised to 95+ globally',
      'Modern security architecture (SSL, DDOS protection, Secure headers)'
    ],
    conversionFocus: 'A/B tested lead paths, interactive customer journeys, clear contextual buttons.'
  }
];

// Pre-loaded SEO Optimized blog posts
export const PRELOADED_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Why Slow Websites are Quietly Killing African Businesses (And How to Fix It)',
    slug: 'why-slow-websites-kill-nigerian-businesses',
    excerpt: '92% of African internet traffic is on mobile. With unstable network speeds, a website that loads in 4 seconds in Lagos can take 15 seconds in Port Harcourt, costing millions in lost customers. Discover the MTN/Airtel optimization blueprint.',
    content: `## The Mobile Reality of the African Market

Did you know that according to web telemetry, over **92% of internet traffic in Africa originates from mobile devices**? More importantly, most of these prospects are browsing on standard 3G/4G networks provided by MTN, Airtel, and Glo.

When a consultant in Lekki or an investor in Houston clicks on your website from an Instagram ad or Google Search, they expect immediate feedback. 

If your website takes more than 3 seconds to load:
1. They press the "back" button.
2. They click on your competitor’s link.
3. You lose that lead forever, but you still pay Meta or Google for the advertising click!

### The Cost of Visual Bloat

Many generic web designers build platforms using heavy, unoptimized WordPress templates and heavy builders (like Elementor or Divi). While these look decent in a designer's air-conditioned studio running fiber-optic Wi-Fi, they are complete disasters on a client's standard 4G phone in Ikeja during rush hour.

These tools pull in hundreds of heavy files:
- Multiple uncompressed premium fonts
- Standard stock photos that are 5MB each instead of 100KB
- Bloated third-party javascript trackers
- Outdated, insecure plugins

### The Solution: The Lightweight Speed Blueprint

To build websites that convert African citizens, we implement strict engineering principles:

1. **Modern Frontend Bundling**: We build using Vite, React, and lightweight Tailwind CSS. This strips away unnecessary code, producing files that take mere kilobytes instead of megabytes.
2. **Next-Gen Asset Formatting**: All photographs are converted to WebP or AVIF structures, compressed with professional algorithms while retaining elegant crispness.
3. **Smart Lazy Loading**: Offscreen images and scripts are only called when a user scrolls to Web sections, protecting the mobile user's active internet data.
4. **Local Content Delivery Networks (CDNs)**: We map platforms via cloud architectures with secondary nodes right in Lagos and Johannesburg, delivering content within milliseconds instead of round-tripping to European servers.

By transforming Eko Haven's speed from 6.4 seconds down to **0.7 seconds**, their direct reservations immediately zoomed by **295%**. In business terms, speed isn't a technical detail—it is directly tied to your bank balance.`,
    category: 'Web Design',
    readTime: '5 min read',
    date: 'June 10, 2026',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=60',
    views: 342,
    likes: 88,
    comments: [],
    tags: ['Mobile Speed', 'Web Design', 'Africa Business', 'Conversion Optimization']
  },
  {
    id: 'blog-2',
    title: 'Local SEO Mastery: How to Rank #1 on Google for High-Value Search Queries in Lagos and Abuja',
    slug: 'local-seo-nigeria-businesses-guide',
    excerpt: 'Acquiring clients via paid advertisements is getting more expensive every minute. Learn the exact keyword mappings and Google schema blueprints Udochukwu uses to generate organic, free high-ticket corporate leads.',
    content: `## Stop Advertising and Start Getting Discovered

If your digital marketing strategy is solely relying on Facebook ads, Instagram reels, and continuous monthly spends, you are building your house on rented land. Advertisement costs are increasing by roughly 35% year-on-year in Africa. 

The moment you pause your daily ad budget, your customer flow goes dry.

The alternative? **Search Engine Optimization (SEO) structured around High-Value Intent Queries.**

### What is a "High-Value Intent Query"?

A high-value query is NOT standard keywords like "Real Estate Africa" which are hyper-competitive and dominated by giant aggregators.

Instead, we target high-converting queries written by customers with direct wallets in hand:
- *“Luxury apartments for sale in Ikoyi”*
- *“Top corporate commercial law firms in Lekki”*
- *“Boutique hotel booking wedding venue Abuja”*

These queries have smaller overall search volumes, but the conversion rate is **10 to 15 times higher** because the searcher is already looking to spend money immediately.

### The African SEO Execution Plan

Here is the exact framework I used to rank Landstone Properties on page 1 of Google Search:

1. **Schema Markup (JSON-LD)**: We write clean structured code behind your pages telling Google’s crawlers exactly what your business offers, what your local addresses are, and what ratings your customers have awarded you.
2. **Locational Authority Landings**: If you serve customers in Lagos, Abuja, and Port Harcourt, we don't just dump all text on a contact page. We configure bespoke locational landings packed with rich local context.
3. **Structured Objections Content**: Write high-quality, long-form content directly answering common customer questions. This ranks your business under Google's "People Also Ask" cards, securing free global desktop real-estate on search results.

Want to dominate your niche? Make sure your platform is built on modern code, not heavy legacy page templates that Google's mobile bots downgrade automatically due to layout shifts.`,
    category: 'SEO',
    readTime: '6 min read',
    date: 'May 24, 2026',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=60',
    views: 289,
    likes: 74,
    comments: [],
    tags: ['SEO', 'Marketing', 'Lagos Corporate', 'Business Growth']
  },
  {
    id: 'blog-3',
    title: 'The Psychology of Premium: Why African Customers Will Happily Pay 5x More for Your Service',
    slug: 'psychology-of-premium-brand-value',
    excerpt: 'Competing on price is a race to the bottom. To charge high-ticket fees, you must project absolute security, extreme competence, and professional luxury. Here is how premium layout design changes company pricing forever.',
    content: `## The Race to the Bottom

The easiest mistake a business in Africa can make is trying to be the "cheapest option" in their industry. When you compete on price:
- You attract stressful, micro-managing clients who demand the world.
- Your profit margins remain thin, leaving you no budget for premium staff or high-quality delivery.
- Your brand becomes classified as "low quality." Once you are tagged low-priced, it is nearly impossible to raise your prices without triggering customer pushback.

How do elite firms like VXTGrid Services or luxury real estate giants charge 5x-10x the market average while having clients queue up to work with them?

It boils down to **Visual Credibility and Risk Mitigation.**

### High Prices Mandate Low Risk

To make a corporate client or wealthy diaspora founder invest millions in your services, you must remove all **perceived risk** from the equation.

A potential client judges risk in the first **5 seconds** of arriving on your website:
- **Low Trust Signals**: A generic design, slow layout speeds, a generic gmail address, blurry icons, cookie-cutter templates, and confusing descriptions indicating you are a "full stack specialist catering to everything."
- **High Trust Signals**: Custom, bespoke layout structures utilizing generous whitespace, elite responsive mobile speed, crystal clear messaging addressing direct cash flow goals, prominent case-study metrics, and real portraits establishing identity.

### Visual Polish is the Value Multiplier

When your web presence looks premium, you don't need to beg. The design does the selling for you.

We call this "Architectural Honesty". Your platform must prove you are a serious corporate operator. Luxury is quiet—it relies on beautiful typography pairing, generous margin breathing room, high contrast dark-slate/white combinations, and subtle interactive UI transitions.

If your website looks like it cost ₦50,000 to construct, don't be surprised when clients offer to pay you ₦50,000 for your elite corporate knowledge. Upgrade your layout, upgrade your pricing.`,
    category: 'Business Growth',
    readTime: '4 min read',
    date: 'April 19, 2026',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=60',
    views: 410,
    likes: 120,
    comments: [],
    tags: ['Branding', 'Business Strategy', 'Pricing Power', 'Sales Convert']
  }
];

// Pre-loaded downloadable resources (Guides)
export const PRELOADED_RESOURCES: ResourceItem[] = [
  {
    id: 'res-01',
    title: 'The 2026 Corporate Website Planning & Budgeting Blueprint',
    type: 'Template',
    description: 'The exact editable outline, timeline builder, and pricing guide Udochukwu uses during exploratory sessions. Avoid costly alignment errors and scope crept pitfalls before hiring a designer.',
    downloadUrl: 'Planning_Blueprint.pdf',
    fileSize: '1.4 MB',
    downloadCount: 382
  },
  {
    id: 'res-02',
    title: 'High-Velocity SEO & Schema Checklist for Local Markets',
    type: 'Checklist',
    description: 'A 24-step technical audit checklist designed specifically for African corporate sites to align visual titles, rich-results headers, locational index tags, and speed up Google Search rankings.',
    downloadUrl: 'Local_SEO_Checklist.pdf',
    fileSize: '950 KB',
    downloadCount: 476
  },
  {
    id: 'res-03',
    title: 'Unlocking Direct Digital Growth in Africa Hospitality',
    type: 'PDF Guide',
    description: 'A rich business strategy document detailing how local hotels can bypass OTA fees, optimize reservation flow charts, and integrate direct-banking local checkouts.',
    downloadUrl: 'Hospitality_Direct_Growth_Guide.pdf',
    fileSize: '2.8 MB',
    downloadCount: 219
  }
];

// Default Project tracker progress
export const DEFAULT_CLIENT_PROGRESS: ClientDashboardProgress = {
  projectTitle: 'Eko Haven Booking Suite Overhaul',
  clientName: 'Dele Balogun (MD, Eko Haven Apartments)',
  currentPhase: 'SEO & Launch',
  completionPercent: 88,
  timeline: [
    {
      phase: 'Discovery & Client Persona Mapping',
      date: 'May 02, 2026',
      status: 'completed',
      description: 'Defined direct booking triggers, audience profile, and mapped conversion indicators.'
    },
    {
      phase: 'High-Prestige Interface Layouts',
      date: 'May 16, 2026',
      status: 'completed',
      description: 'Designed Awwwards-style UI models for boutique apartments, checking checkout funnels.'
    },
    {
      phase: 'Production-Grade Coding (Vite + React)',
      date: 'June 01, 2026',
      status: 'completed',
      description: 'Coded high-performance responsive frontend, securing under 1-second MTN mobile response.'
    },
    {
      phase: 'Locational Schema & Direct Booking Integrations',
      date: 'June 14, 2026',
      status: 'completed',
      description: 'Structured metadata parameters and synced automated booking reminders on WhatsApp.'
    },
    {
      phase: 'Google Search Console Handover & Trainee Support',
      date: 'June 26, 2026',
      status: 'current',
      description: 'Analyzing final Web Vital index lists, launching live catalog on public domains.'
    }
  ],
  files: [
    {
      id: 'f-1',
      name: 'EkoHaven_Site_Sitemap_Architecture.pdf',
      size: '1.2 MB',
      url: '#',
      uploadedBy: 'Udochukwu',
      uploadedAt: 'May 06, 2026'
    },
    {
      id: 'f-2',
      name: 'High_Res_Suites_Portraits_Asset_Kit.zip',
      size: '24.5 MB',
      url: '#',
      uploadedBy: 'Client',
      uploadedAt: 'May 18, 2026'
    },
    {
      id: 'f-3',
      name: 'VXT_Services_Invoice_054_Paid.pdf',
      size: '344 KB',
      url: '#',
      uploadedBy: 'Udochukwu',
      uploadedAt: 'May 20, 2026'
    }
  ],
  invoices: [
    {
      id: 'inv-1',
      invoiceNumber: 'INV-2026-054',
      amount: '₦925,000.00',
      status: 'Paid',
      issuedDate: 'May 03, 2026',
      dueDate: 'May 10, 2026'
    },
    {
      id: 'inv-2',
      invoiceNumber: 'INV-2026-068',
      amount: '₦925,000.00',
      status: 'Outstanding',
      issuedDate: 'June 01, 2026',
      dueDate: 'June 20, 2026'
    }
  ],
  messages: [
    {
      id: 'm-1',
      sender: 'Udochukwu',
      content: 'Hello Dele, I have uploaded the updated sitemap. We altered the room check-out layout so MTN/Airtel bookers do not have to write their credit cards multiple times.',
      sentAt: 'May 06, 2026, 11:30 AM'
    },
    {
      id: 'm-2',
      sender: 'Client',
      content: 'I must say this is exceptionally thoughtful, Udochukwu! I downloaded the outline, it is clean. Photos are zipped and uploaded above.',
      sentAt: 'May 18, 2026, 04:15 PM'
    },
    {
      id: 'm-3',
      sender: 'Udochukwu',
      content: 'Excellent! Got the photography kit. Coding the boutique interfaces now. Target MTN load times will be under 1 second.',
      sentAt: 'May 19, 2026, 09:00 AM'
    }
  ]
};

// STORAGE ACTIONS MAPPING
export const getAudits = (): AuditSubmission[] => {
  try {
    const audits = localStorage.getItem('vxt_audits');
    return audits ? JSON.parse(audits) : [];
  } catch (e) {
    return [];
  }
};

export const saveAudit = (submission: Omit<AuditSubmission, 'id' | 'submittedAt' | 'status'>): AuditSubmission => {
  const list = getAudits();
  const newItem: AuditSubmission = {
    ...submission,
    id: `audit-${Math.random().toString(36).substr(2, 9)}`,
    submittedAt: new Date().toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric' }) + ' ' + new Date().toLocaleDateString(),
    status: 'Pending Analysis',
    reportId: `REP-${Math.floor(100000 + Math.random() * 900000)}`
  };
  list.unshift(newItem);
  localStorage.setItem('vxt_audits', JSON.stringify(list));
  return newItem;
};

export const getBookings = (): Booking[] => {
  try {
    const b = localStorage.getItem('vxt_bookings');
    return b ? JSON.parse(b) : [];
  } catch (e) {
    return [];
  }
};

export const saveBooking = (b: Omit<Booking, 'id' | 'createdAt'>): Booking => {
  const list = getBookings();
  const newItem: Booking = {
    ...b,
    id: `bk-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toLocaleDateString()
  };
  list.unshift(newItem);
  localStorage.setItem('vxt_bookings', JSON.stringify(list));
  return newItem;
};

export const getContacts = (): ContactSubmission[] => {
  try {
    const c = localStorage.getItem('vxt_contacts');
    return c ? JSON.parse(c) : [];
  } catch (e) {
    return [];
  }
};

export const saveContact = (c: Omit<ContactSubmission, 'id' | 'submittedAt'>): ContactSubmission => {
  const list = getContacts();
  const newItem: ContactSubmission = {
    ...c,
    id: `ct-${Math.random().toString(36).substr(2, 9)}`,
    submittedAt: new Date().toLocaleString()
  };
  list.unshift(newItem);
  localStorage.setItem('vxt_contacts', JSON.stringify(list));
  return newItem;
};

export const getBlogs = (): BlogPost[] => {
  try {
    const stored = localStorage.getItem('vxt_blogs');
    if (!stored) {
      localStorage.setItem('vxt_blogs', JSON.stringify(PRELOADED_BLOGS));
      return PRELOADED_BLOGS;
    }
    return JSON.parse(stored);
  } catch (e) {
    return PRELOADED_BLOGS;
  }
};

export const saveBlogComment = (blogId: string, comment: Omit<BlogComment, 'id' | 'createdAt'>): BlogPost[] => {
  const blogs = getBlogs();
  const updated = blogs.map(b => {
    if (b.id === blogId) {
      const comments = b.comments || [];
      const newComment: BlogComment = {
        ...comment,
        id: `com-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      };
      return {
        ...b,
        comments: [...comments, newComment]
      };
    }
    return b;
  });
  localStorage.setItem('vxt_blogs', JSON.stringify(updated));
  return updated;
};

export const saveBlog = (blog: Omit<BlogPost, 'id' | 'views' | 'likes' | 'comments'>): BlogPost[] => {
  const blogs = getBlogs();
  const newBlog: BlogPost = {
    ...blog,
    id: `blog-${Math.random().toString(36).substr(2, 9)}`,
    views: 0,
    likes: 0,
    comments: [],
  };
  const updated = [newBlog, ...blogs];
  localStorage.setItem('vxt_blogs', JSON.stringify(updated));
  return updated;
};

export const getNewsletterSubscribers = (): string[] => {
  try {
    const s = localStorage.getItem('vxt_subscribers');
    return s ? JSON.parse(s) : [];
  } catch (e) {
    return [];
  }
};

export interface SiteSettings {
  aboutImageUrl: string;
  heroImageUrl: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  aboutImageUrl: 'https://res.cloudinary.com/drghjqbak/image/upload/q_auto/f_auto/v1781784160/1781783831624_2_u3nqbc.jpg',
  heroImageUrl: 'https://res.cloudinary.com/drghjqbak/image/upload/q_auto/f_auto/v1781784160/1781783831624_2_u3nqbc.jpg'
};

export const getSiteSettings = (): SiteSettings => {
  try {
    const s = localStorage.getItem('vxt_site_settings');
    let parsed = s ? JSON.parse(s) : DEFAULT_SETTINGS;
    const oldUnsplashDefault = 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80';
    if (parsed.aboutImageUrl?.startsWith('/assets/images/') || parsed.aboutImageUrl === oldUnsplashDefault) parsed.aboutImageUrl = DEFAULT_SETTINGS.aboutImageUrl;
    if (parsed.heroImageUrl?.startsWith('/assets/images/') || parsed.heroImageUrl === oldUnsplashDefault) parsed.heroImageUrl = DEFAULT_SETTINGS.heroImageUrl;
    return parsed;
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
};

export const saveSiteSettings = (settings: SiteSettings): void => {
  localStorage.setItem('vxt_site_settings', JSON.stringify(settings));
};

export const saveNewsletterSubscriber = (email: string): boolean => {
  const list = getNewsletterSubscribers();
  if (list.includes(email.trim().toLowerCase())) return false;
  list.push(email.trim().toLowerCase());
  localStorage.setItem('vxt_subscribers', JSON.stringify(list));
  return true;
};

export const getClientDashboardData = (): ClientDashboardProgress => {
  try {
    const stored = localStorage.getItem('vxt_client_dashboard');
    if (!stored) {
      localStorage.setItem('vxt_client_dashboard', JSON.stringify(DEFAULT_CLIENT_PROGRESS));
      return DEFAULT_CLIENT_PROGRESS;
    }
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_CLIENT_PROGRESS;
  }
};

export const updateDashboardData = (data: ClientDashboardProgress): void => {
  localStorage.setItem('vxt_client_dashboard', JSON.stringify(data));
};
