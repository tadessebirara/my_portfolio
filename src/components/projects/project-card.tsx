"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/projects";

const statusStyles: Record<Project["status"], { label: string; color: string; bg: string }> = {
  COMPLETED:      { label: "Completed",      color: "#34d399", bg: "rgba(52,211,153,0.12)"  },
  IN_DEVELOPMENT: { label: "In Development", color: "#fbbf24", bg: "rgba(251,191,36,0.12)"  },
  PLANNED:        { label: "Planned",        color: "#60a5fa", bg: "rgba(96,165,250,0.12)"  },
};

export function ProjectCard({ project }: { project: Project }) {
  const status = statusStyles[project.status];

  const demoHref = project.liveDemo?.trim()
    ? project.liveDemo
    : `/projects/${project.slug}`;

  const githubHref = project.github?.trim()
    ? project.github
    : `https://github.com/Tadesse103`;

  return (
    <article className="project-card h-full">

      {/* ── Image ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "16/9", background: "rgba(15,23,42,0.80)" }}
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {/* gradient overlay on image */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 50%, rgba(2,6,23,0.70) 100%)",
          }}
        />
        {/* status badge over image */}
        <span
          className="absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
          style={{ background: status.bg, color: status.color, border: `1px solid ${status.color}35` }}
        >
          {status.label}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col gap-4 p-5">

        {/* title */}
        <h3 className="text-base font-bold leading-snug text-white">
          {project.title}
        </h3>

        {/* description */}
        <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--text-secondary)" }}>
          {project.shortDescription}
        </p>

        {/* tech badges */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="tech-badge">{tech}</span>
          ))}
        </div>

        {/* CTA buttons — pushed to bottom */}
        <div className="mt-auto flex gap-3 pt-2">
          <Link
            href={demoHref}
            target={project.liveDemo?.trim() ? "_blank" : undefined}
            rel={project.liveDemo?.trim() ? "noreferrer" : undefined}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "var(--gradient-brand)" }}
          >
            Live Demo
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href={githubHref}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "transparent",
              border: "1px solid rgba(37,99,235,0.35)",
              color: "var(--text-secondary)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(37,99,235,0.70)";
              el.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(37,99,235,0.35)";
              el.style.color = "var(--text-secondary)";
            }}
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </Link>
        </div>
      </div>
    </article>
  );
}
