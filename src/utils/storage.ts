import {
  BlogPost,
  BlogComment,
  CaseStudy,
  ServicePackage,
  ResourceItem,
  AuditSubmission,
  ContactSubmission,
  Booking,
  ClientReview,
  MarketplaceProduct,
  MarketplaceOrder,
  ProductReview,
} from '../types';
import { GENERATED_ASSETS } from './generatedAssets';

// Real Engineering Portfolio Projects (Factual scope, zero fabricated statistics)
export const PRELOADED_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-truispay',
    title: 'Engineering Truispay.co: A Responsive Digital Wallet Platform',
    client: 'Truispay',
    industry: 'Fintech & Digital Payments',
    problem:
      'Truispay needed a clean, responsive digital wallet web interface built for clarity during onboarding, balance management, and rapid fund transfers.',
    solution:
      'Engineered a responsive fintech portal with structured account flows, clear transaction history layouts, and modular React components designed for reliability on mobile connections.',
    technology: ['React', 'Node.js', 'Tailwind CSS', 'Transaction Ledgers', 'Bank APIs'],
    deliverables: [
      'Responsive Wallet UI',
      'Streamlined Onboarding Flow',
      'Transaction Ledger Views',
      'Mobile-First Optimization',
    ],
    image: GENERATED_ASSETS.portfolioFintech,
    liveUrl: 'https://truispay.co',
    summaryNote:
      'Built from the ground up with clean component architecture focused on trust, speed, and everyday usability.',
  },
  {
    id: 'case-omnixmarket',
    title: 'Building OmnixMarket.online: Automated Digital Services Marketplace',
    client: 'OmnixMarket',
    industry: 'Digital Commerce',
    problem:
      'OmnixMarket required an organized storefront capable of presenting digital service packages clearly and processing high-frequency customer orders without layout clutter.',
    solution:
      'Developed a structured marketplace interface with fast service category filtering, API-driven fulfillment hooks, and a straightforward checkout experience.',
    technology: ['React', 'Next.js', 'Payment Gateways', 'Fulfillment APIs', 'Tailwind CSS'],
    deliverables: [
      'Service Catalog Architecture',
      'Automated Order API Integration',
      'Wallet & Checkout Interface',
      'Responsive Dashboard',
    ],
    image: GENERATED_ASSETS.itelPowerTankCloseup,
    liveUrl: 'https://omnixmarket.online',
    summaryNote:
      'Focused on removing checkout friction so customers can browse services and place automated orders smoothly.',
  },
  {
    id: 'case-globalsentinel',
    title: 'Enterprise Web Presence for Global Sentinel Group',
    client: 'Global Sentinel Group',
    industry: 'Private Security & Risk Management',
    problem:
      'Global Sentinel Group needed a formal corporate web presence that clearly communicated operational capabilities and service divisions to enterprise prospects.',
    solution:
      'Crafted an authoritative corporate portal featuring structured service briefings, executive typography, and fast static asset delivery.',
    technology: ['Vite', 'React', 'Motion', 'Tailwind CSS', 'CDN Delivery'],
    deliverables: [
      'Corporate Brand Portal',
      'Service Division Briefings',
      'Direct Enterprise Inquiry Flow',
      'Technical SEO Structure',
    ],
    image: GENERATED_ASSETS.portfolioSecurity,
    liveUrl: 'https://globalsentinelgroup.com',
    summaryNote:
      'Designed with disciplined layout hierarchy and restrained dark-slate styling suited to institutional security.',
  },
];

