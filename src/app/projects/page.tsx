"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen px-6 py-20 lg:px-10">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -5%, rgba(36, 100, 239, 0.14) 0%, transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-7xl space-y-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
            style={{ color: "var(--text-secondary)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <span className="section-eyebrow">Portfolio</span>
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              All Projects
            </h1>
            <p className="max-w-xl text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Explore the full list of projects — each one built with thoughtful
              architecture and a focus on real-world value.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="flex"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
