import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-slate-50/80 py-10 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-lg font-semibold text-slate-950 dark:text-white">
            Tadesse Birara
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-100">
            Building thoughtful web applications with a focus on craft, clarity,
            and reliable delivery.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-100">
          <a
            href="mailto:tadesse@example.com"
            className="flex items-center gap-2 transition hover:text-slate-950 dark:hover:text-white"
          >
            <Mail className="h-4 w-4" />
            tadessebirara7@gmail.com
          </a>
          <a
            href="https://github.com"
            className="flex items-center gap-2 transition hover:text-slate-950 dark:hover:text-white"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            className="flex items-center gap-2 transition hover:text-slate-950 dark:hover:text-white"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
