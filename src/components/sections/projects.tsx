"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  const featured = projects.slice(0, 3);

  return (
    <section id="projects" className="relative px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
      {/* glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(37,99,235,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl space-y-8 sm:space-y-10">

        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2 sm:space-y-3"
        >
          <span className="section-eyebrow">Featured Projects</span>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            My Recent Work
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            A curated set of projects that reflect thoughtful architecture,
            reliable implementation, and clear product thinking.
          </p>
        </motion.div>

        {/* card grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* view all */}
        <div className="flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "var(--gradient-brand)" }}
          >
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
