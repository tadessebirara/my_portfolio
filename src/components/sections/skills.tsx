"use client";

import { motion } from "framer-motion";
import {
  Lightbulb, Users, MessageSquare, Clock, Zap, Palette,
} from "lucide-react";

/* ─── SVG brand icons ─────────────────────────────────────────────── */
function Html5Icon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3l2.1 23.4L16 29l8.9-2.6L27 3H5z" fill="#e44d26"/>
      <path d="M16 27.2l7.2-2 1.8-20.2H16v22.2z" fill="#f16529"/>
      <path d="M11.3 13h4.7V10H8.3l.9 10H16v-3h-4.1l-.6-4zM16 19.5l-.1.1-3.1-.8-.2-2.3H9.5l.4 4.5 6.1 1.7v-3.2z" fill="#ebebeb"/>
      <path d="M16 13h4.4l-.4 4H16v3h3.7l-.4 4.1L16 25v3.3l6.1-1.7.9-9.6H16v-4z" fill="#fff"/>
    </svg>
  );
}

function Css3Icon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3l2.1 23.4L16 29l8.9-2.6L27 3H5z" fill="#1572b6"/>
      <path d="M16 27.2l7.2-2 1.8-20.2H16v22.2z" fill="#33a9dc"/>
      <path d="M16 13H11.6l-.3-3.5H16V6.2H7.8l.9 10.3H16V13zM16 21.7l-.1.1-3.3-.9-.2-2.3H9.3l.4 4.6 6.3 1.8v-3.3z" fill="#fff"/>
      <path d="M16 13v3.5h4.1l-.4 4-3.7 1v3.2l6.2-1.7.1-.1.8-9.4H16zM16 6.2v3.3h7.8l.3-3.3H16z" fill="#fff"/>
    </svg>
  );
}

function JavaScriptIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill="#f7df1e"/>
      <path d="M9 25.2c.7 1.2 1.6 2 3.3 2 1.4 0 2.3-.7 2.3-1.6 0-1.1-.9-1.5-2.5-2.1l-.9-.4c-2.4-1-4-2.3-4-5 0-2.5 1.9-4.4 4.8-4.4 2.1 0 3.6.7 4.7 2.6l-2.6 1.6c-.6-1-1.2-1.4-2.1-1.4-.9 0-1.5.6-1.5 1.4 0 1 .6 1.4 2 2l.9.4c2.9 1.2 4.5 2.4 4.5 5.2 0 2.9-2.3 4.6-5.4 4.6-3 0-4.9-1.4-5.9-3.3l2.4-1.6zM22.3 25c.5.9 1 1.6 2.1 1.6.9 0 1.6-.4 1.6-1.8V14h3v10.9c0 3-1.8 4.4-4.4 4.4-2.3 0-3.7-1.2-4.4-2.7l2.1-1.6z" fill="#222"/>
    </svg>
  );
}

function ReactIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="2.8" fill="#61dafb"/>
      <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61dafb" strokeWidth="1.5" fill="none"/>
      <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61dafb" strokeWidth="1.5" fill="none" transform="rotate(60 16 16)"/>
      <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61dafb" strokeWidth="1.5" fill="none" transform="rotate(120 16 16)"/>
    </svg>
  );
}

function NodejsIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2.5L3 9.8v12.4L16 29.5l13-7.3V9.8L16 2.5z" fill="#3c873a"/>
      <path d="M16 6.4l8.8 4.9v9.4L16 25.6l-8.8-4.9v-9.4L16 6.4z" fill="#3c873a"/>
      <path d="M16 12.5c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5z" fill="#fff"/>
      <path d="M14.5 14h3v4h-3z" fill="#3c873a"/>
      <text x="16" y="20" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff" fontFamily="monospace">N</text>
    </svg>
  );
}

function ExpressIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill="#fff" fillOpacity="0.07"/>
      <text x="4" y="21" fontSize="11" fontWeight="900" fill="#ffffff" fontFamily="monospace">Ex</text>
    </svg>
  );
}

function MongodbIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2C10 8 9 13.5 9 15c0 4.2 3.1 7.7 7 8.3V30h1v-6.7c3.9-.6 7-4.1 7-8.3 0-1.5-1-7-8-9z" fill="#47a248"/>
      <path d="M16 2c6 2 8 7.5 8 9 0 4.2-3.1 7.7-7 8.3V30" stroke="#47a248" strokeWidth="0.5" fill="none"/>
      <path d="M16 6c3 3 4 6.5 4 8 0 2.5-1.5 4.7-3.5 5.8" stroke="#a8d5a2" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function GitIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.5 14.5L17.5 2.5a1.7 1.7 0 00-2.4 0l-2.4 2.4 3 3a2 2 0 012.5 2.5l2.9 2.9a2 2 0 11-1.2 1.2l-2.7-2.7v7.1a2 2 0 11-1.7 0V11.6a2 2 0 01-1.1-2.6L11.5 6.2l-9 9a1.7 1.7 0 000 2.4l12 12a1.7 1.7 0 002.4 0l12.6-12.6a1.7 1.7 0 000-2.5z" fill="#f05032"/>
    </svg>
  );
}

function TailwindIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 7c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.7 1.2 1.2 2.5 2.6 5.5 2.6 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.7C20.3 8.4 19 7 16 7zM10 16.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.7 1.2 1.2 2.5 2.6 5.5 2.6 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.7-1.2-1.2-2.5-2.6-5.5-2.6z" fill="#06b6d4"/>
    </svg>
  );
}

function TypeScriptIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill="#3178c6"/>
      <path d="M18.6 22.4v2.4c.4.2.9.4 1.4.5.6.1 1.2.2 1.8.2.6 0 1.2-.1 1.7-.2.5-.2 1-.4 1.4-.7.4-.3.7-.7.9-1.2.2-.5.3-1 .3-1.7 0-.5-.1-.9-.2-1.3-.1-.4-.3-.7-.6-1-.3-.3-.6-.5-1-.8-.4-.2-.9-.4-1.4-.6-.4-.1-.7-.3-1-.4-.3-.1-.5-.3-.7-.4-.2-.1-.3-.3-.4-.5-.1-.2-.1-.4-.1-.6 0-.2 0-.4.1-.5.1-.2.2-.3.4-.4.2-.1.3-.2.6-.2.2-.1.5-.1.7-.1.2 0 .4 0 .7.1.2 0 .5.1.7.2.2.1.5.2.7.4.2.1.4.3.6.5v-2.3c-.4-.1-.8-.3-1.2-.4-.4-.1-.9-.1-1.5-.1-.6 0-1.1.1-1.6.2-.5.2-.9.4-1.3.7-.4.3-.7.7-.9 1.1-.2.5-.3 1-.3 1.6 0 .8.2 1.5.7 2 .4.5 1.1 1 2 1.3.4.2.8.3 1.1.5.3.1.6.3.8.4.2.2.4.3.5.5.1.2.2.4.2.7 0 .2 0 .4-.1.6-.1.2-.2.3-.4.5-.2.1-.4.2-.6.3-.2.1-.5.1-.8.1-.6 0-1.1-.1-1.7-.4-.5-.3-1-.6-1.4-1.1zM13.5 15.5H17v-2.2H7.5v2.2h3.4V26h2.6V15.5z" fill="#fff"/>
    </svg>
  );
}

/* ─── Technical skill data ───────────────────────────────────────── */
const techSkills = [
  { label: "HTML5",        color: "#e34f26", Icon: Html5Icon       },
  { label: "CSS3",         color: "#264de4", Icon: Css3Icon        },
  { label: "JavaScript",   color: "#f7df1e", Icon: JavaScriptIcon  },
  { label: "React",        color: "#61dafb", Icon: ReactIcon       },
  { label: "Node.js",      color: "#68a063", Icon: NodejsIcon      },
  { label: "Express.js",   color: "#ffffff", Icon: ExpressIcon     },
  { label: "MongoDB",      color: "#47a248", Icon: MongodbIcon     },
  { label: "Git & GitHub", color: "#f05032", Icon: GitIcon         },
  { label: "Tailwind CSS", color: "#06b6d4", Icon: TailwindIcon    },
  { label: "TypeScript",   color: "#3178c6", Icon: TypeScriptIcon  },
];

/* ─── Soft skill data ────────────────────────────────────────────── */
const softSkills = [
  {
    icon: Lightbulb,
    label: "Problem Solving",
    desc: "Analytical thinking to solve complex problems.",
    color: "#fbbf24",
  },
  {
    icon: Users,
    label: "Teamwork",
    desc: "Collaborating effectively in team environments.",
    color: "#60a5fa",
  },
  {
    icon: MessageSquare,
    label: "Communication",
    desc: "Clear and effective communication.",
    color: "#34d399",
  },
  {
    icon: Clock,
    label: "Time Management",
    desc: "Prioritizing tasks to meet deadlines.",
    color: "#a78bfa",
  },
  {
    icon: Zap,
    label: "Adaptability",
    desc: "Quick to learn and adapt to new technologies.",
    color: "#fb923c",
  },
  {
    icon: Palette,
    label: "Creativity",
    desc: "Thinking outside the box to create innovative solutions.",
    color: "#f472b6",
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
      {/* section glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 90% 50%, rgba(79,70,229,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl space-y-10 sm:space-y-12">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="section-eyebrow">Skills</span>
        </motion.div>

        {/* ── Two-column grid ── */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* ════════════════════════
              CARD 1 — Technical Skills
          ════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="mb-6 text-lg font-bold text-white">Technical Skills</h3>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              {techSkills.map(({ label, color, Icon }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="skill-icon-card"
                >
                  {/* brand icon */}
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      background: `${color}18`,
                      border: `1px solid ${color}40`,
                    }}
                  >
                    <Icon size={24} />
                  </span>
                  <span className="text-[10px] leading-tight text-center"
                    style={{ color: "var(--text-secondary)" }}>
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* "View All Skills" link */}
            <div className="mt-6 flex justify-center">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: "var(--gradient-brand)" }}
              >
                View All Skills
              </a>
            </div>
          </motion.div>

          {/* ════════════════════════
              CARD 2 — Soft Skills
          ════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="mb-6 text-lg font-bold text-white">Soft Skills</h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {softSkills.map(({ icon: Icon, label, desc, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="glass-hover flex flex-col gap-2 rounded-xl p-4"
                  style={{
                    background: "rgba(15,23,42,0.70)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ background: `${color}15`, border: `1px solid ${color}35` }}
                  >
                    <Icon className="h-4 w-4" style={{ color }} />
                  </span>
                  <p className="text-xs font-semibold text-white leading-tight">{label}</p>
                  <p className="text-[10px] leading-snug" style={{ color: "var(--text-secondary)" }}>
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
