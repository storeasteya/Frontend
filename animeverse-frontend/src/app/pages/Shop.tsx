import { motion, AnimatePresence } from "motion/react";
import { Search, X, ArrowUpDown, Filter, Sparkles, RefreshCw, ShoppingBag } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { fetchProducts as apiFetchProducts } from "../../lib/api";
import { supabase, type Product } from "../../lib/supabase";
import { ProductCard } from "../components/ProductCard";
import { SEO } from "../components/SEO";
import heroImage from "figma:asset/ee488f8ea6fc6504e921786a580af77a5035691f.png";

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Filters & State
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get("category") || "All");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  useEffect(() => {
    loadProducts();
  }, []);

  // Sync state with URL params
  useEffect(() => {
    const params: Record<string, string> = {};
    if (searchQuery) params.search = searchQuery;
    if (selectedCategory !== "All") params.category = selectedCategory;
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedCategory]);

  async function loadProducts() {
    setLoading(true);
    try {
      const data = await apiFetchProducts();
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
        setLoading(false);
        return;
      }
    } catch (e) {
      console.warn("Failed to load products from API:", e);
    }

    try {
      const { data } = await supabase
        .from("products")
        .select("*")
        .order("display_order", { ascending: true });
      if (data && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(getFallbackProducts());
      }
    } catch (e) {
      setProducts(getFallbackProducts());
    } finally {
      setLoading(false);
    }
  }

  function getFallbackProducts(): Product[] {
    return [
      {
        id: "prod-1",
        _id: "prod-1",
        name: "Mecha 01 — Knitted Evangelion Tee",
        description: "Neo Tokyo Evangelion Unit-01 purple & green mecha techwear silhouette tee with 240 GSM heavy cotton drape.",
        price: 599,
        cross_price: 999,
        original_price: 999,
        image_url: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80",
        secondary_image_url: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800&auto=format&fit=crop&q=80",
        sizes: ["S", "M", "L", "XL", "XXL"],
        anime_series: "Neon Genesis",
        category: "anime",
        featured: true,
        in_stock: true,
        display_order: 1
      },
      {
        id: "prod-2",
        _id: "prod-2",
        name: "The Disgraced One Oversized Cotton T-shirt",
        description: "King of Curses demonic flame seal back-print on heavyweight 240 GSM combed cotton base.",
        price: 599,
        cross_price: 999,
        original_price: 999,
        image_url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80",
        secondary_image_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
        sizes: ["M", "L", "XL", "XXL"],
        anime_series: "Jujutsu Kaisen",
        category: "anime",
        featured: true,
        in_stock: true,
        display_order: 2
      },
      {
        id: "prod-3",
        _id: "prod-3",
        name: "Passione Golden Wind Flame T-shirt",
        description: "Stand arrow crimson tactical back print with premium drop-shoulder street drape.",
        price: 599,
        cross_price: 999,
        original_price: 999,
        image_url: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&auto=format&fit=crop&q=80",
        secondary_image_url: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=80",
        sizes: ["S", "M", "L", "XL"],
        anime_series: "JoJo Bizarre",
        category: "anime",
        featured: true,
        in_stock: true,
        display_order: 3
      },
      {
        id: "prod-4",
        _id: "prod-4",
        name: "Mecha 02 — Berserk Eva Heavyweight",
        description: "Red flame tactical oversized fit with bio-washed combed cotton durability and ribbed collar.",
        price: 599,
        cross_price: 999,
        original_price: 999,
        image_url: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&auto=format&fit=crop&q=80",
        secondary_image_url: "https://images.unsplash.com/photo-1583744946571-700bb11eb5a7?w=800&auto=format&fit=crop&q=80",
        sizes: ["S", "M", "L", "XL", "XXL"],
        anime_series: "Berserk",
        category: "anime",
        featured: true,
        in_stock: true,
        display_order: 4
      },
      {
        id: "prod-5",
        _id: "prod-5",
        name: "Goku Super Saiyan Aura Edition",
        description: "Premium heavyweight 240 GSM ringspun cotton apparel with high-density Goku aura print.",
        price: 599,
        cross_price: 999,
        original_price: 999,
        image_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
        secondary_image_url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80",
        sizes: ["S", "M", "L", "XL", "XXL"],
        anime_series: "Dragon Ball Z",
        category: "anime",
        featured: true,
        in_stock: true,
        display_order: 5
      },
      {
        id: "prod-6",
        _id: "prod-6",
        name: "Solo Leveling Shadow Monarch Edition",
        description: "Dark-mode aesthetic apparel displaying Sung Jinwoo shadow army extraction artwork.",
        price: 599,
        cross_price: 999,
        original_price: 999,
        image_url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80",
        secondary_image_url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80",
        sizes: ["M", "L", "XL", "XXL"],
        anime_series: "Solo Leveling",
        category: "anime",
        featured: true,
        in_stock: true,
        display_order: 6
      },
      {
        id: "prod-7",
        _id: "prod-7",
        name: "Akatsuki Red Cloud Oversized Edition",
        description: "Iconic Naruto Akatsuki red clouds embroidered on ultra-soft black heavyweight cotton.",
        price: 599,
        cross_price: 999,
        original_price: 999,
        image_url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80",
        secondary_image_url: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&auto=format&fit=crop&q=80",
        sizes: ["S", "M", "L", "XL"],
        anime_series: "Naruto",
        category: "anime",
        featured: true,
        in_stock: true,
        display_order: 7
      },
      {
        id: "prod-8",
        _id: "prod-8",
        name: "Gojo Infinite Void Graphic Edition",
        description: "Jujutsu Kaisen Gojo Satoru domain expansion glowing eye graphic design.",
        price: 599,
        cross_price: 999,
        original_price: 999,
        image_url: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=80",
        secondary_image_url: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&auto=format&fit=crop&q=80",
        sizes: ["S", "M", "L", "XL"],
        anime_series: "Jujutsu Kaisen",
        category: "anime",
        featured: true,
        in_stock: true,
        display_order: 8
      }
    ] as unknown as Product[];
  }

  // Dynamic series categories combining popular and loaded items
  const allCategories = useMemo(() => {
    const set = new Set<string>();
    [
      "Solo Leveling",
      "Dragon Ball Z",
      "Naruto",
      "Jujutsu Kaisen",
      "Demon Slayer",
      "Neon Genesis",
      "Berserk",
      "JoJo Bizarre",
      "Attack on Titan",
    ].forEach((s) => set.add(s));

    products.forEach((p) => {
      if (p.anime_series && typeof p.anime_series === "string" && p.anime_series.trim()) {
        set.add(p.anime_series.trim());
      }
    });

    return ["All", ...Array.from(set)];
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.anime_series?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All") {
      const catLower = selectedCategory.toLowerCase();
      result = result.filter(
        (p) =>
          p.anime_series?.toLowerCase().includes(catLower) ||
          p.category?.toLowerCase() === catLower ||
          p.name?.toLowerCase().includes(catLower)
      );
    }

    if (inStockOnly) {
      result = result.filter((p) => p.in_stock !== false);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, inStockOnly, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setInStockOnly(false);
    setSortBy("featured");
  };

  // Structured Data (ItemList Schema)
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Shop Anime T-Shirts Online India",
    "numberOfItems": filteredProducts.length,
    "itemListElement": filteredProducts.map((product, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.image_url,
        "brand": {
          "@type": "Brand",
          "name": "ASTEYA"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": product.price,
          "availability": product.in_stock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        }
      }
    }))
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
        "name": "Shop",
        "item": "https://storeasteya.vercel.app/shop"
      }
    ]
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-black text-white">
      <SEO
        title="Shop Anime T-Shirts Online India | ASTEYA Collection"
        description="Buy anime t-shirts online in India. Premium oversized anime graphic tees from Solo Leveling, Dragon Ball Z, Jujutsu Kaisen & Demon Slayer. 240 GSM cotton."
        keywords="buy anime t-shirts online India, Solo Leveling t-shirt, Dragon Ball Z t-shirt, Demon Slayer t-shirt, Jujutsu Kaisen t-shirt, anime graphic tees India, oversized anime t-shirt India"
        canonicalUrl="https://storeasteya.vercel.app/shop"
        jsonLd={[itemListJsonLd, breadcrumbJsonLd]}
      />

      {/* ─── SHOP CATALOG HEADER ─── */}
      <section className="relative py-10 mb-8 bg-gradient-to-b from-gray-950/90 via-black to-black border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-white mb-4">
              <Sparkles size={14} /> Official Shop Catalog
            </span>
            {/* Target H1 for SEO */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 font-display glass-heading">
              Shop Anime T-Shirts Online India
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
              Heavyweight 240 GSM pre-shrunk cotton anime graphic tees. Express 3-5 days delivery across India with 7 days easy exchanges.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CONTROLS & FILTER BAR ─── */}
      <div className="container mx-auto px-4 sm:px-6 mb-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4">
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search anime, character, or design..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-black/60 border border-white/15 rounded-2xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Desktop Controls */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              <button
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all flex items-center gap-2 min-h-[44px] ${
                  inStockOnly
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
                    : "bg-black/50 text-gray-400 border-white/15 hover:text-white"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${inStockOnly ? "bg-emerald-400 animate-pulse" : "bg-gray-500"}`} />
                In Stock Only
              </button>

              <div className="relative flex items-center gap-2 bg-black/60 border border-white/15 rounded-2xl px-4 py-2.5 min-h-[44px]">
                <ArrowUpDown size={14} className="text-white" />
                <span className="text-xs font-semibold text-gray-400">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer pr-2"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-gray-900 text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 min-h-[44px]"
                >
                  <RefreshCw size={14} /> Clear ({activeFiltersCount})
                </button>
              )}
            </div>
          </div>

          {/* Anime Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-white/10">
            <span className="text-xs font-semibold text-gray-400 mr-2 flex items-center gap-1 flex-shrink-0">
              <Filter size={14} className="text-white" /> Series:
            </span>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 min-h-[38px] ${
                  selectedCategory === cat
                    ? "bg-white text-black shadow-lg scale-105"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── PRODUCT COUNT BAR ─── */}
      <div className="container mx-auto px-4 sm:px-6 mb-6 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-400">
          Showing <span className="text-white font-bold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? "t-shirt" : "t-shirts"}
          {selectedCategory !== "All" && <span> in <span className="text-white font-bold">{selectedCategory}</span></span>}
        </p>

        {activeFiltersCount > 0 && (
          <span className="text-xs text-white bg-white/10 border border-white/20 px-3 py-1 rounded-full font-bold">
            {activeFiltersCount} Filter{activeFiltersCount > 1 ? "s" : ""} Applied
          </span>
        )}
      </div>

      {/* ─── PRODUCT GRID ─── */}
      <div className="container mx-auto px-4 sm:px-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 rounded-2xl bg-white/5 border border-white/10 animate-pulse p-6 flex flex-col justify-between">
                <div className="w-full h-48 bg-white/10 rounded-xl" />
                <div className="space-y-3">
                  <div className="h-5 bg-white/10 rounded w-3/4" />
                  <div className="h-4 bg-white/10 rounded w-1/2" />
                  <div className="h-10 bg-white/10 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id || product._id || index}
                  {...product}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl max-w-xl mx-auto p-8">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={36} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold font-display mb-2 text-white">No Products Found</h3>
            <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
              We couldn't find any anime t-shirts matching your search criteria. Try clearing your filters or search term.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-white text-black font-bold rounded-xl text-sm hover:bg-gray-200 transition-colors shadow-lg"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
