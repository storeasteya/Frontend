import { motion } from "motion/react";
import { Twitter, Instagram, Youtube, Facebook } from "lucide-react";
import { useNavigate } from "react-router";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Footer() {
  const navigate = useNavigate();
  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ];

  const footerLinks: Record<string, { label: string; path?: string; section?: string }[]> = {
    Shop: [
      { label: "Anime Collection", section: "shop" },
      { label: "New Arrivals", section: "shop" },
      { label: "Featured Drops", section: "shop" },
    ],
    Company: [
      { label: "About Us", path: "/about" },
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms of Service", path: "/terms" },
    ],
    Support: [
      { label: "Track Order & Live Tracking", path: "/track" },
      { label: "Contact Us", path: "/contact" },
      { label: "7 Days Return Policy", path: "/shipping-policy" },
      { label: "3-5 Days Delivery Info", path: "/shipping-policy" },
    ],
  };

  return (
    <footer className="bg-black text-white py-20 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-4xl font-black font-display mb-6 tracking-tighter glass-heading">ASTEYA</h3>
            <p className="text-gray-400 mb-8 leading-relaxed max-w-md text-sm sm:text-base">
              Heavyweight anime graphic collection. 3-5 Days Express Delivery with 7 Days Easy Returns &amp; Exchange.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white hover:text-black transition-colors flex items-center justify-center border border-white/10 min-h-[44px] min-w-[44px]"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold font-display mb-6 text-lg">{category}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => {
                        if (link.path) {
                          navigate(link.path);
                        } else if (link.section) {
                          if (window.location.pathname !== "/") {
                            navigate("/");
                            setTimeout(() => scrollTo(link.section!), 300);
                          } else {
                            scrollTo(link.section);
                          }
                        }
                      }}
                      className="text-gray-400 hover:text-white transition-colors text-left text-sm py-1"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1">
            <p
              onClick={() => {
                if ((window as any).__adminClickCount = ((window as any).__adminClickCount || 0) + 1) {
                  if ((window as any).__adminClickCount >= 3) {
                    (window as any).__adminClickCount = 0;
                    navigate('/admin-login');
                  }
                  setTimeout(() => { (window as any).__adminClickCount = 0; }, 2000);
                }
              }}
              className="text-gray-500 text-xs sm:text-sm cursor-default select-none hover:text-gray-400 transition-colors"
              title="ASTEYA"
            >
              © 2026 ASTEYA. All rights reserved.
            </p>
            <button
              onClick={() => navigate('/admin-login')}
              className="text-gray-950 hover:text-gray-700 text-xs px-1 focus:outline-none transition-colors"
              aria-label="Admin Access"
              title="Admin Portal"
            >
              •
            </button>
          </div>

          <div className="flex flex-wrap gap-6 text-xs sm:text-sm">
            <button onClick={() => navigate("/privacy")} className="text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navigate("/terms")} className="text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </button>
            <button onClick={() => navigate("/shipping-policy")} className="text-gray-500 hover:text-white transition-colors">
              Refund &amp; Shipping
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
