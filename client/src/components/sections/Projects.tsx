import { useCallback, useEffect, useState } from "react";
import {
  ExternalLink,
  Github,
  Target,
  Lightbulb,
  Code2,
  Settings2,
  ZoomIn,
  X,
} from "lucide-react";

import { getProjects, imageUrl, type Project } from "../../lib/api";

import AnimatedSection from "../ui/AnimatedSection";
import SectionHeading from "../ui/SectionHeading";
import ProjectManager from "../admin/ProjectManager";

/* ============================================================
   PROJECT CARD MODEL
   All projects now come from the backend.
   ============================================================ */

type CardModel = {
  key: string;
  title: string;
  badge: string;
  tagline: string;
  problem: string;
  solution: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  image: string | null;
  footerLabel: string;
};

/* ============================================================
   BACKEND PROJECT MAPPER
   ============================================================ */

function fromSaved(p: Project): CardModel {
  return {
    key: p.id,
    title: p.title,
    badge: p.category,
    tagline: p.subtitle,
    problem: p.problem,
    solution: p.solution,
    technologies: p.tags,
    liveUrl: p.liveUrl,
    githubUrl: p.sourceUrl,
    image: p.image,
    footerLabel: p.footerLabel || "System Architecture",
  };
}

/* ============================================================
   ADMIN VISIBILITY
   ============================================================ */

function checkIsAdmin(): boolean {
  if (typeof window === "undefined") return false;

  const hasParam = new URLSearchParams(window.location.search).has("admin");

  const hasKey = !!localStorage.getItem("adminKey");

  return hasParam || hasKey;
}

/* ============================================================
   PROJECTS SECTION
   ============================================================ */

