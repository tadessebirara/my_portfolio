"use client";

import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { href: "https://github.com", label: "GitHub", icon: Github },
  { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
  { href: "#contact", label: "Email", icon: Mail },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.16),transparent_35%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.45 }}
            >
              <Badge>FULL-STACK JAVASCRIPT DEVELOPER</Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl"
            >
              I build modern web experiences that feel clear, fast, and
              reliable.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-100"
            >
              I craft thoughtful applications across frontend, APIs, data
              design, and deployment with a focus on maintainability and
              real-world use.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <Button
              asChild
              size="lg"
              className="shadow-sm hover:-translate-y-0.5"
            >
              <Link href="#projects">
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="shadow-sm hover:-translate-y-0.5"
            >
              <Link href="#contact">Contact Me</Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-100"
          >
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:hover:bg-slate-800"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </a>
              );
            })}
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="rounded-4xl border border-slate-200/80 bg-white/70 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.4)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/70"
        >
          <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-slate-100 dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-sky-400 via-cyan-400 to-indigo-500 text-sm font-semibold text-white shadow-lg">
                TB
              </div>
              <div className="text-xs uppercase tracking-[0.32em] text-slate-400">
                Tadesse Birara
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                Current focus
              </p>
              <p className="text-2xl font-semibold">
                Focused on product clarity, speed, and dependable delivery.
              </p>
              <div className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Frontend</span>
                  <span>React / Next.js</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Backend</span>
                  <span>Node.js / APIs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Data</span>
                  <span>PostgreSQL / Prisma</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
