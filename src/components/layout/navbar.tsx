"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#home",     label: "Home" },
  { href: "#about",    label: "About" },
  { href: "#skills",   label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#contact",  label: "Contact" },
];

export function Navbar() {
  const [open, setOpen]           = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [active, setActive]       = useState("home");

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* active section tracker */
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(2,6,23,0.92)] shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
          : "bg-[rgba(2,6,23,0.70)] backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">

        {/* ── Logo ── */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="Tadesse Birara – home"
        >
          {/* Icon mark */}
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white shrink-0"
            style={{ background: "var(--gradient-brand)" }}
          >
            TB
          </span>
          {/* Brand text */}
          <span className="hidden sm:block">
            <span className="block text-[15px] font-bold leading-tight text-white tracking-wide">
              Tadesse Birara
            </span>
            <span className="block text-[10px] font-medium leading-tight" style={{ color: "var(--text-secondary)" }}>
              Building the future with code
            </span>
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => {
            const isActive = active === href.replace("#", "");
            return (
              <a
                key={href}
                href={href}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                {label}
              </a>
            );
          })}
        </nav>

        {/* ── Download CV button ── */}
        <a
          href="/public/projects/My_Resume.pdf"
          download
          className="hidden md:inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
          style={{ background: "var(--gradient-brand)" }}
        >
          <Download className="h-4 w-4" />
          Download CV
        </a>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden flex items-center justify-center h-10 w-10 rounded-lg text-slate-300 hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.05)" }}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden md:hidden"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(2,6,23,0.97)" }}
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map(({ href, label }) => {
                const isActive = active === href.replace("#", "");
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`nav-link py-2.5 ${isActive ? "active" : ""}`}
                  >
                    {label}
                  </a>
                );
              })}
              <a
                href="/Tadesse-Birara-Resume.pdf"
                download
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
                style={{ background: "var(--gradient-brand)" }}
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
