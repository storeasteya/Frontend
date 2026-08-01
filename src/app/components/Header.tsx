import { Link, useLocation, useNavigate } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { ShoppingBag, Search, Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../../lib/cartContext";
import { useAuth } from "../../lib/authContext";
import logo from "figma:asset/ee488f8ea6fc6504e921786a580af77a5035691f.png";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, toastMessage } = useCart();
  const { user, openAuthModal, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
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
      {toastMessage && (
        <div className="bg-emerald-500 text-black text-center text-xs font-bold py-1.5 px-4 animate-bounce">
          {toastMessage}
        </div>
      )}
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
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
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
            <div className="flex items-center gap-4 lg:gap-6">
              <motion.button
                onClick={() => navigate('/cart')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative text-white p-2"
                title="View Cart"
              >
                <ShoppingBag size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-black text-xs rounded-full flex items-center justify-center font-black animate-pulse">
                    {cartCount}
                  </span>
                )}
              </motion.button>

              {/* User Authentication Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 p-1.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-full transition-colors"
                  >
                    {user.picture ? (
                      <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-cyan-400" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-xs text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="hidden sm:inline text-xs font-semibold text-white max-w-[100px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 p-2 bg-gradient-to-b from-gray-900 to-black border border-white/15 rounded-2xl shadow-2xl z-50">
                      <div className="px-3 py-2 border-b border-white/10">
                        <p className="text-sm font-bold text-white truncate">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => { setUserDropdownOpen(false); navigate('/cart'); }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors flex items-center gap-2 mt-1"
                      >
                        <ShoppingBag size={14} /> My Cart & Checkout
                      </button>
                      <button
                        onClick={() => { setUserDropdownOpen(false); logout(); }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-xl transition-colors flex items-center gap-2 mt-1"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openAuthModal}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold rounded-full text-xs shadow-lg hover:brightness-110 transition-all"
                >
                  <User size={14} />
                  <span>Sign In</span>
                </motion.button>
              )}
            </div>
          )}

          {isAdminPage && (
            <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              ← Back to Store
            </Link>
          )}

          {/* Mobile Toggle */}
          {!isAdminPage && (
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-white p-2">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </div>

        {/* Mobile / Tablet Menu */}
        {!isAdminPage && mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden pb-6 border-t border-white/10 pt-4 bg-black/95 rounded-b-2xl px-4"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.section}
                  onClick={() => handleNavClick(link.section)}
                  className="text-lg font-semibold text-white text-left hover:text-gray-300 transition-colors py-2 px-3 rounded-lg hover:bg-white/10"
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