// Service Packages (Authentic pricing and deliverables without fabricated claims)
export const PRELOADED_SERVICES: ServicePackage[] = [
  {
    id: 'svc-01',
    name: 'The Enterprise Growth System',
    tagline:
      'Built for established businesses seeking custom React engineering, strong brand credibility, and structured lead capture.',
    priceRange: '₦1,850,000+',
    timeline: '4 - 6 Weeks',
    targetAudience: 'Real Estate Developers, Hotels, Law Firms, Private Schools, Clinics',
    benefits: [
      'Custom React codebase tailored specifically to your business model',
      'Direct inquiry and booking workflows without middleman dependency',
      'Clean typography and layout structure that builds client confidence',
    ],
    features: [
      'Tailored Brand Strategy & Copy Structure',
      'Custom Layout Architecture (No generic templates)',
      '100% Responsive React & TypeScript Build',
      'Mobile Network Asset Compression & Optimization',
      'Technical SEO Architecture (Schema & Semantic HTML)',
      'Post-Launch Support & Security Maintenance',
    ],
    conversionFocus: 'Direct consultation booking, service scoping, and clear lead intake.',
  },
  {
    id: 'svc-02',
    name: 'High-Converting Landing & Funnel Kit',
    tagline:
      'Designed for growing brands and product launches needing a focused, fast-loading campaign destination.',
    priceRange: '₦850,000+',
    timeline: '2 Weeks',
    targetAudience: 'Startups, Product Launches, Consultants, Restaurants, Retail Brands',
    benefits: [
      'Clear presentation of a single core offer or product line',
      'Direct WhatsApp and form routing for immediate follow-up',
      'Lightweight mobile bundle for reliable loading on cellular data',
    ],
    features: [
      'Focused Visual Hierarchy & Offer Presentation',
      'Interactive Lead Capture & Inquiry Forms',
      'Fast Cloud Deployment',
      'Direct WhatsApp & Email Notification Hooks',
    ],
    conversionFocus: 'Instant inquiry submissions and direct WhatsApp ordering.',
  },
  {
    id: 'svc-03',
    name: 'Website Redesign & Performance Optimization',
    tagline:
      'For businesses replacing slow, bloated templates with clean, maintainable frontend engineering.',
    priceRange: '₦1,200,000+',
    timeline: '3 Weeks',
    targetAudience: 'E-commerce Stores, Logistics Firms, Hospitality & Corporate Portals',
    benefits: [
      'Eliminate heavy page-builder bloat and unused scripts',
      'Modernize layout clarity across desktop and mobile screens',
      'Improve search crawlability with clean semantic structure',
    ],
    features: [
      'Complete Structural & Visual UX Rewrite',
      'Asset Compression & Code-Splitting',
      'URL Redirect Mapping & Technical SEO Cleanup',
      'SSL, Security Headers & Hosting Migration Support',
    ],
    conversionFocus: 'Clear customer journeys and frictionless mobile navigation.',
  },
  {
    id: 'svc-04',
    name: 'Search Engine Optimization (SEO)',
    tagline:
      'Technical SEO structure and local search setup to help qualified buyers find your business organically.',
    priceRange: 'Custom Retainer',
    timeline: 'Ongoing',
    targetAudience: 'Established businesses targeting high-intent regional search queries.',
    benefits: [
      'Clean metadata and Schema.org structured markup',
      'Better alignment with local city and service search intent',
      'Transparent reporting on indexation and search visibility',
    ],
    features: [
      'Technical SEO Audits & Crawl Fixes',
      'Intent-Focused Keyword Mapping',
      'On-Page Optimization (Headers, Meta, Schema)',
      'Local Business Profile & Directory Alignment',
    ],
    conversionFocus: 'Capturing high-intent organic search inquiries.',
  },
];

