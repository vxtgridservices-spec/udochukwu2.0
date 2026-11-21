import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import { Resend } from "resend";
import { createServer as createViteServer } from "vite";

const upload = multer({ storage: multer.memoryStorage() });
const resend = new Resend(process.env.RESEND_API_KEY || "fallback_key");


// Live Analytics state models
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

const HISTORY_FILE_PATH = path.join(process.cwd(), "visitor_history.json");
const activeSessions = new Map<string, ActiveSession>();
const sseClients = new Set<express.Response>();

// Load historical data on server boot
function loadHistoryLog() {
  try {
    if (fs.existsSync(HISTORY_FILE_PATH)) {
      const raw = fs.readFileSync(HISTORY_FILE_PATH, "utf8");
      if (raw) {
        const parsed = JSON.parse(raw) as ActiveSession[];
        const cutoff = Date.now() - 24 * 60 * 60 * 1000; // Last 24 Hours
        
        parsed.forEach(sess => {
          if (sess.lastPing && sess.lastPing > cutoff && sess.sessionId) {
            activeSessions.set(sess.sessionId, sess);
          }
        });
        console.log(`Loaded ${activeSessions.size} visitor sessions from the last 24 hours.`);
      }
    }
  } catch (err) {
    console.warn("Could not read visitor history file, initializing fresh:", err);
  }
}

