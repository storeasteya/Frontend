import { motion } from "motion/react";
import { ShoppingCart, Zap, Star, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../lib/cartContext";
import { useNavigate } from "react-router";

export interface ProductCardProps {
  _id?: string;
  id?: string;
  image_url?: string;
  image?: string;
  name?: string;
  title?: string;
  price: number;
  rating?: number;
  anime_series?: string;
  category?: string;
  sizes?: string[];
  index?: number;
  onBuyNow?: (product: any, size: string) => void;
}

export function ProductCard(props: ProductCardProps) {
  const { addToCart, buyNow } = useCart();
  const navigate = useNavigate();

  const productId = props._id || props.id || 'prod-' + Math.random().toString(36).substring(2, 9);
  const title = props.name || props.title || 'Anime Graphic Tee';
  const imageUrl = props.image_url || props.image || 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80';
  const category = props.anime_series || props.category || 'Anime Collection';
  const rating = props.rating || 5;
  const sizes = props.sizes && props.sizes.length > 0 ? props.sizes : ['S', 'M', 'L', 'XL', 'XXL'];

  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || 'M');
  const [added, setAdded] = useState(false);

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
    addToCart({ _id: productId, name: title, price: props.price, image_url: imageUrl, anime_series: category }, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (props.onBuyNow) {
      props.onBuyNow({ _id: productId, name: title, price: props.price, image_url: imageUrl, anime_series: category }, selectedSize);
    } else {
      buyNow({ _id: productId, name: title, price: props.price, image_url: imageUrl, anime_series: category }, selectedSize, navigate);
    }
  };

  return (
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
      className="group relative bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between shadow-xl"
    >
      {/* Anime Series Badge */}
      <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-black/70 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-white tracking-wide">
        {category}
      </div>

      {/* Product Image */}
      <div className="relative h-64 sm:h-72 overflow-hidden bg-black/40">
        <motion.img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
      </div>

      {/* Details & Actions */}
      <div className="p-5 flex-1 flex flex-col justify-between relative z-10">
        <div>
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors">
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
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                    selectedSize === sz
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

        {/* Price & Action Buttons */}
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-2xl font-black text-white">
              ₹{props.price}
            </span>
            <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              In Stock
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border transition-all ${
                added
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
              className="py-2.5 px-3 bg-white text-black hover:bg-gray-200 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg transition-all"
            >
              <Zap size={16} className="fill-black" />
              Buy Now
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}