import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Database,
  GitBranch,
  Layers3,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: `${project.title} | Tadesse Birara`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | Tadesse Birara`,
      description: project.shortDescription,
      type: "website",
    },
  };
}

export default function ProjectCaseStudy({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  const isAlyah = project.slug === "alyah-attendance-management-system";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="text-sm font-semibold text-slate-700 transition hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
          >
            <ArrowLeft className="mr-2 inline h-4 w-4" />
            Back to projects
          </Link>
          <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            {project.status}
          </div>
        </div>
      </div>
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <section>
            <div className="space-y-4">
              <Badge>{project.title}</Badge>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
                {project.shortDescription}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-100">
                {project.overview}
              </p>
            </div>
            <div className="mt-10 space-y-10">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
                  Overview
                </h2>
                <p className="text-base leading-7 text-slate-600 dark:text-slate-100">
                  {project.overview}
                </p>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
                  Problem
                </h2>
                <p className="text-base leading-7 text-slate-600 dark:text-slate-100">
                  {project.challenges[0]}
                </p>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
                  Solution
                </h2>
                <p className="text-base leading-7 text-slate-600 dark:text-slate-100">
                  {project.solutions[0]}
                </p>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
                  Key Features
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
                  User Roles
                </h2>
                <div className="grid gap-3 sm:grid-cols-3">
                  {isAlyah
                    ? ["Admin", "Teacher", "Parent"].map((role) => (
                        <div
                          key={role}
                          className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                        >
                          {role}
                        </div>
                      ))
                    : null}
                </div>
              </section>
              {isAlyah ? (
                <>
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
                      System Architecture
                    </h2>
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                          User
                        </div>
                        <span className="text-slate-400">↓</span>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                          Next.js UI
                        </div>
                        <span className="text-slate-400">↓</span>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                          API Layer
                        </div>
                        <span className="text-slate-400">↓</span>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                          PostgreSQL
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
                      Attendance Workflow
                    </h2>
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                          Class
                        </div>
                        <span className="text-slate-400">↓</span>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                          Attendance Session
                        </div>
                        <span className="text-slate-400">↓</span>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                          Record Attendance
                        </div>
                        <span className="text-slate-400">↓</span>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                          Report
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              ) : null}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
                  Development Status
                </h2>
                <p className="text-base leading-7 text-slate-600 dark:text-slate-100">
                  {project.status}
                </p>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
                  Engineering Decisions
                </h2>
                <p className="text-base leading-7 text-slate-600 dark:text-slate-100">
                  {project.solutions[1]}
                </p>
              </section>
            </div>
          </section>
          <aside className="space-y-6">
            <Card>
              <div className="relative overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-900">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  width={1120}
                  height={700}
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="mt-6 space-y-5">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                    Technology
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-100">
                    {project.technologies.map((tech) => (
                      <li key={tech} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-sky-500" />
                        <span>{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                    Architecture
                  </h3>
                  <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
                    <div className="flex items-center gap-2">
                      <Layers3 className="h-4 w-4 text-sky-500" />
                      <span>
                        Frontend, API, data, and role-based access patterns
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                  Implementation Notes
                </h3>
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-100">
                  <div className="flex items-start gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950">
                    <Workflow className="mt-0.5 h-4 w-4 text-sky-500" />
                    <span>
                      Workflow driven by clear user roles and practical business
                      rules.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950">
                    <Database className="mt-0.5 h-4 w-4 text-sky-500" />
                    <span>
                      Data model designed to support attendance records, class
                      assignments, and reporting.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-sky-500" />
                    <span>
                      Role access is structured to support maintainable
                      administration.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950">
                    <GitBranch className="mt-0.5 h-4 w-4 text-sky-500" />
                    <span>
                      Scalable structure that can grow with additional workflows
                      and reporting features.
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
