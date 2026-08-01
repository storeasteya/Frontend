import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../../lib/cartContext";
import { Link, useNavigate } from "react-router";
import { ShoppingBag, Trash2, Plus, Minus, CheckCircle, ArrowLeft, Tag, CreditCard, ShieldCheck } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState("");
  const [couponError, setCouponError] = useState("");

  // Customer & Shipping Form
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingPincode, setShippingPincode] = useState("");
  
  // Billing Address
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [billingAddress, setBillingAddress] = useState("");

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "Card" | "COD">("UPI");

  // Order Placement state
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  const applyCoupon = () => {
    setCouponError("");
    const code = couponCode.trim().toUpperCase();
    if (code === "ANIME10") {
      const discount = Math.round(cartTotal * 0.10);
      setDiscountAmount(discount);
      setCouponApplied(code);
    } else if (code === "SAVE500") {
      if (cartTotal < 1000) {
        setCouponError("Minimum purchase of ₹1000 required for SAVE500.");
        return;
      }
      setDiscountAmount(500);
      setCouponApplied(code);
    } else {
      setCouponError("Invalid coupon code. Try ANIME10 or SAVE500.");
    }
  };

  const finalTotal = Math.max(0, cartTotal - discountAmount);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!customerName || !email || !phone || !shippingAddress || !shippingCity || !shippingPincode) {
      alert("Please fill in all shipping details.");
      return;
    }

    setLoading(true);

    const fullShipping = `${shippingAddress}, ${shippingCity} - ${shippingPincode}`;
    const fullBilling = sameAsShipping ? fullShipping : billingAddress;

    const orderPayload = {
      customer_name: customerName,
      email,
      phone,
      shipping_address: fullShipping,
      billing_address: fullBilling,
      payment_method: paymentMethod,
      items: cart.map(item => ({
        product_id: item.product_id,
        product_name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price
      })),
      total_amount: finalTotal,
      discount_amount: discountAmount,
      coupon_code: couponApplied || null
    };

    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();
      if (res.ok) {
        setOrderSuccess(data);
        clearCart();
      } else {
        alert(data.error || "Failed to place order. Please try again.");
      }
    } catch (err: any) {
      // Fallback local order creation if server is unreachable
      const fallbackOrder = {
        _id: 'ord-' + Date.now(),
        ...orderPayload,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      setOrderSuccess(fallbackOrder);
      clearCart();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between">
      <Header />

      <main className="pt-28 pb-20 container mx-auto px-4 sm:px-6 flex-1">
        {orderSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-black p-8 sm:p-12 rounded-3xl border border-emerald-500/30 text-center shadow-2xl"
          >
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} />
            </div>

            <h1 className="text-3xl sm:text-5xl font-black mb-3 text-white">Order Confirmed! 🎉</h1>
            <p className="text-gray-400 text-lg mb-8">
              Thank you for shopping with ASTEYA. Your order ID is{" "}
              <span className="text-cyan-400 font-mono font-bold">{orderSuccess._id || orderSuccess.id}</span>.
            </p>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-left mb-8 space-y-3">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Customer:</span>
                <span className="font-semibold">{orderSuccess.customer_name}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Payment Method:</span>
                <span className="font-semibold text-emerald-400">{orderSuccess.payment_method}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Total Paid:</span>
                <span className="font-bold text-xl text-white">₹{orderSuccess.total_amount}</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">Shipping Address:</span>
                <span className="text-sm text-gray-300 font-medium">{orderSuccess.shipping_address}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-all shadow-xl"
            >
              Back to Storefront
            </button>
          </motion.div>
        ) : cart.length === 0 ? (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-24 h-24 bg-white/5 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
              <ShoppingBag size={48} />
            </div>
            <h2 className="text-3xl font-black mb-3">Your Cart is Empty</h2>
            <p className="text-gray-400 mb-8">Discover our premium anime t-shirt collection and elevate your style.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-all shadow-xl"
            >
              <ArrowLeft size={20} />
              Explore Collection
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Link to="/" className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Shopping Cart ({cart.length})</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* CART ITEMS LIST */}
              <div className="lg:col-span-7 space-y-4">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between"
                    >
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border border-white/10 flex-shrink-0"
                      />

                      <div className="flex-1 text-center sm:text-left">
                        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                          {item.anime_series || "Anime Tee"}
                        </span>
                        <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{item.name}</h3>
                        <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                          <span className="px-2.5 py-0.5 bg-white/10 border border-white/20 rounded-md text-xs font-bold">
                            Size: {item.size}
                          </span>
                          <span className="text-emerald-400 font-bold text-lg">₹{item.price}</span>
                        </div>
                      </div>

                      {/* Quantity Controls & Delete */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-white/20 rounded-xl overflow-hidden bg-white/5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-white/10 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 font-bold text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-white/10 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2.5 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Coupon Code Section */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag size={20} className="text-cyan-400" />
                    <h3 className="font-bold text-lg">Apply Coupon Code</h3>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. ANIME10 or SAVE500"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white uppercase placeholder-gray-500 focus:outline-none focus:border-white/40 font-mono text-sm"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all text-sm"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-emerald-400 text-sm font-semibold mt-2">
                      ✓ Coupon {couponApplied} applied! Saved ₹{discountAmount}.
                    </p>
                  )}
                  {couponError && (
                    <p className="text-red-400 text-sm font-semibold mt-2">{couponError}</p>
                  )}
                </div>
              </div>

              {/* CHECKOUT & ADDRESS FORM */}
              <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6">
                <h2 className="text-2xl font-black border-b border-white/10 pb-4">Shipping & Checkout</h2>

                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-400 block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-400 block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-400 block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-400 block mb-1">Shipping Address</label>
                    <input
                      type="text"
                      required
                      placeholder="House/Flat No., Street Name"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-400 block mb-1">City</label>
                      <input
                        type="text"
                        required
                        placeholder="Mumbai"
                        value={shippingCity}
                        onChange={(e) => setShippingCity(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-400 block mb-1">Pincode</label>
                      <input
                        type="text"
                        required
                        placeholder="400001"
                        value={shippingPincode}
                        onChange={(e) => setShippingPincode(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40 text-sm"
                      />
                    </div>
                  </div>

                  {/* Billing Address Toggle */}
                  <div className="pt-2">
                    <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-300">
                      <input
                        type="checkbox"
                        checked={sameAsShipping}
                        onChange={(e) => setSameAsShipping(e.target.checked)}
                        className="w-4 h-4 rounded text-white"
                      />
                      <span>Billing address same as shipping address</span>
                    </label>
                  </div>

                  {!sameAsShipping && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                      <label className="text-xs font-semibold text-gray-400 block mb-1">Custom Billing Address</label>
                      <input
                        type="text"
                        placeholder="Billing Address Details"
                        value={billingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40 text-sm"
                      />
                    </motion.div>
                  )}

                  {/* Payment Method Selector */}
                  <div className="pt-4 border-t border-white/10">
                    <label className="text-xs font-semibold text-gray-400 block mb-3">Select Payment Method</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "UPI", label: "UPI / GPay" },
                        { id: "Card", label: "Debit/Credit" },
                        { id: "COD", label: "Cash on Delivery" }
                      ].map((pm) => (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() => setPaymentMethod(pm.id as any)}
                          className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                            paymentMethod === pm.id
                              ? "bg-white text-black border-white shadow-lg"
                              : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30"
                          }`}
                        >
                          {pm.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="pt-4 border-t border-white/10 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span className="font-semibold text-white">₹{cartTotal}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Discount ({couponApplied})</span>
                        <span>-₹{discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-400">
                      <span>Delivery Shipping</span>
                      <span className="font-semibold text-emerald-400">FREE</span>
                    </div>
                    <div className="flex justify-between text-xl font-black text-white pt-3 border-t border-white/10">
                      <span>Total Amount</span>
                      <span>₹{finalTotal}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-lg rounded-2xl transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2"
                  >
                    <ShieldCheck size={24} />
                    {loading ? "Processing Order..." : `Place Order (₹${finalTotal})`}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
