import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  MapPin,
  Clock,
  ArrowLeft,
  Copy,
  Check,
  ShoppingBag,
  AlertCircle,
  Loader2,
  PackageCheck,
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useAuth } from '../../lib/authContext';

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
            // Fallback to local storage
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
    if (s === 'delivered')                       return 4;
    if (s === 'out_for_delivery' || s === 'out for delivery') return 3;
    if (s === 'shipped')                         return 2;
    if (s === 'quality_check' || s === 'quality check')      return 1;
    if (s === 'processing' || s === 'accepted')  return 1;
    return 0; // pending = order placed only
  };

  const getStatusLabel = (status: string) => {
    const s = (status || '').toLowerCase();
    if (s === 'delivered')        return { text: 'Delivered', color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-500/30' };
    if (s === 'out_for_delivery') return { text: 'Out for Delivery', color: 'text-orange-400', bg: 'bg-orange-500/20 border-orange-500/30' };
    if (s === 'shipped')          return { text: 'Dispatched', color: 'text-blue-400', bg: 'bg-blue-500/20 border-blue-500/30' };
    if (s === 'quality_check')    return { text: 'Quality Check', color: 'text-purple-400', bg: 'bg-purple-500/20 border-purple-500/30' };
    if (s === 'processing')       return { text: 'Order Accepted', color: 'text-yellow-400', bg: 'bg-yellow-500/20 border-yellow-500/30' };
    return { text: 'Pending', color: 'text-gray-400', bg: 'bg-gray-500/20 border-gray-500/30' };
  };

  const currentStage = order ? getTimelineStage(order.status) : 0;

  const timelineSteps = [
    { title: 'Order Placed',      desc: 'Order confirmed by store',     icon: ShoppingBag },
    { title: 'Quality Check',     desc: 'Item inspected & packed',      icon: PackageCheck },
    { title: 'Dispatched',        desc: 'In transit with courier',      icon: Truck },
    { title: 'Out for Delivery',  desc: 'Arriving at destination',      icon: MapPin },
    { title: 'Delivered',         desc: 'Package delivered safely',     icon: CheckCircle2 },
  ];


  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between">
      <Header />

      <main className="pt-28 pb-20 container mx-auto px-4 sm:px-6 flex-1 max-w-5xl">
        {/* Header Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 mb-4 bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 border border-white/10 rounded-2xl">
            <Truck className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
            Track Your Package
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto text-sm sm:text-base">
            Enter your Order ID or Tracking Number below for live status updates and estimated delivery timeline.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-12">
          <div className="relative flex items-center">
            <Search className="absolute left-4 text-gray-400 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="Enter Order ID (e.g. ord-1785...) or Tracking Number (e.g. AV-TRK-849201)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-36 py-4 bg-white/5 border border-white/15 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm sm:text-base shadow-2xl transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:brightness-110 disabled:opacity-50 transition-all text-sm flex items-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : 'Track Package'}
            </button>
          </div>
        </form>

        {/* Error Notification */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-10 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-400 text-sm"
          >
            <AlertCircle size={20} className="shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Order Details & Timeline Display */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-b from-gray-900 via-gray-950 to-black border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-10 mb-16"
          >
            {/* Order Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl sm:text-2xl font-black text-white font-mono">
                    {order.tracking_number || order._id || order.id}
                  </h2>
                  <button
                    onClick={() => copyToClipboard(order.tracking_number || order._id || order.id)}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 transition-colors"
                    title="Copy Order ID"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="text-xs text-gray-400">
                  Placed on {new Date(order.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Dynamic live status badge */}
                {(() => {
                  const sl = getStatusLabel(order.status);
                  return (
                    <div className={`px-4 py-2 border rounded-2xl flex items-center gap-2 text-xs font-bold ${sl.bg} ${sl.color}`}>
                      <span className="inline-block w-2 h-2 rounded-full bg-current animate-pulse" />
                      {sl.text}
                    </div>
                  );
                })()}
                <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <Clock size={16} />
                  <span>Est. Delivery: {order.estimated_delivery || '3-5 Business Days'}</span>
                </div>
              </div>

            </div>

            {/* Interactive Timeline Stepper */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Live Status Timeline</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                {timelineSteps.map((step, idx) => {
                  const Icon = step.icon;
                  const isCompleted = idx <= currentStage;
                  const isCurrent = idx === currentStage;

                  return (
                    <div
                      key={step.title}
                      className={`relative flex md:flex-col items-center md:items-start gap-4 p-4 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-gradient-to-tr from-purple-900/30 to-cyan-900/30 border-cyan-400 shadow-lg shadow-cyan-500/10'
                          : isCompleted
                          ? 'bg-white/5 border-white/20 text-white'
                          : 'bg-white/[0.02] border-white/5 text-gray-600'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isCurrent
                            ? 'bg-cyan-500 text-black font-black animate-pulse'
                            : isCompleted
                            ? 'bg-emerald-500 text-black'
                            : 'bg-white/10 text-gray-500'
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold ${isCompleted ? 'text-white' : 'text-gray-500'}`}>
                          {step.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Purchased Items List */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Items in Package</h3>
              <div className="space-y-3">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl"
                    >
                      <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center shrink-0 border border-white/10 overflow-hidden">
                        <ShoppingBag size={24} className="text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-sm">{item.product_name || 'Anime Graphic Tee'}</h4>
                        <p className="text-xs text-gray-400">Size: {item.size} • Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-emerald-400 text-base">₹{item.price * item.quantity}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500">Standard Anime T-Shirt Collection Item</p>
                )}
              </div>
            </div>

            {/* Shipping & Payment Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10 text-sm">
              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">Shipping Address</span>
                <p className="font-bold text-white">{order.customer_name}</p>
                <p className="text-gray-300 text-xs">{order.shipping_address}</p>
                <p className="text-gray-400 text-xs">Phone: {order.phone}</p>
              </div>

              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">Payment Summary</span>
                <div className="flex justify-between text-xs text-gray-300">
                  <span>Payment Method:</span>
                  <span className="font-bold text-emerald-400">{order.payment_method || 'UPI'}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-300">
                  <span>Payment Status:</span>
                  <span className="font-bold text-emerald-400">Paid / Verified</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                  <span>Total Amount Paid:</span>
                  <span>₹{order.total_amount}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* My Past Orders Section (For Logged In Users) */}
        {user && (
          <div className="mt-12">
            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
              <Package className="text-cyan-400" />
              <span>Your Recent Purchases</span>
            </h2>

            {loadingHistory ? (
              <div className="text-center py-8 text-gray-400">
                <Loader2 className="animate-spin mx-auto mb-2" size={24} />
                <span>Loading your order history...</span>
              </div>
            ) : userOrders.length > 0 ? (
              <div className="space-y-4">
                {userOrders.map((usrOrd) => (
                  <motion.div
                    key={usrOrd._id || usrOrd.id}
                    whileHover={{ scale: 1.01 }}
                    className="p-5 bg-white/5 border border-white/10 hover:border-cyan-400/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-white font-mono">{usrOrd.tracking_number || usrOrd._id}</span>
                        <span className="px-2.5 py-0.5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-md text-[11px] font-bold uppercase">
                          {usrOrd.status || 'Processing'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        Total: ₹{usrOrd.total_amount} • {usrOrd.items?.length || 1} Item(s)
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSearchQuery(usrOrd.tracking_number || usrOrd._id);
                        fetchOrder(usrOrd.tracking_number || usrOrd._id);
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-colors self-start sm:self-auto"
                    >
                      Track Package →
                    </button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center text-gray-400 text-sm">
                No previous orders found for your account ({user.email}).
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