// Blog Posts (Zero fake view/like counts; factual prose)
export const PRELOADED_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Why Slow Websites Cost African Businesses Customers (And How to Fix It)',
    slug: 'why-slow-websites-cost-african-businesses',
    excerpt:
      'Most mobile visitors browse over cellular 3G/4G connections. Heavy page builders and uncompressed images cause visitors to leave before your offer even appears.',
    content: `## The Mobile Reality of Regional Networks

A large share of internet traffic across Nigeria and West Africa comes from smartphones running on cellular 3G and 4G networks. When a prospect taps your link from search or social media, every extra megabyte of unoptimized assets slows down first paint.

If your site stalls for several seconds on a mobile device, visitors frequently tap back and move on to another provider.

### The Cost of Visual Bloat

Many websites are assembled from heavy drag-and-drop builders that bundle dozens of unused scripts, oversized stock images, and multiple external font stylesheets. They may look fine over office fiber, but feel sluggish on mobile data.

### Practical Engineering Solutions

To build websites that open briskly on everyday mobile networks:

1. **Modern Frontend Bundling**: Use lightweight tools like Vite, React, and Tailwind CSS so only necessary code is shipped.
2. **Compressed Media Assets**: Resize and compress product photos before upload instead of serving raw multi-megabyte files.
3. **Clean Routing & Caching**: Serve static bundles over CDN edge nodes with proper cache headers.

Speed is not merely a technical metric—it directly shapes whether a first-time visitor stays long enough to trust your business.`,
    category: 'Web Design',
    readTime: '4 min read',
    date: 'June 10, 2026',
    image: GENERATED_ASSETS.portfolioFintech,
    views: 0,
    likes: 0,
    comments: [],
    tags: ['Mobile Speed', 'Web Design', 'Engineering'],
  },
  {
    id: 'blog-2',
    title: 'Local SEO Foundations: Structuring Pages for High-Intent Search Queries',
    slug: 'local-seo-structuring-high-intent-queries',
    excerpt:
      'Paid ads stop bringing traffic the moment budgets pause. Learn how clean Schema markup and city-specific service pages help businesses appear in organic search.',
    content: `## Building Sustainable Search Visibility

Relying solely on paid social ads means customer inquiries drop as soon as ad spend stops. Structured Search Engine Optimization builds lasting discoverability over time.

### Targeting High-Intent Queries

Instead of chasing vague, overly broad keywords, focus on clear service + location phrasing that matches what serious buyers actually search for.

### Technical Foundations

1. **Schema Markup (JSON-LD)**: Provide search crawlers with structured business details, locations, and product metadata.
2. **Dedicated Service Pages**: Give each core offering its own focused page with clear headings and plain explanations.
3. **Clean Mobile Layout**: Ensure text is readable without horizontal scrolling or layout shifts.`,
    category: 'SEO',
    readTime: '5 min read',
    date: 'May 24, 2026',
    image: GENERATED_ASSETS.portfolioSecurity,
    views: 0,
    likes: 0,
    comments: [],
    tags: ['SEO', 'Local Search', 'Architecture'],
  },
  {
    id: 'blog-3',
    title: 'Why Clear Visual Credibility Strengthens Pricing Power',
    slug: 'visual-credibility-and-pricing-power',
    excerpt:
      'Competing solely on the lowest price squeezes margins. Clear typography, fast performance, and transparent presentation help customers trust your value.',
    content: `## Moving Beyond Price Competition

Competing strictly as the cheapest option leaves thin margins and attracts rushed engagements. Customers evaluating higher-value services look closely for signs of competence and reliability.

### Reducing Perceived Risk

A visitor assesses credibility within seconds of landing on your platform:
- **Friction Points**: Broken layouts, slow pages, unclear offers, and missing contact channels create hesitation.
- **Trust Signals**: Crisp typography, honest product or project documentation, responsive speed, and transparent pricing build confidence.

When your digital presence reflects the actual standard of your work, conversations shift from haggling over price to planning execution.`,
    category: 'Business Growth',
    readTime: '4 min read',
    date: 'April 19, 2026',
    image: GENERATED_ASSETS.itelPowerTankSetup,
    views: 0,
    likes: 0,
    comments: [],
    tags: ['Branding', 'Business Strategy', 'Trust'],
  },
];

// Downloadable Resources (Starts at 0 real downloads)
export const PRELOADED_RESOURCES: ResourceItem[] = [
  {
    id: 'res-01',
    title: 'Corporate Website Planning & Scoping Blueprint',
    type: 'Template',
    description:
      'A practical project planning outline for defining pages, timelines, and technical requirements before commissioning a website build.',
    downloadUrl: 'Planning_Blueprint.pdf',
    fileSize: '1.2 MB',
    downloadCount: 0,
  },
  {
    id: 'res-02',
    title: 'Technical SEO & Performance Launch Checklist',
    type: 'Checklist',
    description:
      'A step-by-step pre-launch checklist covering semantic headings, metadata, Schema.org markup, mobile responsiveness, and asset compression.',
    downloadUrl: 'Local_SEO_Checklist.pdf',
    fileSize: '850 KB',
    downloadCount: 0,
  },
  {
    id: 'res-03',
    title: 'Direct Booking & E-Commerce Checkout Guide',
    type: 'PDF Guide',
    description:
      'Practical guidelines for structuring transparent pricing, local checkout flows, and Payment on Delivery verification for regional commerce.',
    downloadUrl: 'Direct_Commerce_Guide.pdf',
    fileSize: '1.5 MB',
    downloadCount: 0,
  },
];

