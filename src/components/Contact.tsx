import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { saveContact, saveBooking, getBookings } from '../utils/storage';
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
  CheckCircle, 
  Send, 
  Check, 
  Sparkles, 
  AlertCircle 
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
    // Reset
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

    // Dynamic direct redirection
    try {
      window.open(waUrl, '_blank');
    } catch (err) {
      window.location.href = waUrl;
    }

    // Reset
    setBName('');
    setBEmail('');
    setBNotes('');
  };

  return (
    <div className="py-12 md:py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-100 dark:bg-blue-950 px-3 py-1.5 rounded-full font-medium">
            CLIENT ONBOARDING CHANNELS
          </span>
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-xs sm:text-sm leading-relaxed">
            Ready to secure actual conversions? Select an available calendar hour slot to schedule a precise Zoom session with Udochukwu, or request feedback via our secure portal form.
          </p>
        </div>

        {/* Contact info vertical flow - ordered by user specification:
            1. Standard Project Form (First)
            2. Consultation Booking Calendar (Second)
            3. Principal Office & Contact Details + Map (Last)
        */}
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* 1. STANDARD PROJECT FORM */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xs">
            
            <div className="flex items-center gap-3 mb-6">
              <Phone className="w-5 h-5 text-blue-600 animate-pulse" />
              <div>
                <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-extrabold uppercase tracking-widest block">GET RESPONSIVE RESPONSE</span>
                <h3 className="text-lg font-serif font-semibold text-slate-900 dark:text-white leading-none">Standard Project Form</h3>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!isContactSubmitted ? (
                <motion.form 
                  key="contact-editor"
                  onSubmit={handleContactSubmit}
                  className="space-y-4 animate-fade-in"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400">NAME *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Kunle Balogun"
                        value={cName}
                        onChange={(e) => setCName(e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2.5 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400">WORK EMAIL *</label>
                      <input
                        type="email"
                        required
                        placeholder="kunle@balogunlegal.ng"
                        value={cEmail}
                        onChange={(e) => setCEmail(e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2.5 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400">PHONE NUMBER</label>
                      <input
                        type="tel"
                        placeholder="+234 809 111 2222"
                        value={cPhone}
                        onChange={(e) => setCPhone(e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2.5 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400">PROJECT CORE OBJECTIVE</label>
                      <select
                        value={cSubject}
                        onChange={(e) => setCSubject(e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2.5 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden"
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

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400">DETAILED REQUIREMENTS DESCRIPTION *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Write down your exact design needs..."
                      value={cMessage}
                      onChange={(e) => setCMessage(e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    id="save-contact-message"
                    className="w-full bg-slate-900 hover:bg-slate-950 text-white dark:bg-white dark:text-slate-905 dark:hover:bg-slate-100 font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs sm:text-sm shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>

                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 dark:bg-slate-950 p-8 rounded-2xl border border-emerald-300/40 dark:border-emerald-850/60 text-center space-y-4"
                >
                  <div className="h-12 w-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-slate-900 dark:text-white font-serif font-bold text-base">Inbound Message Saved!</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-xs max-w-sm mx-auto leading-relaxed">
                    Thank you for contacting VXTGrid Services. Udochukwu reviews form entries within 3 hours. An immediate email duplicate listing was queued to your address.
                  </p>
                  <button
                    onClick={() => setIsContactSubmitted(false)}
                    className="text-xs font-mono border border-slate-300 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Send another message list
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* 2. INTERACTIVE BOOKING PORTAL BLOCK */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xs">
            
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-extrabold uppercase tracking-widest block">SECURE AN IN BOUND SESSION</span>
                <h3 className="text-lg font-serif font-semibold text-slate-900 dark:text-white leading-none">Instant Booking Calendar</h3>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!isBookingSubmitted ? (
                <motion.form 
                  key="booking-editor"
                  onSubmit={handleBookingSubmit}
                  className="space-y-6"
                >
                  {/* Day selector step */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-500">1. CHOOSE WORK DAY</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {availableDays.map((d) => (
                        <button
                          key={d.dateObj}
                          type="button"
                          onClick={() => setSelectedDay(d.dateObj)}
                          className={`px-3 py-2.5 rounded-lg border text-xs font-bold text-center transition-all cursor-pointer ${
                            selectedDay === d.dateObj
                              ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                              : 'bg-white text-slate-700 dark:bg-slate-805 dark:text-slate-305 border-slate-205 dark:border-slate-750 hover:bg-slate-100 dark:hover:bg-slate-750'
                          }`}
                        >
                          {d.dateStr}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slot step */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-500">2. SELECT TIMER SLOT</label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((ts) => (
                        <button
                          key={ts}
                          type="button"
                          onClick={() => setSelectedSlot(ts)}
                          className={`px-3 py-2.5 rounded-lg border text-xs font-bold text-center transition-all cursor-pointer ${
                            selectedSlot === ts
                              ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:text-slate-950 dark:border-white shadow-xs'
                              : 'bg-white text-slate-705 dark:bg-slate-805 dark:text-slate-305 border-slate-205 dark:border-slate-750 hover:bg-slate-100 dark:hover:bg-slate-755'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 inline-block shrink-0 mr-1 opacity-70" />
                          {ts}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Meeting specifics input */}
                  <div className="space-y-4 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400">YOUR CALL SIGN (NAME) *</label>
                        <input 
                          type="text"
                          required
                          placeholder="e.g., Aliko Dangote"
                          value={bName}
                          onChange={(e) => setBName(e.target.value)}
                          className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2.5 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400">WORK EMAIL *</label>
                        <input 
                          type="email"
                          required
                          placeholder="ceo@dangotegroup.com"
                          value={bEmail}
                          onChange={(e) => setBEmail(e.target.value)}
                          className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2.5 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400">MEETING GOALS / CHALLENGES NOTES</label>
                      <textarea
                        rows={2}
                        placeholder="e.g., We want to bypass agencies commissions for our Lekki Apartments..."
                        value={bNotes}
                        onChange={(e) => setBNotes(e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 border rounded-xl text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden"
                      ></textarea>
                    </div>

                  </div>

                  <button
                    type="submit"
                    id="save-calendar-booking"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer text-xs sm:text-sm"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>Confirm Consultation Hour Slot</span>
                  </button>

                </motion.form>
              ) : (
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 dark:bg-slate-950 p-8 rounded-2xl border border-emerald-305/40 dark:border-blue-900/60 text-center space-y-4"
                >
                  <div className="h-12 w-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-slate-900 dark:text-white font-serif font-bold text-base">Inquiry Saved & Redirecting!</h4>
                    <p className="text-slate-500 text-xs font-mono">Date: {selectedDay} | Hour: {selectedSlot}</p>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs max-w-sm mx-auto leading-relaxed">
                    Your strategic consultation ticket has been successfully logged to our dashboard. We are auto-redirecting you to **WhatsApp** to pick your preferred platform directly over active chat!
                  </p>
                  
                  <a
                    href={bookingRedirectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl transition-colors text-xs sm:text-sm cursor-pointer shadow-lg mt-2"
                  >
                    <MessageCircle className="w-4.5 h-4.5 text-white fill-white" />
                    <span>Proceed to WhatsApp Chat Now</span>
                  </a>

                  <div className="pt-2">
                    <button
                      onClick={() => setIsBookingSubmitted(false)}
                      className="text-xs font-mono border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Book another auxiliary slot
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* 3. PRINCIPAL OFFFICE & CONTACT DETAILS (LAST) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch pt-4">
            
            {/* Contact details Card */}
            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-serif font-semibold text-slate-900 dark:text-white mb-6">Principal Office</h3>
                
                <div className="space-y-5">
                  <div className="flex gap-4 items-start">
                    <div className="h-10 w-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 border">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono font-bold text-slate-400">LOCATIONAL BASE</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-0.5">Lekki Phase 1, Lagos, Africa</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="h-10 w-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 border">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono font-bold text-slate-400">CALLS & WHATSAPP</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-0.5">+234 (0) 705 219 9651</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="h-10 w-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 border">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono font-bold text-slate-400">MANAGEMENT INQUIRIES</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-0.5">vxtgridservices@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp launcher & social channels */}
              <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/80 space-y-4">
                <a
                  href="https://wa.me/2347052199651?text=Hello%20VXTGrid%20Services,%20I%20am%20visiting%20from%20your%20premium%20brand%20website%20and%20want%20to%20discuss%20a%20new%20web%20system."
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3.5 px-4 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer w-full text-center"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                  <span>Launch Live WhatsApp Chat</span>
                </a>

                <div className="flex justify-center gap-3">
                  <a href="https://www.linkedin.com/in/victor-udochukwu-b34b7a36a?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="h-10 w-10 bg-white dark:bg-slate-800 border rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="https://www.facebook.com/share/1BnWYPhbzQ/" target="_blank" rel="noreferrer" className="h-10 w-10 bg-white dark:bg-slate-800 border rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="https://www.instagram.com/senatorsson001?igsh=MXg0Njd1a3ZobXlxMA==" target="_blank" rel="noreferrer" className="h-10 w-10 bg-white dark:bg-slate-800 border rounded-lg flex items-center justify-center text-slate-400 hover:text-pink-500 transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

            {/* HIGH END MOCK MAP REPRESENTING LAGOS HEADQUARTERS */}
            <div className="md:col-span-5 bg-slate-900 border border-slate-805 text-white min-h-[300px] rounded-3xl flex flex-col justify-center items-center p-6 relative overflow-hidden shadow-md">
              {/* Backlit glow map graphics */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="h-12 w-12 bg-blue-600/30 rounded-full flex items-center justify-center animate-ping"></div>
                <div className="h-4 w-4 bg-blue-600 rounded-full border-2 border-white absolute top-4 left-4"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <span className="text-[10px] font-mono text-blue-400 tracking-widest block">INTERACTIVE RADAR</span>
                <p className="text-xs font-bold mt-1 tracking-tight">LAGOS LEKKI DISTRICT</p>
                <p className="text-[10px] text-slate-450 mt-1 italic leading-relaxed">Providing ultra fast edge-latencies via MainOne broadband loops</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
