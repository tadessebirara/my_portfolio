"use client";

import { Code2, Server, Database, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

const services = [
  {
    title: "Full-Stack Development",
    description:
      "End-to-end builds for modern products, from UI to APIs and data.",
    icon: Code2,
  },
  {
    title: "Frontend Development",
    description: "Fast, polished interfaces with strong UX and performance.",
    icon: Sparkles,
  },
  {
    title: "Backend & API Development",
    description: "Reliable APIs and backend logic for real workflows.",
    icon: Server,
  },
  {
    title: "Database Design",
    description:
      "Clean database structures that stay practical as products grow.",
    icon: Database,
  },
];

export function Services() {
  return (
    <section id="services" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Services"
          title="Practical support for modern products"
          description="Focused help for web apps, interfaces, APIs, and backend architecture."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="h-full">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-950 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-100">
                    {service.description}
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
