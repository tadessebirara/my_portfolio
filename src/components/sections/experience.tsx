"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Experience"
          title="A steady record of building and improving modern web products"
          description="A practical timeline of recent work, engineering responsibility, and product-focused delivery."
        />
        <div className="mt-12 space-y-6">
          {experience.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-sky-600 dark:text-sky-400">
                      {item.period}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-100">
                      {item.company}
                    </p>
                  </div>
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 sm:mt-0">
                    {item.technologies.join(" · ")}
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 dark:text-white">
                      Responsibilities
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-100">
                      {item.responsibilities.map((line) => (
                        <li key={line} className="flex items-start gap-2">
                          <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-sky-500" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 dark:text-white">
                      Highlights
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-100">
                      {item.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className="flex items-start gap-2"
                        >
                          <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-sky-500" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
