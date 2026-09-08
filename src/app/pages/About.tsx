import { motion } from "motion/react";
import { ShieldCheck, Award, Sparkles, Feather, Layers, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { SEO } from "../components/SEO";

export default function About() {
  const navigate = useNavigate();

  const aboutPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About ASTEYA Brand Story",
    "url": "https://storeasteya.vercel.app/about",
    "description": "ASTEYA is a premium anime clothing brand in India crafting 240 GSM heavyweight ringspun cotton oversized anime t-shirts for passionate anime fans.",
    "mainEntity": {
      "@type": "Organization",
      "name": "ASTEYA",
      "foundingLocation": "India",
      "knowsAbout": ["Anime T-shirts", "Heavyweight Apparel", "Ringspun Cotton Streetwear", "Solo Leveling", "Dragon Ball Z", "Demon Slayer"]
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
        "name": "About Us",
        "item": "https://storeasteya.vercel.app/about"
      }
    ]
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-black text-white">
      <SEO
        title="About ASTEYA | Premium Anime Clothing Brand India"
        description="Discover ASTEYA, India's premium anime clothing brand. We craft 240 GSM ringspun cotton oversized anime t-shirts for passionate fans across India."
        keywords="premium anime clothing brand India, ringspun cotton anime t-shirt, ASTEYA brand story, 240 GSM heavyweight anime t-shirt"
        canonicalUrl="https://storeasteya.vercel.app/about"
        jsonLd={[aboutPageJsonLd, breadcrumbJsonLd]}
      />

      {/* ─── HERO BRAND STORY ─── */}
      <section className="relative py-16 bg-gradient-to-b from-gray-950 via-black to-black border-b border-white/10 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-cyan-400 mb-6">
              <Sparkles size={14} /> The ASTEYA Brand Story
            </span>

            {/* Target H1 for SEO */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-8 font-display glass-heading">
              ASTEYA Brand Story — Premium Anime Clothing Brand India
            </h1>

            <p className="text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-normal">
              Built by otaku creators for anime lovers across India. We engineer heavyweight, ultra-durable ringspun cotton anime t-shirts that let you wear your favorite series with pride.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── MISSION & VISION STATEMENT ─── */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Our Origin</span>
              <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
                We're Fans, Crafting For Fans.
              </h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                ASTEYA was born out of frustration with thin, flimsy merchandise that faded after two washes. As dedicated fans of Solo Leveling, Dragon Ball Z, and Demon Slayer, we wanted anime streetwear that actually matched the epic scale of the series we love.
              </p>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                We spent months sourcing the softest 240 GSM combed ringspun cotton and testing high-density DTF printing to create oversized graphic tees engineered specifically for Indian climate and longevity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6 backdrop-blur-xl"
            >
              <h3 className="text-2xl font-bold text-white font-display border-b border-white/10 pb-4">
                What Drives ASTEYA?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 text-cyan-400">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Zero Quality Compromise</h4>
                    <p className="text-xs text-gray-400 mt-1">Every shirt features double-needle stitching, anti-pilling bio-wash, and pre-shrunk fabric construction.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 text-cyan-400">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Authentic Art & Prints</h4>
                    <p className="text-xs text-gray-400 mt-1">HD graphics with rich colors that withstand over 50+ wash cycles without cracking or peeling.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 text-cyan-400">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Transparent Customer First Support</h4>
                    <p className="text-xs text-gray-400 mt-1">Simple 7 days exchange window, video proof parcel verification, and rapid India-wide express shipping.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── MATERIAL & CRAFTSMANSHIP SPECS ─── */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-950 to-black border-t border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-2">The Quality Standard</span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-white">
              Why Our 240 GSM Fabric Hits Different
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-3">
              We don't sell thin 160 GSM promo tees. ASTEYA uses heavyweight luxury ringspun cotton built for streetwear styling.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto text-cyan-400">
                <Layers size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">240 GSM Heavyweight</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Provides a premium structured drape that doesn't cling to your body. Durable, thick, and perfect for oversized streetwear silhouettes.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto text-cyan-400">
                <Feather size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">100% Combed Ringspun</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Ringspun fibers are twisted and thinned into finer cotton strands, creating an exceptionally smooth surface with superior breathability.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto text-cyan-400">
                <Sparkles size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">Pre-Shrunk & Bio-Washed</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Enzyme bio-wash treatment eliminates surface fuzziness while pre-shrinking guarantees your t-shirt maintains its true fit wash after wash.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CALL TO ACTION ─── */}
      <section className="py-20 bg-black text-center">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-3xl sm:text-5xl font-black font-display mb-6">
            Ready to Upgrade Your Anime Wardrobe?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Explore our latest drops featuring Solo Leveling, Dragon Ball Z, Jujutsu Kaisen, and Demon Slayer tees.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/shop")}
              className="px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider rounded-full hover:bg-gray-200 transition-colors shadow-2xl inline-flex items-center justify-center gap-2"
            >
              Shop Anime Apparel <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold text-sm uppercase tracking-wider rounded-full hover:bg-white/10 transition-colors"
            >
              Contact Support Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
