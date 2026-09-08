import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Shield, Truck, RotateCcw, Star, Sparkles, ChevronRight, Zap, ShoppingCart } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase, type Product } from "../../lib/supabase";
import { fetchProducts as apiFetchProducts } from "../../lib/api";
import { useCart } from "../../lib/cartContext";
import { SEO } from "../components/SEO";
import heroImage from "figma:asset/ee488f8ea6fc6504e921786a580af77a5035691f.png";

export default function Home() {
  const navigate = useNavigate();
  const { addToCart, buyNow } = useCart();
  const heroRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("M");

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  async function loadFeaturedProducts() {
    try {
      const data = await apiFetchProducts();
      if (Array.isArray(data) && data.length > 0) {
        setFeaturedProducts(data.slice(0, 3));
        return;
      }
    } catch (e) {}

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("in_stock", true)
      .limit(3);
    if (data && data.length > 0) {
      setFeaturedProducts(data);
    } else {
      setFeaturedProducts(getFallbackProducts());
    }
  }

  function getFallbackProducts(): Product[] {
    return [
      {
        id: "prod-1",
        _id: "prod-1",
        name: "Solo Leveling — Sung Jinwoo Shadow Monarch Tee",
        description: "Heavyweight 240 GSM pre-shrunk cotton oversized anime tee featuring Sung Jinwoo shadow extraction artwork.",
        price: 599,
        image_url: heroImage,
        sizes: ["S", "M", "L", "XL", "XXL"],
        anime_series: "Solo Leveling",
        category: "anime",
        featured: true,
        in_stock: true,
      },
      {
        id: "prod-2",
        _id: "prod-2",
        name: "Dragon Ball Z — Super Saiyan Goku Aura Tee",
        description: "Ultra Instinct Goku drop-shoulder graphic tee. Premium 100% ringspun cotton with vivid DTF print.",
        price: 599,
        image_url: heroImage,
        sizes: ["S", "M", "L", "XL"],
        anime_series: "Dragon Ball Z",
        category: "anime",
        featured: true,
        in_stock: true,
      },
      {
        id: "prod-3",
        _id: "prod-3",
        name: "Demon Slayer — Tanjiro Water Breathing Tee",
        description: "Water Breathing pattern wrap-around graphic print on 240 GSM heavyweight black cotton base.",
        price: 599,
        image_url: heroImage,
        sizes: ["M", "L", "XL", "XXL"],
        anime_series: "Demon Slayer",
        category: "anime",
        featured: true,
        in_stock: true,
      },
    ] as unknown as Product[];
  }

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ASTEYA",
    "url": "https://storeasteya.vercel.app/",
    "logo": "https://storeasteya.vercel.app/logo.png",
    "description": "India's premier brand for 240 GSM heavyweight ringspun cotton oversized anime t-shirts and streetwear apparel.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9685982012",
      "contactType": "Customer Service",
      "email": "deepankraghuwanshi1@gmail.com",
      "areaServed": "IN"
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
      }
    ]
  };

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      <SEO
        title="ASTEYA | Premium Anime T-Shirts & Streetwear India"
        description="Shop ASTEYA anime t-shirts in India. Premium 240 GSM heavyweight ringspun cotton oversized anime tees featuring Solo Leveling, DBZ & Demon Slayer."
        keywords="anime t-shirts India, premium anime apparel, ASTEYA anime streetwear, oversized anime tees, 240 GSM heavyweight anime t-shirt"
        canonicalUrl="https://storeasteya.vercel.app/"
        jsonLd={[organizationJsonLd, breadcrumbJsonLd]}
      />

      {/* ─── HERO BANNER SECTION ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-28 pb-20 bg-black overflow-hidden">
        {/* Background Video Layer */}
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-hexagons-moving-41551-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black" />
        </motion.div>

        {/* Ambient Cyan Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] pointer-events-none z-[1]" />
        <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-blue-600/10 blur-[130px] pointer-events-none z-[1]" />

        {/* ASTEYA Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden px-4">
          <span className="text-[14vw] font-black tracking-[0.25em] text-white/[0.04] uppercase font-display leading-none whitespace-nowrap">
            ASTEYA
          </span>
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 text-left"
            >
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-cyan-400 font-bold tracking-widest uppercase text-xs sm:text-sm shadow-lg">
                  <Sparkles size={14} /> ASTEYA Anime Streetwear India
                </span>
              </div>

              {/* H1 Tag matching SEO intent */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight font-display glass-heading">
                Wear Your Anime Pride — ASTEYA Anime Streetwear India
              </h1>

              <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-8 max-w-xl font-normal leading-relaxed">
                Premium 240 GSM heavyweight ringspun cotton anime t-shirts designed in India. Discover vibrant HD graphic prints for Solo Leveling, Dragon Ball Z, and Demon Slayer.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  onClick={() => navigate("/shop")}
                  className="px-8 py-4 bg-white text-black rounded-full font-bold text-base flex items-center justify-center gap-3 hover:bg-gray-200 transition-all shadow-xl min-h-[50px]"
                >
                  Explore Anime Shop <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => navigate("/about")}
                  className="px-8 py-4 bg-transparent border border-white/40 hover:border-cyan-400 text-white rounded-full font-bold text-base hover:bg-white/10 transition-all backdrop-blur-sm min-h-[50px]"
                >
                  Our Brand Story
                </button>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg">
                <div>
                  <div className="text-lg sm:text-xl font-black text-white">100%</div>
                  <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Ringspun Cotton</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-cyan-400">240 GSM</div>
                  <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Heavyweight Fit</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-white">7 DAYS</div>
                  <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Easy Exchange</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Product Preview Showcase Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-md bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full font-bold text-xs uppercase tracking-wider">
                    Featured Collection Drop
                  </span>
                  <span className="text-emerald-400 font-semibold text-xs flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    In Stock
                  </span>
                </div>

                <div className="relative aspect-square rounded-2xl overflow-hidden bg-black border border-white/10 group">
                  <img
                    src={featuredProducts[0]?.image_url || heroImage}
                    alt={`${featuredProducts[0]?.name || "Solo Leveling"} — oversized anime t-shirt — ASTEYA`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-white/30">
                    <span className="font-semibold text-xs text-white">{featuredProducts[0]?.anime_series || "Solo Leveling"}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10">
                    <div>
                      <div className="text-white font-bold text-sm line-clamp-1">{featuredProducts[0]?.name || "Shadow Monarch Tee"}</div>
                      <div className="text-cyan-400 font-black text-base">₹{featuredProducts[0]?.price || 599}</div>
                    </div>
                    <button
                      onClick={() => featuredProducts[0] && addToCart(featuredProducts[0], selectedSize)}
                      className="px-3 py-1.5 bg-white text-black font-bold text-xs rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-300 pt-1">
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-white">4.9/5</span> (120+ Verified Reviews)
                  </span>
                  <span className="text-cyan-400 font-semibold">240 GSM Heavyweight</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── FEATURED DROPS PREVIEW (SMALL PREVIEW ROW ONLY) ─── */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-950 to-black border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-2">Exclusive Preview</span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Trending Anime Tees</h2>
            </div>
            <button
              onClick={() => navigate("/shop")}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-full border border-white/20 transition-all flex items-center gap-2"
            >
              View Full Shop Catalog ({featuredProducts.length}+) <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((prod, index) => (
              <div
                key={prod.id || index}
                className="bg-white/5 border border-white/10 hover:border-cyan-400/50 rounded-3xl p-5 transition-all space-y-4 group"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-black">
                  <img
                    src={prod.image_url || heroImage}
                    alt={`${prod.name} — ${prod.anime_series} oversized anime t-shirt — ASTEYA`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20">
                    {prod.anime_series}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-cyan-400 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1">{prod.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-xl font-black text-white">₹{prod.price}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(prod, "M")}
                      className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                      title="Add to Cart"
                    >
                      <ShoppingCart size={16} />
                    </button>
                    <button
                      onClick={() => buyNow(prod, "M", navigate)}
                      className="px-4 py-2 bg-white text-black hover:bg-gray-200 font-bold text-xs rounded-xl transition-colors flex items-center gap-1 shadow-lg"
                    >
                      <Zap size={14} className="fill-black" /> Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/shop")}
              className="px-10 py-4 bg-white text-black font-black text-sm uppercase tracking-wider rounded-full hover:bg-gray-200 transition-colors shadow-2xl inline-flex items-center gap-2"
            >
              Browse Complete Catalog in Shop <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE ASTEYA (TRUST BADGES) ─── */}
      <section className="py-20 bg-black border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display">Why ASTEYA Streetwear</h2>
            <p className="text-gray-400 text-sm mt-2">Crafted for anime enthusiasts across India</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "100% Ringspun Cotton", desc: "Ultra-soft 240 GSM pre-shrunk heavyweight fabric" },
              { icon: Truck, title: "3-5 Days Express Shipping", desc: "Fast nationwide dispatch with live SMS & email tracking" },
              { icon: RotateCcw, title: "7-Day Easy Exchange", desc: "Hassle-free size replacement and damaged product returns" },
              { icon: Star, title: "High-Density DTF Print", desc: "Vivid, non-fading anime graphic design prints" },
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto text-cyan-400">
                  <item.icon size={24} />
                </div>
                <h3 className="font-bold text-white text-base">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
