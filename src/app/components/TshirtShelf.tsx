import { motion } from "motion/react";
import { ProductCard } from "./ProductCard";

interface TshirtShelfProps {
  products: any[];
  title?: string;
  subtitle?: string;
  onBuyNow?: (product: any, size: string) => void;
}

export function TshirtShelf({ products, title = "Anime Collection Shelf", subtitle = "Featured Anime Collection", onBuyNow }: TshirtShelfProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center sm:text-left">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-2"
          >
            {subtitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            {title}
          </motion.h2>
        </div>

        {/* Shelf Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <ProductCard
              key={product._id || product.id || idx}
              {...product}
              index={idx}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
