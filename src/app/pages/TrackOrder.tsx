import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  MapPin,
  Clock,
  Copy,
  Check,
  ShoppingBag,
  AlertCircle,
  Loader2,
  PackageCheck,
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CreditCard,
  Phone,
  Star,
  X,
} from 'lucide-react';
import { useAuth } from '../../lib/authContext';
import { createProductReview } from '../../lib/api';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000/api';

export default function TrackOrderPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('id') || searchParams.get('tracking') || '');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // User History State
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Product Review Modal State
  const [reviewModalItem, setReviewModalItem] = useState<any | null>(null);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSubmittedItems, setReviewSubmittedItems] = useState<Record<string, boolean>>({});
  const [reviewToast, setReviewToast] = useState<string | null>(null);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewModalItem) return;
    setSubmittingReview(true);
    try {
      const prodId = reviewModalItem.product_id || reviewModalItem.id || 'prod-1';
      await createProductReview({
        product_id: prodId,
        customer_name: reviewerName || order?.customer_name || 'Verified Buyer',
        rating,
        review_text: reviewText || 'Loved the quality and fit!',
        order_id: order?._id || order?.id
      });
      setReviewSubmittedItems((prev) => ({ ...prev, [prodId]: true, [reviewModalItem.product_name]: true }));
      setReviewToast(`Review submitted for "${reviewModalItem.product_name}"! Thank you for your feedback.`);
      setTimeout(() => setReviewToast(null), 4500);
      setReviewModalItem(null);
    } catch (err) {
      console.error('Error submitting review:', err);
    } finally {
      setSubmittingReview(false);
    }
  };

  // SEO Optimization & Metadata Injection
  useEffect(() => {
    document.title = 'Track Your Order & Live Package Status | ASTEYA Anime Store';

    // Meta Description
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content',
      'Track your ASTEYA anime store order live. Get real-time status updates, courier tracking numbers, dispatch timeline, and estimated delivery dates across India.'
    );

    // Canonical Link
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', window.location.href);

    // JSON-LD Structured Data Schema for SEO
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'ASTEYA Order Tracking Service',
      provider: {
        '@type': 'Organization',
        name: 'ASTEYA',
        url: 'https://storeasteya-frontend.vercel.app/',
        logo: 'https://storeasteya-frontend.vercel.app/logo.png',
      },
      areaServed: 'IN',
      serviceType: 'Live Package Tracking & Order Fulfillment Status',
      description: 'Enter your order ID or tracking code to view live delivery timeline, courier status, and package updates.',
    };

    let scriptTag = document.getElementById('asteya-tracking-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'asteya-tracking-jsonld';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);
  }, []);

  // Fetch single order tracking
  const fetchOrder = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    const cleanQuery = query.trim().toUpperCase();

    try {
      const res = await fetch(`${API_BASE_URL}/orders/track/${encodeURIComponent(query.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
        setLoading(false);
        return;
      }
    } catch (err: any) {
      console.warn('Backend tracking endpoint offline or error, checking local store:', err);
    }

    // LocalStorage Fallback Search
    const localOrders: any[] = JSON.parse(localStorage.getItem('animeverse_orders') || '[]');
    const foundLocal = localOrders.find(
      (o) =>
        (o._id && o._id.toUpperCase() === cleanQuery) ||
        (o.id && o.id.toUpperCase() === cleanQuery) ||
        (o.tracking_number && o.tracking_number.toUpperCase() === cleanQuery) ||
        (o.email && o.email.toUpperCase() === cleanQuery) ||
        (o.phone && o.phone === query.trim())
    );

    if (foundLocal) {
      setOrder(foundLocal);
    } else if (cleanQuery === 'AV-TRK-721520' || cleanQuery.includes('DELIVERED')) {
      setOrder({
        _id: 'ord-demo-delivered-101',
        id: 'ord-demo-delivered-101',
        tracking_number: 'AV-TRK-721520',
        customer_name: user?.name || 'Rahul Sharma',
        email: user?.email || 'customer@animeverse.com',
        phone: '+91 9685982012',
        shipping_address: 'Flat 402, Sakura Heights, Connaught Place, New Delhi - 110001',
        status: 'delivered',
        estimated_delivery: 'Delivered on Aug 28, 2026',
        total_amount: 1198,
        payment_method: 'UPI Instant Pay',
        payment_status: 'PAID',
        items: [
          {
            product_id: 'prod-1',
            product_name: 'Goku Super Saiyan Aura Edition',
            size: 'L',
            quantity: 1,
            price: 599
          },
          {
            product_id: 'prod-2',
            product_name: 'Solo Leveling Shadow Monarch Edition',
            size: 'XL',
            quantity: 1,
            price: 599
          }
        ]
      });
    } else {
      setOrder(null);
      setError('Order not found. Please verify your Order ID or Tracking Number.');
    }
    setLoading(false);
  };

  // Auto-search if query param present
  useEffect(() => {
    const idFromParam = searchParams.get('id') || searchParams.get('tracking');
    if (idFromParam) {
      setSearchQuery(idFromParam);
      fetchOrder(idFromParam);
    }
  }, [searchParams]);

  // Fetch logged in user's order history
  useEffect(() => {
    if (user?.email) {
      setLoadingHistory(true);
      const normalizedEmail = user.email.toLowerCase();

      fetch(`${API_BASE_URL}/orders/user/${encodeURIComponent(user.email)}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setUserOrders(data);
          } else {
            const localOrders: any[] = JSON.parse(localStorage.getItem('animeverse_orders') || '[]');
            const userLocals = localOrders.filter((o) => o.email && o.email.toLowerCase() === normalizedEmail);
            setUserOrders(userLocals);
          }
        })
        .catch(() => {
          const localOrders: any[] = JSON.parse(localStorage.getItem('animeverse_orders') || '[]');
          const userLocals = localOrders.filter((o) => o.email && o.email.toLowerCase() === normalizedEmail);
          setUserOrders(userLocals);
        })
        .finally(() => setLoadingHistory(false));
    }
  }, [user]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchOrder(searchQuery.trim());
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Determine current timeline stage
  const getTimelineStage = (status: string) => {
    const s = (status || '').toLowerCase();
    if (s === 'delivered') return 4;
    if (s === 'out_for_delivery' || s === 'out for delivery') return 3;
    if (s === 'shipped') return 2;
    if (s === 'quality_check' || s === 'quality check') return 1;
    if (s === 'processing' || s === 'accepted') return 1;
    return 0; // pending = order placed only
  };

  const getStatusLabel = (status: string) => {
    const s = (status || '').toLowerCase();
    if (s === 'delivered')
      return { text: 'Delivered', color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-500/40 shadow-emerald-500/20' };
    if (s === 'out_for_delivery' || s === 'out for delivery')
      return { text: 'Out for Delivery', color: 'text-amber-400', bg: 'bg-amber-500/20 border-amber-500/40 shadow-amber-500/20' };
    if (s === 'shipped')
      return { text: 'Dispatched', color: 'text-cyan-400', bg: 'bg-cyan-500/20 border-cyan-500/40 shadow-cyan-500/20' };
    if (s === 'quality_check' || s === 'quality check')
      return { text: 'Quality Check', color: 'text-purple-400', bg: 'bg-purple-500/20 border-purple-500/40 shadow-purple-500/20' };
    if (s === 'processing')
      return { text: 'Order Accepted', color: 'text-yellow-400', bg: 'bg-yellow-500/20 border-yellow-500/40 shadow-yellow-500/20' };
    return { text: 'Pending', color: 'text-gray-400', bg: 'bg-gray-500/20 border-gray-500/30' };
  };

  const currentStage = order ? getTimelineStage(order.status) : 0;

  const timelineSteps = [
    { title: 'Order Placed', desc: 'Order confirmed & stored', icon: ShoppingBag },
    { title: 'Quality Check', desc: 'Inspected & custom packed', icon: PackageCheck },
    { title: 'Dispatched', desc: 'In transit with express courier', icon: Truck },
    { title: 'Out for Delivery', desc: 'Arriving at your doorstep', icon: MapPin },
    { title: 'Delivered', desc: 'Package delivered safely', icon: CheckCircle2 },
  ];

  const trackingFaqs = [
    {
      q: 'Where do I find my Order ID or Tracking Number?',
      a: 'Your Order ID (e.g., ord-1785... or AV-TRK-197675) is included in your instant SMS & Email confirmation sent right after checkout. If you have an account, you can also view it under Your Recent Purchases below.',
    },
    {
      q: 'How long does dispatch and delivery take?',
      a: 'Orders are processed within 24-48 hours. Express shipping delivers packages across India in 3-5 business days.',
    },
    {
      q: 'What if my order is marked delivered but I have not received it?',
      a: 'Check with family members or building security. If you still cannot locate your parcel, contact our support team with your Order ID for immediate assistance.',
    },
    {
      q: 'What is the unboxing video rule for returns?',
      a: 'To ensure 100% security for all anime fans, please record a continuous video opening the outer polybag showing the shipping label before inspecting the t-shirt. This guarantees 7-day hassle-free replacement or refund.',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between selection:bg-white selection:text-black">

      {/* Subtle Monochrome Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-white/10 via-white/5 to-transparent blur-3xl opacity-40 rounded-full" />
      </div>

      <main className="relative z-10 pt-32 pb-24 container mx-auto px-4 sm:px-6 flex-1 max-w-5xl">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 flex justify-center">
          <ol className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-600">•</li>
            <li className="text-white font-bold" aria-current="page">
              Track Order
            </li>
          </ol>
        </nav>

        {/* Page Main Header */}
        <header className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-white/10 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-xl"
          >
            <Truck className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4 font-display glass-heading"
          >
            Track Your Package
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed"
          >
            Enter your Order ID or Courier Tracking Number below for live status updates, dispatch milestones, and estimated delivery timeline.
          </motion.p>
        </header>

        {/* Search Bar Container */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          aria-label="Order Tracking Search"
          className="max-w-2xl mx-auto mb-14"
        >
          <form onSubmit={handleSearchSubmit} className="relative flex items-center group">
            <Search className="absolute left-5 text-gray-400 group-focus-within:text-white w-5 h-5 pointer-events-none transition-colors" />
            <input
              type="text"
              placeholder="Enter Order ID (e.g. ord-1785...) or Tracking Number (e.g. AV-TRK-849201)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-44 py-4.5 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 text-sm sm:text-base shadow-2xl backdrop-blur-xl transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 px-6 py-3 bg-white text-black font-bold rounded-xl shadow-xl hover:bg-gray-200 active:scale-95 disabled:opacity-50 transition-all text-sm flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin text-black" />
                  <span>Tracking...</span>
                </>
              ) : (
                <>
                  <span>Track Package</span>
                  <ArrowRight size={16} className="text-black" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Search Buttons */}
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-400 flex-wrap">
            <span>Try sample tracking numbers:</span>
            <button
              onClick={() => {
                setSearchQuery('AV-TRK-197675');
                fetchOrder('AV-TRK-197675');
              }}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-white font-mono transition-colors"
            >
              AV-TRK-197675
            </button>
            <button
              onClick={() => {
                setSearchQuery('AV-TRK-721520');
                fetchOrder('AV-TRK-721520');
              }}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-white font-mono transition-colors"
            >
              AV-TRK-721520
            </button>
          </div>
        </motion.section>

        {/* Error Notification */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl mx-auto mb-10 p-4.5 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-400 text-sm shadow-xl backdrop-blur-xl"
            >
              <AlertCircle size={20} className="shrink-0 text-red-400" />
              <div className="flex-1">
                <span className="font-semibold block">Tracking Inquiry Failed</span>
                <span className="text-xs text-red-300/80">{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Order Details & Live Timeline Display */}
        {order && (
          <motion.article
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-b from-white/[0.07] via-white/[0.03] to-black border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-10 mb-16 backdrop-blur-2xl relative overflow-hidden"
          >
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Order Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-1.5">
                  <h2 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                    {order.tracking_number || order._id || order.id}
                  </h2>
                  <button
                    onClick={() => copyToClipboard(order.tracking_number || order._id || order.id)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-gray-300 hover:text-white transition-all border border-white/10"
                    title="Copy Tracking Number"
                  >
                    {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 flex items-center gap-2">
                  <span>Order Placed:</span>
                  <span className="text-gray-300 font-medium">
                    {new Date(order.createdAt || Date.now()).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Dynamic live status badge */}
                {(() => {
                  const sl = getStatusLabel(order.status);
                  return (
                    <div
                      className={`px-4 py-2 border rounded-2xl flex items-center gap-2 text-xs font-bold shadow-lg ${sl.bg} ${sl.color}`}
                    >
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-current animate-ping" />
                      {sl.text}
                    </div>
                  );
                })()}
                <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2 text-emerald-400 text-xs font-bold shadow-lg shadow-emerald-500/5">
                  <Clock size={16} />
                  <span>Est. Delivery: {order.estimated_delivery || '3-5 Business Days'}</span>
                </div>
              </div>
            </div>

            {/* Interactive Timeline Stepper */}
            {/* Interactive Timeline Stepper */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles size={14} className="text-white" />
                  Live Order Dispatch Timeline
                </h3>
                <span className="text-xs text-white font-mono font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/20">
                  Step {Math.min(currentStage + 1, 5)} of 5
                </span>
              </div>

              {/* Animated Truck Track Progress Bar */}
              {(() => {
                const stagePercent = (currentStage / 4) * 100;
                return (
                  <div className="relative my-8 pt-8 pb-6 hidden md:block px-6 bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-xl">
                    {/* Track Line Background */}
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden relative border border-white/10 shadow-inner">
                      {/* Active Glowing Progress Line */}
                      <motion.div
                        className="h-full bg-gradient-to-r from-white/40 via-white/80 to-white shadow-[0_0_20px_rgba(255,255,255,0.9)] rounded-full relative"
                        initial={{ width: 0 }}
                        animate={{ width: `${stagePercent}%` }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </div>

                    {/* Animated Moving Truck */}
                    <motion.div
                      className="absolute top-3 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none"
                      initial={{ left: "0%" }}
                      animate={{ left: `calc(${stagePercent}% * 0.90 + 5%)` }}
                      transition={{ duration: 1.2, type: "spring", stiffness: 60, damping: 14 }}
                    >
                      {/* Truck Badge */}
                      <div className="relative flex flex-col items-center">
                        <motion.div
                          animate={{ y: [-1.5, 1.5, -1.5] }}
                          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
                          className="px-3 py-2 bg-white text-black rounded-xl shadow-[0_0_25px_rgba(255,255,255,0.9)] border border-white flex items-center gap-1.5 font-bold text-xs"
                        >
                          <Truck size={18} className="text-black shrink-0 animate-bounce" />
                          <span className="font-mono text-[11px] tracking-tight">ASTEYA EXPRESS</span>
                        </motion.div>

                        {/* Animated Motion Dust / Speed Lines */}
                        <motion.div 
                          animate={{ opacity: [0.4, 1, 0.4] }} 
                          transition={{ repeat: Infinity, duration: 0.3 }}
                          className="mt-1 flex gap-1 justify-center"
                        >
                          <div className="w-2 h-0.5 bg-white rounded-full shadow-[0_0_8px_white]" />
                          <div className="w-4 h-0.5 bg-white rounded-full shadow-[0_0_8px_white]" />
                          <div className="w-1.5 h-0.5 bg-white/60 rounded-full" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                );
              })()}

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
                {timelineSteps.map((step, idx) => {
                  const Icon = step.icon;
                  const isCompleted = idx <= currentStage;
                  const isCurrent = idx === currentStage;

                  return (
                    <div
                      key={step.title}
                      className={`relative flex md:flex-col items-center md:items-start gap-3.5 p-4 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-white/15 border-white shadow-xl shadow-white/10 ring-1 ring-white/40'
                          : isCompleted
                          ? 'bg-white/5 border-white/20 text-white'
                          : 'bg-white/[0.02] border-white/5 text-gray-600 opacity-60'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                          isCurrent
                            ? 'bg-white text-black border-white font-black shadow-lg scale-105'
                            : isCompleted
                            ? 'bg-white/20 text-white border-white/30'
                            : 'bg-white/5 text-gray-600 border-white/10'
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold ${isCurrent ? 'text-white' : isCompleted ? 'text-white' : 'text-gray-500'}`}>
                          {step.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-0.5 leading-snug">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Purchased Items List */}
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Package Contents</h3>
                {((order.status || '').toLowerCase() === 'delivered' || currentStage === 4) && (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                    <Sparkles size={12} /> Delivered — Review Eligible
                  </span>
                )}
              </div>

              {((order.status || '').toLowerCase() === 'delivered' || currentStage === 4) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 mb-4 bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-transparent border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl shrink-0 border border-amber-500/30">
                      <Star size={20} className="fill-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">🎉 Order Delivered! How was your purchase?</h4>
                      <p className="text-xs text-gray-300">Share your feedback to help fellow otaku & anime lovers.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="space-y-3">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item: any, i: number) => {
                    const prodId = item.product_id || item.id || `item-${i}`;
                    const isItemReviewed = reviewSubmittedItems[prodId] || reviewSubmittedItems[item.product_name];
                    const isDeliveredOrder = (order.status || '').toLowerCase() === 'delivered' || currentStage === 4;

                    return (
                      <div
                        key={i}
                        className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all space-y-3"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/10 overflow-hidden">
                            <ShoppingBag size={24} className="text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-white text-sm truncate">{item.product_name || 'ASTEYA Heavyweight Anime Graphic Tee'}</h4>
                            <p className="text-xs text-gray-400 mt-0.5">Size: <span className="text-white font-bold">{item.size}</span> • Qty: <span className="text-white font-bold">{item.quantity}</span></p>
                          </div>
                          <span className="font-black text-white text-base">₹{item.price * item.quantity}</span>
                        </div>

                        {/* Post-Delivery Review Button */}
                        {isDeliveredOrder && (
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10 pt-3 text-xs">
                            <span className="text-gray-400">Share product rating &amp; review:</span>
                            {isItemReviewed ? (
                              <span className="px-3.5 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl font-bold flex items-center gap-1.5 self-start sm:self-auto">
                                <CheckCircle2 size={14} /> Review Submitted
                              </span>
                            ) : (
                              <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => {
                                  setReviewModalItem(item);
                                  setReviewerName(order.customer_name || user?.name || '');
                                  setRating(5);
                                  setReviewText('');
                                }}
                                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-yellow-500/10 hover:brightness-110 transition-all self-start sm:self-auto"
                              >
                                <Star size={14} className="fill-black" /> Write a Review
                              </motion.button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <ShoppingBag size={22} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-sm">ASTEYA Graphic T-Shirt</h4>
                      <p className="text-xs text-gray-400">100% Heavyweight Cotton • 3-5 Days Express Delivery</p>
                    </div>
                    <span className="font-bold text-white text-sm">Standard Shipping</span>
                  </div>
                )}
              </div>
            </div>

            {/* Premium Shipping & Payment Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10 text-sm relative z-10">
              {/* Shipping Destination Card */}
              <motion.div 
                whileHover={{ y: -2 }}
                className="p-6 bg-white/[0.04] border border-white/15 hover:border-white/30 rounded-3xl space-y-4 backdrop-blur-xl shadow-2xl transition-all relative overflow-hidden group"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/10 rounded-xl border border-white/15">
                      <MapPin size={18} className="text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block">Shipping Destination</span>
                      <span className="text-[10px] text-gray-400 font-mono">EXPRESS AIR COURIER</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-white/10 border border-white/20 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider">
                    VERIFIED
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  <p className="font-bold text-white text-base tracking-tight">
                    {order.customer_name || 'Valued Customer'}
                  </p>
                  <p className="text-gray-300 text-xs leading-relaxed font-medium">
                    {order.shipping_address || 'Address details registered during checkout'}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs text-gray-400 font-mono">
                    <Phone size={14} className="text-white/70" />
                    <span>{order.phone || '+91-XXXXXXXXXX'}</span>
                  </div>
                </div>
              </motion.div>

              {/* Payment Details Card */}
              <motion.div 
                whileHover={{ y: -2 }}
                className="p-6 bg-white/[0.04] border border-white/15 hover:border-white/30 rounded-3xl space-y-4 backdrop-blur-xl shadow-2xl transition-all relative overflow-hidden group"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/10 rounded-xl border border-white/15">
                      <CreditCard size={18} className="text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block">Payment Details</span>
                      <span className="text-[10px] text-gray-400 font-mono">256-BIT ENCRYPTED</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-white/10 border border-white/20 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck size={12} /> SECURE
                  </span>
                </div>

                <div className="space-y-2.5 pt-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Payment Method:</span>
                    <span className="font-bold text-white px-2.5 py-1 bg-white/10 border border-white/20 rounded-md font-mono">
                      {order.payment_method || 'UPI / Card'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Payment Verification:</span>
                    <span className="font-bold text-white flex items-center gap-1">
                      <CheckCircle2 size={14} className="text-white" /> Verified &amp; Paid
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-base font-black text-white pt-3 border-t border-white/10">
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Total Amount Paid:</span>
                    <span className="text-lg font-mono text-white">₹{order.total_amount || '799'}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.article>
        )}

        {/* My Recent Purchases Section (Logged In Users) */}
        {user && (
          <section aria-labelledby="recent-purchases-heading" className="mt-14 mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 id="recent-purchases-heading" className="text-2xl font-black text-white flex items-center gap-3 font-display">
                <Package className="text-white w-6 h-6" />
                <span>Your Recent Purchases</span>
              </h2>
              <span className="text-xs text-gray-400">Logged in as <strong className="text-white">{user.email}</strong></span>
            </div>

            {loadingHistory ? (
              <div className="text-center py-12 bg-white/5 border border-white/10 rounded-3xl text-gray-400">
                <Loader2 className="animate-spin mx-auto mb-3 text-white" size={28} />
                <span className="text-sm">Retrieving your order history...</span>
              </div>
            ) : userOrders.length > 0 ? (
              <div className="space-y-4">
                {userOrders.map((usrOrd) => {
                  const sl = getStatusLabel(usrOrd.status);
                  return (
                    <motion.div
                      key={usrOrd._id || usrOrd.id}
                      whileHover={{ y: -2 }}
                      className="p-5 bg-white/5 border border-white/10 hover:border-white/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-xl transition-all shadow-xl"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="font-bold text-white font-mono text-base">{usrOrd.tracking_number || usrOrd._id}</span>
                          <span className={`px-2.5 py-0.5 border rounded-md text-[11px] font-bold uppercase ${sl.bg} ${sl.color}`}>
                            {sl.text}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">
                          Total: <strong className="text-white">₹{usrOrd.total_amount}</strong> • {usrOrd.items?.length || 1} Item(s)
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setSearchQuery(usrOrd.tracking_number || usrOrd._id);
                          fetchOrder(usrOrd.tracking_number || usrOrd._id);
                          window.scrollTo({ top: 250, behavior: 'smooth' });
                        }}
                        className="px-5 py-2.5 bg-white text-black font-bold hover:bg-gray-200 rounded-xl text-xs shadow-lg transition-all self-start sm:self-auto flex items-center gap-1.5"
                      >
                        <span>Track Package</span>
                        <ArrowRight size={14} className="text-black" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center text-gray-400 text-sm">
                No past orders found linked to account <strong>{user.email}</strong>.
              </div>
            )}
          </section>
        )}

        {/* SEO Informational Section & Trust Cards */}
        <section className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-white/30 transition-all">
            <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">3-5 Days Express Shipping</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every ASTEYA order is dispatched within 24-48 hours and shipped express across India.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-white/30 transition-all">
            <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">7 Days Easy Return Policy</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Damaged item or size issue? Simple 7-day return &amp; replacement with unboxing video proof.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-white/30 transition-all">
            <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-4">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">24/7 Customer Support</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Have questions about your order? Reach out via WhatsApp or email for instant assistance.
            </p>
          </div>
        </section>

        {/* Tracking FAQs Accordion (SEO & SERP Rich Snippet Friendly) */}
        <section aria-labelledby="tracking-faq-heading" className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl">
          <h2 id="tracking-faq-heading" className="text-2xl font-black text-white mb-6 text-center font-display">
            Frequently Asked Tracking Questions
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {trackingFaqs.map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-2xl overflow-hidden bg-black/40">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-white pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={20} className="text-gray-400 shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-3">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {reviewToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-black px-6 py-4 rounded-2xl font-bold text-sm shadow-2xl flex items-center gap-3 border border-emerald-400"
          >
            <CheckCircle2 size={20} className="text-black shrink-0" />
            <span>{reviewToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Review Modal */}
      <AnimatePresence>
        {reviewModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setReviewModalItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-zinc-900 border border-white/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setReviewModalItem(null)}
                className="absolute top-5 right-5 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
                  <Star size={24} className="fill-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Write a Product Review</h3>
                  <p className="text-xs text-gray-400">Share your experience after delivery</p>
                </div>
              </div>

              <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 mb-6">
                <ShoppingBag size={22} className="text-white shrink-0" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-white text-sm truncate">{reviewModalItem.product_name || 'Anime T-Shirt'}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Size: <span className="text-white font-bold">{reviewModalItem.size}</span> • Qty: <span className="text-white font-bold">{reviewModalItem.quantity}</span></p>
                </div>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    Overall Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-125 transition-transform focus:outline-none"
                      >
                        <Star
                          size={28}
                          className={`${
                            (hoverRating || rating) >= star
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-600 fill-transparent'
                          } transition-colors`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm font-bold text-amber-400 font-mono">
                      {rating}/5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Your Name / Nickname
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="e.g. Rahul S."
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Review Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Tell us about the print quality, fabric softness, fit, and overall satisfaction..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 text-sm"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setReviewModalItem(null)}
                    className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:brightness-110 font-bold rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    {submittingReview ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        <Star size={16} className="fill-black" />
                        Submit Review
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
