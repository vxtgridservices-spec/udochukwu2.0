import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRELOADED_RESOURCES, saveNewsletterSubscriber } from '../utils/storage';
import { Download, Sparkles, Check, Mail, Heart } from 'lucide-react';
import { ResourceItem } from '../types';
import { jsPDF } from 'jspdf';

export default function Resources() {
  const [resources, setResources] = useState<ResourceItem[]>(() => PRELOADED_RESOURCES);
  const [subEmail, setSubEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorText, setErrorText] = useState('');

  // Download logic using jsPDF library to generate professional high-fidelity PDF documents
  const handleDownload = (resId: string, title: string) => {
    // Increment download numbers on-screen
    const updated = resources.map(r => {
      if (r.id === resId) {
        return { ...r, downloadCount: r.downloadCount + 1 };
      }
      return r;
    });
    setResources(updated);
    localStorage.setItem('vxt_resources', JSON.stringify(updated));

    // Initialize high-fidelity jsPDF instance
    const doc = new jsPDF();
    
    // Page Header Helper
    const drawPageHeader = (pDoc: typeof doc) => {
      pDoc.setFillColor(15, 23, 42); // slate-900 / dark color
      pDoc.rect(0, 0, 210, 24, 'F');
      
      pDoc.setTextColor(255, 255, 255);
      pDoc.setFont('Helvetica', 'bold');
      pDoc.setFontSize(10);
      pDoc.text('VXTGRID SERVICES CLIENT INTEL | BY UDOCHUKWU', 20, 14);
      
      // Bottom thin gold/blue border
      pDoc.setFillColor(59, 130, 246); // Blue accent
      pDoc.rect(0, 24, 210, 1.5, 'F');
    };

    // Heading Helper
    const drawSectionHeading = (pDoc: typeof doc, headingText: string, currentY: number): number => {
      if (currentY > 245) {
        pDoc.addPage();
        drawPageHeader(pDoc);
        currentY = 40;
      }
      pDoc.setFont('Helvetica', 'bold');
      pDoc.setFontSize(12);
      pDoc.setTextColor(29, 78, 216); // Royal Blue
      pDoc.text(headingText.toUpperCase(), 20, currentY);
      
      // Horizontal separator line
      pDoc.setDrawColor(219, 234, 254);
      pDoc.setLineWidth(0.5);
      pDoc.line(20, currentY + 2, 190, currentY + 2);
      
      return currentY + 9;
    };

    // Paragraph Helper
    const drawParagraph = (pDoc: typeof doc, pTxt: string, currentY: number, fSize = 9.5, lSpacing = 5.5, isBullet = false): number => {
      pDoc.setFont('Helvetica', 'normal');
      pDoc.setFontSize(fSize);
      pDoc.setTextColor(51, 65, 85); // slate-700
      
      const xPos = isBullet ? 25 : 20;
      const wrappedLines = pDoc.splitTextToSize(pTxt, isBullet ? 165 : 170);
      
      for (let i = 0; i < wrappedLines.length; i++) {
        if (currentY > 270) {
          pDoc.addPage();
          drawPageHeader(pDoc);
          currentY = 40;
        }
        
        if (isBullet && i === 0) {
          pDoc.setFont('Helvetica', 'bold');
          pDoc.setTextColor(59, 130, 246);
          pDoc.text('•', 20, currentY);
          pDoc.setFont('Helvetica', 'normal');
          pDoc.setTextColor(51, 65, 85);
        }
        pDoc.text(wrappedLines[i], xPos, currentY);
        currentY += lSpacing;
      }
      return currentY + 1.5;
    };

    // Draw First Page Hero Banner Block
    doc.setFillColor(15, 23, 42); 
    doc.rect(0, 0, 210, 42, 'F');
    
    // Banner Accent Strip
    doc.setFillColor(59, 130, 246); 
    doc.rect(0, 42, 210, 2.5, 'F');

    // Hero Text
    doc.setTextColor(255, 255, 255);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('VXTGRID SERVICES | COMPLIMENTS OF UDOCHUKWU', 20, 19);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('PREMIUM DIGITAL ARCHITECTURE & CONVERSION ENGINEERING FOR WEST AFRICA', 20, 27);
    doc.text('Document Date: ' + new Date().toLocaleDateString() + ' | Verified Executive Playbook', 20, 34);

    let y = 58;

    // Document Title Header
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(15, 23, 42);
    
    const splitTitle = doc.splitTextToSize(title.toUpperCase(), 170);
    for (const titleLine of splitTitle) {
      doc.text(titleLine, 20, y);
      y += 7;
    }
    y += 4;

    if (resId === 'res-01') {
      // Document 1 content
      y = drawParagraph(doc, "This blueprint is prepared personally by Udochukwu, Founder of VXTGrid Services, to serve as a comprehensive strategic framework for ambitious African enterprises, founders, and organizations preparing to design highly-converting, resilient digital spaces. Use this blueprint to align internal team stakeholders and prevent costly scope-creep pitfalls before writing a single line of code.", y);
      y += 4;

      y = drawSectionHeading(doc, "1. Discovery & Conversion Funnels mapping", y);
      y = drawParagraph(doc, "Digital experiences succeed when they address user intent and regional conversion psychographics directly. Always define user needs and action pathways before starting creative steps.", y);
      y = drawParagraph(doc, "Define target visitor segments clearly (e.g., local corporate entities vs. high-worth Diaspora investors). Diaspora investors require premium social recognition cues, secure SSL lock seals, and simple diagnostic checks to establish professional trust.", y, 9.5, 5.5, true);
      y = drawParagraph(doc, "Map specific visitor actions: prioritize a prominent multi-channel WhatsApp trigger button, real-time ROI estimations, simplified direct-contact web hooks, and easy-to-use booking gateways.", y, 9.5, 5.5, true);
      y = drawParagraph(doc, "Structure page flows cleanly with fluid, responsive layouts. Establish clear display typography pairings (e.g., luxurious heading Serif paired with easy-to-read geometric Sans-serif subtexts) and generous negative margins.", y, 9.5, 5.5, true);
      y += 4;

      y = drawSectionHeading(doc, "2. High-Performance Speed Budgets", y);
      y = drawParagraph(doc, "Modern web audiences demand immediate access. In West Africa, network fluctuations on mobile carriers mean optimizing for loading speeds is a critical business metric.", y);
      y = drawParagraph(doc, "Limit absolute mobile load times under 1.5 seconds under standard 3G/4G throttling states. This ensures frictionless delivery even in cell zones with packet drops.", y, 9.5, 5.5, true);
      y = drawParagraph(doc, "Enforce strict image optimization: enforce Next-Gen compression models (WebP, AVIF) at 80% compression ratios. Restrict big screen banners to 150KB and supporting visual assets under 40KB.", y, 9.5, 5.5, true);
      y = drawParagraph(doc, "Ensure static files can be served via CDN edge servers with low latency round-trips. Keep Javascript bundles clean and lazy-load larger utility libraries to keep main processes nimble.", y, 9.5, 5.5, true);
      y += 4;

      y = drawSectionHeading(doc, "3. Investment & Operation Budgets", y);
      y = drawParagraph(doc, "Quality digital infrastructure is an appreciating capital investment, not a cheap liability. Align project scopes with business target scopes and market pricing averages.", y);
      y = drawParagraph(doc, "Small Business Launch Hub (350K - 650K NGN): Suitable for reliable high-credibility boutique brands, consultants, or regional local services with low maintenance overhead.", y, 9.5, 5.5, true);
      y = drawParagraph(doc, "Mid-Market Corporate/SaaS Portal (850K - 1.8M NGN): Perfect for medium-scale firms, real estate portfolios, direct-booking models, and robust multi-view experiences.", y, 9.5, 5.5, true);
      y = drawParagraph(doc, "Enterprise Full-Scale Platform (2M+ NGN): Ideal for comprehensive booking engines, complex local/international API listings, custom database synchronization nodes, and client-facing tracking panels.", y, 9.5, 5.5, true);
      y = drawParagraph(doc, "Operational Maintenance Allocation: Allocate annual budgets for fast VPS server nodes (avg. 45,000 NGN to 90,000 NGN annually), premium commercial domains, SSL configuration security checks, and regular database backups.", y, 9.5, 5.5, true);

    } else if (resId === 'res-02') {
      // Document 2 content
      y = drawParagraph(doc, "This technical checklist from Udochukwu (Founder, VXTGrid Services) outlines 24 critical technical optimizations to align visual titles, rich-results headers, locational index tags, and speed up Google Search rankings for African enterprise brands in highly competitive local landscapes.", y);
      y += 4;

      y = drawSectionHeading(doc, "Phase 1: Meta Tagging & Visual Semantic Hierarchy", y);
      y = drawParagraph(doc, "Build clean HTML hierarchies to help search engines catalog your pages easily.", y);
      y = drawParagraph(doc, "Semantic Tags: Verify that every page has exactly one H1 markup containing your primary focal target keyword (e.g., 'Bespoke Luxury Homes Lekki'). Ensure sequential H2 and H3 structures are used to organize sub-content blocks.", y, 9.5, 5.5, true);
      y = drawParagraph(doc, "Meta Details limits: Restrict character length for webpage titles under 60 characters and description snippets under 155 characters. Include strong CTR high-trust triggers like 'Instant Naira/USD Settlement'.", y, 9.5, 5.5, true);
      y = drawParagraph(doc, "Alt Text attributes: Check that all static images and decorative assets contain rich, descriptive 'alt' tags to feed image indexing graphs successfully.", y, 9.5, 5.5, true);
      y += 4;

      y = drawSectionHeading(doc, "Phase 2: Local Schema.org Schema Injections", y);
      y = drawParagraph(doc, "Structured schemas provide immediate contextual validation to search crawlers, resulting in richer, more descriptive listings in organic results.", y);
      y = drawParagraph(doc, "Configure valid JSON-LD schemas targeting specific business classifications (e.g., 'RealEstateAgent', 'LocalBusiness', 'ProfessionalService' as suitable).", y, 9.5, 5.5, true);
      y = drawParagraph(doc, "Provide complete semantic inputs: specify accurate Name, operating address, active support telephone contacts, regional geocoding coordinates (latitude/longitude), and actual local working hours.", y, 9.5, 5.5, true);
      y = drawParagraph(doc, "Review implementation: Use Google Rich Results Testing validation portals regularly to inspect schema structures and resolve warnings or missing attributes immediately.", y, 9.5, 5.5, true);
      y += 4;

      y = drawSectionHeading(doc, "Phase 3: Locational Citations & Core Web Vitals", y);
      y = drawParagraph(doc, "Local relevance relies heavily on consistent geographic signals and perfect client UX on mobile devices.", y);
      y = drawParagraph(doc, "Verify GBP Consistency: Standardize your business Name, Address, and Phone (NAP) details exactly across your Google Business Profile, Facebook listings, corporate directory items, and footer contact columns.", y, 9.5, 5.5, true);
      y = drawParagraph(doc, "Improve Core Web Vitals: Measure your Largest Contentful Paint (LCP) to be under 2.5 seconds. Set absolute layouts constraints to bypass layout shifts (CLS) when assets are loading.", y, 9.5, 5.5, true);
      y = drawParagraph(doc, "Embed Interactive Authority Signals: Place a responsive Google Maps locator iframe block within contact section margins to highlight your geographic operational focal point.", y, 9.5, 5.5, true);

    } else {
      // Document 3 content
      y = drawParagraph(doc, "This hospitality strategy blueprint is written personally by Udochukwu (Founder of VXTGrid Services) to guide luxury hotels, boutique apartments, short-let companies, and wellness hubs in Africa on how to optimize direct client acquisition channels, escape heavy middleman OTA fees, and build long-term diaspora loyalty.", y);
      y += 4;

      y = drawSectionHeading(doc, "Chapter 1: Bypassing High OTA Commission Fees", y);
      y = drawParagraph(doc, "Relying on intermediary platforms places high pressure on hotel margins, while creating a barrier to direct relationships with guests.", y);
      y = drawParagraph(doc, "Acknowledge Margin Loss: OTA providers (e.g., Booking.com, Airbnb, regional agents) collect high reservation commissions (typically 15% to 25% of absolute billing amounts). Over 12 months, this represents millions of cash leaks for standard 10-room boutique hotels.", y, 9.5, 5.5, true);
      y = drawParagraph(doc, "The Direct Upgrade Objective: Build target direct paths. Set goals to migrate at least 35% to 50% of repeat bookings and high-worth diaspora clients onto a dedicated direct-booking website.", y, 9.5, 5.5, true);
      y = drawParagraph(doc, "Build Direct Channels Value: Offer bespoke direct booking perks such as complimentary airport transfers, specialized continental breakfasts, or early check-in hours to build brand preference.", y, 9.5, 5.5, true);
      y += 4;

      y = drawSectionHeading(doc, "Chapter 2: Frictionless Reservation Funnel Designs", y);
      y = drawParagraph(doc, "If booking on your website is more complex than booking on an OTA, users will leave. Keep room selection and pricing transparent and easy to navigate.", y);
      y = drawParagraph(doc, "Incorporate responsive calendars: allow users to input check-in/check-out selections with clean, simple date picker calendars that update prices, tax estimates, and availability instantly.", y, 9.5, 5.5, true);
      y = drawParagraph(doc, "Support multi-currency displays: allow diaspora bookers to toggle room pricing easily between African currencies (such as Naira or Shilling), US Dollars (USD), and British Pounds (GBP).", y, 9.5, 5.5, true);
      y = drawParagraph(doc, "Persistent Mobile CTAs: Keep booking actions immediately accessible on mobile devices. Ensure booking panels or buttons float cleanly at the bottom without blocking visual space.", y, 9.5, 5.5, true);
      y += 4;

      y = drawSectionHeading(doc, "Chapter 3: Integrating Secure Payment Gateways", y);
      y = drawParagraph(doc, "Securing dynamic payments build immediate trust with guests, especially when they are booking internationally or from diaspora locations.", y);
      y = drawParagraph(doc, "Deploy reliable local checkouts: integrate secure payment engines like Paystack or Flutterwave to support standard bank transfers, USSD dials, and cards directly in Naira.", y, 9.5, 5.5, true);
      y = drawParagraph(doc, "Support international bookings: configure secure Merchant USD settlement pathways to capture overseas credit card payments smoothly without conversion barriers.", y, 9.5, 5.5, true);
      y = drawParagraph(doc, "Deploy Automated Confirmation workflows: trigger styled, instant reservation confirmation emails with custom room guidelines, security instructions, and geolocational coordinates immediately.", y, 9.5, 5.5, true);
    }

    // Save with elegant PDF name
    doc.save(`VXTGrid_${title.replace(/\s+/g, '_')}.pdf`);
  };

  const handleSubscribeNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail || !subEmail.includes('@')) {
      setErrorText('Please enter a valid work email address.');
      return;
    }

    const success = saveNewsletterSubscriber(subEmail);
    if (success) {
      setIsSubscribed(true);
      setErrorText('');
      setSubEmail('');
    } else {
      setErrorText('Your email is already registered on our master list!');
    }
  };

  return (
    <div className="py-16 md:py-24 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Intro */}
        <div className="text-left md:text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-[0.25em] block mb-3">
            CLIENT RESOURCES BAY
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white mt-1 font-semibold tracking-tight uppercase leading-none">
            Free Checklists & Templates
          </h2>
          <p className="text-slate-400 mt-4 text-xs sm:text-sm font-sans leading-relaxed">
            Acquire actual checklists, planners, and templates built dynamically for elite businesses ready to claim high SEO domain scores and flawless local speeds.
          </p>
        </div>

        {/* Resources Stack - Pure unboxed line dividers style (matching FAQs and current style) */}
        <div className="divide-y divide-white/10 border-t border-b border-white/10 mt-12 mb-20">
          {resources.map((r, rIdx) => (
            <div
              key={r.id}
              className="py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.01] transition-all"
            >
              <div className="space-y-4 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[9px] text-blue-405 font-extrabold uppercase tracking-[0.2em] bg-blue-500/10 px-2.5 py-0.5 border border-blue-500/10 text-blue-400">
                    {r.type}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 tracking-[0.15em] uppercase font-bold">
                    ⬇ {r.downloadCount} DOWNLOADS
                  </span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-serif font-med text-white leading-tight">
                  {r.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans font-light">
                  {r.description}
                </p>
              </div>

              <div className="shrink-0 mt-2 md:mt-0">
                <button
                  onClick={() => handleDownload(r.id, r.title)}
                  id={`resource-download-btn-${r.id}`}
                  className="w-full sm:w-auto bg-white text-slate-105 hover:bg-slate-100 text-slate-950 text-[10px] font-mono font-bold uppercase tracking-[0.22em] px-6 py-4.5 border border-white transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>Download Playbook</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* HIGH-CONVERSION NEWSLETTER BOX - Flat minimalist theme-aligned design */}
        <div className="bg-[#131620]/50 p-8 sm:p-12 border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-4xl mx-auto backdrop-blur-xs">
          <div className="md:col-span-7 space-y-3">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.22em] font-extrabold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              VXTGRID EXECUTIVE DIGEST
            </span>
            <h2 className="text-xl sm:text-2xl font-serif text-white tracking-tight uppercase leading-snug font-medium">
              Unlock direct marketing secrets in your mail inbox.
            </h2>
            <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed max-w-md font-sans">
              No spam. Only high-performance reports outlining conversion psychographics, speed diagnostics, and local SEO ranking updates written personally by Udochukwu twice every month.
            </p>
          </div>

          <div className="md:col-span-5">
            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form 
                  key="form"
                  onSubmit={handleSubscribeNewsletter}
                  className="space-y-3"
                >
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="ceo@palmsrealty.ng"
                      value={subEmail}
                      onChange={(e) => setSubEmail(e.target.value)}
                      className="w-full bg-[#0d0f17] text-white text-xs border border-white/10 pl-10 pr-4 py-3.5 rounded-none font-mono focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                    />
                    <Mail className="absolute left-3 top-4 w-4 h-4 text-slate-500" />
                  </div>

                  <button
                    type="submit"
                    id="newsletter-subscribe-submit"
                    className="w-full bg-white text-slate-950 hover:bg-slate-100 text-[10px] font-mono font-bold uppercase tracking-[0.2em] py-4 px-4 border border-white transition-all cursor-pointer"
                  >
                    Join Exclusive Newsletter
                  </button>

                  {errorText && (
                    <p className="text-rose-400 text-[10px] font-mono text-center leading-none mt-2">{errorText}</p>
                  )}
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-blue-950/40 p-6 rounded-none border border-blue-500/20 text-center space-y-3"
                >
                  <div className="h-8 w-8 bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mx-auto">
                    <Check className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-white">Registered Successfully!</p>
                  <p className="text-slate-400 text-[10px] uppercase font-mono tracking-widest flex items-center justify-center gap-1">
                    Welcome to VXT elite circles <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
