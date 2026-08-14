"use client";

import { motion } from "framer-motion";
import { Globe, Layers, Layout, Wrench, Smartphone, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Building fast, modern and responsive websites using the latest technologies tailored to your business needs.",
    color: "#60a5fa",
  },
  {
    icon: Layers,
    title: "Full-Stack Development",
    description:
      "End-to-end application development covering frontend, backend APIs, database design and deployment.",
    color: "#a78bfa",
  },
  {
    icon: Layout,
    title: "UI Implementation",
    description:
      "Translating design mockups into pixel-perfect, accessible and performant user interfaces.",
    color: "#34d399",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Crafting layouts that look and work great on every device — from mobile to large desktops.",
    color: "#fbbf24",
  },
  {
    icon: ShieldCheck,
    title: "API Development",
    description:
      "Designing and building clean, secure REST APIs that power your applications and integrations.",
    color: "#fb923c",
  },
  {
    icon: Wrench,
    title: "Website Maintenance",
    description:
      "Ongoing support, performance tuning, bug fixes and feature additions to keep your product running smoothly.",
    color: "#f472b6",
  },
];

export function Services() {
  return (
    <section id="services" className="relative px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 15% 60%, rgba(124,58,237,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl space-y-10 sm:space-y-12">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2 sm:space-y-3"
        >
          <span className="section-eyebrow">Services</span>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            What I Offer
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            From concept to deployment — I deliver complete digital solutions
            with a focus on quality, performance and maintainability.
          </p>
        </motion.div>

        {/* cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass glass-hover flex flex-col gap-4 rounded-2xl p-7"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{ background: `${color}14`, border: `1px solid ${color}35` }}
              >
                <Icon className="h-6 w-6" style={{ color }} />
              </span>
              <h3 className="text-base font-bold text-white">{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
