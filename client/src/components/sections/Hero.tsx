import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  ArrowRight,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  User,
} from "lucide-react";

// Import the React CV component
import MyCV from "./CVModal";

// ========================================
// CONFIGURATION
// ========================================

const heroImage = "/profile.jpg";

// ========================================
// HERO COMPONENT
// ========================================

const Hero: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <>
      {/* ========================================
          HERO SECTION
      ======================================== */}

      <section
        id="home"
        className="relative min-h-screen overflow-hidden bg-[#080b12] px-6 pb-20 pt-32 text-white md:px-12 lg:px-20"
      >
        {/* BACKGROUND */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />

          <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[130px]" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:55px_55px]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          {/* ========================================
              LEFT CONTENT
          ======================================== */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* AVAILABILITY */}

            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <span className="text-xs font-medium tracking-wide text-emerald-300">
                Available for Opportunities
              </span>
            </div>

            {/* INTRODUCTION */}

            <div className="space-y-5">
              <p className="font-mono text-sm tracking-widest text-cyan-400">
                HELLO, I'M TADESSE BIRARA
              </p>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Architecting{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Enterprise Software
                </span>{" "}
                That Scales.
              </h1>

              <p className="max-w-xl text-base leading-8 text-gray-400 md:text-lg">
                Full-Stack Software Engineer focused on building practical,
                scalable, and user-centered digital solutions through modern
                technologies and thoughtful system design.
              </p>
            </div>

            {/* ========================================
                ACTION BUTTONS
            ======================================== */}

            <div className="flex flex-wrap items-center gap-4">
              {/* CONTACT BUTTON */}

              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-lg bg-cyan-500 px-6 py-3.5 text-sm font-semibold text-[#06111b] transition hover:bg-cyan-400"
              >
                Contact Me
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              {/* PROJECTS BUTTON */}

              <a
                href="#projects"
                className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.08]"
              >
                <Terminal size={17} />
                View Projects
              </a>

              {/* ========================================
                  REACT CV COMPONENT
              ======================================== */}

              <MyCV />
            </div>

            {/* SKILLS */}

            <div className="flex flex-wrap gap-6 border-t border-white/10 pt-7">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <ShieldCheck size={17} className="text-cyan-400" />
                Secure Development
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle2 size={17} className="text-cyan-400" />
                Scalable Solutions
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <User size={17} className="text-cyan-400" />
                User Focused
              </div>
            </div>
          </motion.div>

          {/* ========================================
              RIGHT PROFILE IMAGE
          ======================================== */}

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-md"
          >
            {/* IMAGE GLOW */}

            <div className="absolute -inset-5 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-600/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#101722] p-3 shadow-2xl">
              {!imgError ? (
                <img
                  src={heroImage}
                  alt="Tadesse Birara"
                  onError={() => setImgError(true)}
                  className="h-[420px] w-full rounded-xl object-cover object-center"
                />
              ) : (
                <div className="flex h-[420px] items-center justify-center rounded-xl bg-[#151f2d]">
                  <User size={90} className="text-gray-600" />
                </div>
              )}

              {/* PROFILE IMAGE LABEL */}

              <div className="absolute bottom-7 left-7 right-7 rounded-xl border border-white/10 bg-[#080b12]/90 p-4 backdrop-blur-md">
                <p className="text-lg font-semibold text-white">
                  Tadesse Birara
                </p>

                <p className="mt-1 text-sm text-cyan-400">
                  Full-Stack Software Engineer
                </p>
              </div>
            </div>

            {/* FLOATING LABEL */}

            <div className="absolute -right-5 top-10 rounded-lg border border-cyan-400/20 bg-[#101722] px-4 py-3 shadow-xl sm:-right-10">
              <p className="text-xs text-gray-400">Focused on</p>

              <p className="mt-1 text-sm font-semibold text-cyan-300">
                Software Engineering
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
