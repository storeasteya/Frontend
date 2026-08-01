import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, Shield, Truck, RotateCcw, Star, ChevronLeft, ChevronRight, ShoppingCart, Mail, Phone, Clock, MessageCircle, Video, Package, ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { supabase, type Product, type WebsiteTestimonial } from "../../lib/supabase";
import heroImage from "figma:asset/ee488f8ea6fc6504e921786a580af77a5035691f.png";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
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
    { q: "What sizes are available?", a: "All our t-shirts come in S, M, L, XL, and XXL. Check the size chart on each product for exact measurements." },
    { q: "How do I record the unboxing video?", a: "Before opening your package, start recording a video showing the sealed parcel, then open it while recording. This is required for all return/exchange requests." },
    { q: "Can I get a refund if I don't like the design?", a: "Refunds are only available for damaged products with unboxing video proof. For size/color issues, a free exchange is available within 14 days." },
    { q: "How long does delivery take?", a: "Standard delivery is 5-7 business days across India. A tracking number is sent once your order ships." },
    { q: "What payment methods are accepted?", a: "We accept UPI (PhonePe, Google Pay, Paytm), Credit/Debit Cards, and Cash on Delivery (COD). All prices are in ₹ INR." },
  ];

  // Demo products shown when Supabase isn't configured
  const demoProducts = [
    { id: "1", name: "Solo Leveling — Sung Jinwoo", description: "Premium heavyweight cotton tee featuring the Shadow Monarch in his iconic battle stance. GSM 240, pre-shrunk.", price: 799, image_url: heroImage, sizes: ["S", "M", "L", "XL", "XXL"], featured: true, anime_series: "Solo Leveling" },
    { id: "2", name: "Dragon Ball Z — Super Saiyan", description: "Ultra Instinct Goku oversized drop-shoulder tee. 100% ringspun cotton with vibrant DTF print.", price: 749, image_url: heroImage, sizes: ["S", "M", "L", "XL"], featured: false, anime_series: "Dragon Ball Z" },
    { id: "3", name: "Demon Slayer — Tanjiro", description: "Water Breathing pattern wrap-around print on premium white base. Limited edition.", price: 849, image_url: heroImage, sizes: ["M", "L", "XL", "XXL"], featured: true, anime_series: "Demon Slayer" },
  ] as unknown as Product[];

  const displayProducts = products.length > 0 ? products : demoProducts;
  const displayProduct = displayProducts[currentProductIndex] || displayProducts[0];

  return (
    <div className="relative bg-black text-white">

      {/* ─── SECTION 1 — HERO ─── */}
      <section id="hero" ref={heroRef} className="relative h-screen overflow-hidden" style={{ position: "relative" }}>
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </motion.div>

        <motion.div
          className="absolute inset-0 z-[1]"
          style={{ background: "radial-gradient(circle at 20% 50%, rgb(255 255 255 / 0.05) 0%, transparent 50%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl"
            >
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-8">
                <span className="inline-block px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white font-semibold tracking-widest uppercase text-sm">
                  Premium Anime T-Shirts — ASTEYA
                </span>
              </motion.div>

              <motion.h1
                className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-none tracking-tighter"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ textShadow: "0 0 80px rgb(255 255 255 / 0.3), 0 0 40px rgb(255 255 255 / 0.2)" }}
              >
                Wear Your<br />Anime Pride
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl font-light leading-relaxed">
                Premium quality t-shirts featuring Solo Leveling, Dragon Ball Z, Demon Slayer, and more.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-wrap gap-6">
                <motion.button
                  onClick={() => scrollTo("shop")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-12 py-6 bg-white text-black rounded-full text-lg font-bold flex items-center gap-3 hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/30"
                >
                  Shop Collection
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
                </motion.button>
                <motion.button
                  onClick={() => scrollTo("about")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 bg-transparent border-2 border-white/50 text-white rounded-full text-lg font-bold hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{ left: `${(i * 37 + 11) % 100}%`, top: `${(i * 53 + 17) % 100}%` }}
            animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: (i * 0.3) % 2 }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ opacity: heroOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white text-sm tracking-widest z-20 cursor-pointer"
          onClick={() => scrollTo("shop")}
        >
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2">
            <span>SCROLL</span>
            <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
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
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Featured Products</h2>
            <p className="text-xl text-gray-400">Swipe to explore our exclusive anime t-shirt collection</p>
          </motion.div>

          <div className="relative max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-4 md:gap-8">
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevProduct}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-10 flex-shrink-0"
              >
                <ChevronLeft size={28} />
              </motion.button>

              <div className="flex-1 max-w-4xl" style={{ perspective: "1000px" }}>
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentProductIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 }, rotateY: { duration: 0.6 }, scale: { duration: 0.4 } }}
                    className="grid md:grid-cols-2 gap-8 md:gap-12 items-center bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-12 border border-white/20 shadow-2xl"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Image */}
                    <motion.div whileHover={{ scale: 1.05, rotateZ: 2 }} className="relative aspect-square rounded-2xl overflow-hidden group">
                      <motion.img
                        src={displayProduct?.image_url}
                        alt={displayProduct?.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      {displayProduct?.anime_series && (
                        <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="absolute top-4 left-4 px-4 py-2 bg-black/70 backdrop-blur-md rounded-full border border-white/30">
                          <span className="font-semibold text-sm">{displayProduct.anime_series}</span>
                        </motion.div>
                      )}
                      {displayProduct?.featured && (
                        <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="absolute top-4 right-4 px-4 py-2 bg-yellow-500/80 backdrop-blur-md rounded-full">
                          <span className="font-bold text-black flex items-center gap-1 text-sm">
                            <Star size={14} fill="currentColor" /> Featured
                          </span>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Details */}
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
                      <div>
                        <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
                          {displayProduct?.name}
                        </motion.h3>
                        <p className="text-gray-300 text-base leading-relaxed">{displayProduct?.description}</p>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-4xl md:text-5xl font-black">₹{displayProduct?.price}</div>
                        <div className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full">
                          <span className="text-green-400 font-semibold text-sm">In Stock</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-bold mb-3 text-gray-400 tracking-widest">SELECT SIZE</p>
                        <div className="flex flex-wrap gap-3">
                          {(displayProduct?.sizes || []).map((size) => (
                            <motion.button
                              key={size}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setSelectedSize(size)}
                              className={`w-12 h-12 rounded-xl font-bold transition-all ${
                                selectedSize === size
                                  ? "bg-white text-black shadow-lg shadow-white/30"
                                  : "bg-white/10 hover:bg-white/20 border border-white/20"
                              }`}
                            >
                              {size}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-5 bg-white text-black rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/20"
                      >
                        <ShoppingCart size={22} />
                        Add to Cart
                      </motion.button>

                      <p className="text-center text-gray-500 text-sm">
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
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-10 flex-shrink-0"
              >
                <ChevronRight size={28} />
              </motion.button>
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
      </section>

      {/* ─── SECTION 3 — FEATURES / TRUST BADGES ─── */}
      <section id="features" className="py-24 bg-black border-t border-white/10">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Why Choose ASTEYA</h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Shield, title: "Premium Quality", desc: "240 GSM ringspun cotton, durable prints" },
              { icon: Truck, title: "Fast Shipping", desc: "Delivered within 5-7 business days" },
              { icon: RotateCcw, title: "14-Day Policy", desc: "Exchange or refund with video proof" },
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
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Your trusted destination for premium anime merchandise.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-2 gap-20 items-center mb-24">
            <div>
              <h3 className="text-4xl font-black mb-8 tracking-tighter">We're fans, building for fans.</h3>
            </div>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>We understand the passion you have for your favorite characters and series. ASTEYA was born from that same love.</p>
              <p>We specialize in high-quality t-shirts featuring iconic anime series like Solo Leveling, Dragon Ball Z, and Demon Slayer — every design carefully crafted and printed on premium cotton.</p>
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
              { icon: Package, title: "14-Day Return Policy", desc: "Damaged item? Full refund with unboxing video proof. Wrong size or color? Free exchange within 14 days. No refunds for non-damaged items or change of mind." },
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
                  {["Delivery: 5-7 business days", "Ships across India", "Free shipping on orders above ₹999"].map((m) => (
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
