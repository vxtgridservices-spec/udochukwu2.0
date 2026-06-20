import { useState, useEffect } from 'react';
import { PageView, ContactPreFill } from './types';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import FreeAudit from './components/FreeAudit';
import Insights from './components/Insights';
import Resources from './components/Resources';
import FAQs from './components/FAQs';
import Contact from './components/Contact';
import ClientDashboard from './components/ClientDashboard';
import Testimonials from './components/Testimonials';
import Learn from './components/Learn';
import RevenueCalculatorPage from './components/RevenueCalculatorPage';
import { CurrencyProvider, useCurrency } from './context/CurrencyContext';
import { SettingsProvider } from './context/ThemeContext';
import { initTracker } from './utils/tracker';

function TrackerInitializer({ activePage }: { activePage: string }) {
  const { detectedCountry } = useCurrency();
  useEffect(() => {
    const cleanup = initTracker(activePage, detectedCountry);
    return cleanup;
  }, [activePage, detectedCountry]);
  return null;
}

export default function App() {
  // Navigation active routed page view state
  const [activePage, setActivePage] = useState<PageView>(() => {
    const path = window.location.pathname.replace(/^\/+/, '') || 'home';
    const validPages: PageView[] = ['home', 'about', 'portfolio', 'services', 'industries', 'testimonials', 'audit', 'blog', 'resources', 'learn', 'faq', 'contact', 'dashboard', 'calculator'];
    return validPages.includes(path as PageView) ? (path as PageView) : 'home';
  });
  const [contactPreFill, setContactPreFill] = useState<ContactPreFill | undefined>(undefined);

  // Auto-sync history on load & back-button pop
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/+/, '') || 'home';
      const validPages: PageView[] = ['home', 'about', 'portfolio', 'services', 'industries', 'testimonials', 'audit', 'blog', 'resources', 'learn', 'faq', 'contact', 'dashboard', 'calculator'];
      setActivePage(validPages.includes(path as PageView) ? (path as PageView) : 'home');
    };
    window.addEventListener('popstate', handlePopState);
    // Initial history push if needed so the current path is registered correctly
    if (window.location.pathname === '/' && activePage === 'home') {
      window.history.replaceState({}, '', '/');
    }
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activePage]);

  // Fluid page switching scroll mechanics
  const handlePageNavigation = (page: string, preFill?: ContactPreFill) => {
    setActivePage(page as PageView);
    setContactPreFill(preFill);
    window.history.pushState({}, '', `/${page === 'home' ? '' : page}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <SettingsProvider>
      <CurrencyProvider>
        <TrackerInitializer activePage={activePage} />
        <Layout
          activePage={activePage}
          onNavigate={handlePageNavigation}
        >
          {activePage === 'home' && <Home onNavigate={handlePageNavigation} />}
          {activePage === 'calculator' && <RevenueCalculatorPage onNavigate={handlePageNavigation} />}
          {activePage === 'about' && <About onNavigate={handlePageNavigation} />}
          {activePage === 'portfolio' && <Portfolio onNavigate={handlePageNavigation} />}
          {activePage === 'services' && <Services onNavigate={handlePageNavigation} />}
          {activePage === 'industries' && <Services onNavigate={handlePageNavigation} />}
          {activePage === 'testimonials' && <Testimonials onNavigate={handlePageNavigation} />}
          {activePage === 'audit' && <FreeAudit onNavigate={handlePageNavigation} />}
          {activePage === 'blog' && <Insights onNavigate={handlePageNavigation} />}
          {activePage === 'resources' && <Resources />}
          {activePage === 'learn' && <Learn onNavigate={handlePageNavigation} />}
          {activePage === 'faq' && <FAQs onNavigate={handlePageNavigation} />}
          {activePage === 'contact' && <Contact preFill={contactPreFill} />}
          {activePage === 'dashboard' && <ClientDashboard />}
        </Layout>
      </CurrencyProvider>
    </SettingsProvider>
  );
}


