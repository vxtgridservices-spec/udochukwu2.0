import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { saveContact, saveBooking } from '../utils/storage';
import { trackAction } from '../utils/tracker';
import {
  PhoneForwarded,
  Linkedin,
  Facebook,
  Instagram,
  CalendarPlus,
  Clock,
  CheckSquare,
  SendHorizontal,
} from 'lucide-react';
import { ContactPreFill } from '../types';

export default function Contact({ preFill }: { preFill?: ContactPreFill }) {
  const [cName, setCName] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cPhone, setCPhone] = useState('');
  const [cSubject, setCSubject] = useState(preFill?.subject || 'Acquiring New Website');
  const [cMessage, setCMessage] = useState(preFill?.message || '');
  const [contactError, setContactError] = useState('');
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const day2 = new Date();
  day2.setDate(day2.getDate() + 2);
  const day3 = new Date();
  day3.setDate(day3.getDate() + 3);
  const day4 = new Date();
  day4.setDate(day4.getDate() + 4);

  const availableDays = [
    {
      dateStr: tomorrow.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }),
      dateObj: tomorrow.toISOString().split('T')[0],
    },
    {
      dateStr: day2.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }),
      dateObj: day2.toISOString().split('T')[0],
    },
    {
      dateStr: day3.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }),
      dateObj: day3.toISOString().split('T')[0],
    },
    {
      dateStr: day4.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }),
      dateObj: day4.toISOString().split('T')[0],
    },
  ];

  const timeSlots = ['10:00 AM (WAT)', '11:30 AM (WAT)', '02:00 PM (WAT)', '04:30 PM (WAT)'];

  const [selectedDay, setSelectedDay] = useState(availableDays[0].dateObj);
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[0]);

  const [bName, setBName] = useState('');
  const [bEmail, setBEmail] = useState('');
  const [bNotes, setBNotes] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [isBookingSubmitted, setIsBookingSubmitted] = useState(false);
  const [bookingRedirectUrl, setBookingRedirectUrl] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cName.trim() || !cEmail.trim() || !cMessage.trim()) {
      setContactError('Please complete your name, email address, and project message.');
      return;
    }

    setContactError('');
    saveContact({
      name: cName.trim(),
      email: cEmail.trim(),
      phone: cPhone.trim(),
      subject: cSubject,
      message: cMessage.trim(),
    });

    trackAction(`Submitted an Inbound Inquiry: Subject: "${cSubject}" by ${cName}`);

    setIsContactSubmitted(true);
    setCName('');
    setCEmail('');
    setCPhone('');
    setCMessage('');
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bName.trim() || !bEmail.trim()) {
      setBookingError('Please provide your name and email address to reserve a time slot.');
      return;
    }

    setBookingError('');
    saveBooking({
      name: bName.trim(),
      email: bEmail.trim(),
      date: selectedDay,
      timeSlot: selectedSlot,
      notes: bNotes.trim(),
    });

    trackAction(`Strategic Consultation Booked: ${selectedDay} at ${selectedSlot} by ${bName}`);

    const formattedMessage =
      `Hello Udochukwu / VXTGrid Services, I would like to confirm a consultation:\n` +
      `- Name: ${bName.trim()}\n` +
      `- Email: ${bEmail.trim()}\n` +
      `- Date/Slot: ${selectedDay} at ${selectedSlot}\n` +
      `${bNotes.trim() ? `- Notes: ${bNotes.trim()}` : ''}`;

    const waUrl = `https://wa.me/2347052199651?text=${encodeURIComponent(formattedMessage)}`;
    setBookingRedirectUrl(waUrl);
    setIsBookingSubmitted(true);

    setBName('');
    setBEmail('');
    setBNotes('');
  };

  return (
    <div className="bg-[#181d2c] text-white">
      {/* 1. HERO BAND (Periwinkle Indigo Wash — Matches Home Contact Strip) */}
      <section className="bg-[#485180] py-20 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold text-white tracking-tight">
            Contact / Inquiries
          </h1>
          <div className="w-full max-w-2xl h-[1px] bg-white/80 my-6" />
          <p className="text-white/95 text-xs sm:text-sm tracking-[0.16em] font-mono leading-relaxed max-w-2xl uppercase">
            HELLO@UDOCHUKWU.COM.NG · +234 705 219 9651 — SEND WEB INQUIRIES, BOOK A CALL, OR REACH DIRECT CLIENT SUPPORT.
          </p>
        </div>
      </section>

      {/* 2. PROJECT INQUIRY BAND (Deep Navy) */}
      <section className="bg-[#1b243b] py-16 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-mono text-white/75 tracking-[0.18em] block uppercase">
                01. Project Intake
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-white tracking-tight">
                Send an Inquiry
              </h2>
              <div className="w-24 h-[1px] bg-white/70 my-3" />
              <p className="text-white/80 text-xs font-mono leading-relaxed uppercase tracking-wider">
                Share your project specifications, hardware question, or partnership note below.
              </p>
            </div>

            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {!isContactSubmitted ? (
                  <motion.form
                    key="contact-editor"
                    onSubmit={handleContactSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono text-white/85 uppercase tracking-wider font-semibold block">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your full name"
                          value={cName}
                          onChange={(e) => setCName(e.target.value)}
                          className="w-full bg-[#141a2b]/80 text-white px-4 py-3.5 border border-white/25 focus:border-white focus:outline-none font-mono text-xs sm:text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono text-white/85 uppercase tracking-wider font-semibold block">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={cEmail}
                          onChange={(e) => setCEmail(e.target.value)}
                          className="w-full bg-[#141a2b]/80 text-white px-4 py-3.5 border border-white/25 focus:border-white focus:outline-none font-mono text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono text-white/85 uppercase tracking-wider font-semibold block">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+234 800 000 0000"
                          value={cPhone}
                          onChange={(e) => setCPhone(e.target.value)}
                          className="w-full bg-[#141a2b]/80 text-white px-4 py-3.5 border border-white/25 focus:border-white focus:outline-none font-mono text-xs sm:text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono text-white/85 uppercase tracking-wider font-semibold block">
                          Project Objective
                        </label>
                        <select
                          value={cSubject}
                          onChange={(e) => setCSubject(e.target.value)}
                          className="w-full bg-[#141a2b]/80 text-white px-4 py-3.5 border border-white/25 focus:border-white focus:outline-none font-mono text-xs sm:text-sm cursor-pointer"
                        >
                          <option value="Acquiring New Website">Acquiring New Website</option>
                          <option value="Website Speed Tuneup">Website Speed Tuneup</option>
                          <option value="Google Local SEO Ranking">Google Local SEO Ranking</option>
                          <option value="Buyfromudochukwu Hardware Order">
                            Buyfromudochukwu Hardware Order
                          </option>
                          <option value="Learn with Udochukwu">Learn with Udochukwu</option>
                          <option value="Collaboration Inquiries">Collaboration Inquiries</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-white/85 uppercase tracking-wider font-semibold block">
                        Project or Order Details *
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Describe your specifications, timeline, or question..."
                        value={cMessage}
                        onChange={(e) => setCMessage(e.target.value)}
                        className="w-full bg-[#141a2b]/80 text-white px-4 py-3.5 border border-white/25 focus:border-white focus:outline-none font-mono text-xs sm:text-sm min-h-[110px]"
                      />
                    </div>

                    {contactError && (
                      <p className="text-xs font-mono text-rose-300">{contactError}</p>
                    )}

                    <button
                      type="submit"
                      className="border border-white bg-white text-slate-950 font-mono text-xs font-semibold tracking-[0.18em] uppercase px-8 py-3.5 hover:bg-transparent hover:text-white transition-colors cursor-pointer inline-flex items-center gap-2.5"
                    >
                      <SendHorizontal className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="contact-success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border border-white/25 p-8 space-y-5 bg-[#141a2b]/80"
                  >
                    <div className="flex items-center gap-3">
                      <CheckSquare className="w-5 h-5 text-emerald-300" />
                      <h3 className="text-white font-mono text-xs uppercase font-bold tracking-widest">
                        Message Saved
                      </h3>
                    </div>
                    <p className="text-white/85 text-sm font-sans leading-relaxed">
                      Thank you for reaching out. Your inquiry has been logged for Udochukwu&apos;s direct review.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsContactSubmitted(false)}
                      className="border border-white text-white hover:bg-white hover:text-slate-950 text-xs font-mono font-semibold tracking-widest uppercase px-6 py-3 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONSULTATION BOOKING BAND (Teal Wash) */}
      <section className="bg-[#3c7b8c] py-16 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-mono text-white/85 tracking-[0.18em] block uppercase">
                02. Consultation Calendar
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-white tracking-tight">
                Book a Strategy Slot
              </h2>
              <div className="w-24 h-[1px] bg-white/80 my-3" />
              <p className="text-white/90 text-xs font-mono leading-relaxed uppercase tracking-wider">
                Pick a preferred day and time slot, then confirm directly via WhatsApp.
              </p>
            </div>

            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {!isBookingSubmitted ? (
                  <motion.form
                    key="booking-editor"
                    onSubmit={handleBookingSubmit}
                    className="space-y-7 bg-[#141a2b]/65 border border-white/25 p-6 sm:p-8"
                  >
                    <div className="space-y-3">
                      <label className="text-[11px] font-mono text-white/85 uppercase tracking-wider font-semibold block">
                        1. Choose Day
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {availableDays.map((d) => (
                          <button
                            key={d.dateObj}
                            type="button"
                            onClick={() => setSelectedDay(d.dateObj)}
                            className={`px-3 py-3 border text-xs font-mono font-semibold tracking-wider uppercase text-center transition-colors cursor-pointer ${
                              selectedDay === d.dateObj
                                ? 'bg-white border-white text-slate-950'
                                : 'bg-[#181d2c] text-white/85 border-white/25 hover:border-white'
                            }`}
                          >
                            {d.dateStr}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] font-mono text-white/85 uppercase tracking-wider font-semibold flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        <span>2. Select Time Slot</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((ts) => (
                          <button
                            key={ts}
                            type="button"
                            onClick={() => setSelectedSlot(ts)}
                            className={`px-3 py-3 border text-xs font-mono font-semibold tracking-wider uppercase text-center transition-colors cursor-pointer ${
                              selectedSlot === ts
                                ? 'bg-white border-white text-slate-950'
                                : 'bg-[#181d2c] text-white/85 border-white/25 hover:border-white'
                            }`}
                          >
                            {ts}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/20 pt-5 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-mono text-white/85 uppercase tracking-wider font-semibold block">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Full name"
                            value={bName}
                            onChange={(e) => setBName(e.target.value)}
                            className="w-full bg-[#181d2c] text-white px-4 py-3 border border-white/25 focus:border-white focus:outline-none font-mono text-xs sm:text-sm"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-mono text-white/85 uppercase tracking-wider font-semibold block">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="name@company.com"
                            value={bEmail}
                            onChange={(e) => setBEmail(e.target.value)}
                            className="w-full bg-[#181d2c] text-white px-4 py-3 border border-white/25 focus:border-white focus:outline-none font-mono text-xs sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono text-white/85 uppercase tracking-wider font-semibold block">
                          Agenda Notes
                        </label>
                        <textarea
                          rows={3}
                          placeholder="What would you like to cover on the call?"
                          value={bNotes}
                          onChange={(e) => setBNotes(e.target.value)}
                          className="w-full bg-[#181d2c] text-white px-4 py-3 border border-white/25 focus:border-white focus:outline-none font-mono text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    {bookingError && (
                      <p className="text-xs font-mono text-rose-200">{bookingError}</p>
                    )}

                    <button
                      type="submit"
                      className="border border-white bg-white text-slate-950 font-mono text-xs font-semibold tracking-[0.18em] uppercase px-8 py-3.5 hover:bg-transparent hover:text-white transition-colors cursor-pointer inline-flex items-center gap-2.5"
                    >
                      <CalendarPlus className="w-4 h-4" />
                      <span>Reserve Consultation Slot</span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="booking-success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border border-white/25 p-8 space-y-5 bg-[#141a2b]/80"
                  >
                    <h3 className="text-white font-mono text-xs uppercase font-bold tracking-widest">
                      Slot Logged Successfully
                    </h3>

                    <div className="font-mono text-xs uppercase tracking-wider text-white/85 space-y-1">
                      <p>Date: {selectedDay}</p>
                      <p>Time: {selectedSlot}</p>
                    </div>

                    <p className="text-white/85 text-sm font-sans leading-relaxed">
                      Your booking details are saved. Click below to confirm directly on WhatsApp.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-1">
                      <a
                        href={bookingRedirectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="border border-emerald-400 bg-emerald-500 text-slate-950 font-mono text-xs font-bold tracking-widest uppercase px-6 py-3.5 hover:bg-emerald-400 transition-colors cursor-pointer"
                      >
                        Confirm on WhatsApp →
                      </a>

                      <button
                        type="button"
                        onClick={() => setIsBookingSubmitted(false)}
                        className="border border-white text-white hover:bg-white hover:text-slate-950 text-xs font-mono font-semibold tracking-widest uppercase px-6 py-3.5 transition-colors cursor-pointer"
                      >
                        Book Another Slot
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DIRECT CHANNELS & ENUGU DISPATCH BAND (Steel Blue Wash) */}
      <section className="bg-[#4a628d] py-16 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-mono text-white/85 tracking-[0.18em] block uppercase">
                03. Direct Channels
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-white tracking-tight">
                Office &amp; Direct Desk
              </h2>
              <div className="w-24 h-[1px] bg-white/80 my-3" />
              <p className="text-white/85 text-xs font-mono leading-relaxed uppercase tracking-wider">
                Direct phone, email, and social profiles for engineering consulting and Buyfromudochukwu inquiries.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <div className="border border-white/25 bg-[#141a2b]/70 p-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-semibold tracking-[0.18em] text-white uppercase border-b border-white/20 pb-2">
                    Contact Directory
                  </h3>

                  <div className="space-y-3.5 font-mono text-xs tracking-wider uppercase">
                    <div>
                      <span className="text-white/65 block mb-0.5">Operations</span>
                      <strong className="text-white font-semibold block">
                        Nigeria &amp; Remote Worldwide
                      </strong>
                    </div>
                    <div>
                      <span className="text-white/65 block mb-0.5">Hotline &amp; WhatsApp</span>
                      <strong className="text-white font-semibold block">
                        +234 (0) 705 219 9651
                      </strong>
                    </div>
                    <div>
                      <span className="text-white/65 block mb-0.5">General Inquiries</span>
                      <strong className="text-white font-semibold block">
                        hello@udochukwu.com.ng
                      </strong>
                    </div>
                    <div>
                      <span className="text-white/65 block mb-0.5">Project Proposals</span>
                      <strong className="text-white font-semibold block">
                        projects@udochukwu.com.ng
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-white/15 space-y-4">
                  <a
                    href="https://wa.me/2347052199651?text=Hello%20Udochukwu%20%2F%20VXTGrid%20Services%2C%20I%20would%20like%20to%20connect."
                    target="_blank"
                    rel="noreferrer"
                    className="border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white font-mono text-xs font-semibold tracking-[0.16em] uppercase px-5 py-3.5 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <PhoneForwarded className="w-4 h-4" />
                    <span>Open WhatsApp Desk</span>
                  </a>

                  <div className="flex gap-2 justify-center">
                    {[
                      {
                        href: 'https://www.linkedin.com/in/victor-udochukwu-b34b7a36a',
                        label: 'Linkedin',
                        icon: <Linkedin className="w-4 h-4" />,
                      },
                      {
                        href: 'https://www.facebook.com/share/1BnWYPhbzQ/',
                        label: 'Facebook',
                        icon: <Facebook className="w-4 h-4" />,
                      },
                      {
                        href: 'https://www.instagram.com/senatorsson001',
                        label: 'Instagram',
                        icon: <Instagram className="w-4 h-4" />,
                      },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="h-10 w-10 border border-white/25 hover:border-white bg-[#181d2c] hover:bg-white text-white/80 hover:text-slate-950 flex items-center justify-center transition-colors"
                        title={s.label}
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border border-white/25 bg-[#141a2b]/70 p-7 flex flex-col justify-center items-start space-y-4">
                <span className="text-xs font-mono text-white/75 tracking-[0.18em] block uppercase">
                  Marketplace &amp; Client Desk
                </span>
                <h3 className="text-xl font-sans font-semibold text-white">
                  Buyfromudochukwu Support
                </h3>
                <div className="w-20 h-[1px] bg-white/70" />
                <p className="text-xs font-mono text-white/85 leading-relaxed uppercase tracking-wider">
                  Verified seller onboarding, order status follow-ups, nationwide courier inquiries, and buyer policy support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
