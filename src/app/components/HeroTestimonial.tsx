import { Star } from "lucide-react";
import { motion } from "motion/react";

export interface HeroTestimonialProps {
  name?: string;
  role?: string;
  text?: string;
  rating?: number;
  avatar?: string;
}

/**
 * EDITABLE HERO CUSTOMER REVIEW COMPONENT
 * Easily edit default props here or pass new data from Home.tsx to update your hero review.
 */
export function HeroTestimonial({
  name = "Rahul V.",
  role = "Verified Buyer • Solo Leveling Edition",
  text = "Amazing quality and ultra-fast shipping! The 240 GSM heavyweight cotton and oversized fit are incredible.",
  rating = 5,
  avatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
}: HeroTestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="p-4 sm:p-5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 shadow-2xl text-left max-w-sm sm:max-w-md hover:border-cyan-400/40 transition-all"
    >
      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}
          />
        ))}
        <span className="text-xs text-cyan-400 font-bold ml-1.5 font-mono">5.0 / 5.0</span>
      </div>

      <p className="text-xs sm:text-sm text-gray-200 italic mb-3 leading-relaxed">
        "{text}"
      </p>

      <div className="flex items-center gap-3">
        {avatar && (
          <img
            src={avatar}
            alt={name}
            className="w-8 h-8 rounded-full object-cover border border-cyan-400/50"
          />
        )}
        <div>
          <h4 className="text-xs font-bold text-white">{name}</h4>
          <span className="text-[10px] text-gray-400 block">{role}</span>
        </div>
      </div>
    </motion.div>
  );
}
