import { motion } from "motion/react";
import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-black text-white flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 text-center max-w-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="text-8xl sm:text-9xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 tracking-tighter">
            404
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-display">
            Dimension Not Found
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            The page or anime drop you're searching for has entered another realm or does not exist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/"
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center justify-center gap-2 text-sm shadow-xl min-h-[44px]"
            >
              <Home size={18} />
              Return Home
            </Link>
            <Link
              to="/cart"
              className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2 text-sm min-h-[44px]"
            >
              <ArrowLeft size={18} />
              View Cart
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
