"use client";

import { motion } from "framer-motion";
import { User, Calendar, Briefcase, Users, Code2, ArrowRight } from "lucide-react";

const stats = [
  { icon: Calendar,   value: "2+",  label: "Years\nExperience"       },
  { icon: Briefcase,  value: "15+", label: "Projects\nCompleted"     },
  { icon: Users,      value: "10+", label: "Happy\nClients"          },
  { icon: Code2,      value: "5+",  label: "Technologies\nMastered"  },
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
      {/* subtle section glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 10% 50%, rgba(37,99,235,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <span className="section-eyebrow">About Me</span>
        </motion.div>

        {/* ── Glass card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 lg:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:gap-14">

            {/* ── LEFT — text ── */}
            <div className="flex flex-col gap-6">
              {/* avatar + title row */}
              <div className="flex items-center gap-4">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.30)" }}
                >
                  <User className="h-6 w-6" style={{ color: "var(--accent-cyan)" }} />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-white">About Me</h2>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Full-Stack JavaScript Developer
                  </p>
                </div>
              </div>

              <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                I am a passionate Full-Stack web and mobile  application Developer.
                I specialize in building modern web applications using cutting-edge technologies.
                I enjoy turning ideas into real-world solutions that succesfully satisfy the end user or client.
              </p>

              <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                My work spans problem understanding, requirment analaysis,architectural design,  frontend, APIs, data design, and deployment — always
                with maintainability and user clarity in mind. I believe great
                software is a blend of thoughtful architecture and clean execution.
              </p>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
                style={{ color: "var(--accent-cyan)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#a5f3fc")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent-cyan)")}
              >
                Read More
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* ── RIGHT — stats grid ── */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5 content-start">
              {stats.map(({ icon: Icon, value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="stat-card"
                >
                  {/* icon */}
                  <span
                    className="mb-1 flex h-10 w-10 items-center justify-center rounded-full"
                    style={{
                      background: "rgba(37,99,235,0.12)",
                      border: "1px solid rgba(37,99,235,0.25)",
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color: "var(--accent-cyan)" }} />
                  </span>

                  {/* number */}
                  <span className="stat-number">{value}</span>

                  {/* label — newline becomes line-break */}
                  <span className="stat-label whitespace-pre-line">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
