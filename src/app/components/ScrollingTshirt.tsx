import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { supabase, type ScrollingAnimation } from "../../lib/supabase";

export function ScrollingTshirt() {
  const [animation, setAnimation] = useState<ScrollingAnimation | null>(null);
  const { scrollY } = useScroll();

  // Transform scroll position to movement
  const y = useTransform(scrollY, [0, 3000], [0, -500]);
  const rotate = useTransform(scrollY, [0, 3000], [0, 360]);
  const scale = useTransform(scrollY, [0, 1000, 2000, 3000], [1, 1.2, 0.8, 1]);
  const x = useTransform(scrollY, [0, 1500, 3000], [-100, 50, -100]);

  useEffect(() => {
    fetchAnimation();
  }, []);

  async function fetchAnimation() {
    const { data } = await supabase
      .from('scrolling_animations')
      .select('*')
      .eq('is_active', true)
      .single();

    if (data) setAnimation(data);
  }

  if (!animation) return null;

  return (
    <motion.div
      style={{ y, rotate, scale, x }}
      className="fixed right-0 top-1/4 z-40 pointer-events-none mix-blend-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 1 }}
    >
      {animation.animation_type === 'video' && animation.video_url ? (
        <video
          src={animation.video_url}
          autoPlay
          loop
          muted
          playsInline
          className="w-64 h-64 md:w-96 md:h-96 object-contain drop-shadow-2xl"
        />
      ) : animation.image_url ? (
        <motion.img
          src={animation.image_url}
          alt="T-shirt animation"
          className="w-64 h-64 md:w-96 md:h-96 object-contain drop-shadow-2xl"
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ) : null}
    </motion.div>
  );
}
