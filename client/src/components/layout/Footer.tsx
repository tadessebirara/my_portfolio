import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  Code2,
  Layers3,
  Database,
  Workflow,
  ExternalLink,
} from "lucide-react";

// ======================================================
// 1. PERSONAL CONFIGURATION
// ======================================================

const PROFILE = {
  name: "Tadesse Birara",
  email: "tadessebirara7@gmail.com",
  location: "Ethiopia",
  role: "Full-Stack Software Engineer",
  availability: "Open to Professional Opportunities",

  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/tadessebirara",
      icon: Github,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/",
      icon: Linkedin,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/",
      icon: Instagram,
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/",
      icon: MessageCircle,
    },
  ],
};

// ======================================================
// 2. FOOTER CONTENT
// ======================================================

const NAVIGATION = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Technical Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  "Full-Stack Web Development",
  "Business Software Solutions",
  "System Design & Architecture",
  "API Development & Integration",
  "Database Design & Management",
];

// ======================================================
// 3. FOOTER COMPONENT
// ======================================================

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Smooth scroll to the contact section
  const scrollToContact = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const contactSection = document.getElementById("contact");

    if (contactSection) {
      event.preventDefault();

      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.replaceState(null, "", "#contact");
    }
  };

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#090D16] text-white">
      {/* ==================================================
          BACKGROUND DESIGN
      ================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

        <div className="absolute left-1/2 top-0 h-48 w-2/3 -translate-x-1/2 rounded-full bg-cyan-500/[0.035] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* ==================================================
            MAIN FOOTER GRID
        ================================================== */}

        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">
          {/* ==================================================
              COLUMN 1: BRAND & INTRODUCTION
          ================================================== */}

          <div className="lg:col-span-4">
            {/* Brand */}

            <a
              href="#home"
              aria-label="Tadesse Birara - Home"
              className="inline-block"
            >
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Tadesse
                <span className="text-cyan-400">Birara</span>
                <span className="text-cyan-400">.</span>
              </h2>
            </a>

            <p className="mt-3 text-sm font-medium text-cyan-400">
              {PROFILE.role}
            </p>

            {/* Professional Description */}

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              I partner with businesses, organizations, and forward-thinking
              individuals to transform ideas and business challenges into
              reliable, scalable, and practical software solutions.
            </p>

            {/* Availability */}

            <div className="mt-7 inline-flex items-center gap-3 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.05] px-3.5 py-2.5">
              <span className="relative flex h-2 w-2">
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <span className="text-xs font-medium text-emerald-400">
                {PROFILE.availability}
              </span>
            </div>
          </div>

          {/* ==================================================
              COLUMN 2: NAVIGATION
          ================================================== */}

          <div className="lg:col-span-2">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Quick Navigation
            </h3>

            <ul className="space-y-4">
              {NAVIGATION.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors duration-200 hover:text-cyan-400"
                  >
                    <span className="h-px w-0 bg-cyan-400 transition-all duration-200 group-hover:w-3" />

                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ==================================================
              COLUMN 3: SERVICES
          ================================================== */}

          <div className="lg:col-span-3">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Professional Services
            </h3>

            <ul className="space-y-4">
              {SERVICES.map((service) => (
                <li
                  key={service}
                  className="flex items-start gap-2.5 text-sm leading-5 text-slate-400 transition-colors duration-200 hover:text-slate-200"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-500/70" />

                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* ==================================================
              COLUMN 4: CONTACT & SOCIAL MEDIA
          ================================================== */}

          <div className="lg:col-span-3">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Let's Connect
            </h3>

            <p className="mb-5 text-sm leading-6 text-slate-400">
              Whether you have a business challenge, a new project, or an
              opportunity to collaborate, I would be glad to hear from you.
            </p>

            {/* Email Contact */}

            <a
              href={`mailto:${PROFILE.email}`}
              className="group flex items-center gap-3 rounded-lg border border-white/[0.07] bg-white/[0.02] p-3.5 transition-all duration-200 hover:border-cyan-400/25 hover:bg-cyan-400/[0.04]"
            >
              <Mail size={18} className="shrink-0 text-cyan-400" />

              <div className="min-w-0 flex-1">
                <span className="block text-xs text-slate-500">Email Me</span>

                <span className="mt-1 block break-all text-sm font-medium text-slate-200 transition-colors group-hover:text-cyan-400">
                  {PROFILE.email}
                </span>
              </div>

              <ArrowRight
                size={15}
                className="shrink-0 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-cyan-400"
              />
            </a>

            {/* Location */}

            <div className="mt-4 flex items-center gap-3 text-sm text-slate-400">
              <MapPin size={17} className="shrink-0 text-cyan-400" />
              {PROFILE.location} · Remote Collaboration
            </div>

            {/* Social Media */}

            <div className="mt-7">
              <p className="mb-3 text-xs font-medium text-slate-500">
                Connect on Social Media
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {PROFILE.socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${social.name}`}
                      title={social.name}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.025] text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] hover:text-cyan-400"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            BUSINESS COLLABORATION CTA
        ================================================== */}

        <div className="relative mb-12 overflow-hidden rounded-2xl border border-cyan-400/15 bg-gradient-to-r from-[#101b2a] via-[#111c2c] to-[#0d1523] p-6 sm:p-9">
          {/* Subtle Decoration */}

          <div className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full bg-cyan-500/[0.07] blur-[80px]" />

          <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            {/* CTA CONTENT */}

            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400">
                  Let's Work Together
                </span>
              </div>

              <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl lg:text-3xl">
                Have a Business Challenge or a Vision Worth Building?
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
                Let's discuss your goals, explore the right technology, and
                build a software solution that creates measurable value for your
                business.
              </p>
            </div>

            {/* CTA BUTTON */}

            <a
              href="#contact"
              onClick={scrollToContact}
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-lg bg-cyan-500 px-6 py-3.5 text-sm font-semibold text-[#06111b] shadow-lg shadow-cyan-500/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-cyan-500/20"
            >
              Start a Conversation
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        {/* ==================================================
            BOTTOM COPYRIGHT BAR
        ================================================== */}

        <div className="flex flex-col gap-6 border-t border-white/[0.07] py-7 md:flex-row md:items-center md:justify-between">
          {/* Copyright */}

          <div className="space-y-2 text-center md:text-left">
            <p className="text-xs text-slate-400">
              © {currentYear} Tadesse Birara. All rights reserved.
            </p>

            <p className="text-xs text-slate-600">
              Designed & Developed with React, TypeScript and Tailwind CSS.
            </p>
          </div>

          {/* Back to Top */}

          <div className="flex items-center justify-center gap-5">
            <span className="hidden text-xs text-slate-500 sm:block">
              Engineering solutions. Creating impact.
            </span>

            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.03] text-slate-400 transition-colors hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-400"
            >
              <ArrowUp size={17} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
