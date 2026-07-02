import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Send,
  Mail,
  User,
  Info,
  FileText,
  CheckCircle2,
} from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "general",
        message: "",
      });
    }, 1200);
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
            className="bg-white border border-slate-200 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl relative z-10 p-8"
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
                  key="form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <h3 className="font-display text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                    Send a Message
                  </h3>
                  <p className="font-sans text-sm text-slate-500 mb-6">
                    Have a custom inquiry or technical integration question?
                    Write to us and we'll reply within 2 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-sans">
                        Your Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#ff5a1f] focus:ring-2 focus:ring-[#ff5a1f]/20 focus:outline-none transition-all font-sans text-sm text-slate-800"
                          placeholder="Jane Doe"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-sans">
                        Work Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#ff5a1f] focus:ring-2 focus:ring-[#ff5a1f]/20 focus:outline-none transition-all font-sans text-sm text-slate-800"
                          placeholder="jane@company.com"
                        />
                      </div>
                    </div>

                    {/* Category & Subject Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-sans">
                          Topic Category
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              category: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#ff5a1f] focus:ring-2 focus:ring-[#ff5a1f]/20 focus:outline-none transition-all font-sans text-sm appearance-none cursor-pointer text-slate-800"
                        >
                          <option value="general">General</option>
                          <option value="billing">Billing</option>
                          <option value="account">Account</option>
                          <option value="technical">Technical</option>
                          <option value="security">Security</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-sans">
                          Subject Line
                        </label>
                        <div className="relative">
                          <Info className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            value={formData.subject}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                subject: e.target.value,
                              })
                            }
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#ff5a1f] focus:ring-2 focus:ring-[#ff5a1f]/20 focus:outline-none transition-all font-sans text-sm text-slate-800"
                            placeholder="How do I..."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-sans">
                        Message Details
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#ff5a1f] focus:ring-2 focus:ring-[#ff5a1f]/20 focus:outline-none transition-all font-sans text-sm resize-none text-slate-800"
                        placeholder="Please elaborate on your integration or subscription query..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 bg-black hover:bg-[#ff5a1f] text-white font-semibold py-3 px-6 rounded-full font-sans text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Routing Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Inquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-[#ff5a1f]/10 text-[#ff5a1f] rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                    Message Dispatched!
                  </h3>
                  <p className="font-sans text-sm text-slate-500 max-w-sm mx-auto mb-8 leading-relaxed">
                    Thank you. Your message has been successfully routed to our
                    support team. We've sent a confirmation to your email and
                    will be in touch shortly.
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
