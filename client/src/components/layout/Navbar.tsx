import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect scroll to adjust the capsule's position and shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 
        Outer wrapper to manage fixed positioning and dynamic top padding.
        This allows the capsule to "shrink" towards the top when scrolling.
      */}
      <div
        className={`fixed left-0 right-0 z-50 w-full transition-all duration-500 px-4 sm:px-6 lg:px-8 ${
          isScrolled ? "top-2 md:top-4" : "top-4 md:top-6"
        }`}
      >
        {/* FLOATING GLASS CAPSULE */}
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`max-w-5xl mx-auto flex items-center justify-between rounded-full transition-all duration-500 ${
            isScrolled
              ? "bg-[#0D1322]/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)] px-4 py-2.5"
              : "bg-[#0D1322]/70 backdrop-blur-lg border border-white/[0.08] shadow-2xl px-5 py-3 md:py-3.5"
          }`}
        >
          {/* 1. BRAND LOGO */}
          <a
            href="#"
            className="relative z-10 flex items-center gap-1.5 group shrink-0"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-shadow">
              T
            </div>
            <span className="text-lg font-bold text-white tracking-tight hidden sm:block ml-1">
              Tadesse.
            </span>
          </a>

          {/* 2. DESKTOP NAVIGATION LINKS */}
          <div className="hidden md:flex items-center justify-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-all duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* 3. HIGH-VISIBILITY CTA BUTTON */}
          <div className="hidden md:flex items-center shrink-0">
            <a
              href="#contact"
              className="group flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* 4. MOBILE MENU HAMBURGER */}
          <div className="md:hidden flex items-center shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-white/[0.05] border border-white/10 text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </motion.nav>

        {/* 5. MOBILE DROPDOWN MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden absolute top-full left-4 right-4 mt-3 max-w-md mx-auto bg-[#0D1322]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-3 flex flex-col gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-5 py-4 text-base font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-2xl transition-all"
                  >
                    {item.name}
                  </a>
                ))}

                <div className="p-2 mt-2 border-t border-white/10">
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full gap-2 px-5 py-4 text-sm font-semibold text-white bg-blue-600 rounded-2xl hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-colors"
                  >
                    <span>Let's Talk</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;