// Default Marketplace Products for Buyfromudochukwu (Multi-category curated hardware & tech)
export const PRELOADED_PRODUCTS: MarketplaceProduct[] = [
  {
    id: 'prod-probook-studio-16',
    title: 'Udochukwu ProWorkstation 16" + Mechanical Keyboard Bundle',
    subtitle: 'Flagship Anodized Aluminum Creator & Engineering Laptop Setup',
    category: 'Office Systems',
    price: 1150000,
    compareAtPrice: 1320000,
    description:
      'High-performance aluminum workstation paired with a wireless tactile mechanical keyboard for software engineers, designers, and business executives. Ships nationwide via insured express courier.',
    specs: [
      '16-Inch High-Resolution Anti-Glare Display',
      '32GB Unified Memory · 1TB NVMe SSD',
      'Includes Low-Profile Wireless Mechanical Keyboard',
      'Insured Nationwide Courier Dispatch (Lagos, Abuja, Enugu & All States)',
    ],
    images: [GENERATED_ASSETS.productWorkstationLaptop],
    promoVideoUrl: '',
    promoType: 'showcase',
    inStock: true,
    isFeatured: true,
    freeDeliveryEnugu: false,
    paymentOnDeliveryEnugu: false,
    warranty: '12-Month Hardware Warranty + 7-Day Inspection Return Guarantee',
    createdAt: '2026-11-12',
  },
  {
    id: 'prod-aetheris-anc-headset',
    title: 'Aetheris Studio ANC Wireless Headphones',
    subtitle: 'Matte Gunmetal Active Noise-Cancelling Reference Headset',
    category: 'Gadgets & Tech',
    price: 145000,
    compareAtPrice: 185000,
    description:
      'Precision-tuned wireless studio headphones with adaptive noise cancellation, dual-device Bluetooth 5.3 pairing, and 45-hour battery endurance for deep work, calls, and studio mixing.',
    specs: [
      'Hybrid Active Noise Cancellation (-42dB)',
      '45-Hour Fast USB-C Battery Endurance',
      'Machined Aluminum Yokes & Memory Foam Ear Cushions',
      'Nationwide Express Delivery Across Nigeria',
    ],
    images: [GENERATED_ASSETS.productAudioHeadset],
    promoVideoUrl: '',
    promoType: 'showcase',
    inStock: true,
    isFeatured: true,
    freeDeliveryEnugu: false,
    paymentOnDeliveryEnugu: false,
    warranty: '12-Month Official Replacement Warranty',
    createdAt: '2026-11-14',
  },
  {
    id: 'prod-itel-powertank-full',
    title: 'itel Power Tank Full Setup (500W ESS + 300W Solar + 20m Cable)',
    subtitle: 'itel IESS-05K10N 1000Wh LiFePO4 Solar Generator · 300W Monocrystalline Panel · 20m Cable',
    category: 'Power & Solar',
    price: 550000,
    compareAtPrice: 696000,
    description:
      'Complete plug-and-play itel IESS-05K10N 3-in-1 Solar Energy Storage System (500W Pure Sine Wave Hybrid Inverter + 400W MPPT Solar Controller + 1,000Wh Class-A LiFePO4 Battery rated for 6,000+ cycles / 8–10 years). Bundled complete with a 300W Monocrystalline Solar Panel and 20m Heavy-Duty Solar Extension Cable (not sold separately!). Includes Free Doorstep Delivery & Payment on Delivery across Enugu cities after live testing.',
    specs: [
      '500W Pure Sine Wave Hybrid Inverter (600W Surge) — Safe for TV, Laptop, Fan & Inverter Freezer',
      '1,000Wh Class-A LiFePO4 Lithium Battery — 6,000+ Life Cycles (8–10 Years)',
      'Includes 300W Monocrystalline Solar Panel + 20m Heavy-Duty Solar Cable',
      'Built-in 400W (11–60V) MPPT Controller · Dual PV + Grid Fast Charge (0–100% in 2 Hrs)',
      'Ultra-Fast <20ms UPS Switchover · Quiet <45dB Cooling · Weight: 5kg',
      'Box Includes: itel IESS-05K10P, 300W Panel, 20m Cable, AC & Solar Cables, Fuse, 2-Yr Warranty Card',
      'Enugu Exclusive: Free Delivery & Payment on Delivery After Live Testing',
    ],
    images: [
      GENERATED_ASSETS.itelPowerTankSetup,
      GENERATED_ASSETS.itelPowerTankDetail,
      GENERATED_ASSETS.itelSolarPanelKit,
      GENERATED_ASSETS.itelFbAdFlyer,
      GENERATED_ASSETS.itelEnuguFlyer,
    ],
    promoVideoUrl: '',
    promoType: 'itel-motion-ad',
    inStock: true,
    isFeatured: true,
    freeDeliveryEnugu: true,
    paymentOnDeliveryEnugu: true,
    warranty: '2-Year Official itel Replacement Warranty + Live Enugu Doorstep Testing Before Payment',
    createdAt: '2026-11-01',
  },
  {
    id: 'prod-forge-usbc-dock',
    title: 'Forge Dock Pro 12-in-1 Desktop Hub',
    subtitle: 'CNC Machined Aluminum Thunderbolt / USB-C Workstation Dock',
    category: 'Accessories',
    price: 78000,
    compareAtPrice: 95000,
    description:
      'Upgrade single-cable laptop setups with dual 4K display output, 100W Power Delivery pass-through, Gigabit Ethernet, and ultra-fast SD/microSD readers in a solid CNC aluminum chassis.',
    specs: [
      '100W USB-C Power Delivery Pass-Through',
      'Dual 4K HDMI + 10Gbps Data Ports',
      'UHS-II SD & MicroSD Card Readers',
      'Braided Shielded Host Cable Included',
    ],
    images: [GENERATED_ASSETS.productUsbcDock],
    promoVideoUrl: '',
    promoType: 'showcase',
    inStock: true,
    isFeatured: false,
    freeDeliveryEnugu: false,
    paymentOnDeliveryEnugu: false,
    warranty: '12-Month Hardware Replacement Warranty',
    createdAt: '2026-11-16',
  },
  {
    id: 'prod-solar-inverter-unit',
    title: 'Hybrid Solar Inverter Backup Unit',
    subtitle: 'Wall-Mounted Pure Sine Wave Inverter for Homes & Offices',
    category: 'Power & Solar',
    price: 420000,
    compareAtPrice: 480000,
    description:
      'Compact pure sine wave hybrid inverter unit designed for steady office and residential backup power. Clean digital status panel with overload protection and fast grid/solar changeover.',
    specs: [
      'Pure Sine Wave Output',
      'Digital LCD Monitoring Display',
      'Surge & Overload Protection',
      'Nationwide Freight Dispatch Available',
    ],
    images: [GENERATED_ASSETS.solarInverter],
    promoVideoUrl: '',
    promoType: 'showcase',
    inStock: true,
    isFeatured: false,
    freeDeliveryEnugu: false,
    paymentOnDeliveryEnugu: false,
    warranty: '12-Month Hardware Warranty',
    createdAt: '2026-11-05',
  },
];

