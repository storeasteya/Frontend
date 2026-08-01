import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, AlertCircle, ExternalLink } from "lucide-react";

export function SetupBanner() {
  const [dismissed, setDismissed] = useState(false);

  // Check if using placeholder credentials
  const isPlaceholder = import.meta.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co' ||
                        !import.meta.env.VITE_SUPABASE_URL;

  if (!isPlaceholder || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4 shadow-2xl"
      >
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <AlertCircle size={24} className="flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg">⚠️ Supabase Not Configured</h3>
              <p className="text-sm opacity-90">
                Set up your Supabase project to enable products, reviews, and admin features.
                <a
                  href="https://supabase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 underline font-semibold inline-flex items-center gap-1 hover:opacity-80"
                >
                  Get Started
                  <ExternalLink size={14} />
                </a>
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDismissed(true)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={20} />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
