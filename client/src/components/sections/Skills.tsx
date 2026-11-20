import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Smartphone,
  GitBranch,
  Terminal,
  Cpu,
  Zap,
  Layers,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

// Brand Tech Icons (Inline SVGs for 100% build safety and high visual quality)
const BrandIcons = {
  React: () => (
    <svg
      className="w-4 h-4 text-cyan-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(150 12 12)" />
    </svg>
  ),
  TypeScript: () => (
    <svg
      className="w-4 h-4 text-blue-400"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M3 3h18v18H3V3zm10.7 13.5c1.1 0 2.2-.4 2.8-1.2l-1.3-1.1c-.4.5-1 .8-1.5.8-.8 0-1.3-.4-1.3-1.1 0-1.3 2.8-1.2 2.8-3.3 0-1.5-1.2-2.4-2.9-2.4-1.3 0-2.3.4-3 1.2l1.2 1.2c.4-.5 1-.8 1.7-.8.7 0 1.2.3 1.2.9 0 1.2-2.8 1.1-2.8 3.3 0 1.5 1.3 2.5 3.1 2.5zm-6.2 0h1.9v-7h2.2V8H5.6v1.5h2.2v7z" />
    </svg>
  ),
  Node: () => (
    <svg
      className="w-4 h-4 text-emerald-400"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2L3.5 6.9v9.8L12 21.6l8.5-4.9V6.9L12 2zm-1 14.8l-4.5-2.6v-5.2L11 6.4v10.4zm2 0V6.4l4.5 2.6v5.2L13 16.8z" />
    </svg>
  ),
  Postgres: () => (
    <svg
      className="w-4 h-4 text-indigo-400"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.93V14h-2v2.93a8 8 0 112 0z" />
    </svg>
  ),
  Flutter: () => (
    <svg
      className="w-4 h-4 text-sky-400"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M14.314 0L2.3 12 6 15.7 21.686 0h-7.372zm-3.628 12.686L7 16.372 14.314 24.03h7.372l-5.457-5.686 4.428-5.658h-7.015z" />
    </svg>
  ),
  Tailwind: () => (
    <svg
      className="w-4 h-4 text-sky-400"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
    </svg>
  ),
};

export const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative py-28 md:py-36 bg-[#090D16] overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-blue-600/10 via-indigo-500/5 to-transparent blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-600/5 blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-blue-400 font-mono text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          >
            TECHNICAL ARSENAL
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            Engineered Stack & Core Tools
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base md:text-lg leading-relaxed"
          >
            A cohesive matrix of battle-tested technologies selected for
            architectural speed, stability, and production scalability.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            style={{ originX: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-px w-24 bg-gradient-to-r from-blue-500/50 to-transparent mt-8"
          />
        </div>

        {/* Bento Box Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* 1. FRONTEND ENGINEERING (Large Featured Bento Card - 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-12 lg:col-span-7 group relative bg-[#0D1322]/80 hover:bg-[#11182A] border border-white/[0.08] hover:border-blue-500/40 rounded-3xl p-8 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/40 via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Frontend Architecture
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">
                      High-Performance Interfaces
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Primary Stack
                </span>
              </div>

              {/* Interactive Pill Matrix (No repetitive bullet lists) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 transition-all flex items-center gap-3 group/chip">
                  <BrandIcons.React />
                  <div>
                    <span className="text-sm font-semibold text-white block">
                      React.js
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Component UI
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/40 transition-all flex items-center gap-3 group/chip">
                  <BrandIcons.TypeScript />
                  <div>
                    <span className="text-sm font-semibold text-white block">
                      TypeScript
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Strict Typing
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-sky-500/40 transition-all flex items-center gap-3 group/chip">
                  <BrandIcons.Tailwind />
                  <div>
                    <span className="text-sm font-semibold text-white block">
                      Tailwind CSS
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Utility Styling
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-500/40 transition-all flex items-center gap-3 group/chip">
                  <div className="w-4 h-4 rounded-full bg-amber-400/20 text-amber-400 font-bold text-[10px] flex items-center justify-center">
                    JS
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">
                      ES6+ JavaScript
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Async Logic
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/40 transition-all flex items-center gap-3 group/chip col-span-2 sm:col-span-2">
                  <Zap className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-white block">
                      Responsive & Mobile First
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Pixel-perfect dynamic UI on all displays
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> State
                Management & SSR Scoping
              </span>
              <span className="font-mono text-blue-400/80">100% Type-Safe</span>
            </div>
          </motion.div>

          {/* 2. BACKEND ENGINEERING (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-12 lg:col-span-5 group relative bg-[#0D1322]/80 hover:bg-[#11182A] border border-white/[0.08] hover:border-emerald-500/40 rounded-3xl p-8 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Server className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Backend Systems
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">
                      APIs & Logic
                    </p>
                  </div>
                </div>
              </div>

              {/* Pill Badges */}
              <div className="space-y-3 my-6">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-3">
                    <BrandIcons.Node />
                    <span className="text-sm font-semibold text-white">
                      Node.js & Express
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    Runtime
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-white">
                      RESTful API Design
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/5 text-slate-300">
                    Architecture
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm font-semibold text-white">
                      Auth & JWT Tokens
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/5 text-slate-300">
                    Security
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> High
                Concurrency Scalability
              </span>
            </div>
          </motion.div>

          {/* 3. DATABASE ENGINEERING (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-6 lg:col-span-4 group relative bg-[#0D1322]/80 hover:bg-[#11182A] border border-white/[0.08] hover:border-indigo-500/40 rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Database className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Database & Persistence
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    Relational & Schemas
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                  <BrandIcons.Postgres />
                  <span className="text-sm font-semibold text-slate-200">
                    PostgreSQL
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-semibold text-slate-200">
                    SQL Optimization & Indexing
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-semibold text-slate-200">
                    Schema Design & Migrations
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4. MOBILE DEVELOPMENT (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-6 lg:col-span-4 group relative bg-[#0D1322]/80 hover:bg-[#11182A] border border-white/[0.08] hover:border-sky-500/40 rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Mobile Engineering
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    Cross-Platform iOS & Android
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                  <BrandIcons.Flutter />
                  <span className="text-sm font-semibold text-slate-200">
                    Flutter & Dart Framework
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                  <Zap className="w-4 h-4 text-sky-400" />
                  <span className="text-sm font-semibold text-slate-200">
                    Native Performance UI
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                  <Smartphone className="w-4 h-4 text-sky-400" />
                  <span className="text-sm font-semibold text-slate-200">
                    Single Codebase Deployment
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 5. WORKFLOW & SOFTWARE STANDARDS (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-12 lg:col-span-4 group relative bg-[#0D1322]/80 hover:bg-[#11182A] border border-white/[0.08] hover:border-purple-500/40 rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <GitBranch className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Dev & Architecture
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    Workflow & Lifecycle
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                  <GitBranch className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-semibold text-slate-200">
                    Git, GitHub & Version Scoping
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-semibold text-slate-200">
                    System Design & Planning
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-semibold text-slate-200">
                    Full SDLC Execution
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
