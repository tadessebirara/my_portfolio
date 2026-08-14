"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const navLinks = [
  { href: "#home",     label: "Home"     },
  { href: "#about",    label: "About"    },
  { href: "#skills",   label: "Skills"   },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#contact",  label: "Contact"  },
];

const socialLinks = [
  { href: "https://github.com/Tadesse103",   icon: Github,   label: "GitHub"   },
  { href: "https://linkedin.com",             icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com",              icon: Twitter,  label: "Twitter"  },
  { href: "mailto:tadessebirara7@gmail.com",  icon: Mail,     label: "Email"    },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "rgba(2,6,23,0.97)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

        {/* ── Top row: brand left, nav center, social right ── */}
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
              style={{ background: "var(--gradient-brand)" }}
            >
              TB
            </span>
            <span>
              <span className="block text-sm font-bold text-white">Tadesse Birara</span>
              <span className="block text-[10px]" style={{ color: "var(--text-muted)" }}>
                Building the future with code
              </span>
            </span>
          </Link>

          {/* Horizontal nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="footer-link text-sm"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Social icons row */}
          <div className="flex items-center gap-3 shrink-0">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--text-secondary)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "var(--accent-cyan)";
                  el.style.borderColor = "rgba(6,182,212,0.40)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "var(--text-secondary)";
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* ── Bottom: copyright ── */}
        <div
          className="mt-8 flex flex-col items-center justify-between gap-2 pt-6 sm:flex-row"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {year} Tadesse Birara. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Built with Next.js · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
