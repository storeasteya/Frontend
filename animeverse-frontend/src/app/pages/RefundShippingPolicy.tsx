import { motion } from "motion/react";
import { Truck, RotateCcw, Video, ShieldCheck } from "lucide-react";

export default function RefundShippingPolicy() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center sm:text-left"
        >
          <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4">
            Customer Guarantee
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight mb-4 glass-heading">
            Refund &amp; Shipping Policy
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Transparent shipping timelines, returns, and exchange guidelines for ASTEYA customers.
          </p>
        </motion.div>

        <div className="space-y-8">
          <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                <Truck className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold font-display">1. Shipping Information</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                <span><strong>Dispatch Time:</strong> Orders are packed and dispatched within 24-48 hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                <span><strong>Delivery Timeline:</strong> Express delivery across India takes 3–5 business days depending on location.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                <span><strong>Shipping Charges:</strong> FREE express shipping on orders over ₹999. Nominal ₹50 fee on smaller orders.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                <span><strong>Tracking:</strong> Real-time tracking code sent via SMS/Email as soon as your order leaves our warehouse.</span>
              </li>
            </ul>
          </section>

          <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                <Video className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold font-display">2. Unboxing Video Requirement (Mandatory)</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              To protect both our customers and our brand from fraud, an unboxing video is required for any return or refund claims.
            </p>
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-300 text-sm">
              <strong>How to record:</strong> Before opening the polybag, record a continuous video showing the sealed shipping label, then open the bag and inspect the shirt.
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                <RotateCcw className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold font-display">3. 7-Day Returns &amp; Exchanges</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              If your item is damaged or defective upon arrival, we offer a 100% full refund with unboxing video proof.
            </p>
            <ul className="space-y-2 text-gray-400">
              <li>• <strong>Size Exchanges:</strong> Need a different size? We offer 1 free size exchange within 7 days of delivery.</li>
              <li>• <strong>Refund Eligibility:</strong> Full refunds are provided for damaged/defective items. Non-damaged items or change of mind are eligible for exchange/store credit only.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
