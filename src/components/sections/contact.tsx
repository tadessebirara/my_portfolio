"use client";

import { useState } from "react";
import { Mail, Send, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });

    if (response.ok) {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
    } else {
      const data = await response.json();
      setStatus("error");
      setErrorMessage(data?.error || "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact"
          title="Have a project in mind?"
          description="Let's discuss how I can turn your idea into a reliable web application."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-900/90"
          >
            <p className="text-sm uppercase tracking-[0.32em] text-sky-600 dark:text-sky-400">
              Reach out
            </p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Ready to collaborate?
            </h3>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-100">
              Send a note with your project goals and I’ll follow up with a
              straightforward plan for delivery.
            </p>
            <div className="mt-8 space-y-4 text-sm text-slate-600 dark:text-slate-100">
              <a
                href="mailto:tadesse@example.com"
                className="flex items-center gap-3 transition hover:text-slate-900 dark:hover:text-white"
              >
                <Mail className="h-5 w-5 text-sky-500" />
                <span>tadessebirara7@gmail.com</span>
              </a>
              <a
                href="https://github.com"
                className="flex items-center gap-3 transition hover:text-slate-900 dark:hover:text-white"
              >
                <Github className="h-5 w-5 text-sky-500" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                className="flex items-center gap-3 transition hover:text-slate-900 dark:hover:text-white"
              >
                <Linkedin className="h-5 w-5 text-sky-500" />
                <span>LinkedIn</span>
              </a>
              <div className="flex items-center gap-3">
                <Send className="h-5 w-5 text-sky-500" />
                <span>Reply time within one business day</span>
              </div>
            </div>
          </motion.div>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="space-y-5 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-900/90"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-900 dark:text-slate-100"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formState.name}
                onChange={(event) =>
                  setFormState({ ...formState, name: event.target.value })
                }
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-900/30"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-900 dark:text-slate-100"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formState.email}
                onChange={(event) =>
                  setFormState({ ...formState, email: event.target.value })
                }
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-900/30"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-900 dark:text-slate-100"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={formState.message}
                onChange={(event) =>
                  setFormState({ ...formState, message: event.target.value })
                }
                className="mt-2 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-900/30"
              />
            </div>
            <div className="space-y-3">
              <Button
                type="submit"
                size="lg"
                disabled={status === "loading"}
                className="hover:-translate-y-0.5"
              >
                {status === "loading" ? "Sending..." : "Send message"}
              </Button>
              {status === "success" ? (
                <p className="text-sm text-green-600 dark:text-green-400">
                  Message sent successfully.
                </p>
              ) : null}
              {status === "error" ? (
                <p className="text-sm text-rose-600 dark:text-rose-400">
                  {errorMessage}
                </p>
              ) : null}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
