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
import { CurrencyProvider, useCurrency } from './context/CurrencyContext';
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
  const [activePage, setActivePage] = useState<PageView>('home');
  const [contactPreFill, setContactPreFill] = useState<ContactPreFill | undefined>(undefined);

  // Load and manage Dark Mode preferences
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('vxt_dark_mode');
      if (stored) return stored === 'true';
      // Force elegant Light theme as the main default theme
      return false;
    } catch (e) {
      return false;
    }
  });

  const handleToggleDarkMode = () => {
    setDarkMode(prev => {
      const updated = !prev;
      localStorage.setItem('vxt_dark_mode', String(updated));
      return updated;
    });
  };

  // Fluid page switching scroll mechanics
  const handlePageNavigation = (page: string, preFill?: ContactPreFill) => {
    setActivePage(page as PageView);
    setContactPreFill(preFill);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <CurrencyProvider>
      <TrackerInitializer activePage={activePage} />
      <Layout
        activePage={activePage}
        onNavigate={handlePageNavigation}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      >
        {activePage === 'home' && <Home onNavigate={handlePageNavigation} />}
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
  );
}