// --- PORTFOLIO CRUD & SYNC ---
export const getCaseStudies = (): CaseStudy[] => {
  try {
    const stored = localStorage.getItem('vxt_portfolio_cases');
    if (!stored) {
      localStorage.setItem('vxt_portfolio_cases', JSON.stringify(PRELOADED_CASE_STUDIES));
      return PRELOADED_CASE_STUDIES;
    }
    return JSON.parse(stored);
  } catch {
    return PRELOADED_CASE_STUDIES;
  }
};

export const saveCaseStudy = (item: Omit<CaseStudy, 'id'>): CaseStudy[] => {
  const list = getCaseStudies();
  const created: CaseStudy = {
    ...item,
    id: `case-${Date.now().toString(36)}`,
  };
  const updated = [created, ...list];
  localStorage.setItem('vxt_portfolio_cases', JSON.stringify(updated));
  fetch('/api/portfolio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projects: updated }),
  }).catch(() => {});
  return updated;
};

export const deleteCaseStudy = (id: string): CaseStudy[] => {
  const updated = getCaseStudies().filter((c) => c.id !== id);
  localStorage.setItem('vxt_portfolio_cases', JSON.stringify(updated));
  fetch('/api/portfolio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projects: updated }),
  }).catch(() => {});
  return updated;
};