// Persist active and historical logs to file
function saveHistoryLog() {
  try {
    const list = Array.from(activeSessions.values());
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    const filteredList = list.filter(sess => sess.lastPing > cutoff);
    
    fs.writeFileSync(HISTORY_FILE_PATH, JSON.stringify(filteredList, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write visitor history logs to disk:", err);
  }
}

// Log helper to broadcast updates to all active admin live-streams (SSE)
function broadcastSSE(type: string, data: any) {
  const payload = JSON.stringify({ type, data });
  for (const client of sseClients) {
    try {
      client.write(`data: ${payload}\n\n`);
    } catch (e) {
      sseClients.delete(client);
    }
  }
}

// Filter and recalculate session durations every 5 seconds
setInterval(() => {
  const now = Date.now();
  const cutoff = now - 24 * 60 * 60 * 1000;
  let hasChanges = false;
  
  for (const [id, value] of activeSessions.entries()) {
    if (value.lastPing < cutoff) {
      activeSessions.delete(id);
      hasChanges = true;
    } else {
      // Recompute durations
      value.durationSeconds = Math.round((value.lastPing - value.joinedAt) / 1000);
    }
  }
  
  if (hasChanges) {
    saveHistoryLog();
  }
  
  broadcastSSE("sessions_list", Array.from(activeSessions.values()));
}, 5000);

async function startServer() {
  // Preload historical data
  loadHistoryLog();

  const app = express();
  // Use 3000 in AI Studio environments, but allow dynamic PORT for Railway/Heroku deployments
  const PORT = process.env.PORT && !process.env.NG_ALLOWED_HOSTS ? parseInt(process.env.PORT) : 3000;

  app.use(express.json({ limit: "15mb" }));

  const MARKETPLACE_PRODUCTS_FILE = path.join(process.cwd(), "marketplace_products.json");
  const MARKETPLACE_ORDERS_FILE = path.join(process.cwd(), "marketplace_orders.json");
  const REVIEWS_FILE = path.join(process.cwd(), "client_reviews.json");
  const PORTFOLIO_FILE = path.join(process.cwd(), "portfolio_projects.json");

  function readJsonFile<T>(filePath: string, fallback: T): T {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf8");
        if (raw) return JSON.parse(raw) as T;
      }
    } catch (e) {
      console.warn(`Failed reading ${filePath}:`, e);
    }
    return fallback;
  }

  function writeJsonFile<T>(filePath: string, data: T) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    } catch (e) {
      console.error(`Failed writing ${filePath}:`, e);
    }
  }

  interface ShareProductFallback {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    inStock: boolean;
    images: string[];
  }

  const DEFAULT_SHARE_PRODUCTS: ShareProductFallback[] = [
    {
      id: "prod-itel-powertank-full",
      title: "itel Power Tank Full Setup (500W ESS + 300W Solar + 20m Cable)",
      subtitle: "itel IESS-05K10N 1000Wh LiFePO4 Solar Generator + 300W Panel + 20m Cable",
      description:
        "Save ₦146,000 (was ₦696,000). Complete 500W/1000Wh LiFePO4 Power Tank + 300W Solar Panel + 20m Cable. Free Enugu doorstep delivery & Pay on Delivery after live testing!",
      price: 550000,
      compareAtPrice: 696000,
      inStock: true,
      images: [
        "/share/itel-enugu-flyer.jpg",
        "/share/itel-powertank-setup.jpg",
        "/share/itel-powertank-detail.jpg",
        "/share/itel-solar-kit.jpg",
      ],
    },
    {
      id: "prod-probook-studio-16",
      title: "Udochukwu ProWorkstation 16\" + Mechanical Keyboard Bundle",
      subtitle: "Flagship Anodized Aluminum Creator & Engineering Laptop Setup",
      description:
        "Save ₦170,000. 16-inch anti-glare workstation with 32GB unified memory, 1TB NVMe SSD & wireless tactile mechanical keyboard. Insured nationwide delivery.",
      price: 1150000,
      compareAtPrice: 1320000,
      inStock: true,
      images: ["/share/workstation-laptop.jpg"],
    },
    {
      id: "prod-aetheris-anc-headset",
      title: "Aetheris Studio ANC Wireless Headphones",
      subtitle: "Matte Gunmetal Active Noise-Cancelling Reference Headset",
      description:
        "Save ₦40,000. Hybrid -42dB active noise cancellation, 45-hour USB-C battery endurance, and dual-device pairing. Nationwide express dispatch.",
      price: 145000,
      compareAtPrice: 185000,
      inStock: true,
      images: ["/share/audio-headset.jpg"],
    },
    {
      id: "prod-forge-usbc-dock",
      title: "Forge Dock Pro 12-in-1 Desktop Hub",
      subtitle: "CNC Machined Aluminum Thunderbolt / USB-C Workstation Dock",
      description:
        "Dual 4K HDMI output, 100W Power Delivery pass-through, Gigabit Ethernet, and UHS-II SD readers in a CNC aluminum chassis.",
      price: 78000,
      compareAtPrice: 95000,
      inStock: true,
      images: ["/share/usbc-dock.jpg"],
    },
  ];

  function mapAssetToPublicShareUrl(rawImg: string, origin: string, productId: string, idx: number): string {
    if (!rawImg) return `${origin}/share/marketplace-collection.jpg`;
    if (rawImg.startsWith("http://") || rawImg.startsWith("https://")) return rawImg;
    if (rawImg.startsWith("/share/")) return `${origin}${rawImg}`;
    if (rawImg.includes("itel_enugu_flyer")) return `${origin}/share/itel-enugu-flyer.jpg`;
    if (rawImg.includes("itel_powertank_hero")) return `${origin}/share/itel-powertank-setup.jpg`;
    if (rawImg.includes("itel_powertank_detail")) return `${origin}/share/itel-powertank-detail.jpg`;
    if (rawImg.includes("itel_solar_kit")) return `${origin}/share/itel-solar-kit.jpg`;
    if (rawImg.includes("marketplace_hero_collection")) return `${origin}/share/marketplace-collection.jpg`;
    if (rawImg.includes("product_workstation_laptop")) return `${origin}/share/workstation-laptop.jpg`;
    if (rawImg.includes("product_audio_headset")) return `${origin}/share/audio-headset.jpg`;
    if (rawImg.includes("product_usbc_dock")) return `${origin}/share/usbc-dock.jpg`;
    if (rawImg.startsWith("data:image/")) {
      return `${origin}/api/share-image/${encodeURIComponent(productId)}/${idx}.jpg`;
    }
    if (rawImg.startsWith("/")) return `${origin}${rawImg}`;
    return `${origin}/share/marketplace-collection.jpg`;
  }

  function escapeHtmlAttr(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function getRequestOrigin(req: express.Request): string {
    const forwardedProto = req.headers["x-forwarded-proto"];
    const host = (req.headers["x-forwarded-host"] as string) || req.get("host") || "localhost:3000";
    const proto = Array.isArray(forwardedProto)
      ? forwardedProto[0]
      : forwardedProto || (host.includes("localhost") ? req.protocol : "https");
    return `${proto}://${host}`;
  }

  function injectOpenGraphMeta(html: string, req: express.Request): string {
    const origin = getRequestOrigin(req);
    const cleanPath = req.path.replace(/\/+$/, "").toLowerCase() || "/";
    const itemQuery = typeof req.query.item === "string" ? req.query.item.trim() : "";

    let requestedItemId = itemQuery;
    if (!requestedItemId && cleanPath === "/ad/itel-enugu") {
      requestedItemId = "prod-itel-powertank-full";
    } else if (!requestedItemId && cleanPath.startsWith("/buyfromudochukwu/")) {
      requestedItemId = decodeURIComponent(cleanPath.replace("/buyfromudochukwu/", ""));
    }

    const storedProducts = readJsonFile<any[] | null>(MARKETPLACE_PRODUCTS_FILE, null);
    const mergedProducts: ShareProductFallback[] = [
      ...(Array.isArray(storedProducts) ? storedProducts : []),
      ...DEFAULT_SHARE_PRODUCTS,
    ];

    let title = "Udochukwu — Web Designer, Digital Strategist & Buyfromudochukwu";
    let description =
      "Official platform of Udochukwu (VXTGrid Services) — custom web engineering, strategy, and the Buyfromudochukwu curated marketplace.";
    let ogType = "website";
    let ogImages: string[] = [`${origin}/share/marketplace-collection.jpg`];
    let matchedProduct: ShareProductFallback | undefined;

    if (requestedItemId) {
      matchedProduct = mergedProducts.find((p) => p.id === requestedItemId);
      if (matchedProduct) {
        const discountPct =
          matchedProduct.compareAtPrice && matchedProduct.compareAtPrice > matchedProduct.price
            ? Math.round(((matchedProduct.compareAtPrice - matchedProduct.price) / matchedProduct.compareAtPrice) * 100)
            : 0;
        const formattedPrice = `₦${Number(matchedProduct.price).toLocaleString()}`;
        if (matchedProduct.id === "prod-itel-powertank-full") {
          title = `${discountPct > 0 ? `${discountPct}% OFF Flash Sale: ` : ""}${matchedProduct.title} — ${formattedPrice}`;
          description =
            matchedProduct.compareAtPrice && matchedProduct.compareAtPrice > matchedProduct.price
              ? `Save ₦${(matchedProduct.compareAtPrice - matchedProduct.price).toLocaleString()} (${discountPct}% OFF). Includes 500W/1000Wh itel Power Tank + 300W Solar Panel + 20m Cable. Free Enugu delivery & Pay on Delivery after testing!`
              : matchedProduct.description;
          ogImages = [
            `${origin}/share/itel-enugu-flyer.jpg`,
            `${origin}/share/itel-powertank-setup.jpg`,
            `${origin}/share/itel-powertank-detail.jpg`,
            `${origin}/share/itel-solar-kit.jpg`,
          ];
        } else {
          title = `${matchedProduct.title} — ${formattedPrice} | Buyfromudochukwu`;
          description = matchedProduct.description || matchedProduct.subtitle;
          const mapped = (matchedProduct.images || []).map((img, idx) =>
            mapAssetToPublicShareUrl(img, origin, matchedProduct!.id, idx)
          );
          if (mapped.length > 0) ogImages = mapped;
        }
        ogType = "product";
      }
    } else if (cleanPath === "/buyfromudochukwu") {
      title = "Buyfromudochukwu Marketplace — itel Power Tank 21% OFF & Verified Tech";
      description =
        "Curated tech, workstations, audio, and the itel Power Tank 500W + 300W Solar + 20m Cable Flash Sale (₦550,000, Free Enugu Delivery & Payment on Delivery).";
      ogImages = [
        `${origin}/share/itel-enugu-flyer.jpg`,
        `${origin}/share/itel-powertank-setup.jpg`,
        `${origin}/share/marketplace-collection.jpg`,
      ];
    }

    const canonicalUrl = `${origin}${req.originalUrl}`;
    const primaryImage = ogImages[0];

    const imageMetaTags = ogImages
      .slice(0, 4)
      .map(
        (imgUrl) => `
    <meta property="og:image" content="${escapeHtmlAttr(imgUrl)}" />
    <meta property="og:image:secure_url" content="${escapeHtmlAttr(imgUrl)}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="900" />`
      )
      .join("");

    const productMetaTags = matchedProduct
      ? `
    <meta property="product:price:amount" content="${matchedProduct.price}" />
    <meta property="product:price:currency" content="NGN" />
    <meta property="product:availability" content="${matchedProduct.inStock ? "in stock" : "out of stock"}" />`
      : "";

    const jsonLd = matchedProduct
      ? `<script type="application/ld+json">${JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: matchedProduct.title,
          description,
          image: ogImages,
          brand: { "@type": "Brand", name: matchedProduct.id.includes("itel") ? "itel Energy" : "Buyfromudochukwu" },
          offers: {
            "@type": "Offer",
            url: canonicalUrl,
            priceCurrency: "NGN",
            price: String(matchedProduct.price),
            availability: matchedProduct.inStock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
        })}</script>`
      : "";

    const injectedHeadBlock = `
    <title>${escapeHtmlAttr(title)}</title>
    <meta name="description" content="${escapeHtmlAttr(description)}" />
    <link rel="canonical" href="${escapeHtmlAttr(canonicalUrl)}" />
    <meta property="og:site_name" content="Buyfromudochukwu · Udochukwu" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:url" content="${escapeHtmlAttr(canonicalUrl)}" />
    <meta property="og:title" content="${escapeHtmlAttr(title)}" />
    <meta property="og:description" content="${escapeHtmlAttr(description)}" />${imageMetaTags}${productMetaTags}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${escapeHtmlAttr(canonicalUrl)}" />
    <meta name="twitter:title" content="${escapeHtmlAttr(title)}" />
    <meta name="twitter:description" content="${escapeHtmlAttr(description)}" />
    <meta name="twitter:image" content="${escapeHtmlAttr(primaryImage)}" />
    ${jsonLd}`;

    const stripped = html
      .replace(/<title>[\s\S]*?<\/title>/gi, "")
      .replace(/<meta[^>]+name=["']description["'][^>]*>/gi, "")
      .replace(/<link[^>]+rel=["']canonical["'][^>]*>/gi, "")
      .replace(/<meta[^>]+property=["'](?:og|product):[^"']+["'][^>]*>/gi, "")
      .replace(/<meta[^>]+name=["']twitter:[^"']+["'][^>]*>/gi, "")
      .replace(/<meta[^>]+property=["']twitter:[^"']+["'][^>]*>/gi, "");

    return stripped.replace("</head>", `${injectedHeadBlock}\n  </head>`);
  }

  // Binary image endpoint so admin-uploaded base64 product photos also work in Facebook OpenGraph cards
  app.get("/api/share-image/:productId/:idx.jpg", (req, res) => {
    const { productId, idx } = req.params;
    const index = Math.max(0, parseInt(idx, 10) || 0);
    const storedProducts = readJsonFile<any[] | null>(MARKETPLACE_PRODUCTS_FILE, null);
    const all = [...(Array.isArray(storedProducts) ? storedProducts : []), ...DEFAULT_SHARE_PRODUCTS];
    const product = all.find((p) => p.id === productId);
    const raw = product?.images?.[index] || product?.images?.[0] || "";

    if (raw.startsWith("data:image/")) {
      const match = raw.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
      if (match) {
        const mimeType = match[1];
        const buffer = Buffer.from(match[2], "base64");
        res.setHeader("Content-Type", mimeType);
        res.setHeader("Cache-Control", "public, max-age=86400");
        res.send(buffer);
        return;
      }
    }

    const fallbackFile = path.join(process.cwd(), "public", "share", "itel-enugu-flyer.jpg");
    if (fs.existsSync(fallbackFile)) {
      res.sendFile(fallbackFile);
      return;
    }
    res.status(404).end();
  });

  // Marketplace Products API
  app.get("/api/marketplace/products", (_req, res) => {
    const products = readJsonFile<any[] | null>(MARKETPLACE_PRODUCTS_FILE, null);
    res.json({ products });
  });

  app.post("/api/marketplace/products", (req, res) => {
    const { products } = req.body;
    if (!Array.isArray(products)) {
      res.status(400).json({ error: "Invalid products payload" });
      return;
    }
    writeJsonFile(MARKETPLACE_PRODUCTS_FILE, products);
    res.json({ success: true, count: products.length });
  });

  // Marketplace Orders API
  app.get("/api/marketplace/orders", (_req, res) => {
    const orders = readJsonFile<any[]>(MARKETPLACE_ORDERS_FILE, []);
    res.json({ orders });
  });

  app.post("/api/marketplace/orders", (req, res) => {
    const { orders } = req.body;
    if (!Array.isArray(orders)) {
      res.status(400).json({ error: "Invalid orders payload" });
      return;
    }
    writeJsonFile(MARKETPLACE_ORDERS_FILE, orders);
    res.json({ success: true, count: orders.length });
  });

  // Client Reviews API
  app.get("/api/reviews", (_req, res) => {
    const reviews = readJsonFile<any[]>(REVIEWS_FILE, []);
    res.json({ reviews });
  });

  app.post("/api/reviews", (req, res) => {
    const { reviews } = req.body;
    if (!Array.isArray(reviews)) {
      res.status(400).json({ error: "Invalid reviews payload" });
      return;
    }
    writeJsonFile(REVIEWS_FILE, reviews);
    res.json({ success: true, count: reviews.length });
  });

  // Portfolio Projects API
  app.get("/api/portfolio", (_req, res) => {
    const projects = readJsonFile<any[] | null>(PORTFOLIO_FILE, null);
    res.json({ projects });
  });

  app.post("/api/portfolio", (req, res) => {
    const { projects } = req.body;
    if (!Array.isArray(projects)) {
      res.status(400).json({ error: "Invalid portfolio payload" });
      return;
    }
    writeJsonFile(PORTFOLIO_FILE, projects);
    res.json({ success: true, count: projects.length });
  });

  // 1. API: Heartbeat
  app.get("/api/health", (req, res) => {
    const sessionsList = Array.from(activeSessions.values());
    const now = Date.now();
    const onlineCount = sessionsList.filter(s => now - s.lastPing < 15000).length;
    res.json({ status: "ok", activeCount: sessionsList.length, onlineCount });
  });

  // 2. API: Server-Sent Events (SSE) for Instant pushes
  app.get("/api/tracker/live-sse", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    sseClients.add(res);

    // Immediately push current active sessions list
    const initialPayload = JSON.stringify({
      type: "sessions_list",
      data: Array.from(activeSessions.values())
    });
    res.write(`data: ${initialPayload}\n\n`);

    req.on("close", () => {
      sseClients.delete(res);
    });
  });

  // 3. API: Active Sessions fetching (fallback to direct polling)
  app.get("/api/tracker/sessions", (req, res) => {
    res.json(Array.from(activeSessions.values()));
  });

  // 4. API: Ping receiver
  app.post("/api/tracker/ping", (req, res) => {
    const { sessionId, path: routePath, title, action, geo, system, device, screenSize, scrollPercent } = req.body;

    if (!sessionId) {
      res.status(400).json({ error: "Missing session token credentials." });
      return;
    }

    const now = Date.now();
    
    // Resolve Server IP Fallback
    const proxyIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";
    const serverFetchedIp = Array.isArray(proxyIp) ? proxyIp[0] : proxyIp;
    const ipAddress = (geo && geo.ip && geo.ip !== '127.0.0.1') ? geo.ip : serverFetchedIp.split(",")[0].trim();

    let session = activeSessions.get(sessionId);

    const logItem: SessionLog = {
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      action: action || "Exploring pages"
    };

    if (!session) {
      session = {
        sessionId,
        ip: ipAddress,
        country: (geo && geo.country) || "Nigeria",
        device: device || "Desktop",
        screenSize: screenSize || "1920x1080",
        path: routePath || "/home",
        title: title || "VXT Grid Platform",
        lastPing: now,
        joinedAt: now,
        durationSeconds: 0,
        actions: [logItem],
        scrollPercent: scrollPercent || 0,
        geo: geo || {
          ip: ipAddress,
          country: "Nigeria",
          city: "Lagos",
          region: "Lagos State",
          org: "Local Network Provider",
          timezone: "Africa/Lagos",
          latitude: 6.45,
          longitude: 3.39,
          postal: "100001"
        },
        system: system || {
          userAgent: req.headers["user-agent"] || "Mozilla Browser",
          language: "en-US",
          referrer: "Direct Link Match",
          browser: "Chrome",
          os: "Windows",
          cores: 8,
          memory: "8 GB"
        }
      };
      
      activeSessions.set(sessionId, session);
    } else {
      session.lastPing = now;
      session.path = routePath || session.path;
      session.title = title || session.title;
      session.scrollPercent = scrollPercent !== undefined ? scrollPercent : session.scrollPercent;
      session.durationSeconds = Math.round((now - session.joinedAt) / 1000);
      
      // Update IP and details if they exist in client requests
      if (geo && geo.ip) session.ip = geo.ip;
      if (geo) session.geo = geo;
      if (system) session.system = system;

      // Append log entry
      if (action) {
        const lastAction = session.actions[session.actions.length - 1];
        if (!lastAction || lastAction.action !== action) {
          session.actions.push(logItem);
          // Upper bounding interactions depth log
          if (session.actions.length > 50) {
            session.actions.shift();
          }
        }
      }
    }

    // Save and Sync to database files
    saveHistoryLog();

    res.json({ success: true, activeCount: activeSessions.size });
    
    // Broadcast live event trace
    broadcastSSE("sessions_list", Array.from(activeSessions.values()));
  });

  // 5. API: Send built-in email with Resend
  app.post("/api/send-email", upload.single("attachment"), async (req, res) => {
    try {
      const { to, subject, message } = req.body;
      const file = req.file;

      if (!to || !subject || !message) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      if (!process.env.RESEND_API_KEY) {
        res.status(500).json({ error: "RESEND_API_KEY is not configured on the server." });
        return;
      }

      // Branded email template
      const htmlContent = `
        <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background-color: #020617; color: #f8fafc; padding: 40px; border-radius: 8px; border: 1px solid #1e293b;">
          <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin-bottom: 32px;">Udochukwu | VXTGrid Services</h1>
          
          <div style="color: #e2e8f0; font-size: 16px; line-height: 1.7; margin-bottom: 40px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          
          <div style="margin-top: 32px; font-size: 14px; color: #94a3b8; border-top: 1px solid #1e293b; padding-top: 24px;">
            <p style="margin: 0; font-weight: 600; color: #f8fafc;">Udochukwu</p>
            <p style="margin: 4px 0 0;">Web Designer & Digital Strategist</p>
            <p style="margin: 4px 0 16px;"><a href="https://udochukwu.com.ng" style="color: #3b82f6; text-decoration: none;">udochukwu.com.ng</a></p>
            
            <div style="margin-top: 20px;">
              <a href="https://linkedin.com/in/" style="color: #64748b; text-decoration: none; margin-right: 14px; font-weight: 500;">LinkedIn</a>
              <a href="https://instagram.com/" style="color: #64748b; text-decoration: none; margin-right: 14px; font-weight: 500;">Instagram</a>
              <a href="https://facebook.com/" style="color: #64748b; text-decoration: none; margin-right: 14px; font-weight: 500;">Facebook</a>
              <a href="https://t.me/vxtstore1" style="color: #3b82f6; text-decoration: none; font-weight: 500;">Telegram</a>
            </div>
          </div>
        </div>
      `;

      let attachments = [];
      if (file) {
        attachments.push({
          filename: file.originalname,
          content: file.buffer,
        });
      }

      const data = await resend.emails.send({
        from: "Udochukwu <hi@udochukwu.com.ng>",
        to: [to],
        subject: subject,
        html: htmlContent,
        attachments: attachments.length > 0 ? attachments : undefined
      });

      if (data.error) {
        console.error("Resend Error Context:", data.error);
        res.status(400).json({ error: data.error.message });
        return;
      }

      res.status(200).json({ success: true, data });
    } catch (error: any) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: error.message || "Failed to send email" });
    }
  });

  // Vite middleware or production Static File Routing with dynamic OpenGraph injection
  const isHtmlPageRequest = (req: express.Request) => {
    if (req.method !== "GET") return false;
    const reqPath = req.path;
    if (
      reqPath.startsWith("/api/") ||
      reqPath.startsWith("/@") ||
      reqPath.startsWith("/src/") ||
      reqPath.startsWith("/node_modules/") ||
      reqPath.startsWith("/assets/") ||
      reqPath.startsWith("/share/")
    ) {
      return false;
    }
    return !/\.[a-zA-Z0-9]+$/.test(reqPath);
  };

  if (process.env.NODE_ENV !== "production") {
    console.log("Mounting Vite developer middlewares...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    app.use(async (req, res, next) => {
      if (!isHtmlPageRequest(req)) {
        next();
        return;
      }
      try {
        const rawHtml = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf8");
        const ogHtml = injectOpenGraphMeta(rawHtml, req);
        const transformed = await vite.transformIndexHtml(req.originalUrl, ogHtml);
        res.status(200).set({ "Content-Type": "text/html" }).end(transformed);
      } catch (err) {
        vite.ssrFixStacktrace(err as Error);
        next(err);
      }
    });

    app.use(vite.middlewares);
  } else {
    console.log("Serving build assets statically in production pipeline...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false }));
    app.get("*", (req, res) => {
      try {
        const rawHtml = fs.readFileSync(path.join(distPath, "index.html"), "utf8");
        const ogHtml = injectOpenGraphMeta(rawHtml, req);
        res.status(200).set({ "Content-Type": "text/html" }).end(ogHtml);
      } catch {
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Node Full-Stack Server running on container ingress Port ${PORT}`);
  });
}

startServer();
