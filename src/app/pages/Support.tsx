import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, Clock, MessageCircle, Truck, RotateCcw, Ruler, HelpCircle, ChevronDown, Send, CheckCircle2, Video, Search, ShieldAlert, X } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { SEO } from "../components/SEO";

const FAQS = [
  {
    category: "Orders & Shipping",
    q: "How long does delivery take across India?",
    a: "We ship all orders via express courier services. Delivery typically takes 3 to 5 business days depending on your location in India. You will receive a live tracking link via SMS & email once dispatched."
  },
  {
    category: "Orders & Shipping",
    q: "How can I track my order status?",
    a: "You can track your live order status anytime by visiting our Track Order page and entering your Order ID (or tracking number) along with your registered phone number or email."
  },
  {
    category: "Returns & Exchanges",
    q: "What is your anime t-shirt returns exchange policy?",
    a: "We offer an easy 7-day return & exchange window across India. If your t-shirt arrives damaged or defective, you get a full replacement or refund (unboxing video proof required). If you need a size exchange, we process it hassle-free."
  },
  {
    category: "Returns & Exchanges",
    q: "Why is an unboxing video mandatory for damage claims?",
    a: "To protect both our customers and our team against fraudulent returns or transit tampering, an unboxing video recorded continuously from sealed box to product check is required for damage claims."
  },
  {
    category: "Sizing & Fabric",
    q: "What is the fabric GSM and quality?",
    a: "All ASTEYA apparel is manufactured using 240 GSM 100% heavyweight ringspun combed cotton. The fabric is pre-shrunk, bio-washed, and soft to the touch with high-density DTF prints."
  },
  {
    category: "Sizing & Fabric",
    q: "How do I pick the right size from the anime merchandise size guide?",
    a: "Our t-shirts are designed with a relaxed drop-shoulder oversized fit. If you prefer a standard fit, choose your usual size. For an extreme oversized aesthetic, pick one size larger."
  },
  {
    category: "Payments",
    q: "What payment methods are supported?",
    a: "We accept UPI payments (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, MasterCard, RuPay), Net Banking, and Cash on Delivery (COD)."
  }
];

const SIZE_CHART = [
  { size: "S", chestInches: '38"', lengthInches: '27"', shoulderInches: '18"' },
  { size: "M", chestInches: '40"', lengthInches: '28"', shoulderInches: '19"' },
  { size: "L", chestInches: '42"', lengthInches: '29"', shoulderInches: '20"' },
  { size: "XL", chestInches: '44"', lengthInches: '30"', shoulderInches: '21"' },
  { size: "XXL", chestInches: '46"', lengthInches: '31"', shoulderInches: '22"' },
];

