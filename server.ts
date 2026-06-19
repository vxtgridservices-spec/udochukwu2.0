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

  app.use(express.json());

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

  // Vite middleware or production Static File Routing
  if (process.env.NODE_ENV !== "production") {
    console.log("Mounting Vite developer middlewares...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving build assets statically in production pipeline...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Node Full-Stack Server running on container ingress Port ${PORT}`);
  });
}

startServer();
