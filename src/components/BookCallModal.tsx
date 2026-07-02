import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Calendar,
  Clock,
  Sparkles,
  Building,
  CheckCircle2,
} from "lucide-react";

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookCallModal({ isOpen, onClose }: BookCallModalProps) {
  // Generate the next 5 business days
  const getNextBusinessDays = () => {
    const days = [];
    let current = new Date();
    while (days.length < 5) {
      current.setDate(current.getDate() + 1);
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // Skip weekends
        days.push(new Date(current));
      }
    }
    return days;
  };

  const businessDays = getNextBusinessDays();
  const timeSlots = [
    "09:30 AM",
    "11:00 AM",
    "01:30 PM",
    "03:00 PM",
    "04:30 PM",
  ];

  const [selectedDate, setSelectedDate] = useState<Date>(businessDays[0]);
  const [selectedTime, setSelectedTime] = useState<string>(timeSlots[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companySize, setCompanySize] = useState("1-10");
  const [notes, setNotes] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setIsSuccess(true);
    }, 1200);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="bg-white border border-slate-200 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl relative z-10 p-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-[#ff5a1f] transition-colors duration-200 cursor-pointer p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="booking-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <div className="flex items-center gap-2 text-[#ff5a1f] mb-2">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider font-sans">
                      Strategic Discovery
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 mb-1 tracking-tight">
                    Book a Call with MartechAdda
                  </h3>
                  <p className="font-sans text-sm text-slate-500 mb-6">
                    Connect with our solution architect to learn how to unify
                    your data stack and streamline your operations.
                  </p>

                  <form onSubmit={handleBook} className="space-y-4">
                    {/* Basic Info Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-sans">
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#ff5a1f] focus:ring-2 focus:ring-[#ff5a1f]/20 focus:outline-none transition-all font-sans text-sm text-slate-800"
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-sans">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#ff5a1f] focus:ring-2 focus:ring-[#ff5a1f]/20 focus:outline-none transition-all font-sans text-sm text-slate-800"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    {/* Step 2: Date Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-sans flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#ff5a1f]" />
                        <span>Select Business Day</span>
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {businessDays.map((date, idx) => {
                          const isSelected =
                            selectedDate.toDateString() === date.toDateString();
                          return (
                            <button
                              type="button"
                              key={idx}
                              onClick={() => setSelectedDate(date)}
                              className={`py-2 px-1 rounded-xl text-center flex flex-col items-center justify-center border cursor-pointer transition-all duration-200 ${
                                isSelected
                                  ? "bg-[#ff5a1f] text-white border-[#ff5a1f] shadow-sm"
                                  : "bg-slate-50 text-slate-700 border-slate-200 hover:border-[#ff5a1f]/50"
                              }`}
                            >
                              <span className="text-[10px] uppercase font-bold opacity-75 font-sans">
                                {date.toLocaleDateString("en-US", {
                                  weekday: "short",
                                })}
                              </span>
                              <span className="text-sm font-bold font-display">
                                {date.getDate()}
                              </span>
                              <span className="text-[9px] font-sans">
                                {date.toLocaleDateString("en-US", {
                                  month: "short",
                                })}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 3: Time Slot Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-sans flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#ff5a1f]" />
                        <span>Select Time Slot (UTC-7)</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {timeSlots.map((time, idx) => {
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              type="button"
                              key={idx}
                              onClick={() => setSelectedTime(time)}
                              className={`py-1.5 px-3 rounded-full text-xs font-semibold border cursor-pointer transition-all duration-200 ${
                                isSelected
                                  ? "bg-black text-white border-slate-900 shadow-sm"
                                  : "bg-slate-50 text-slate-600 border-slate-200 hover:border-[#ff5a1f]/50"
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Team & Company size */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-sans flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-[#ff5a1f]" />
                          <span>Company Size</span>
                        </label>
                        <select
                          value={companySize}
                          onChange={(e) => setCompanySize(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#ff5a1f] focus:ring-2 focus:ring-[#ff5a1f]/20 focus:outline-none transition-all font-sans text-sm cursor-pointer text-slate-800"
                        >
                          <option value="1-10">1-10 Employees</option>
                          <option value="11-50">11-50 Employees</option>
                          <option value="51-250">51-250 Employees</option>
                          <option value="251-1000">251-1,000 Employees</option>
                          <option value="1000+">1,000+ (Enterprise)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-sans">
                          Aims/Focus Areas
                        </label>
                        <input
                          type="text"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#ff5a1f] focus:ring-2 focus:ring-[#ff5a1f]/20 focus:outline-none transition-all font-sans text-sm text-slate-800"
                          placeholder="e.g. Lead routing, multi-CRM sync"
                        />
                      </div>
                    </div>

                    {/* Book Button */}
                    <button
                      type="submit"
                      disabled={isBooking}
                      className="w-full mt-4 bg-black hover:bg-[#ff5a1f] text-white font-semibold py-3 px-6 rounded-full font-sans text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isBooking ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Securing calendar...</span>
                        </>
                      ) : (
                        <>
                          <span>Schedule Demo Call</span>
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-[#ff5a1f]/10 text-[#ff5a1f] rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                    Meeting Booked!
                  </h3>
                  <div className="bg-slate-50 p-4 rounded-2xl max-w-sm mx-auto mb-6 text-left border border-slate-200 font-sans text-sm">
                    <div className="flex justify-between border-b border-slate-100 pb-2 mb-2">
                      <span className="font-bold text-slate-950">
                        Representative:
                      </span>
                      <span className="text-slate-600 font-medium">
                        Solutions Architect
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2 mb-2">
                      <span className="font-bold text-slate-950">Date:</span>
                      <span className="text-[#ff5a1f] font-semibold">
                        {formatDate(selectedDate)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-950">
                        Time Slot:
                      </span>
                      <span className="text-[#ff5a1f] font-semibold">
                        {selectedTime} (UTC-7)
                      </span>
                    </div>
                  </div>
                  <p className="font-sans text-sm text-slate-500 max-w-sm mx-auto mb-8 leading-relaxed">
                    We've added this to our calendars and dispatched a Calendar
                    invitation with a Google Meet link to{" "}
                    <span className="font-semibold text-slate-900">
                      {email}
                    </span>
                    . See you then!
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      onClose();
                    }}
                    className="bg-[#ff5a1f] hover:bg-[#e04c14] text-white font-semibold py-2.5 px-8 rounded-full font-sans text-sm transition-all duration-200 cursor-pointer"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
