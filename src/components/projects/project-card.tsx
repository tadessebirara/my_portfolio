"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const statusLabel =
    project.status === "COMPLETED"
      ? "Completed"
      : project.status === "IN_DEVELOPMENT"
        ? "In Development"
        : "Planned";

  return (
    <article className="h-full">
      <Card className="flex h-full flex-col overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-32px_rgba(15,23,42,0.35)]">
        <div className="relative aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-800">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            className="object-cover transition-transform duration-500 hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col gap-5 p-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                {statusLabel}
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">
              {project.title}
            </h3>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-100">
              {project.shortDescription}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                {tech}
              </span>
            ))}
          </div>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-100">
            {project.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="sm"
              className="flex-1 min-w-0 w-full hover:-translate-y-0.5"
            >
              <Link
                href={
                  project.liveDemo?.trim()
                    ? project.liveDemo
                    : `/projects/${project.slug}`
                }
                target={project.liveDemo?.trim() ? "_blank" : undefined}
                rel={project.liveDemo?.trim() ? "noreferrer" : undefined}
              >
                Live Project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="flex-1 min-w-0 w-full hover:-translate-y-0.5"
            >
              <Link
                href={
                  project.github?.trim()
                    ? project.github
                    : `/projects/${project.slug}`
                }
                target={project.github?.trim() ? "_blank" : undefined}
                rel={project.github?.trim() ? "noreferrer" : undefined}
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </article>
  );
}
