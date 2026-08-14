"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail, Twitter, ArrowRight, Eye } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  { href: "https://github.com/Tadesse103",  label: "GitHub",   icon: Github   },
  { href: "https://linkedin.com",            label: "LinkedIn", icon: Linkedin },
  { href: "https://twitter.com",             label: "Twitter",  icon: Twitter  },
  { href: "mailto:tadessebirara7@gmail.com", label: "Email",    icon: Mail     },
];

/* simple fade-up variants */
const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 28 },
  animate:   { opacity: 1, y: 0  },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-6 pt-20 pb-20 sm:pt-24 sm:pb-24 lg:px-10 lg:pt-28 lg:pb-32"
    >
      {/* ── Section glow overlay ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at 50% -5%, rgba(37,99,235,0.22) 0%, transparent 65%)",
            "radial-gradient(ellipse 55% 45% at 80% 20%, rgba(79,70,229,0.14) 0%, transparent 55%)",
          ].join(","),
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-10 md:gap-12 lg:grid-cols-[1fr_320px] lg:gap-14">

        {/* ════════════════════════════
            LEFT — text content
        ════════════════════════════ */}
        <div className="flex flex-col gap-6 lg:gap-7">

          {/* greeting badge */}
          <motion.div {...fadeUp(0.05)}>
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
              style={{
                background: "rgba(37,99,235,0.12)",
                border:     "1px solid rgba(37,99,235,0.30)",
                color:      "#93c5fd",
              }}
            >
              {/* small pulsing dot */}
              <span
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ background: "var(--accent-cyan)" }}
              />
              Hello, I`m Tadesse Birara
            </span>
          </motion.div>

          {/* main heading */}
          <motion.div {...fadeUp(0.15)} className="space-y-1">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              Building Digital Solutions
            </h1>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-[3.4rem]">
              with{" "}
              <span className="text-gradient-brand">Tadesse Birara</span>
            </h1>
          </motion.div>

          {/* sub-text */}
          <motion.p
            {...fadeUp(0.25)}
            className="max-w-xl text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            I build modern, scalable and user-focused web applications that
            help businesses grow, automate and succeed in the digital world.
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.35)} className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#contact"
              className="btn-gradient inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold text-white shadow-lg"
            >
              Hire Me
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#projects"
              className="btn-outline-accent inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold text-white"
            >
              <Eye className="h-4 w-4" />
              View Projects
            </a>
          </motion.div>

          {/* social links */}
          <motion.div
            {...fadeUp(0.45)}
            className="flex flex-wrap items-center gap-2"
          >
            <span
              className="mr-1 text-xs font-medium uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              Connect with me
            </span>
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border:     "1px solid rgba(255,255,255,0.10)",
                  color:      "var(--text-secondary)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color       = "var(--accent-cyan)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.45)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color       = "var(--text-secondary)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.10)";
                }}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* ════════════════════════════
            RIGHT — profile image
        ════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          {/* outer glow ring */}
          <div
            aria-hidden
            className="glow-ring absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(ellipse at center, rgba(37,99,235,0.20) 0%, rgba(79,70,229,0.10) 40%, transparent 70%)",
              filter: "blur(24px)",
            }}
          />

          {/* decorative dashed ring */}
          <div
            aria-hidden
            className="absolute rounded-full"
            style={{
              inset: "-12px",
              border: "1px dashed rgba(37,99,235,0.28)",
              borderRadius: "50%",
            }}
          />

          {/* profile image container */}
          <div
            className="relative z-10 overflow-hidden rounded-full"
            style={{
              width: 280,
              height: 280,
              border: "3px solid rgba(37,99,235,0.50)",
              boxShadow: [
                "0 0 0 5px rgba(37,99,235,0.10)",
                "0 0 40px rgba(37,99,235,0.28)",
                "0 0 80px rgba(79,70,229,0.16)",
              ].join(", "),
              background: "#ffffff",
            }}
          >
            {/* Profile photo */}
            <Image
              src="/profile.jpg"
              alt="Tadesse Birara — Full-Stack JavaScript Developer"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 220px, 280px"
              priority
            />

            {/* Bottom fade — blends photo edge into the dark background */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/4"
              style={{
                background:
                  "linear-gradient(to top, rgba(2,6,23,0.55) 0%, transparent 100%)",
              }}
            />
          </div>

          {/* floating mini brand card */}
          <div
            className="float-card absolute -bottom-4 -right-4 z-20 flex items-center gap-3 rounded-xl px-4 py-3 sm:-right-2 lg:-right-6"
            style={{
              background: "rgba(15,23,42,0.90)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(37,99,235,0.25)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.40)",
            }}
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-white shrink-0"
              style={{ background: "var(--gradient-brand)" }}
            >
              TB
            </span>
            <div>
              <p className="text-xs font-semibold text-white leading-tight">Tadesse Birara</p>
              <p className="text-[10px] leading-tight" style={{ color: "var(--text-secondary)" }}>
                In the future, we build smarter<br />solutions for a better tomorrow.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
