import { motion } from "motion/react";
import { Mail, Phone, Clock, MessageCircle, Shield, Package, Video } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-black">
      <div className="container mx-auto px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-24"
        >
          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-none">
            About Us
          </h1>
          <p className="text-2xl md:text-3xl text-gray-400 leading-relaxed">
            Your trusted destination for premium anime t-shirts featuring the hottest series.
          </p>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-20 mb-32 max-w-7xl mx-auto"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">
              Our Story
            </h2>
          </div>
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              We're anime fans creating merchandise for anime fans. We understand the passion you have for your favorite characters and series.
            </p>
            <p>
              We specialize in high-quality t-shirts featuring iconic anime series like Solo Leveling, Dragon Ball Z, and Demon Slayer. Every design is carefully crafted and printed on premium cotton fabric.
            </p>
            <p>
              Our mission is simple: provide you with merchandise that you'll love wearing while ensuring a safe and trustworthy shopping experience.
            </p>
          </div>
        </motion.div>

        {/* Trust & Policy */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tighter text-center">
            Our Customer Promise
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Video Proof Required</h3>
              <p className="text-gray-400 leading-relaxed">
                To protect both you and us from scams, customers must record a video before opening the parcel. This ensures transparency and builds trust.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">14-Day Return Policy</h3>
              <p className="text-gray-400 leading-relaxed">
                Damaged products? Full refund with video proof. Wrong size/color? Free exchange available. No refunds for non-damaged items.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Secure Packaging</h3>
              <p className="text-gray-400 leading-relaxed">
                All products are carefully packed and sealed. We take every measure to ensure your t-shirt arrives in perfect condition.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Payment & Shipping */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tighter text-center">
            Payment & Shipping
          </h2>
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">💳</span>
                  Payment Methods
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>UPI (PhonePe, Google Pay, Paytm)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>Credit/Debit Cards</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>Cash on Delivery (COD)</span>
                  </li>
                </ul>
                <div className="mt-6 text-sm text-gray-500">
                  Currency: ₹ INR (Indian Rupees)
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">📦</span>
                  Shipping Info
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>Delivery: 5-7 business days</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>Shipping across India</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>Free shipping on orders over ₹999</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Customer Support */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tighter text-center">
            Customer Support
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
              <p className="text-center text-xl text-gray-300 mb-12">
                Need help? Our support team is here for you!
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Email Support</h3>
                    <p className="text-gray-400">support@store.com</p>
                    <p className="text-sm text-gray-500 mt-1">(Admin will update)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Phone Support</h3>
                    <p className="text-gray-400">+91 XXXXX XXXXX</p>
                    <p className="text-sm text-gray-500 mt-1">(Admin will update)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Business Hours</h3>
                    <p className="text-gray-400">Mon - Sat: 10 AM - 7 PM</p>
                    <p className="text-sm text-gray-500 mt-1">(Admin will update)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">WhatsApp</h3>
                    <p className="text-gray-400">+91 XXXXX XXXXX</p>
                    <p className="text-sm text-gray-500 mt-1">(Admin will update)</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="font-bold mb-3 text-center">Response Time</h3>
                <p className="text-gray-400 text-center">
                  We typically respond within 2-4 hours during business hours
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tighter text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "What sizes are available?",
                a: "All our t-shirts come in S, M, L, XL, and XXL sizes. Check the size chart on each product page for measurements."
              },
              {
                q: "How do I record the unboxing video?",
                a: "Before opening your package, start recording a video showing the sealed package, then open it while recording. This helps us process returns/exchanges faster."
              },
              {
                q: "Can I get a refund if I don't like the design?",
                a: "Refunds are only available for damaged products with video proof. You can exchange for a different size or color if the product is in perfect condition."
              },
              {
                q: "How long does delivery take?",
                a: "Standard delivery takes 5-7 business days across India. You'll receive a tracking number once your order ships."
              },
              {
                q: "Are the colors accurate to what's shown online?",
                a: "We try our best to show accurate colors, but slight variations may occur due to screen settings. All designs are high-quality prints."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              >
                <h3 className="text-xl font-bold mb-3">{faq.q}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
