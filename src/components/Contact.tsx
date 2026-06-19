import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { saveContact, saveBooking } from '../utils/storage';
import { trackAction } from '../utils/tracker';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Calendar, 
  Clock, 
  Check, 
  Sparkles,
  ArrowRight,
  Send
} from 'lucide-react';
import { ContactPreFill } from '../types';

export default function Contact({ preFill }: { preFill?: ContactPreFill }) {
  // Contact Form State
  const [cName, setCName] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cPhone, setCPhone] = useState('');
  const [cSubject, setCSubject] = useState(preFill?.subject || 'Acquiring New Website');
  const [cMessage, setCMessage] = useState(preFill?.message || '');
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  // Selector Date Calendar state
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  const day2 = new Date(); day2.setDate(day2.getDate() + 2);
  const day3 = new Date(); day3.setDate(day3.getDate() + 3);
  const day4 = new Date(); day4.setDate(day4.getDate() + 4);

  const availableDays = [
    { dateStr: tomorrow.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }), dateObj: tomorrow.toISOString().split('T')[0] },
    { dateStr: day2.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }), dateObj: day2.toISOString().split('T')[0] },
    { dateStr: day3.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }), dateObj: day3.toISOString().split('T')[0] },
    { dateStr: day4.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }), dateObj: day4.toISOString().split('T')[0] }
  ];

  const timeSlots = ['10:00 AM (WAT)', '11:30 AM (WAT)', '02:00 PM (WAT)', '04:30 PM (WAT)'];

  const [selectedDay, setSelectedDay] = useState(availableDays[0].dateObj);
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[0]);
  
  // Booking inquiry state
  const [bName, setBName] = useState('');
  const [bEmail, setBEmail] = useState('');
  const [bNotes, setBNotes] = useState('');
  const [isBookingSubmitted, setIsBookingSubmitted] = useState(false);
  const [bookingRedirectUrl, setBookingRedirectUrl] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cName || !cEmail || !cMessage) {
      alert('Please fill out required fields.');
      return;
    }

    saveContact({
      name: cName,
      email: cEmail,
      phone: cPhone,
      subject: cSubject,
      message: cMessage
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
    if (!bName || !bEmail) {
      alert('Please write your name and email parameters.');
      return;
    }

    saveBooking({
      name: bName,
      email: bEmail,
      date: selectedDay,
      timeSlot: selectedSlot,
      notes: bNotes
    });

    trackAction(`Strategic Consultation Booked: ${selectedDay} at ${selectedSlot} by ${bName}`);

    const formattedMessage = `Hello VXTGrid Services, I would like to book a strategic consultation:\n` +
      `- Name: ${bName}\n` +
      `- Email: ${bEmail}\n` +
      `- Date/Slot: ${selectedDay} at ${selectedSlot}\n` +
      `${bNotes ? `- Goals: ${bNotes}` : ''}`;
    
    const waUrl = `https://wa.me/2347052199651?text=${encodeURIComponent(formattedMessage)}`;
    setBookingRedirectUrl(waUrl);
    setIsBookingSubmitted(true);

    try {
      window.open(waUrl, '_blank');
    } catch (err) {
      window.location.href = waUrl;
    }

    setBName('');
    setBEmail('');
    setBNotes('');
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-24 sm:py-32 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 text-left">
        
        {/* Intro */}
        <div className="mb-16">
          <span className="text-[10px] font-mono text-blue-400 tracking-[0.25em] block uppercase font-bold mb-2">
            CLIENT ONBOARDING CHANNELS
          </span>
          <div className="border-b border-white/20 pb-4 mb-8">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-wide uppercase relative inline-block pb-3 whitespace-normal">
              Get in Touch
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
            </h1>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm tracking-[0.12em] font-mono leading-relaxed max-w-3xl font-bold uppercase">
          </p>
        </div>

        {/* Outer Grid spacing without rounded box cards */}
        <div className="space-y-24">
          
          {/* SECTION 1: STANDARD PROJECT FORM */}
          <div className="border-t border-white/10 pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              <div className="lg:col-span-4 space-y-4">
                <span className="text-xs font-mono text-blue-400 font-extrabold tracking-widest block uppercase">
                  01 // RESPONSIVE PORTAL
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white uppercase tracking-wide">
                  Standard Project Form
                </h3>
                <p className="text-slate-400 text-[11px] font-mono leading-relaxed uppercase tracking-wider">
                  Fill out your corporate profiles and project goals. We audit and reply directly within 3 business hours.
                </p>
              </div>

              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  {!isContactSubmitted ? (
                    <motion.form 
                      key="contact-editor"
                      onSubmit={handleContactSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-extrabold block">
                            Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g., Kunle Balogun"
                            value={cName}
                            onChange={(e) => setCName(e.target.value)}
                            className="w-full bg-[#11141d] text-white px-5 py-4 border border-white/10 focus:border-white focus:outline-none font-mono tracking-wider text-xs sm:text-sm rounded-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-extrabold block">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="kunle@balogunlegal.ng"
                            value={cEmail}
                            onChange={(e) => setCEmail(e.target.value)}
                            className="w-full bg-[#11141d] text-white px-5 py-4 border border-white/10 focus:border-white focus:outline-none font-mono tracking-wider text-xs sm:text-sm rounded-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-extrabold block">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            placeholder="+234 809 111 2222"
                            value={cPhone}
                            onChange={(e) => setCPhone(e.target.value)}
                            className="w-full bg-[#11141d] text-white px-5 py-4 border border-white/10 focus:border-white focus:outline-none font-mono tracking-wider text-xs sm:text-sm rounded-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-extrabold block">
                            Project Objective
                          </label>
                          <select
                            value={cSubject}
                            onChange={(e) => setCSubject(e.target.value)}
                            className="w-full bg-[#11141d] text-white px-5 py-4 border border-white/10 focus:border-white focus:outline-none font-mono tracking-wider text-xs sm:text-sm rounded-none cursor-pointer"
                          >
                            <option value="Acquiring New Website">Acquiring New Website</option>
                            <option value="Website Speed Tuneup">Website Speed Overhaul</option>
                            <option value="Google Local SEO Ranking">Google Local SEO Ranking</option>
                            <option value="SLA Support Contract">SLA Support Contract</option>
                            <option value="Learn with Udochukwu">Learn with Udochukwu</option>
                            <option value="Collaboration Inquiries">Collaboration Inquiries</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-extrabold block">
                          Detailed Requirements Description *
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Describe your design specifications and speed benchmarks..."
                          value={cMessage}
                          onChange={(e) => setCMessage(e.target.value)}
                          className="w-full bg-[#11141d] text-white px-5 py-4 border border-white/10 focus:border-white focus:outline-none font-mono tracking-wider text-xs sm:text-sm rounded-none min-h-[100px]"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full border border-white bg-white text-slate-950 font-mono text-xs font-bold tracking-[0.2em] uppercase py-4 hover:bg-transparent hover:text-white transition-all cursor-pointer rounded-none text-center flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </button>

                    </motion.form>
                  ) : (
                    <motion.div
                      key="contact-success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border border-white/10 p-8 sm:p-12 text-left space-y-6 rounded-none bg-[#11141d]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-6 bg-white flex items-center justify-center rounded-none">
                          <Check className="w-4 h-4 text-slate-950" />
                        </div>
                        <h4 className="text-white font-mono text-xs uppercase font-extrabold tracking-widest">
                          Inbound Message Saved
                        </h4>
                      </div>
                      <p className="text-slate-300 text-xs sm:text-sm font-mono uppercase tracking-wider leading-relaxed">
                        Thank you for contacting VXTGrid Services. Udochukwu reviews form entries within 3 hours. An immediate email duplicate listing was queued to your address.
                      </p>
                      <button
                        onClick={() => setIsContactSubmitted(false)}
                        className="inline-block border border-white/30 text-white hover:border-white hover:bg-white hover:text-slate-950 text-[10px] font-mono font-bold tracking-widest uppercase px-6 py-3 transition-colors cursor-pointer rounded-none"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* SECTION 2: INTERACTIVE CONSULTATION HOUR BOOKING */}
          <div className="border-t border-white/10 pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              <div className="lg:col-span-4 space-y-4">
                <span className="text-xs font-mono text-blue-400 font-extrabold tracking-widest block uppercase">
                  02 // DIRECT SESSIONS
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white uppercase tracking-wide">
                  Instant Booking Calendar
                </h3>
                <p className="text-slate-400 text-[11px] font-mono leading-relaxed uppercase tracking-wider">
                  Reserve your hour. Once selected, our engine queues a direct WhatsApp handshake so we discuss on your favorite channels instantly.
                </p>
              </div>

              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  {!isBookingSubmitted ? (
                    <motion.form 
                      key="booking-editor"
                      onSubmit={handleBookingSubmit}
                      className="space-y-8"
                    >
                      {/* Day selector step */}
                      <div className="space-y-4">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-extrabold block">
                          1. CHOOSE WORK DAY
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {availableDays.map((d) => (
                            <button
                              key={d.dateObj}
                              type="button"
                              onClick={() => setSelectedDay(d.dateObj)}
                              className={`px-3 py-4 border text-[10px] font-mono font-bold tracking-[0.10em] uppercase text-center transition-all cursor-pointer rounded-none ${
                                selectedDay === d.dateObj
                                  ? 'bg-white border-white text-slate-950'
                                  : 'bg-[#11141d] text-slate-300 border-white/10 hover:border-white/35 hover:text-white'
                              }`}
                            >
                              {d.dateStr}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time Slot step */}
                      <div className="space-y-4">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-extrabold block">
                          2. SELECT TIMER SLOT
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((ts) => (
                            <button
                              key={ts}
                              type="button"
                              onClick={() => setSelectedSlot(ts)}
                              className={`px-3 py-4 border text-[10px] font-mono font-bold tracking-[0.10em] uppercase text-center transition-all cursor-pointer rounded-none flex items-center justify-center gap-2 ${
                                selectedSlot === ts
                                  ? 'bg-white border-white text-slate-950'
                                  : 'bg-[#11141d] text-slate-300 border-white/10 hover:border-white/35 hover:text-white'
                              }`}
                            >
                              <Clock className="w-3.5 h-3.5" />
                              <span>{ts}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Meeting specifics input */}
                      <div className="border-t border-white/10 pt-6 space-y-6">
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-extrabold block">
                              Your Call Sign (Name) *
                            </label>
                            <input 
                              type="text"
                              required
                              placeholder="e.g., Aliko Dangote"
                              value={bName}
                              onChange={(e) => setBName(e.target.value)}
                              className="w-full bg-[#11141d] text-white px-5 py-4 border border-white/10 focus:border-white focus:outline-none font-mono tracking-wider text-xs sm:text-sm rounded-none"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-extrabold block">
                              Work Email *
                            </label>
                            <input 
                              type="email"
                              required
                              placeholder="ceo@dangotegroup.com"
                              value={bEmail}
                              onChange={(e) => setBEmail(e.target.value)}
                              className="w-full bg-[#11141d] text-white px-5 py-4 border border-white/10 focus:border-white focus:outline-none font-mono tracking-wider text-xs sm:text-sm rounded-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-extrabold block">
                            Meeting Goals & Challenges Notes
                          </label>
                          <textarea
                            rows={3}
                            placeholder="e.g., We want to bypass agencies commissions for our Lekki Apartments..."
                            value={bNotes}
                            onChange={(e) => setBNotes(e.target.value)}
                            className="w-full bg-[#11141d] text-white px-5 py-4 border border-white/10 focus:border-white focus:outline-none font-mono tracking-wider text-xs sm:text-sm rounded-none min-h-[80px]"
                          ></textarea>
                        </div>

                      </div>

                      <button
                        type="submit"
                        className="w-full border border-white bg-white text-slate-950 font-mono text-xs font-bold tracking-[0.2em] uppercase py-4 hover:bg-transparent hover:text-white transition-all cursor-pointer rounded-none text-center flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-slate-950" />
                        <span>Confirm Consultation Hour Slot</span>
                      </button>

                    </motion.form>
                  ) : (
                    <motion.div
                      key="booking-success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border border-white/10 p-8 sm:p-12 text-left space-y-6 rounded-none bg-[#11141d]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-6 bg-white flex items-center justify-center rounded-none">
                          <Check className="w-4 h-4 text-slate-950" />
                        </div>
                        <h4 className="text-white font-mono text-xs uppercase font-extrabold tracking-widest">
                          Session Booked Successfully
                        </h4>
                      </div>
                      
                      <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400 space-y-1">
                        <p>Date: <strong className="text-white font-bold">{selectedDay}</strong></p>
                        <p>Hour: <strong className="text-white font-bold">{selectedSlot}</strong></p>
                      </div>

                      <p className="text-slate-300 text-xs sm:text-sm font-mono uppercase tracking-wider leading-relaxed">
                        Your strategic consultation ticket has been logged. We are auto-redirecting you to WhatsApp to connect immediately over chat. If the redirect didn't trigger, proceed manually below.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <a
                          href={bookingRedirectUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="border border-emerald-500 bg-emerald-500 text-white font-mono text-xs font-bold tracking-widest uppercase px-6 py-4 hover:bg-transparent hover:text-emerald-400 transition-all cursor-pointer rounded-none text-center flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-4.5 h-4.5 fill-white text-emerald-500" />
                          <span>Launch WhatsApp Master Desk</span>
                        </a>

                        <button
                          onClick={() => setIsBookingSubmitted(false)}
                          className="border border-white/30 text-white hover:border-white hover:bg-white hover:text-slate-950 text-[10px] font-mono font-bold tracking-widest uppercase px-6 py-3 transition-colors cursor-pointer rounded-none"
                        >
                          Book another slot
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* SECTION 3: PRINCIPAL OFFICE DETAILS & SPEC SHEET */}
          <div className="border-t border-white/10 pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
              
              <div className="lg:col-span-4 space-y-4">
                <span className="text-xs font-mono text-blue-400 font-extrabold tracking-widest block uppercase">
                  03 // CORE CHANNELS
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white uppercase tracking-wide">
                  Principal Office & Specs
                </h3>
                <p className="text-slate-400 text-[11px] font-mono leading-relaxed uppercase tracking-wider">
                  Full corporate coordination parameters, routing details, geographical anchors, and active live support.
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                
                {/* Specs Data Sheet */}
                <div className="border border-white/10 bg-[#11141d]/40 p-8 flex flex-col justify-between rounded-none space-y-8">
                  <div className="space-y-6">
                    <h4 className="text-xs font-mono font-extrabold tracking-[0.25em] text-white uppercase border-b border-white/15 pb-2">
                      SPECIFICATION SHEETS
                    </h4>
                    
                    <div className="space-y-4 font-mono text-[11px] tracking-wider uppercase">
                      <div>
                        <span className="text-slate-500 block mb-1">Locational Base</span>
                        <strong className="text-white font-bold block">Lekki Phase 1, Lagos, Africa</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-1">Active Hotline</span>
                        <strong className="text-white font-bold block">+234 (0) 705 219 9651</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-1">Corporate Inquiries</span>
                        <strong className="text-white font-bold block">hello@udochukwu.com.ng</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-1">Project Proposals</span>
                        <strong className="text-white font-bold block">projects@udochukwu.com.ng</strong>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Launcher button */}
                  <div className="pt-6 border-t border-white/10 space-y-4">
                    <a
                      href="https://wa.me/2347052199651?text=Hello%20VXTGrid%20Services,%20I%20am%20visiting%20from%20your%2520premium%2520brand%2520website%2520and%2520want%2520to%2520discuss%2520a%2520new%2520web%2520system."
                      target="_blank"
                      rel="noreferrer"
                      className="border border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white font-mono text-[10px] font-bold tracking-widest uppercase px-6 py-4.5 transition-colors cursor-pointer rounded-none text-center flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Launch Live WhatsApp Chat</span>
                    </a>

                    <div className="flex gap-2 justify-center">
                      {[
                        { href: 'https://www.linkedin.com/in/victor-udochukwu-b34b7a36a', label: 'Linkedin', icon: <Linkedin className="w-3.5 h-3.5" /> },
                        { href: 'https://www.facebook.com/share/1BnWYPhbzQ/', label: 'Facebook', icon: <Facebook className="w-3.5 h-3.5" /> },
                        { href: 'https://www.instagram.com/senatorsson001', label: 'Instagram', icon: <Instagram className="w-3.5 h-3.5" /> }
                      ].map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          className="h-10 w-10 border border-white/10 hover:border-white bg-[#11141d] hover:bg-white text-slate-400 hover:text-slate-950 flex items-center justify-center transition-all rounded-none"
                          title={s.label}
                        >
                          {s.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Radar Grid Representation */}
                <div className="border border-white/10 bg-slate-900 min-h-[250px] flex flex-col justify-center items-center p-8 relative overflow-hidden rounded-none">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]"></div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="h-16 w-16 bg-blue-500/25 rounded-full flex items-center justify-center animate-ping"></div>
                    <div className="h-5 w-5 bg-white rounded-none border border-slate-950 absolute top-5/12 left-5/12"></div>
                  </div>
                  
                  <div className="relative z-10 text-center space-y-2">
                    <span className="text-[9px] font-mono text-blue-400 tracking-[0.2em] block uppercase font-bold">
                      INTERACTIVE COORDINATES
                    </span>
                    <p className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Lekki Port Grid // 101224
                    </p>
                    <p className="text-[10px] font-mono text-slate-500 leading-relaxed uppercase tracking-wide max-w-xs">
                      Providing sub-millisecond edge routes to active nodes in Lagos Hub.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
