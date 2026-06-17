// High-fidelity Client-Side Realtime Visitor Tracking Utility

let sessionId = '';
let currentCountry = 'Unknown';
let currentActivePage = '';
let pingInterval: NodeJS.Timeout | null = null;
let lastActionLogged = '';

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

let cachedGeo: GeoDetails | null = null;

async function getGeoDetails(): Promise<GeoDetails> {
  if (cachedGeo) return cachedGeo;

  const stored = localStorage.getItem('vxt_tracker_geo_data');
  if (stored) {
    try {
      cachedGeo = JSON.parse(stored);
      return cachedGeo!;
    } catch (e) {
      // Clear corrupt cache
    }
  }

  try {
    const res = await fetch('https://ipapi.co/json/');
    if (res.ok) {
      const data = await res.json();
      const geo: GeoDetails = {
        ip: data.ip || '127.0.0.1',
        country: data.country_name || 'Africa',
        city: data.city || 'Lagos',
        region: data.region || 'Lagos State',
        org: data.org || 'Unknown Provider',
        timezone: data.timezone || 'Africa/Lagos',
        latitude: data.latitude || 6.45,
        longitude: data.longitude || 3.39,
        postal: data.postal || '100001'
      };
      localStorage.setItem('vxt_tracker_geo_data', JSON.stringify(geo));
      cachedGeo = geo;
      return geo;
    }
  } catch (e) {
    console.warn('Geo IP lookup offline. Relying on default country credentials.');
  }

  return {
    ip: '127.0.0.1',
    country: localStorage.getItem('vxt_user_country') || 'Africa',
    city: 'Lagos',
    region: 'Lagos State',
    org: 'Gateway Provider',
    timezone: 'Africa/Lagos',
    latitude: 6.45,
    longitude: 3.39,
    postal: '100001'
  };
}

function getBrowserAndOS() {
  const ua = navigator.userAgent;
  let browser = 'Other Browser';
  let os = 'Other OS';

  if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/chrome|crios/i.test(ua)) {
    if (/opr|opera/i.test(ua)) browser = 'Opera';
    else browser = 'Chrome';
  } else if (/safari/i.test(ua)) browser = 'Safari';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';

  return { browser, os };
}

function getDeviceType(): string {
  const width = window.innerWidth;
  if (width < 640) return 'Mobile';
  if (width < 1024) return 'Tablet';
  return 'Desktop';
}

function getSessionId(): string {
  if (sessionId) return sessionId;
  
  let stored = localStorage.getItem('vxt_tracker_session');
  if (!stored) {
    stored = 'vxt_sess_' + Math.random().toString(36).substring(2, 11);
    localStorage.setItem('vxt_tracker_session', stored);
  }
  sessionId = stored;
  return sessionId;
}

export async function trackAction(action: string) {
  if (action === lastActionLogged) return;
  lastActionLogged = action;

  const sessId = getSessionId();
  const screen = `${window.screen.width || window.innerWidth}x${window.screen.height || window.innerHeight}`;
  const device = getDeviceType();
  const { browser, os } = getBrowserAndOS();
  
  // Extract geo parameters (secure fallback loading cached node)
  const geo = await getGeoDetails();

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

  fetch('/api/tracker/ping', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId: sessId,
      path: currentActivePage ? `/${currentActivePage}` : '/home',
      title: document.title || 'VXT Grid Platform',
      action,
      geo,
      system: {
        userAgent: navigator.userAgent,
        language: navigator.language || 'en-US',
        referrer: document.referrer || 'Direct / Bookmark Link',
        browser,
        os,
        cores: navigator.hardwareConcurrency || 4,
        memory: (navigator as any).deviceMemory ? (navigator as any).deviceMemory + ' GB' : 'N/A'
      },
      device,
      screenSize: screen,
      scrollPercent
    })
  }).catch(() => {
    // Fail silently
  });
}

export function initTracker(activePage: string, country: string) {
  currentCountry = country || 'Unknown';
  currentActivePage = activePage;

  // Track initial page load/switch
  trackAction(`Arrived on ${activePage.toUpperCase()}`);

  if (pingInterval) clearInterval(pingInterval);

  pingInterval = setInterval(() => {
    trackAction('Still active - exploring page');
  }, 8000);

  let scrollThrottle = false;
  const handleScroll = () => {
    if (scrollThrottle) return;
    scrollThrottle = true;
    setTimeout(() => {
      scrollThrottle = false;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      
      if (scrollPercent >= 25 && scrollPercent < 50) {
        trackAction('Scrolled 25% down the page');
      } else if (scrollPercent >= 50 && scrollPercent < 75) {
        trackAction('Scrolled 50% down the page');
      } else if (scrollPercent >= 75 && scrollPercent < 95) {
        trackAction('Deep reading - Scrolled 75% down');
      } else if (scrollPercent >= 95) {
        trackAction('Scrolled to bottom footer section');
      }
    }, 2000);
  };

  const handleGlobalClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target || !target.tagName) return;

    const text = target.innerText?.trim() || target.getAttribute('title') || target.tagName;
    
    const isButtonOrLink = target.tagName === 'BUTTON' || 
                           (typeof target.closest === 'function' && target.closest('a')) || 
                           (target.classList && typeof target.classList.contains === 'function' && target.classList.contains('cursor-pointer')) ||
                           (typeof target.className === 'string' && target.className.includes('cursor-pointer'));

    if (isButtonOrLink) {
      if (text && text.length < 40) {
        trackAction(`Clicked: "${text}"`);
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('click', handleGlobalClick);

  return () => {
    if (pingInterval) clearInterval(pingInterval);
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('click', handleGlobalClick);
  };
}
