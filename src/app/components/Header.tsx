import { Link, useLocation, useNavigate } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "figma:asset/ee488f8ea6fc6504e921786a580af77a5035691f.png";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAdminPage = location.pathname.startsWith("/admin");

  const navLinks = [
    { label: "Home", section: "hero" },
    { label: "Shop", section: "shop" },
    { label: "About", section: "about" },
    { label: "Policies", section: "policies" },
    { label: "Support", section: "support" },
  ];

  function handleNavClick(section: string) {
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(section), 350);
    } else {
      scrollToSection(section);
    }
  }

  const bgClass = isScrolled || isAdminPage
    ? "bg-black/95 backdrop-blur-md shadow-lg"
    : "bg-transparent";

  return (
    <motion.header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 ${bgClass}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-5">

          {/* Logo */}
          <button onClick={() => handleNavClick("hero")} className="focus:outline-none">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
              <img src={logo} alt="ASTEYA" className="h-12 w-auto" />
            </motion.div>
          </button>

          {/* Desktop Nav */}
          {!isAdminPage && (
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <motion.button
                  key={link.section}
                  onClick={() => handleNavClick(link.section)}
                  whileHover={{ y: -2 }}
                  className="text-base font-medium text-white hover:text-gray-300 transition-colors tracking-wide focus:outline-none"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          )}

          {/* Right Icons */}
          {!isAdminPage && (
            <div className="hidden md:flex items-center gap-6">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-white">
                <Search size={22} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative text-white">
                <ShoppingBag size={22} />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-black text-xs rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </motion.button>
            </div>
          )}

          {isAdminPage && (
            <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              ← Back to Store
            </Link>
          )}

          {/* Mobile Toggle */}
          {!isAdminPage && (
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {!isAdminPage && mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-6 border-t border-white/10 pt-4"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <button
                  key={link.section}
                  onClick={() => handleNavClick(link.section)}
                  className="text-xl font-medium text-white text-left hover:text-gray-300 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}
