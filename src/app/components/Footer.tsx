import { motion } from "motion/react";
import { Twitter, Instagram, Youtube, Facebook } from "lucide-react";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Footer() {
  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ];

  const footerLinks: Record<string, { label: string; section: string }[]> = {
    Shop: [
      { label: "T-Shirts", section: "shop" },
      { label: "New Arrivals", section: "shop" },
      { label: "Collections", section: "shop" },
    ],
    Company: [
      { label: "About Us", section: "about" },
      { label: "Our Policies", section: "policies" },
      { label: "Payment Methods", section: "reviews" },
    ],
    Support: [
      { label: "Contact Us", section: "support" },
      { label: "FAQs", section: "support" },
      { label: "Returns & Exchange", section: "policies" },
    ],
  };

  return (
    <footer className="bg-black text-white py-20 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-4xl font-black mb-6 tracking-tighter">ASTEYA</h3>
            <p className="text-gray-400 mb-8 leading-relaxed max-w-md">
              Premium anime t-shirts for fans who love Solo Leveling, Dragon Ball Z, Demon Slayer, and more.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white hover:text-black transition-colors flex items-center justify-center border border-white/10"
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
              <h4 className="font-bold mb-6 text-lg">{category}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.section)}
                      className="text-gray-400 hover:text-white transition-colors text-left"
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
          <p className="text-gray-500 text-sm">© 2026 ASTEYA. All rights reserved.</p>
          <div className="flex gap-8 text-sm">
            <button onClick={() => scrollTo("policies")} className="text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => scrollTo("policies")} className="text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