// --- MARKETPLACE PRODUCTS CRUD & SYNC ---
export const getMarketplaceProducts = (): MarketplaceProduct[] => {
  try {
    const seededV6 = localStorage.getItem('vxt_marketplace_seed_v6');
    const stored = localStorage.getItem('vxt_marketplace_products');
    if (!stored) {
      localStorage.setItem('vxt_marketplace_products', JSON.stringify(PRELOADED_PRODUCTS));
      localStorage.setItem('vxt_marketplace_seed_v6', 'true');
      return PRELOADED_PRODUCTS;
    }
    const parsed = JSON.parse(stored) as MarketplaceProduct[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem('vxt_marketplace_products', JSON.stringify(PRELOADED_PRODUCTS));
      localStorage.setItem('vxt_marketplace_seed_v6', 'true');
      return PRELOADED_PRODUCTS;
    }
    if (!seededV6) {
      const itelDefault = PRELOADED_PRODUCTS.find((p) => p.id === 'prod-itel-powertank-full');
      const customItems = parsed.filter(
        (p) =>
          p.id !== 'prod-itel-powertank-full' &&
          !PRELOADED_PRODUCTS.some((def) => def.id === p.id)
      );
      const refreshedPreloaded = PRELOADED_PRODUCTS.map((def) => {
        if (def.id === 'prod-itel-powertank-full' && itelDefault) return itelDefault;
        const existing = parsed.find((p) => p.id === def.id);
        return existing || def;
      });
      const merged = [...customItems, ...refreshedPreloaded];
      localStorage.setItem('vxt_marketplace_products', JSON.stringify(merged));
      localStorage.setItem('vxt_marketplace_seed_v6', 'true');
      return merged;
    }
    return parsed;
  } catch {
    return PRELOADED_PRODUCTS;
  }
};

export const persistMarketplaceProducts = (products: MarketplaceProduct[]) => {
  localStorage.setItem('vxt_marketplace_products', JSON.stringify(products));
  fetch('/api/marketplace/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ products }),
  }).catch(() => {});
};