export default function Projects() {
  const [saved, setSaved] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showManager, setShowManager] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [lightbox, setLightbox] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  /* ------------------------------------------------------------
     FETCH PROJECTS FROM BACKEND
     ------------------------------------------------------------ */

  const fetchSaved = useCallback(async () => {
    try {
      const data = await getProjects();
      setSaved(data);
    } catch (error) {
      console.error("Failed to fetch portfolio projects:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ------------------------------------------------------------
     INITIAL LOAD
     ------------------------------------------------------------ */

  useEffect(() => {
    fetchSaved();
    setIsAdmin(checkIsAdmin());
  }, [fetchSaved]);

  /* ------------------------------------------------------------
     MAP BACKEND PROJECTS
     No hardcoded projects.
     ------------------------------------------------------------ */

  const cards: CardModel[] = saved.map(fromSaved);

  /* ============================================================
     RENDER
     ============================================================ */

  return (
    <section
      id="projects"
      className="border-t border-white/5 bg-[#090D16] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* SECTION HEADING */}

        <AnimatedSection>
          <SectionHeading
            label="Selected Work"
            title="Real problems. Engineered solutions."
            description="A showcase of how I analyze business challenges and build practical, scalable digital systems."
          />
        </AnimatedSection>

        {/* PROJECT CARDS */}

        <div className="space-y-8">
          {cards.map((card, i) => (
            <AnimatedSection key={card.key} delay={i * 0.05}>
              <ProjectCard
                card={card}
                onOpenImage={(src, alt) => setLightbox({ src, alt })}
              />
            </AnimatedSection>
          ))}
        </div>

        {/* LOADING INDICATOR */}

        {loading && (
          <div className="mt-8 flex items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/15 border-t-white/70" />
          </div>
        )}

        {/* EMPTY STATE */}

        {!loading && cards.length === 0 && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-[#0C121E] px-6 py-12 text-center">
            <Code2 className="mx-auto mb-4 h-10 w-10 text-slate-500" />

            <h3 className="text-lg font-semibold text-white">
              Projects Coming Soon
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              New projects will appear here soon.
            </p>
          </div>
        )}

        {/* ADMIN-ONLY MANAGE BUTTON */}

        {isAdmin && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowManager(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-slate-400 transition-colors hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-300"
            >
              <Settings2 className="h-3.5 w-3.5" />
              Manage Projects
              <span className="ml-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-slate-400">
                {saved.length}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* PROJECT MANAGER MODAL */}

      {showManager && (
        <ProjectManager
          onClose={() => setShowManager(false)}
          onProjectsChanged={fetchSaved}
          projects={saved}
        />
      )}

      {/* FULL-SCREEN IMAGE VIEWER */}

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}

/* ============================================================
   LIGHTBOX — FULL-SCREEN IMAGE VIEWER
   ============================================================ */

function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex cursor-zoom-out items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/50 p-2.5 text-white transition-colors hover:bg-white/10 sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" />
      </button>

      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90dvh] max-w-[95vw] cursor-default rounded-xl border border-white/10 object-contain shadow-2xl"
      />
    </div>
  );
}

/* ============================================================
   PROJECT CARD
   ============================================================ */

function ProjectCard({
  card,
  onOpenImage,
}: {
  card: CardModel;
  onOpenImage: (src: string, alt: string) => void;
}) {
  const hasLive = Boolean(card.liveUrl && card.liveUrl.trim());
  const hasGithub = Boolean(card.githubUrl && card.githubUrl.trim());
  const hasImage = Boolean(card.image);

  const fullImage = hasImage ? imageUrl(card.image!) : "";

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0C121E] transition-all duration-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10">
      <div className="grid lg:grid-cols-12">
        {/* LEFT VISUAL */}

        <div className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden border-b border-white/10 bg-[#05080f] p-6 lg:col-span-5 lg:border-b-0 lg:border-r">
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[80px] transition-all duration-500 group-hover:bg-blue-500/20" />

          {/* CATEGORY BADGE */}

          <div className="absolute left-5 top-5 z-10 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-blue-400 backdrop-blur-md">
            {card.badge}
          </div>

          {/* PROJECT IMAGE OR FALLBACK */}

          {hasImage ? (
            <button
              type="button"
              onClick={() => onOpenImage(fullImage, `${card.title} screenshot`)}
              aria-label={`Enlarge ${card.title} screenshot`}
              className="group/img relative z-10 mt-10 w-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220] shadow-2xl transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <img
                src={fullImage}
                alt={`${card.title} screenshot`}
                loading="lazy"
                decoding="async"
                className="block h-auto max-h-[420px] w-full object-contain"
              />

              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover/img:opacity-100">
                <ZoomIn className="h-3.5 w-3.5" />
                Click to enlarge
              </span>
            </button>
          ) : (
            <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] text-4xl font-bold text-white shadow-2xl backdrop-blur-xl transition-transform duration-500 group-hover:scale-110">
              {card.title?.[0] || "P"}
            </div>
          )}

          {/* FOOTER LABEL */}

          <div className="absolute bottom-5 right-5 flex items-center gap-2 text-slate-600">
            <Code2 size={16} />

            <span className="font-mono text-[10px] uppercase tracking-widest">
              {card.footerLabel}
            </span>
          </div>
        </div>

        {/* RIGHT CONTENT */}

        <div className="flex flex-col p-8 lg:col-span-7 lg:p-10">
          <h3 className="mb-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
            {card.title}
          </h3>

          {card.tagline && (
            <p className="mb-8 text-sm font-medium text-blue-400">
              {card.tagline}
            </p>
          )}

          {/* PROBLEM AND SOLUTION */}

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <div className="mb-2 flex items-center gap-2 text-rose-400">
                <Target size={16} />

                <h4 className="text-xs font-bold uppercase tracking-wider">
                  The Problem
                </h4>
              </div>

              <p className="text-sm leading-relaxed text-slate-400">
                {card.problem}
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <div className="mb-2 flex items-center gap-2 text-emerald-400">
                <Lightbulb size={16} />

                <h4 className="text-xs font-bold uppercase tracking-wider">
                  The Solution
                </h4>
              </div>

              <p className="text-sm leading-relaxed text-slate-400">
                {card.solution}
              </p>
            </div>
          </div>

          {/* TECHNOLOGIES */}

          {card.technologies.length > 0 && (
            <div className="mb-10 flex flex-wrap gap-2">
              {card.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-white/10 bg-[#090D16] px-3 py-1.5 text-xs font-medium text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* PROJECT ACTIONS */}

          <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
            {hasLive ? (
              <a
                href={card.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:scale-[1.02] hover:bg-slate-200 active:scale-[0.98]"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-white/70 px-6 py-3 text-sm font-semibold text-slate-900 opacity-70"
                title="Live demo coming soon"
              >
                <ExternalLink size={18} />
                Live Demo Soon
              </button>
            )}

            {hasGithub ? (
              <a
                href={card.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.02] px-6 py-3 text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white/[0.06]"
              >
                <Github size={18} />
                Source Code
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-6 py-3 text-sm font-medium text-slate-400 opacity-70"
                title="Repository coming soon"
              >
                <Github size={18} />
                Code Soon
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export { Projects };
