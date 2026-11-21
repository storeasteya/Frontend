import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Zap, Star, Check, Maximize2, X, Truck, RotateCcw, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../../lib/cartContext";
import { useNavigate } from "react-router";

export interface ProductCardProps {
  _id?: string;
  id?: string;
  image_url?: string;
  secondary_image_url?: string;
  images?: string[];
  image?: string;
  name?: string;
  title?: string;
  description?: string;
  price: number;
  cross_price?: number;
  original_price?: number;
  rating?: number;
  anime_series?: string;
  category?: string;
  sizes?: string[];
  index?: number;
  in_stock?: boolean;
  onBuyNow?: (product: any, size: string) => void;
}

export function ProductCard(props: ProductCardProps) {
  const { addToCart, buyNow } = useCart();
  const navigate = useNavigate();

  const productId = props._id || props.id || 'prod-' + Math.random().toString(36).substring(2, 9);
  const title = props.name || props.title || 'Anime Graphic Tee';
  const imageUrl = props.image_url || props.image || (props.images && props.images[0]) || 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80';
  const secondaryImageUrl = props.secondary_image_url || (props.images && props.images[1]) || '';
  const category = props.anime_series || props.category || 'Anime Collection';
  const rating = props.rating || 5;
  const sizes = props.sizes && props.sizes.length > 0 ? props.sizes : ['S', 'M', 'L', 'XL', 'XXL'];

  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || 'M');
  const [added, setAdded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  // Full gallery: front, back, then any extra images added in the admin panel.
  const gallery = Array.from(new Set([imageUrl, secondaryImageUrl, ...(props.images || [])].map(u => (u || '').trim()).filter(Boolean)));
  const [activeIndex, setActiveIndex] = useState(0);
  const openLightbox = (i = 0) => { setActiveIndex(i); setIsLightboxOpen(true); };
  const showPrev = () => setActiveIndex(i => (i - 1 + gallery.length) % gallery.length);
  const showNext = () => setActiveIndex(i => (i + 1) % gallery.length);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'ArrowRight') showNext();
      else if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [isLightboxOpen, gallery.length]);

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -6;
    const rotateYValue = ((x - centerX) / centerX) * 6;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      _id: productId,
      name: title,
      price: props.price,
      image_url: imageUrl,
      secondary_image_url: secondaryImageUrl,
      images: gallery,
      anime_series: category
    }, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    const productPayload = {
      _id: productId,
      name: title,
      price: props.price,
      image_url: imageUrl,
      secondary_image_url: secondaryImageUrl,
      images: gallery,
      anime_series: category
    };
    if (props.onBuyNow) {
      props.onBuyNow(productPayload, selectedSize);
    } else {
      buyNow(productPayload, selectedSize, navigate);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4, delay: (props.index || 0) * 0.05 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.1s ease-out",
        }}
        className="group relative bg-transparent rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between shadow-xl backdrop-blur-sm"
      >
        {/* Anime Series Badge */}
        <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-black/70 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-white tracking-wide">
          {category}
        </div>

        {/* Product Image Frame (Hover 2-Image Crossfade) */}
        <div
          onClick={() => openLightbox(0)}
          className="relative h-64 sm:h-72 overflow-hidden bg-transparent cursor-pointer flex items-center justify-center p-4 group/img"
        >
          {/* Front / Primary Image */}
          <img
            src={imageUrl}
            alt={`${title} — ${category} front view — ASTEYA`}
            className={`w-full h-full object-contain mix-blend-lighten transition-all duration-500 filter drop-shadow-[0_10px_20px_rgba(255,255,255,0.15)] ${secondaryImageUrl ? 'group-hover:opacity-0 group-hover:scale-95' : 'group-hover:scale-105'
              }`}
          />

          {/* Back / Secondary Image (Smooth Fade-in on Hover) */}
          {secondaryImageUrl && (
            <img
              src={secondaryImageUrl}
              alt={`${title} — ${category} back view — ASTEYA`}
              className="absolute inset-0 w-full h-full object-contain mix-blend-lighten opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 p-4 filter drop-shadow-[0_10px_20px_rgba(255,255,255,0.15)]"
            />
          )}

          {/* Photo count / Dual-View Indicator Pill */}
          {gallery.length > 2 ? (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 bg-black/70 border border-white/20 rounded text-[10px] font-mono uppercase tracking-wider text-white opacity-80 group-hover:opacity-100 transition-opacity">
              <Images size={11} /> {gallery.length} Photos
            </div>
          ) : secondaryImageUrl && (
            <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 border border-white/20 rounded text-[10px] font-mono uppercase tracking-wider text-white opacity-60 group-hover:opacity-100 transition-opacity">
              Hover 2-View
            </div>
          )}

          <button
            onClick={(e) => { e.stopPropagation(); openLightbox(0); }}
            className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-white hover:text-black rounded-full border border-white/20 text-white transition-all opacity-0 group-hover:opacity-100 z-20"
            title="Expand Full View"
          >
            <Maximize2 size={14} />
          </button>
        </div>

        {/* Details & Actions */}
        <div className="p-5 flex-1 flex flex-col justify-between relative z-10">
          <div>
            <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-gray-200 transition-colors">
              {title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-700"}
                />
              ))}
              <span className="text-xs text-gray-400 ml-1.5 font-medium">({rating}.0)</span>
            </div>

            {/* Size Selector */}
            <div className="mb-4">
              <span className="text-xs font-medium text-gray-400 block mb-2">Select Size:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-h-[36px] min-w-[36px] px-3 py-1.5 text-xs font-bold rounded-lg border transition-all duration-200 ${selectedSize === sz
                      ? "bg-white text-black border-white shadow-md scale-105"
                      : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30 hover:bg-white/10"
                      }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Delivery & Policy Notes */}
          <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-white/10 pt-2 mb-3">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <Truck size={12} /> 7-12 Days Delivery
            </span>
            <span className="flex items-center gap-1 text-white font-medium">
              <RotateCcw size={12} /> 7 Days Return/Exchange
            </span>
          </div>

          {/* Price & Action Buttons */}
          <div>
            <div className="flex items-baseline gap-2.5 mb-4">
              <span className="text-2xl font-black text-white">
                ₹{props.price || 599}
              </span>
              <span className="text-sm text-gray-500 line-through font-semibold">
                ₹{props.cross_price || props.original_price || (props.price ? Math.round(props.price * 1.4) : 999)}
              </span>
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded ml-auto">
                {props.in_stock !== false ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className={`min-h-[44px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border transition-all duration-200 ${added
                  ? "bg-emerald-500 text-white border-emerald-400"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  }`}
              >
                {added ? <Check size={16} /> : <ShoppingCart size={16} />}
                {added ? "Added!" : "Add to Cart"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                className="min-h-[44px] py-2.5 px-3 bg-white text-black hover:bg-gray-200 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg transition-all duration-200"
              >
                <Zap size={16} className="fill-black" />
                Buy Now
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox / Full-size Image View Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${title} photos`}
              className="relative max-w-5xl w-full max-h-[92dvh] overflow-y-auto bg-gray-950 border border-white/20 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col md:flex-row md:items-start gap-6 md:gap-8"
            >
              <button
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 bg-white/10 hover:bg-white hover:text-black rounded-full transition-colors text-white z-20"
              >
                <X size={20} />
              </button>

              {/* Image Gallery */}
              <div className="w-full md:w-3/5 flex flex-col items-center">
                <div className="relative w-full aspect-square flex items-center justify-center bg-black/40 rounded-2xl overflow-hidden select-none">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={gallery[activeIndex]}
                      src={gallery[activeIndex]}
                      alt={`${title} — photo ${activeIndex + 1} of ${gallery.length}`}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      drag={gallery.length > 1 ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.4}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -60) showNext();
                        else if (info.offset.x > 60) showPrev();
                      }}
                      draggable={false}
                      className="max-h-full max-w-full object-contain p-2 cursor-grab active:cursor-grabbing filter drop-shadow-[0_20px_40px_rgba(255,255,255,0.2)]"
                    />
                  </AnimatePresence>

                  {gallery.length > 1 && (
                    <>
                      <button
                        onClick={showPrev}
                        aria-label="Previous photo"
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 bg-black/60 hover:bg-white hover:text-black text-white rounded-full border border-white/20 transition-colors"
                      >
                        <ChevronLeft size={22} />
                      </button>
                      <button
                        onClick={showNext}
                        aria-label="Next photo"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 bg-black/60 hover:bg-white hover:text-black text-white rounded-full border border-white/20 transition-colors"
                      >
                        <ChevronRight size={22} />
                      </button>
                      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-black/70 border border-white/20 rounded-full text-[11px] font-mono text-white">
                        {activeIndex + 1} / {gallery.length}
                      </span>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {gallery.length > 1 && (
                  <div className="w-full mt-3 flex gap-2 overflow-x-auto pb-1 snap-x">
                    {gallery.map((src, i) => (
                      <button
                        key={src}
                        onClick={() => setActiveIndex(i)}
                        aria-label={`Show photo ${i + 1}`}
                        aria-current={i === activeIndex}
                        className={`shrink-0 snap-start w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-black/60 border-2 transition-all ${i === activeIndex
                          ? "border-white opacity-100"
                          : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/40"
                          }`}
                      >
                        <img src={src} alt="" loading="lazy" className="w-full h-full object-contain p-1" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-full md:w-2/5 space-y-4 text-left md:pt-8">
                <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                  {category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">{title}</h2>
                <div className="text-3xl font-black text-white">₹{props.price}</div>
                {props.description && (
                  <p className="text-sm text-gray-400 leading-relaxed">{props.description}</p>
                )}

                {/* Size Selector */}
                <div>
                  <span className="text-xs font-medium text-gray-400 block mb-2">Select Size:</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`min-h-[40px] min-w-[40px] px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${selectedSize === sz
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30"
                          }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 py-3 border-y border-white/10 text-sm text-gray-300">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <Truck size={18} /> Estimated Delivery: 3-5 Business Days
                  </div>
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <RotateCcw size={18} /> Easy 7 Days Return &amp; Exchange Policy
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={(e) => { handleAddToCart(e); setIsLightboxOpen(false); }}
                    className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={(e) => { handleBuyNow(e); setIsLightboxOpen(false); }}
                    className="flex-1 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}