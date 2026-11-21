import { motion } from "motion/react";
import { Mail, Phone, Clock, MessageCircle, Send, CheckCircle2, Sparkles, HelpCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { SEO } from "../components/SEO";

export default function Contact() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderId: "",
    category: "Order Tracking",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact ASTEYA Customer Support",
    "url": "https://storeasteya.vercel.app/contact",
    "description": "Contact ASTEYA anime store customer support team in India for assistance with orders, sizing, exchanges, and general inquiries.",
    "mainEntity": {
      "@type": "Organization",
      "name": "ASTEYA",
      "telephone": "+91-9685982012",
      "email": "deepankraghuwanshi1@gmail.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9685982012",
        "contactType": "Customer Support",
        "email": "deepankraghuwanshi1@gmail.com",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      }
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://storeasteya.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact Support",
        "item": "https://storeasteya.vercel.app/contact"
      }
    ]
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-black text-white">
      <SEO
        title="Contact ASTEYA | Anime Store Customer Support India"
        description="Get in touch with ASTEYA anime store customer support in India. Reach us via email, phone, or WhatsApp for order queries, sizing & assistance."
        keywords="contact ASTEYA, anime store customer support India, anime merchandise help, ASTEYA contact email, ASTEYA whatsapp support"
        canonicalUrl="https://storeasteya.vercel.app/contact"
        jsonLd={[contactPageJsonLd, breadcrumbJsonLd]}
      />

      {/* ─── PAGE HEADER ─── */}
      <section className="relative py-12 bg-gradient-to-b from-gray-950 via-black to-black border-b border-white/10 mb-10">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >

            {/* Target H1 Tag for SEO */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 font-display glass-heading">
              Contact ASTEYA - Anime Store Customer Support India
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
              Have a question about your order, sizing, or exchange policy? Our support team responds within 2-4 hours during business hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTACT CONTENT GRID ─── */}
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid md:grid-cols-12 gap-10">

          {/* Left Column: Direct Contact Info & Quick Actions */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <h2 className="text-xl font-bold font-display text-white border-b border-white/10 pb-3 flex items-center gap-2">
                <HelpCircle size={20} className="text-white" /> Direct Support Channels
              </h2>

              {[
                {
                  icon: Mail,
                  label: "Email Support",
                  value: "deepankraghuwanshi1@gmail.com",
                  sub: "For general inquiries, exchanges & feedback",
                  href: "mailto:deepankraghuwanshi1@gmail.com"
                },
                {
                  icon: Phone,
                  label: "Phone / WhatsApp",
                  value: "+91 96859 82012",
                  sub: "Instant WhatsApp messaging assistance",
                  href: "https://wa.me/919685982012"
                },
                {
                  icon: Clock,
                  label: "Business Hours",
                  value: "Mon – Sat: 10:00 AM – 7:00 PM IST",
                  sub: "Sunday: Closed (Tickets queued for Monday)"
                },
                {
                  icon: MessageCircle,
                  label: "Guaranteed SLA",
                  value: "Within 2–4 Business Hours",
                  sub: "Fast resolution guaranteed"
                },
              ].map(({ icon: Icon, label, value, sub, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 border border-white/20 rounded-2xl flex-shrink-0 text-white">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-300">{label}</h3>
                    {href ? (
                      <a href={href} className="text-white hover:text-gray-300 font-semibold transition-colors text-sm break-all">
                        {value}
                      </a>
                    ) : (
                      <p className="text-white font-semibold text-sm">{value}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links Card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-3">
              <h3 className="font-bold text-sm text-gray-300">Need Immediate Self-Service?</h3>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => navigate("/support")}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-xs font-bold rounded-xl border border-white/15 transition-all text-center"
                >
                  View Returns Policy
                </button>
                <button
                  onClick={() => navigate("/track")}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-xs font-bold rounded-xl border border-white/15 transition-all text-center"
                >
                  Track Live Order
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="md:col-span-7 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {submitted ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold font-display text-white">Support Ticket Submitted!</h3>
                <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to ASTEYA customer support. We've logged your request and our team will get back to your email within 2-4 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", orderId: "", category: "Order Tracking", message: "" });
                  }}
                  className="mt-4 px-6 py-2.5 bg-white text-black font-bold text-xs rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white mb-1">Submit Support Ticket</h2>
                  <p className="text-xs text-gray-400 mb-4">Fill out the details below and our India customer service team will assist you immediately.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white text-sm transition-colors"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white text-sm transition-colors"
                      placeholder="rahul@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white text-sm transition-colors"
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Order ID (Optional)</label>
                    <input
                      type="text"
                      value={formData.orderId}
                      onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white text-sm transition-colors"
                      placeholder="#AST-10492"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Inquiry Topic</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-white text-sm cursor-pointer"
                  >
                    <option value="Order Tracking" className="bg-gray-900">Order Tracking & Delivery</option>
                    <option value="Size Exchange" className="bg-gray-900">7-Day Size Exchange Request</option>
                    <option value="Damaged Product" className="bg-gray-900">Damaged Product / Return Claim</option>
                    <option value="Product Question" className="bg-gray-900">Product Specification / 240 GSM Query</option>
                    <option value="Other" className="bg-gray-900">Other General Query</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white text-sm transition-colors"
                    placeholder="Describe your request in detail..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm shadow-xl min-h-[48px]"
                >
                  <Send size={18} /> Send Ticket to ASTEYA Support
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
