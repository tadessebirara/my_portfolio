"use client";

import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/data/projects";
import { Navbar } from "@/components/layout/navbar";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <Navbar />
      <main className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Projects"
            title="Selected case studies"
            description="Explore the full story for each project, including the problem, solution, and technical approach."
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="mt-12 text-sm text-slate-600 dark:text-slate-100">
            <p>
              Each case study describes the architecture, engineering
              challenges, and the approach used to build the application.
            </p>
            <p className="mt-4">
              <Link
                href="/"
                className="font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
              >
                View all projects on the homepage
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
