"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { ProjectCard } from "@/components/projects/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <section id="projects" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work grounded in real product needs"
          description="A curated set of projects that reflect thoughtful architecture, reliable implementation, and clear product thinking."
        />
        <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-100">
          <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-900/80">
            Completed
          </span>
          <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-900/80">
            In Development
          </span>
          <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-900/80">
            Planned
          </span>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex justify-start">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
          >
            View all projects
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
