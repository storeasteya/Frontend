import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";
import { fetchProducts as apiFetchProducts } from "../../lib/api";
import { SEO } from "../components/SEO";
import { ProductCard } from "../components/ProductCard";

const SITE_URL = "https://storeasteya.vercel.app/";

const FALLBACK_PRODUCTS = [
  {
    id: "prod-1",
    name: "Mecha 01 — Knitted Evangelion Tee",
    description: "Neo Tokyo Evangelion Unit-01 purple & green mecha techwear silhouette tee.",
    image_url: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80",
    secondary_image_url: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    anime_series: "Neon Genesis",
  },
  {
    id: "prod-2",
    name: "The Disgraced One Oversized Cotton T-shirt",
    description: "King of Curses demonic flame seal back-print on heavyweight cotton base.",
    image_url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80",
    secondary_image_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    sizes: ["M", "L", "XL", "XXL"],
    anime_series: "Jujutsu Kaisen",
  },
  {
    id: "prod-3",
    name: "Passione Golden Wind Flame T-shirt",
    description: "Stand arrow crimson tactical back print with premium street drape.",
    image_url: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&auto=format&fit=crop&q=80",
    secondary_image_url: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L", "XL"],
    anime_series: "JoJo Bizarre",
  },
  {
    id: "prod-4",
    name: "Mecha 02 — Berserk Eva Heavyweight",
    description: "Red flame tactical oversized fit with bio-washed combed cotton durability.",
    image_url: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&auto=format&fit=crop&q=80",
    secondary_image_url: "https://images.unsplash.com/photo-1583744946571-700bb11eb5a7?w=800&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    anime_series: "Berserk",
  },
  {
    id: "prod-5",
    name: "Goku Super Saiyan Aura Edition",
    description: "Premium heavyweight 240 GSM ringspun cotton apparel with high-density Goku aura print.",
    image_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    secondary_image_url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    anime_series: "Dragon Ball Z",
  },
  {
    id: "prod-6",
    name: "Solo Leveling Shadow Monarch Edition",
    description: "Dark-mode aesthetic apparel displaying Sung Jinwoo shadow army extraction artwork.",
    image_url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80",
    secondary_image_url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80",
    sizes: ["M", "L", "XL", "XXL"],
    anime_series: "Solo Leveling",
  },
  {
    id: "prod-7",
    name: "Akatsuki Red Cloud Oversized Edition",
    description: "Iconic Naruto Akatsuki red clouds embroidered on ultra-soft black heavyweight cotton.",
    image_url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80",
    secondary_image_url: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L", "XL"],
    anime_series: "Naruto",
  },
  {
    id: "prod-8",
    name: "Gojo Infinite Void Graphic Edition",
    description: "Jujutsu Kaisen Gojo Satoru domain expansion glowing eye graphic design.",
    image_url: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=80",
    secondary_image_url: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L", "XL"],
    anime_series: "Jujutsu Kaisen",
  },
].map((p) => ({ ...p, _id: p.id, price: 599, cross_price: 999, original_price: 999, category: "anime", featured: true, in_stock: true }));

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ASTEYA",
  url: SITE_URL,
  logo: `${SITE_URL}logo.png`,
  description:
    "India's premier brand for 240 GSM heavyweight ringspun cotton oversized anime t-shirts and streetwear apparel.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9685982012",
    contactType: "Customer Service",
    email: "deepankraghuwanshi1@gmail.com",
    areaServed: "IN",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }],
};

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await apiFetchProducts();
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
        return;
      }
    } catch (e) {
      // fall through to Supabase
    }

    try {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("in_stock", true)
        .limit(8);
      setProducts(data && data.length > 0 ? data : FALLBACK_PRODUCTS);
    } catch (e) {
      setProducts(FALLBACK_PRODUCTS);
    }
  }

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      <SEO
        title="ASTEYA | Premium Anime T-Shirts & Streetwear India"
        description="Shop ASTEYA anime t-shirts in India. Premium 240 GSM heavyweight ringspun cotton oversized anime tees featuring Solo Leveling, DBZ & Demon Slayer."
        keywords="anime t-shirts India, premium anime apparel, ASTEYA anime streetwear, oversized anime tees, 240 GSM heavyweight anime t-shirt"
        canonicalUrl={SITE_URL}
        jsonLd={[organizationJsonLd, breadcrumbJsonLd]}
      />

      {/* ─── HERO VIDEO SECTION ─── */}
      <section id="hero" className="relative w-full bg-black overflow-hidden pt-16 sm:pt-20">
        <div className="relative w-full aspect-video md:aspect-[21/9] lg:min-h-[85vh] xl:min-h-[90vh] max-h-[92vh] flex items-center justify-center bg-black overflow-hidden">
          <video
            src="/assets/ASTEYA_Winter26_Intro.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center pointer-events-none"
          >
            <source src="/assets/ASTEYA_Winter26_Intro.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* ─── LOOKBOOK BANNER ─── */}
      <section className="w-full border-t border-white/10 bg-black">
        <button
          onClick={() => navigate("/shop")}
          aria-label="Shop the collection"
          className="block w-full cursor-pointer"
        >
          <img
            src="/assets/banner 2.png"
            alt="ASTEYA anime streetwear lookbook"
            loading="lazy"
            className="block w-full h-auto"
          />
        </button>
      </section>

      {/* ─── NEW ARRIVALS ─── */}
      <section id="shop" className="py-16 bg-black border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight font-display">
              New Arrival
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {products.slice(0, 8).map((product, index) => (
              <ProductCard
                key={product.id || product._id || index}
                index={index}
                {...product}
              />
            ))}
          </div>

          <div className="text-center mt-16 pt-8 border-t border-white/10">
            <button
              onClick={() => navigate("/shop")}
              className="px-10 py-4 bg-white text-black font-black text-sm uppercase tracking-wider rounded-full hover:bg-gray-200 active:scale-95 transition-all shadow-2xl inline-flex items-center gap-2"
            >
              Explore Complete Anime Catalog <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}