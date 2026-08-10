"use client";

import {
  Code2,
  Server,
  Database,
  Wrench,
  Braces,
  Workflow,
  DatabaseZap,
  TerminalSquare,
  CircleCheckBig,
  Sparkles,
  Layers3,
  ShieldCheck,
  Cpu,
  Package,
} from "lucide-react";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

const groups = [
  {
    title: "Frontend",
    icon: Code2,
    items: [
      { label: "JavaScript", icon: Braces },
      { label: "TypeScript", icon: Braces },
      { label: "React", icon: Layers3 },
      { label: "Next.js", icon: Workflow },
      { label: "Tailwind CSS", icon: Sparkles },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    items: [
      { label: "Node.js", icon: Cpu },
      { label: "Express", icon: Workflow },
      { label: "REST APIs", icon: ShieldCheck },
    ],
  },
  {
    title: "Database",
    icon: Database,
    items: [
      { label: "PostgreSQL", icon: DatabaseZap },
      { label: "Prisma", icon: DatabaseZap },
      { label: "MySQL", icon: DatabaseZap },
      { label: "MongoDB", icon: DatabaseZap },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    items: [
      { label: "Git", icon: TerminalSquare },
      { label: "GitHub", icon: TerminalSquare },
      { label: "VS Code", icon: Code2 },
      { label: "Postman", icon: CircleCheckBig },
      { label: "Docker", icon: Package },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Skills"
          title="Thoughtful engineering across the full stack"
          description="A practical stack chosen to support clear product outcomes, maintainable code, and dependable delivery."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {groups.map((group, index) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="h-full transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-100">
                    {group.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <li
                          key={item.label}
                          className="flex items-center gap-2"
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
                            <ItemIcon className="h-3.5 w-3.5" />
                          </span>
                          <span>{item.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
