"use client";

import {
  ArrowRight,
  Layers3,
  Workflow,
  DatabaseZap,
  ShieldCheck,
} from "lucide-react"; // built in icon library
import { motion } from "framer-motion"; //for animations

import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";

const whatIDo = [
  {
    title: "Full-Stack Development",
    description:
      "Designing and building complete products with clear architecture across the stack.",
    icon: Layers3,
  },
  {
    title: "Frontend Engineering",
    description:
      "Crafting responsive interfaces that balance performance, accessibility, and product clarity.",
    icon: Workflow,
  },
  {
    title: "Backend & APIs",
    description:
      "Creating dependable APIs and business logic for real-world workflows and integrations.",
    icon: DatabaseZap,
  },
  {
    title: "Application Architecture",
    description:
      "Thinking through data, deployment, and maintainability from the start.",
    icon: ShieldCheck,
  },
];

export function About() {
  return (
    <section id="about" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About"
          title="Building practical software with calm, deliberate execution"
          description="A focused approach to product thinking, software craftsmanship, and dependable delivery."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="space-y-5"
          >
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-100">
              I’m a full-stack developer focused on solving practical product
              problems with thoughtful UI, dependable architecture, and clear
              communication.
            </p>
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-100">
              My work spans frontend, APIs, data design, and deployment
              considerations — always with maintainability and user clarity in
              mind.
            </p>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
            >
              Explore selected work
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {whatIDo.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="h-full transition-all duration-300 hover:-translate-y-1">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-slate-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-100">
                      {item.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
