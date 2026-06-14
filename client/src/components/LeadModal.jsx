import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function LeadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', business: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.business.trim()) {
      triggerToast('Please fill out all fields.', 'error');
      return;
    }

    setLoading(true);

    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        triggerToast('Lead submitted successfully! Talk soon.', 'success');
        setFormData({ name: '', phone: '', business: '' });
        // Close modal after success delay
        setTimeout(() => setIsOpen(false), 800);
      } else {
        triggerToast(data.error || 'Failed to submit lead.', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Server connection failed. Try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-tr from-primary-600 to-violet-500 text-white shadow-2xl glass-glow cursor-pointer border border-white/20"
        title="Contact Me"
      >
        <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-md animate-ping" />
        <MessageSquare className="w-6 h-6 relative z-10" />
      </motion.button>

      {/* Glassmorphic Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 z-50 glass glass-glow border-neutral-800 rounded-xl px-5 py-3.5 flex items-center gap-3"
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span className="text-xs font-medium text-neutral-200">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-neutral-950/65 backdrop-blur-sm"
            />

            {/* Glassmorphic Card Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="w-full max-w-md glass border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative z-10 p-8 bg-neutral-900/60"
            >
              {/* Top glow streak */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Let's Collaborate</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Tell me about your business or project ideas. I will get back to you with custom digital concepts.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-[10px] tracking-wider uppercase font-semibold text-neutral-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 border border-neutral-800 focus:border-primary-500/50 text-sm font-light text-neutral-100 placeholder-neutral-600 outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[10px] tracking-wider uppercase font-semibold text-neutral-400 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 9095749906"
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 border border-neutral-800 focus:border-primary-500/50 text-sm font-light text-neutral-100 placeholder-neutral-600 outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="business" className="block text-[10px] tracking-wider uppercase font-semibold text-neutral-400 mb-1.5">
                    Business / Project Description
                  </label>
                  <textarea
                    id="business"
                    name="business"
                    value={formData.business}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Describe your goals, tech stack preferences, or design ideas..."
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 border border-neutral-800 focus:border-primary-500/50 text-sm font-light text-neutral-100 placeholder-neutral-600 outline-none transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 mt-2 rounded-xl text-sm font-medium transition-all duration-300 bg-gradient-to-r from-primary-600 to-violet-500 text-white flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Inquiry
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