export const addMarketplaceProduct = (
  product: Omit<MarketplaceProduct, 'id' | 'createdAt'>
): MarketplaceProduct[] => {
  const current = getMarketplaceProducts();
  const newProduct: MarketplaceProduct = {
    ...product,
    id: `prod-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString().split('T')[0],
  };
  const updated = [newProduct, ...current];
  persistMarketplaceProducts(updated);
  return updated;
};

export const updateMarketplaceProduct = (updatedItem: MarketplaceProduct): MarketplaceProduct[] => {
  const updated = getMarketplaceProducts().map((p) => (p.id === updatedItem.id ? updatedItem : p));
  persistMarketplaceProducts(updated);
  return updated;
};

export const deleteMarketplaceProduct = (id: string): MarketplaceProduct[] => {
  const updated = getMarketplaceProducts().filter((p) => p.id !== id);
  persistMarketplaceProducts(updated);
  return updated;
};

export const syncMarketplaceFromServer = async (): Promise<{
  products: MarketplaceProduct[];
  orders: MarketplaceOrder[];
}> => {
  let products = getMarketplaceProducts();
  let orders = getMarketplaceOrders();
  try {
    const [prodRes, ordRes] = await Promise.all([
      fetch('/api/marketplace/products'),
      fetch('/api/marketplace/orders'),
    ]);
    if (prodRes.ok) {
      const data = await prodRes.json();
      if (Array.isArray(data.products) && data.products.length > 0) {
        const itelDefault = PRELOADED_PRODUCTS.find((p) => p.id === 'prod-itel-powertank-full')!;
        if (!localStorage.getItem('vxt_marketplace_server_v6')) {
          const withoutOldItel = data.products.filter(
            (p: MarketplaceProduct) => p.id !== 'prod-itel-powertank-full'
          );
          const existingIds = new Set(withoutOldItel.map((p: MarketplaceProduct) => p.id));
          const missingDefaults = PRELOADED_PRODUCTS.filter(
            (p) => p.id !== 'prod-itel-powertank-full' && !existingIds.has(p.id)
          );
          products = [...withoutOldItel, itelDefault, ...missingDefaults];
          localStorage.setItem('vxt_marketplace_server_v6', 'true');
        } else {
          products = data.products;
        }
        localStorage.setItem('vxt_marketplace_products', JSON.stringify(products));
      }
    }
    if (ordRes.ok) {
      const data = await ordRes.json();
      if (Array.isArray(data.orders) && data.orders.length > 0) {
        orders = data.orders;
        localStorage.setItem('vxt_marketplace_orders', JSON.stringify(orders));
      }
    }
  } catch {
    // fallback to localStorage silently
  }
  return { products, orders };
};

// --- MARKETPLACE ORDERS CRUD ---
export const getMarketplaceOrders = (): MarketplaceOrder[] => {
  try {
    const stored = localStorage.getItem('vxt_marketplace_orders');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const persistMarketplaceOrders = (orders: MarketplaceOrder[]) => {
  localStorage.setItem('vxt_marketplace_orders', JSON.stringify(orders));
  fetch('/api/marketplace/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orders }),
  }).catch(() => {});
};

export const saveMarketplaceOrder = (
  order: Omit<MarketplaceOrder, 'id' | 'orderNumber' | 'status' | 'createdAt'>
): MarketplaceOrder => {
  const current = getMarketplaceOrders();
  const created: MarketplaceOrder = {
    ...order,
    id: `ord-${Date.now().toString(36)}`,
    orderNumber: `UDK-${Math.floor(1000 + Math.random() * 9000)}`,
    status: 'Pending Confirmation',
    createdAt: new Date().toLocaleString(),
  };
  const updated = [created, ...current];
  persistMarketplaceOrders(updated);
  return created;
};

export const updateMarketplaceOrderStatus = (
  orderId: string,
  status: MarketplaceOrder['status']
): MarketplaceOrder[] => {
  const updated = getMarketplaceOrders().map((o) => (o.id === orderId ? { ...o, status } : o));
  persistMarketplaceOrders(updated);
  return updated;
};

export const deleteMarketplaceOrder = (orderId: string): MarketplaceOrder[] => {
  const updated = getMarketplaceOrders().filter((o) => o.id !== orderId);
  persistMarketplaceOrders(updated);
  return updated;
};

// --- PER-PRODUCT RATINGS & REVIEWS (Real buyer submissions only) ---
export const getProductReviews = (productId?: string): ProductReview[] => {
  try {
    const stored = localStorage.getItem('vxt_product_reviews');
    const all: ProductReview[] = stored ? JSON.parse(stored) : [];
    return productId ? all.filter((r) => r.productId === productId) : all;
  } catch {
    return [];
  }
};

export const saveProductReview = (
  review: Omit<ProductReview, 'id' | 'createdAt'>
): ProductReview[] => {
  const all = getProductReviews();
  const created: ProductReview = {
    ...review,
    rating: Math.min(5, Math.max(1, Math.round(review.rating))),
    id: `prv-${Date.now().toString(36)}`,
    createdAt: new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
  };
  const updated = [created, ...all];
  localStorage.setItem('vxt_product_reviews', JSON.stringify(updated));
  return updated;
};

export const deleteProductReview = (reviewId: string): ProductReview[] => {
  const updated = getProductReviews().filter((r) => r.id !== reviewId);
  localStorage.setItem('vxt_product_reviews', JSON.stringify(updated));
  return updated;
};

// --- CLIENT REVIEWS (Real submissions only; starts empty) ---
export const getClientReviews = (): ClientReview[] => {
  try {
    const stored = localStorage.getItem('vxt_client_reviews');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveClientReview = (
  review: Omit<ClientReview, 'id' | 'submittedAt'>
): ClientReview[] => {
  const current = getClientReviews();
  const created: ClientReview = {
    ...review,
    id: `rev-${Date.now().toString(36)}`,
    submittedAt: new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
  };
  const updated = [created, ...current];
  localStorage.setItem('vxt_client_reviews', JSON.stringify(updated));
  fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reviews: updated }),
  }).catch(() => {});
  return updated;
};

export const deleteClientReview = (id: string): ClientReview[] => {
  const updated = getClientReviews().filter((r) => r.id !== id);
  localStorage.setItem('vxt_client_reviews', JSON.stringify(updated));
  fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reviews: updated }),
  }).catch(() => {});
  return updated;
};

// --- AUDITS / BOOKINGS / CONTACTS ---
export const getAudits = (): AuditSubmission[] => {
  try {
    const audits = localStorage.getItem('vxt_audits');
    return audits ? JSON.parse(audits) : [];
  } catch {
    return [];
  }
};

export const saveAudit = (
  submission: Omit<AuditSubmission, 'id' | 'submittedAt' | 'status'>
): AuditSubmission => {
  const list = getAudits();
  const newItem: AuditSubmission = {
    ...submission,
    id: `audit-${Math.random().toString(36).slice(2, 11)}`,
    submittedAt: new Date().toLocaleString(),
    status: 'Pending Review',
    reportId: `REQ-${Math.floor(100000 + Math.random() * 900000)}`,
  };
  list.unshift(newItem);
  localStorage.setItem('vxt_audits', JSON.stringify(list));
  return newItem;
};

export const getBookings = (): Booking[] => {
  try {
    const b = localStorage.getItem('vxt_bookings');
    return b ? JSON.parse(b) : [];
  } catch {
    return [];
  }
};

export const saveBooking = (b: Omit<Booking, 'id' | 'createdAt'>): Booking => {
  const list = getBookings();
  const newItem: Booking = {
    ...b,
    id: `bk-${Math.random().toString(36).slice(2, 11)}`,
    createdAt: new Date().toLocaleDateString(),
  };
  list.unshift(newItem);
  localStorage.setItem('vxt_bookings', JSON.stringify(list));
  return newItem;
};

export const getContacts = (): ContactSubmission[] => {
  try {
    const c = localStorage.getItem('vxt_contacts');
    return c ? JSON.parse(c) : [];
  } catch {
    return [];
  }
};

export const saveContact = (
  c: Omit<ContactSubmission, 'id' | 'submittedAt'>
): ContactSubmission => {
  const list = getContacts();
  const newItem: ContactSubmission = {
    ...c,
    id: `ct-${Math.random().toString(36).slice(2, 11)}`,
    submittedAt: new Date().toLocaleString(),
  };
  list.unshift(newItem);
  localStorage.setItem('vxt_contacts', JSON.stringify(list));
  return newItem;
};

// --- BLOGS ---
export const getBlogs = (): BlogPost[] => {
  try {
    const stored = localStorage.getItem('vxt_blogs');
    if (!stored) {
      localStorage.setItem('vxt_blogs', JSON.stringify(PRELOADED_BLOGS));
      return PRELOADED_BLOGS;
    }
    return JSON.parse(stored);
  } catch {
    return PRELOADED_BLOGS;
  }
};

export const saveBlogComment = (
  blogId: string,
  comment: Omit<BlogComment, 'id' | 'createdAt'>
): BlogPost[] => {
  const blogs = getBlogs();
  const updated = blogs.map((b) => {
    if (b.id === blogId) {
      const comments = b.comments || [];
      const newComment: BlogComment = {
        ...comment,
        id: `com-${Math.random().toString(36).slice(2, 11)}`,
        createdAt: new Date().toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      };
      return { ...b, comments: [...comments, newComment] };
    }
    return b;
  });
  localStorage.setItem('vxt_blogs', JSON.stringify(updated));
  return updated;
};

export const saveBlog = (
  blog: Omit<BlogPost, 'id' | 'views' | 'likes' | 'comments'>
): BlogPost[] => {
  const blogs = getBlogs();
  const newBlog: BlogPost = {
    ...blog,
    id: `blog-${Math.random().toString(36).slice(2, 11)}`,
    views: 0,
    likes: 0,
    comments: [],
  };
  const updated = [newBlog, ...blogs];
  localStorage.setItem('vxt_blogs', JSON.stringify(updated));
  return updated;
};

export const deleteBlog = (blogId: string): BlogPost[] => {
  const updated = getBlogs().filter((b) => b.id !== blogId);
  localStorage.setItem('vxt_blogs', JSON.stringify(updated));
  return updated;
};

// --- NEWSLETTER ---
export const getNewsletterSubscribers = (): string[] => {
  try {
    const s = localStorage.getItem('vxt_subscribers');
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
};

export const saveNewsletterSubscriber = (email: string): boolean => {
  const list = getNewsletterSubscribers();
  if (list.includes(email.trim().toLowerCase())) return false;
  list.push(email.trim().toLowerCase());
  localStorage.setItem('vxt_subscribers', JSON.stringify(list));
  return true;
};

// --- SITE SETTINGS ---
export interface SiteSettings {
  aboutImageUrl: string;
  heroImageUrl: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  aboutImageUrl:
    'https://res.cloudinary.com/drghjqbak/image/upload/q_auto/f_auto/v1781913441/1781783831624_3_a1uctp.jpg',
  heroImageUrl:
    'https://res.cloudinary.com/drghjqbak/image/upload/q_auto/f_auto/v1781921383/20260620_030810_tod4tg.jpg',
};

export const getSiteSettings = (): SiteSettings => {
  try {
    const s = localStorage.getItem('vxt_site_settings');
    const parsed = s ? JSON.parse(s) : DEFAULT_SETTINGS;
    return {
      aboutImageUrl: parsed.aboutImageUrl || DEFAULT_SETTINGS.aboutImageUrl,
      heroImageUrl: parsed.heroImageUrl || DEFAULT_SETTINGS.heroImageUrl,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveSiteSettings = (settings: SiteSettings): void => {
  localStorage.setItem('vxt_site_settings', JSON.stringify(settings));
};
