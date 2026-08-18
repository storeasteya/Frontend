import { motion } from "motion/react";
import { FileText, ShoppingBag, CheckCircle, AlertTriangle } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center sm:text-left"
        >
          <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4">
            Terms of Use
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight mb-4 glass-heading">
            Terms of Service
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Last updated: August 15, 2026 • ASTEYA (storeasteya.com)
          </p>
        </motion.div>

        <div className="space-y-8">
          <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                <FileText className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold font-display">1. Agreement to Terms</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              By accessing or making a purchase on ASTEYA (storeasteya.com), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website or place orders.
            </p>
          </section>

          <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                <ShoppingBag className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold font-display">2. Products &amp; Pricing</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              All t-shirts listed on ASTEYA are described as accurately as possible. Prices are displayed in Indian Rupees (₹ INR). We reserve the right to modify prices, launch discounts, or discontinue products at any time without prior notice.
            </p>
          </section>

          <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold font-display">3. Unboxing Video Requirement</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              To prevent fraudulent claims and ensure maximum security, all customers are required to record a continuous unboxing video starting from the sealed outer package down to inspecting the t-shirt. Claims for missing items or damaged goods without unboxing video proof will not be entertained.
            </p>
          </section>

          <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold font-display">4. Order Acceptance &amp; Cancellation</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              ASTEYA reserves the right to cancel any order in the event of incorrect pricing errors, out-of-stock items, or unverified delivery addresses. If your order is cancelled after payment, a full refund will be processed promptly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
