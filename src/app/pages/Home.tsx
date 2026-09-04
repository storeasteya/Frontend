import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, Shield, Truck, RotateCcw, Star, ChevronLeft, ChevronRight, ShoppingCart, Zap, Mail, Phone, Clock, MessageCircle, Video, Package, ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase, type Product, type WebsiteTestimonial } from "../../lib/supabase";
import { fetchProducts as apiFetchProducts } from "../../lib/api";
import { useCart } from "../../lib/cartContext";
import { TshirtShelf } from "../components/TshirtShelf";
import heroImage from "figma:asset/ee488f8ea6fc6504e921786a580af77a5035691f.png";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

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
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<WebsiteTestimonial[]>([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchTestimonials();

    // Handle hash-based scrolling on load
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => scrollTo(hash), 300);
    }
  }, []);

  async function fetchProducts() {
    try {
      const data = await apiFetchProducts();
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
        return;
      }
    } catch (e) { }

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("in_stock", true)
      .order("display_order", { ascending: true });
    if (data) setProducts(data);
  }

  async function fetchTestimonials() {
    const { data } = await supabase
      .from("website_testimonials")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    if (data) setTestimonials(data);
  }

  const nextProduct = () => {
    setDirection(1);
    setCurrentProductIndex((prev) => (prev + 1) % Math.max(products.length, 1));
  };

  const prevProduct = () => {
    setDirection(-1);
    setCurrentProductIndex((prev) => (prev - 1 + Math.max(products.length, 1)) % Math.max(products.length, 1));
  };

  const currentProduct = products[currentProductIndex];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 1000 : -1000, opacity: 0, rotateY: dir > 0 ? 45 : -45, scale: 0.8 }),
    center: { x: 0, opacity: 1, rotateY: 0, scale: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 1000 : -1000, opacity: 0, rotateY: dir < 0 ? 45 : -45, scale: 0.8 }),
  };

  const faqs = [
    { q: "What is ASTEYA's brand story & mission?", a: "ASTEYA was created by anime fans for anime fans. We design high quality graphic merchandise so you can wear your anime spirit proudly every day." },
    { q: "What materials and printing techniques do you use?", a: "We use 100% heavyweight ringspun cotton with high-definition DTF printing to ensure our t-shirts are ultra-durable, comfortable, and pre-shrunk." },
    { q: "What sizes are available?", a: "All our t-shirts come in S, M, L, XL, and XXL. Check the size selector on each product card for available fits." },
    { q: "What is the 7 Days Return & Exchange Policy?", a: "We offer an easy 7 Days Return & Exchange policy. If you receive a damaged product or need a different size, submit a request within 7 days of delivery." },
    { q: "How long does delivery take?", a: "Express shipping delivers your order in 3-5 business days across India. Live order tracking is available on our website." },
    { q: "What payment methods are accepted?", a: "We accept UPI (PhonePe, Google Pay, Paytm), Credit/Debit Cards, and Cash on Delivery (COD). All prices are in ₹ INR." },
  ];

  // Demo products shown when Supabase isn't configured
  const demoProducts = [
    { id: "1", name: "Solo Leveling — Sung Jinwoo", description: "Premium heavyweight cotton apparel featuring the Shadow Monarch in his iconic battle stance. GSM 240, pre-shrunk.", price: 599, image_url: heroImage, sizes: ["S", "M", "L", "XL", "XXL"], featured: true, anime_series: "Solo Leveling" },
    { id: "2", name: "Dragon Ball Z — Super Saiyan", description: "Ultra Instinct Goku oversized drop-shoulder edition. 100% ringspun cotton with vibrant DTF print.", price: 599, image_url: heroImage, sizes: ["S", "M", "L", "XL"], featured: false, anime_series: "Dragon Ball Z" },
    { id: "3", name: "Demon Slayer — Tanjiro", description: "Water Breathing pattern wrap-around print on premium white base. Limited edition.", price: 599, image_url: heroImage, sizes: ["M", "L", "XL", "XXL"], featured: true, anime_series: "Demon Slayer" },
  ] as unknown as Product[];

  const displayProducts = products.length > 0 ? products : demoProducts;
  const displayProduct = displayProducts[currentProductIndex] || displayProducts[0];

  return (
    <div className="relative bg-black text-white overflow-x-hidden">

      {/* ─── SECTION 1 — HERO ─── */}
      <section id="hero" ref={heroRef} className="relative min-h-screen h-auto overflow-hidden bg-black py-20 lg:py-0" style={{ position: "relative" }}>
        {/* Background Video Layer */}
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-hexagons-moving-41551-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-black" />
        </motion.div>

        {/* 🎨 ASTEYA Ambient Cyan Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[130px] pointer-events-none z-[1]" />
        <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-blue-600/10 blur-[120px] pointer-events-none z-[1]" />

        {/* 🌟 Responsive ASTEYA Background Watermark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden px-2 sm:px-4"
        >
          <span className="text-[13.5vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[8vw] xl:text-[7.5vw] font-black tracking-[0.25em] text-white/[0.05] uppercase font-display leading-none whitespace-nowrap select-none drop-shadow-[0_0_40px_rgba(255,255,255,0.03)]">
            ASTEYA
          </span>
        </motion.div>

        {/* 🎯 Main Hero Content Container */}
        <div className="relative z-10 min-h-screen flex items-center pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* 👈 LEFT COLUMN: Typography & Action CTAs */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-7 text-left"
              >
                {/* Official Theme Pill Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-5 sm:mb-6"
                >
                  <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-cyan-400 font-bold tracking-widest uppercase text-[10px] sm:text-xs md:text-sm shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    WEAR YOUR ANIME SPIRIT — ASTEYA
                  </span>
                </motion.div>

                {/* Glass Headline matching site theme */}
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight sm:leading-tight tracking-tight font-display glass-heading"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Wear Your<br />Anime Pride
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="text-gray-300 text-base sm:text-lg md:text-xl mb-8 max-w-xl font-normal leading-relaxed"
                >
                  Heavyweight 240 GSM ringspun cotton apparel designed by anime fans for anime fans. Experience ultimate comfort & vivid DTF graphic prints.
                </motion.p>

                {/* Action CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5 w-full sm:w-auto mb-10"
                >
                  <motion.button
                    onClick={() => scrollTo("shop")}
                    whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)" }}
                    whileTap={{ scale: 0.96 }}
                    className="group px-8 py-4 sm:px-10 sm:py-5 bg-white text-black rounded-full text-sm sm:text-base md:text-lg font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-all shadow-2xl min-h-[50px] w-full sm:w-auto"
                  >
                    Shop Collection
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
                  </motion.button>

                  <motion.button
                    onClick={() => navigate("/about")}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-8 py-4 sm:px-10 sm:py-5 bg-transparent border-2 border-white/40 hover:border-cyan-400 text-white rounded-full text-sm sm:text-base md:text-lg font-bold hover:bg-white/10 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] transition-all backdrop-blur-sm min-h-[50px] w-full sm:w-auto"
                  >
                    Learn More
                  </motion.button>
                </motion.div>

                {/* ASTEYA Features Bar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg"
                >
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-white">100%</div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Ringspun Cotton</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-cyan-400">240 GSM</div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Heavyweight Fit</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-white">7 DAYS</div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Easy Exchange</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* 👉 RIGHT COLUMN: Glassmorphic Product Showcase Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="lg:col-span-5 relative flex items-center justify-center"
              >
                {/* Cyan Glow Orbs */}
                <div className="absolute w-72 h-72 rounded-full bg-cyan-500/15 blur-3xl" />

                {/* ASTEYA Glassmorphic Card (matching site theme) */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full max-w-md bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-white/20 shadow-2xl"
                >
                  {/* Card Badge */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-cyan-400 font-bold text-xs uppercase tracking-wider">
                      Featured Drop
                    </span>
                    <span className="text-green-400 font-semibold text-xs flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      In Stock
                    </span>
                  </div>

                  {/* Product Image Frame */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-black border border-white/10 group">
                    <img
                      src={displayProduct?.image_url || heroImage}
                      alt="ASTEYA Product"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Anime Tag Overlay */}
                    <div className="absolute top-3 left-3 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-full border border-white/30">
                      <span className="font-semibold text-xs text-white">{displayProduct?.anime_series || "Solo Leveling"}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 rounded-xl">
                      <div>
                        <div className="text-white font-black text-base">{displayProduct?.name || "Shadow Monarch Tee"}</div>
                        <div className="text-cyan-400 font-bold text-lg">₹{displayProduct?.price || 599}</div>
                      </div>
                      <button
                        onClick={() => displayProduct && addToCart(displayProduct, selectedSize)}
                        className="px-4 py-2 bg-white text-black rounded-xl font-bold text-xs hover:bg-gray-100 transition-colors shadow-lg"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Card Rating Footer */}
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-300 pt-2 border-t border-white/10">
                    <span className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-white">4.9/5</span> (120+ Reviews)
                    </span>
                    <span className="text-gray-400">
                      240 GSM Heavyweight
                    </span>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* 🔮 Floating Cyan Particles */}
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-cyan-400/40 rounded-full pointer-events-none"
            style={{
              left: `${(i * 29 + 11) % 100}%`,
              top: `${(i * 37 + 17) % 100}%`,
            }}
            animate={{
              y: [0, -70, 0],
              opacity: [0.1, 0.8, 0.1]
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: (i * 0.3) % 2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ opacity: heroOpacity }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-white text-xs sm:text-sm tracking-widest z-20 cursor-pointer"
          onClick={() => scrollTo("shop")}
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-1.5">
            <span className="text-gray-300 font-bold tracking-widest">SCROLL</span>
            <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-white via-cyan-400 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── SECTION 2 — SHOP / PRODUCT CAROUSEL ─── */}
      <section id="shop" className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <span className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              Shop Collection
            </span>
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter font-display glass-heading">Featured Products</h2>
            <p className="text-xl text-gray-400">Swipe to explore our exclusive anime t-shirt collection</p>
          </motion.div>

          <div className="relative max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-8">
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevProduct}
                className="hidden sm:flex w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 items-center justify-center hover:bg-white/20 transition-colors z-10 flex-shrink-0"
              >
                <ChevronLeft size={24} />
              </motion.button>

              <div className="flex-1 max-w-4xl w-full" style={{ perspective: "1000px" }}>
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentProductIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 }, rotateY: { duration: 0.6 }, scale: { duration: 0.4 } }}
                    className="grid md:grid-cols-2 gap-6 md:gap-12 items-center bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 border border-white/20 shadow-2xl"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Image */}
                    <motion.div whileHover={{ scale: 1.03, rotateZ: 1 }} className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden group bg-transparent">
                      <motion.img
                        src={displayProduct?.image_url}
                        alt={displayProduct?.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      {displayProduct?.anime_series && (
                        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-black/70 backdrop-blur-md rounded-full border border-white/30">
                          <span className="font-semibold text-xs sm:text-sm text-white">{displayProduct.anime_series}</span>
                        </motion.div>
                      )}
                      {displayProduct?.featured && (
                        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="absolute top-3 right-3 sm:top-4 sm:right-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-yellow-500/80 backdrop-blur-md rounded-full">
                          <span className="font-bold text-black flex items-center gap-1 text-xs sm:text-sm">
                            <Star size={12} fill="currentColor" /> Featured
                          </span>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Details */}
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-4 sm:space-y-6">
                      <div>
                        <motion.h3 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-4 tracking-tight">
                          {displayProduct?.name}
                        </motion.h3>
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">{displayProduct?.description}</p>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="text-3xl sm:text-4xl md:text-5xl font-black">₹{displayProduct?.price}</div>
                        <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-500/20 border border-green-500/50 rounded-full">
                          <span className="text-green-400 font-semibold text-xs sm:text-sm">In Stock</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-[11px] sm:text-xs font-bold mb-2 sm:mb-3 text-gray-400 tracking-widest">SELECT SIZE</p>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          {(displayProduct?.sizes || []).map((size) => (
                            <motion.button
                              key={size}
                              whileHover={{ scale: 1.08 }}
                              whileTap={{ scale: 0.92 }}
                              onClick={() => setSelectedSize(size)}
                              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl text-xs sm:text-sm font-bold transition-all ${selectedSize === size
                                  ? "bg-white text-black shadow-lg shadow-white/30"
                                  : "bg-white/10 hover:bg-white/20 border border-white/20"
                                }`}
                            >
                              {size}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => displayProduct && addToCart(displayProduct, selectedSize)}
                          className="py-3 sm:py-4 px-3 sm:px-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold text-xs sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-white/20 transition-all min-h-[44px]"
                        >
                          <ShoppingCart size={18} />
                          <span>Add to Cart</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => displayProduct && buyNow(displayProduct, selectedSize, navigate)}
                          className="py-3 sm:py-4 px-3 sm:px-4 bg-white text-black hover:bg-gray-200 rounded-xl font-bold text-xs sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 shadow-xl transition-all min-h-[44px]"
                        >
                          <Zap size={18} className="fill-black" />
                          <span>Buy Now</span>
                        </motion.button>
                      </div>

                      <p className="text-center text-gray-500 text-xs sm:text-sm">
                        Product {currentProductIndex + 1} of {displayProducts.length}
                      </p>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextProduct}
                className="hidden sm:flex w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 items-center justify-center hover:bg-white/20 transition-colors z-10 flex-shrink-0"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>

            {/* Mobile Prev / Next Controls */}
            <div className="flex sm:hidden justify-between items-center px-4 mt-6">
              <button
                onClick={prevProduct}
                className="px-4 py-2.5 bg-white/10 rounded-full text-xs font-bold flex items-center gap-1 border border-white/20"
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <div className="flex gap-2">
                {displayProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => { setDirection(index > currentProductIndex ? 1 : -1); setCurrentProductIndex(index); }}
                    className={`h-2 rounded-full transition-all ${index === currentProductIndex ? "w-8 bg-white" : "w-2 bg-white/30"}`}
                  />
                ))}
              </div>
              <button
                onClick={nextProduct}
                className="px-4 py-2.5 bg-white/10 rounded-full text-xs font-bold flex items-center gap-1 border border-white/20"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>

            <div className="flex justify-center gap-3 mt-12">
              {displayProducts.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => { setDirection(index > currentProductIndex ? 1 : -1); setCurrentProductIndex(index); }}
                  whileHover={{ scale: 1.2 }}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentProductIndex ? "w-12 bg-white" : "w-2 bg-white/30 hover:bg-white/50"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal T-Shirt Shelf Catalog */}
        <div className="mt-16 border-t border-white/10 pt-16">
          <TshirtShelf
            products={displayProducts}
            title="Complete T-Shirt Catalog"
            subtitle="Select size & add directly to cart"
            onBuyNow={(prod, sz) => buyNow(prod, sz, navigate)}
          />
        </div>
      </section>

      {/* ─── SECTION 3 — FEATURES / TRUST BADGES ─── */}
      <section id="features" className="py-24 bg-black border-t border-white/10">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Why Choose ASTEYA</h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Shield, title: "Authentic Designs", desc: "100% heavyweight cotton, high-definition prints" },
              { icon: Truck, title: "Fast Shipping", desc: "Delivered within 3-5 business days" },
              { icon: RotateCcw, title: "7-Day Return Policy", desc: "Easy exchange or return request within 7 days" },
              { icon: Star, title: "Verified Reviews", desc: "Real customer feedback only" },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center cursor-default"
              >
                <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.6 }} className="inline-block p-6 bg-white/5 rounded-2xl mb-4 border border-white/10">
                  <f.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4 — ABOUT US ─── */}
      <section id="about" className="py-32 bg-gradient-to-b from-black to-gray-950 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <span className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-widest uppercase mb-6">Our Story</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">About ASTEYA</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Your trusted destination for heavyweight anime merchandise.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-2 gap-20 items-center mb-24">
            <div>
              <h3 className="text-4xl font-black mb-8 tracking-tighter">We're fans, building for fans.</h3>
            </div>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>We understand the passion you have for your favorite characters and series. ASTEYA was born from that same love.</p>
              <p>We specialize in high-quality t-shirts featuring iconic anime series like Solo Leveling, Dragon Ball Z, and Demon Slayer — every design carefully crafted and printed on heavyweight cotton.</p>
              <p>Our mission: give you merchandise you'll love wearing, backed by a safe and trustworthy shopping experience.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 5 — POLICIES ─── */}
      <section id="policies" className="py-32 bg-gray-950 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <span className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-widest uppercase mb-6">Transparency</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">Our Customer Promise</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Video, title: "Video Proof Required", desc: "To protect both you and us from scams, customers must record a video before opening the parcel. This ensures full transparency and faster claim processing." },
              { icon: Package, title: "7-Day Return & Exchange", desc: "Damaged item? Full refund with unboxing video proof. Need a different size or color? Free exchange within 7 days of delivery." },
              { icon: Shield, title: "Secure Packaging", desc: "Every order is carefully packed and sealed. We take every measure to ensure your t-shirt arrives in perfect condition." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 cursor-default"
              >
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6 — TESTIMONIALS + PAYMENT ─── */}
      <section id="reviews" className="py-32 bg-gradient-to-b from-gray-950 to-black border-t border-white/10">
        <div className="container mx-auto px-6 max-w-7xl">

          {/* Testimonials */}
          {testimonials.length > 0 && (
            <>
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">Customer Reviews</h2>
                <p className="text-xl text-gray-400">Real feedback from real customers</p>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-8 mb-32">
                {testimonials.map((t, i) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      {t.customer_image && <img src={t.customer_image} alt={t.customer_name} className="w-16 h-16 rounded-full object-cover" />}
                      <div>
                        <h4 className="font-bold text-lg">{t.customer_name}</h4>
                        <div className="flex gap-1 mt-1">
                          {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} fill="gold" className="text-yellow-500" />)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">"{t.testimonial_text}"</p>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {/* Payment & Shipping */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Payment &amp; Shipping</h2>
          </motion.div>
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 md:p-14">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><span className="text-3xl">💳</span> Payment Methods</h3>
                <ul className="space-y-3 text-gray-300">
                  {["UPI (PhonePe, Google Pay, Paytm)", "Credit / Debit Cards", "Cash on Delivery (COD)"].map((m) => (
                    <li key={m} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-gray-500">All prices in ₹ INR</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><span className="text-3xl">📦</span> Shipping Info</h3>
                <ul className="space-y-3 text-gray-300">
                  {["Delivery: 3-5 business days", "Ships across India", "Free shipping on orders above ₹999"].map((m) => (
                    <li key={m} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 7 — SUPPORT + FAQ ─── */}
      <section id="support" className="py-32 bg-black border-t border-white/10">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <span className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-widest uppercase mb-6">Help Center</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">We're Here For You</h2>
            <p className="text-xl text-gray-400">Customer support &amp; frequently asked questions</p>
          </motion.div>

          {/* Contact Grid */}
          <div className="max-w-4xl mx-auto mb-24">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 md:p-14">
              <div className="grid md:grid-cols-2 gap-10">
                {[
                  { icon: Mail, label: "Email Support", value: "deepankraghuwanshi1@gmail.com" },
                  { icon: Phone, label: "Phone / WhatsApp", value: "+91 96859 82012" },
                  { icon: Clock, label: "Business Hours", value: "Mon–Sat: 10 AM – 7 PM" },
                  { icon: MessageCircle, label: "Response Time", value: "Within 2-4 hours" },
                ].map(({ icon: Icon, label, value }) => (
                  <motion.div key={label} whileHover={{ x: 6 }} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{label}</h4>
                      <p className="text-gray-400">{value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-black tracking-tighter">Frequently Asked Questions</h3>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-7 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold text-lg pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown size={22} className="flex-shrink-0 text-gray-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-7 pb-7 text-gray-400 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Newsletter */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center mt-32">
            <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter">Stay Updated</h2>
            <p className="text-xl text-gray-400 mb-12">Get notified when new anime collections drop</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-8 py-5 bg-white/5 border-2 border-white/10 rounded-full text-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors backdrop-blur-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-10 py-5 bg-white text-black rounded-full text-lg font-bold hover:bg-gray-200 transition-colors shadow-xl"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
