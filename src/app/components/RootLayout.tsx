import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { GlowingCursor } from "./GlowingCursor";
import { ScrollingTshirt } from "./ScrollingTshirt";
import { SetupBanner } from "./SetupBanner";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function RootLayout() {
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsDesktop(!isTouchDevice);
  }, []);

  return (
    <div className={`relative min-h-screen bg-black text-white overflow-x-hidden ${isDesktop ? 'cursor-none' : ''}`}>
      <SetupBanner />
      <GlowingCursor />
      <ScrollingTshirt />
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}