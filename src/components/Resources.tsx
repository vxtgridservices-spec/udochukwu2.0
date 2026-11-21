import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRELOADED_RESOURCES, saveNewsletterSubscriber } from '../utils/storage';
import { Download, Mail, CheckCircle2 } from 'lucide-react';
import { ResourceItem } from '../types';
import { jsPDF } from 'jspdf';

export default function Resources() {
  const [resources, setResources] = useState<ResourceItem[]>(() => PRELOADED_RESOURCES);
  const [subEmail, setSubEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleDownload = (resId: string, title: string) => {
    const updated = resources.map((r) =>
      r.id === resId ? { ...r, downloadCount: r.downloadCount + 1 } : r
    );
    setResources(updated);
    localStorage.setItem('vxt_resources', JSON.stringify(updated));

    const doc = new jsPDF();

    const drawPageHeader = (pDoc: typeof doc) => {
      pDoc.setFillColor(15, 23, 42);
      pDoc.rect(0, 0, 210, 24, 'F');
      pDoc.setTextColor(255, 255, 255);
      pDoc.setFont('Helvetica', 'bold');
      pDoc.setFontSize(10);
      pDoc.text('VXTGRID SERVICES RESOURCE GUIDE | BY UDOCHUKWU', 20, 14);
      pDoc.setFillColor(59, 130, 246);
      pDoc.rect(0, 24, 210, 1.5, 'F');
    };

    const drawSectionHeading = (pDoc: typeof doc, headingText: string, currentY: number): number => {
      if (currentY > 245) {
        pDoc.addPage();
        drawPageHeader(pDoc);
        currentY = 40;
      }
      pDoc.setFont('Helvetica', 'bold');
      pDoc.setFontSize(12);
      pDoc.setTextColor(29, 78, 216);
      pDoc.text(headingText.toUpperCase(), 20, currentY);
      pDoc.setDrawColor(219, 234, 254);
      pDoc.setLineWidth(0.5);
      pDoc.line(20, currentY + 2, 190, currentY + 2);
      return currentY + 9;
    };

    const drawParagraph = (
      pDoc: typeof doc,
      pTxt: string,
      currentY: number,
      fSize = 9.5,
      lSpacing = 5.5,
      isBullet = false
    ): number => {
      pDoc.setFont('Helvetica', 'normal');
      pDoc.setFontSize(fSize);
      pDoc.setTextColor(51, 65, 85);

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

    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 42, 'F');
    doc.setFillColor(59, 130, 246);
    doc.rect(0, 42, 210, 2.5, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('VXTGRID SERVICES | PREPARED BY UDOCHUKWU', 20, 19);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('WEB SYSTEMS ENGINEERING & DIGITAL ARCHITECTURE GUIDE', 20, 27);
    doc.text('Generated: ' + new Date().toLocaleDateString(), 20, 34);

    let y = 58;

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
      y = drawParagraph(
        doc,
        'This planning blueprint outlines key architectural decisions for businesses scoping a custom website or web application before development starts.',
        y
      );
      y += 4;
      y = drawSectionHeading(doc, '1. Scope & User Journey Mapping', y);
      y = drawParagraph(
        doc,
        'Clarify primary visitor goals, core service pages, inquiry routing channels, and mobile layout hierarchy prior to implementation.',
        y,
        9.5,
        5.5,
        true
      );
      y = drawSectionHeading(doc, '2. Performance & Media Discipline', y);
      y = drawParagraph(
        doc,
        'Compress product photography and avoid unnecessary third-party scripts so pages remain responsive over Nigerian mobile data networks.',
        y,
        9.5,
        5.5,
        true
      );
    } else if (resId === 'res-02') {
      y = drawParagraph(
        doc,
        'Use this technical launch checklist to verify HTML semantics, metadata tags, responsive breakpoints, and Schema.org markup before going live.',
        y
      );
      y += 4;
      y = drawSectionHeading(doc, '1. Semantic HTML & Metadata', y);
      y = drawParagraph(
        doc,
        'Ensure each route defines a descriptive <title>, meta description, single <h1>, and descriptive image alt text.',
        y,
        9.5,
        5.5,
        true
      );
      y = drawSectionHeading(doc, '2. Local Schema & Accessibility', y);
      y = drawParagraph(
        doc,
        'Include clean JSON-LD Organization/LocalBusiness markup, legible text contrast, and keyboard-accessible controls.',
        y,
        9.5,
        5.5,
        true
      );
    } else {
      y = drawParagraph(
        doc,
        'Practical checkout and order-handling guidelines for businesses accepting direct online orders and Payment on Delivery.',
        y
      );
      y += 4;
      y = drawSectionHeading(doc, '1. Transparent Pricing & Delivery Terms', y);
      y = drawParagraph(
        doc,
        'State product prices, warranty terms, eligible Free Delivery cities, and Payment on Delivery boundaries upfront.',
        y,
        9.5,
        5.5,
        true
      );
      y = drawSectionHeading(doc, '2. Order Confirmation & Dispatch', y);
      y = drawParagraph(
        doc,
        'Issue clear order references and coordinate delivery windows promptly over phone or WhatsApp.',
        y,
        9.5,
        5.5,
        true
      );
    }

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
      setErrorText('This email address is already subscribed.');
    }
  };

  return (
    <div className="bg-[#181d2c] text-white">
      {/* 1. HERO BAND (Teal Wash) */}
      <section className="bg-[#3c7b8c] py-20 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-white/85 uppercase tracking-[0.18em] mb-4">
            <Download className="w-4 h-4" />
            <span>Client Resource Library</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold text-white tracking-tight">
            Checklists &amp; Guides
          </h1>
          <div className="w-full max-w-2xl h-[1px] bg-white/80 my-6" />
          <p className="text-white/95 text-xs sm:text-sm tracking-[0.16em] font-mono leading-relaxed max-w-2xl uppercase">
            DOWNLOAD PROJECT SCOPING TEMPLATES, TECHNICAL LAUNCH CHECKLISTS, AND ENUGU HARDWARE DELIVERY GUIDES.
          </p>
        </div>
      </section>

      {/* 2. RESOURCE LIST BAND (Deep Navy) */}
      <section className="bg-[#1b243b] py-16 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="divide-y divide-white/20 border-t border-b border-white/20">
            {resources.map((r) => (
              <div
                key={r.id}
                className="py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-[0.16em] text-white/75 tabular-nums">
                    <span className="text-white font-semibold">{r.type}</span>
                    <span aria-hidden="true">·</span>
                    <span>{r.downloadCount} downloads</span>
                    <span aria-hidden="true">·</span>
                    <span>{r.fileSize}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-sans font-semibold text-white">
                    {r.title}
                  </h2>
                  <p className="text-white/80 text-sm leading-relaxed font-sans">
                    {r.description}
                  </p>
                </div>

                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => handleDownload(r.id, r.title)}
                    id={`resource-download-btn-${r.id}`}
                    className="w-full sm:w-auto border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white text-xs font-mono font-semibold uppercase tracking-[0.18em] px-6 py-3.5 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NEWSLETTER BAND (Periwinkle Indigo Wash) */}
      <section className="bg-[#485180] py-16 sm:py-20">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-3">
            <span className="text-xs font-mono text-white/85 uppercase tracking-[0.18em] inline-flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>VXTGrid Dispatch</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-white tracking-tight">
              Receive engineering notes and product updates.
            </h2>
            <div className="w-40 h-[1px] bg-white/80 my-4" />
            <p className="text-white/85 text-sm leading-relaxed max-w-md font-sans">
              Practical write-ups on performance engineering, SEO structure, and Buyfromudochukwu stock updates.
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
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    className="w-full bg-[#141a2b]/80 text-white text-xs sm:text-sm border border-white/25 px-4 py-3.5 font-mono focus:border-white focus:outline-hidden"
                  />

                  <button
                    type="submit"
                    id="newsletter-subscribe-submit"
                    className="w-full border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white text-xs font-mono font-semibold uppercase tracking-[0.18em] py-3.5 px-6 transition-colors cursor-pointer"
                  >
                    Subscribe
                  </button>

                  {errorText && (
                    <p className="text-rose-200 text-xs font-mono mt-2">{errorText}</p>
                  )}
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#141a2b]/80 p-6 border border-white/30 text-center space-y-2.5"
                >
                  <CheckCircle2 className="w-6 h-6 text-emerald-300 mx-auto" />
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Subscribed Successfully
                  </p>
                  <p className="text-white/75 text-xs font-mono uppercase tracking-wider">
                    You are on the dispatch list.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
