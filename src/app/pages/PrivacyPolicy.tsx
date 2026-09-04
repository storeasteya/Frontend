import { motion } from "motion/react";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center sm:text-left"
        >
          <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4">
            Legal &amp; Data Protection
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight mb-4 glass-heading">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Last updated: August 15, 2026 • ASTEYA (storeasteya.com)
          </p>
        </motion.div>

        <div className="space-y-8">
          <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold font-display">1. Information We Collect</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              When you visit or make a purchase from ASTEYA, we collect personal information necessary to fulfill your orders and provide a seamless shopping experience. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Full Name, Shipping Address, and Pincode</li>
              <li>Email address and Phone/WhatsApp Number</li>
              <li>Payment references (transaction IDs, UPI payment confirmations)</li>
              <li>Device details and browser data for security &amp; analytics</li>
            </ul>
          </section>

          <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                <Lock className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold font-display">2. How We Use Your Information</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Your information is strictly used for processing your orders, providing dispatch updates, handling customer support, and improving our merchandise offerings:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Processing t-shirt orders, shipping labels, and real-time tracking updates</li>
              <li>Communicating order status via SMS/WhatsApp/Email</li>
              <li>Preventing fraudulent transactions and ensuring payment safety</li>
            </ul>
          </section>

          <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                <Eye className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold font-display">3. Data Sharing &amp; Security</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              We NEVER sell your personal data. We only share essential logistics information with our trusted courier partners (such as Delhivery, BlueDart, or India Post) strictly to deliver your package safely to your address.
            </p>
          </section>

          <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                <FileText className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold font-display">4. Contacting Us About Privacy</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions regarding our Privacy Policy or wish to request data deletion, please contact our support team at <a href="mailto:deepankraghuwanshi1@gmail.com" className="text-cyan-400 underline">deepankraghuwanshi1@gmail.com</a> or call +91 96859 82012.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