export default function Support() {
  const navigate = useNavigate();
  
  // State
  const [faqSearch, setFaqSearch] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  
  const [ticketData, setTicketData] = useState({
    name: "",
    email: "",
    phone: "",
    orderId: "",
    category: "General Inquiry",
    message: ""
  });

  const filteredFaqs = useMemo(() => {
    if (!faqSearch.trim()) return FAQS;
    const q = faqSearch.toLowerCase();
    return FAQS.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q) || f.category.toLowerCase().includes(q));
  }, [faqSearch]);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketData.name || !ticketData.email || !ticketData.message) return;
    setTicketSubmitted(true);
  };

  const faqPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
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
        "name": "Support & Returns",
        "item": "https://storeasteya.vercel.app/support"
      }
    ]
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-black text-white">
      <SEO
        title="ASTEYA Support | Shipping Policy, Returns & Size Guide"
        description="ASTEYA support center: 7-day easy returns & exchange policy, express 3-5 day shipping across India, and oversized anime t-shirt size guide."
        keywords="anime t-shirt returns exchange, ASTEYA shipping policy, anime merchandise size guide, ASTEYA customer care, oversized anime tee fit"
        canonicalUrl="https://storeasteya.vercel.app/support"
        jsonLd={[faqPageJsonLd, breadcrumbJsonLd]}
      />

      {/* ─── HERO HEADER ─── */}
      <section className="py-12 bg-gradient-to-b from-gray-950/80 via-black to-black border-b border-white/10 mb-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4">
              <HelpCircle size={14} /> Help &amp; Support Hub
            </span>
            {/* Target H1 Tag for SEO */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 font-display glass-heading">
              ASTEYA Support, Returns &amp; Size Guide
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Find answers on anime t-shirt returns &amp; exchanges, ASTEYA shipping policy, our 240 GSM size guide, or submit a support ticket.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-16">
        
        {/* ─── QUICK ACTION HELP CARDS ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => navigate("/track")}
            className="p-6 bg-white/5 border border-white/10 hover:border-cyan-400/50 rounded-3xl cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">Live Order Tracking</h3>
              <p className="text-xs text-gray-400">Check current shipment status &amp; delivery ETA</p>
            </div>
            <span className="mt-4 text-xs font-semibold text-cyan-400 flex items-center gap-1">Track Order &rarr;</span>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => navigate("/shipping-policy")}
            className="p-6 bg-white/5 border border-white/10 hover:border-emerald-400/50 rounded-3xl cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <RotateCcw size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">ASTEYA Shipping Policy</h3>
              <p className="text-xs text-gray-400">7 Days return window policy &amp; guidelines</p>
            </div>
            <span className="mt-4 text-xs font-semibold text-emerald-400 flex items-center gap-1">View Policy &rarr;</span>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => setShowSizeModal(true)}
            className="p-6 bg-white/5 border border-white/10 hover:border-purple-400/50 rounded-3xl cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Ruler size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">Anime Size Guide</h3>
              <p className="text-xs text-gray-400">Measurements for S, M, L, XL &amp; XXL fits</p>
            </div>
            <span className="mt-4 text-xs font-semibold text-purple-400 flex items-center gap-1">Open Size Guide &rarr;</span>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => navigate("/contact")}
            className="p-6 bg-white/5 border border-white/10 hover:border-yellow-400/50 rounded-3xl cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">Contact Support</h3>
              <p className="text-xs text-gray-400">Direct WhatsApp, phone &amp; email channels</p>
            </div>
            <span className="mt-4 text-xs font-semibold text-yellow-400 flex items-center gap-1">Get In Touch &rarr;</span>
          </motion.div>
        </div>

        {/* ─── MANDATORY UNBOXING VIDEO NOTICE ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-black border border-cyan-500/30 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <div className="p-4 bg-cyan-500/20 text-cyan-400 rounded-2xl flex-shrink-0 border border-cyan-500/40">
            <Video size={32} />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert size={18} className="text-cyan-400" />
              Anime T-Shirt Returns Exchange Video Requirement
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              To ensure 100% transparent return processing, customers must record an unboxing video before opening the sealed parcel. Any damage or missing item claims require continuous unboxing video footage.
            </p>
          </div>
        </motion.div>

        {/* ─── TICKET FORM & CONTACT INFO GRID ─── */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Direct Support Details */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-2xl font-bold font-display text-white border-b border-white/10 pb-4">
                Support Channels
              </h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl flex-shrink-0 text-cyan-400">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase text-gray-400">Email Assistance</h4>
                    <a href="mailto:deepankraghuwanshi1@gmail.com" className="text-white hover:text-cyan-400 font-semibold text-sm transition-colors">
                      deepankraghuwanshi1@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl flex-shrink-0 text-emerald-400">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase text-gray-400">WhatsApp &amp; Call</h4>
                    <a href="https://wa.me/919685982012" className="text-white hover:text-emerald-400 font-semibold text-sm transition-colors">
                      +91 96859 82012
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl flex-shrink-0 text-purple-400">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase text-gray-400">Operating Hours</h4>
                    <p className="text-white font-semibold text-sm">Mon – Sat: 10:00 AM – 7:00 PM IST</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-xs text-gray-400 text-center">
                ⏱ Average Response SLA: <span className="text-white font-bold">Within 2 to 4 hours</span> during business hours.
              </div>
            </div>
          </div>

          {/* Submit Support Ticket Form */}
          <div className="md:col-span-7 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8">
            <h3 className="text-2xl font-bold font-display text-white mb-2">Submit Support Ticket</h3>
            <p className="text-xs text-gray-400 mb-6">Need assistance with your order? Send us a ticket and we'll reply promptly.</p>

            {ticketSubmitted ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-2xl font-bold font-display text-white mb-2">Ticket Submitted!</h4>
                <p className="text-gray-400 text-sm max-w-sm mx-auto mb-6">
                  Thank you! Your ticket ID <span className="text-cyan-400 font-mono font-bold">#TK-{(Math.floor(Math.random()*90000) + 10000)}</span> has been generated. Our team will contact you shortly.
                </p>
                <button
                  onClick={() => setTicketSubmitted(false)}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Submit Another Ticket
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={ticketData.name}
                      onChange={(e) => setTicketData({ ...ticketData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="Your Full Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={ticketData.email}
                      onChange={(e) => setTicketData({ ...ticketData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={ticketData.phone}
                      onChange={(e) => setTicketData({ ...ticketData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Order ID / Tracking # (Optional)</label>
                    <input
                      type="text"
                      value={ticketData.orderId}
                      onChange={(e) => setTicketData({ ...ticketData, orderId: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                      placeholder="e.g. AV-TRK-849201"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Support Category *</label>
                  <select
                    value={ticketData.category}
                    onChange={(e) => setTicketData({ ...ticketData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Tracking & Delay">Order Tracking &amp; Delivery Delay</option>
                    <option value="Size Exchange Request">Size Exchange Request</option>
                    <option value="Damaged Item Return">Damaged Item Return (Video Attached)</option>
                    <option value="Payment / Refund Question">Payment / Refund Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Ticket Details *</label>
                  <textarea
                    required
                    rows={4}
                    value={ticketData.message}
                    onChange={(e) => setTicketData({ ...ticketData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder="Describe your issue or query in detail..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm shadow-xl min-h-[44px]"
                >
                  <Send size={18} />
                  Submit Ticket
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ─── SEARCHABLE FAQ SECTION ─── */}
        <div className="space-y-8 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Frequently Asked Questions</h2>
              <p className="text-sm text-gray-400">Quick answers to common questions</p>
            </div>
            
            {/* Search Box */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="pr-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                      {faq.category}
                    </span>
                    <span className="font-bold text-base sm:text-lg text-white">{faq.q}</span>
                  </div>
                  <motion.div animate={{ rotate: openFaqIndex === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-white/5"
                    >
                      <p className="p-6 text-sm text-gray-300 leading-relaxed bg-black/40">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── SIZE CHART MODAL ─── */}
      <AnimatePresence>
        {showSizeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSizeModal(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full bg-gray-950 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
            >
              <button
                onClick={() => setShowSizeModal(false)}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white hover:text-black rounded-full transition-colors text-white"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-500/20 text-purple-400 rounded-2xl border border-purple-500/30">
                  <Ruler size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-white">ASTEYA Anime Merchandise Size Guide</h3>
                  <p className="text-xs text-gray-400">All measurements in inches (Relaxed Drop-Shoulder Fit)</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                      <th className="py-3 px-4">Size</th>
                      <th className="py-3 px-4">Chest</th>
                      <th className="py-3 px-4">Length</th>
                      <th className="py-3 px-4">Shoulder</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300 font-semibold">
                    {SIZE_CHART.map((row) => (
                      <tr key={row.size} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-bold text-white">{row.size}</td>
                        <td className="py-3 px-4">{row.chestInches}</td>
                        <td className="py-3 px-4">{row.lengthInches}</td>
                        <td className="py-3 px-4">{row.shoulderInches}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-xs text-gray-400">
                💡 <span className="text-white font-bold">Fit Tip:</span> If you prefer an oversized aesthetic, choose your regular size. For a standard trim fit, size down by 1.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
