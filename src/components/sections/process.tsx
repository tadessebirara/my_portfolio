"use client";

import {
  ArrowRight,
  CheckSquare,
  LayoutGrid,
  Pencil,
  Rocket,
} from "lucide-react";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";

const steps = [
  {
    title: "Understand",
    description: "Clarify goals, users, and constraints before building.",
    icon: Pencil,
  },
  {
    title: "Plan",
    description: "Define the architecture and implementation path clearly.",
    icon: LayoutGrid,
  },
  {
    title: "Build",
    description: "Build the interface, API, and integrations with care.",
    icon: CheckSquare,
  },
  {
    title: "Test",
    description: "Validate flows and usability before launch.",
    icon: ArrowRight,
  },
  {
    title: "Deploy",
    description: "Launch with a stable setup and monitor performance.",
    icon: Rocket,
  },
];

export function Process() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Process"
          title="A simple, reliable workflow"
          description="A clear path from idea to launch."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="h-full">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-slate-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-950 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-100">
                    {step.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
