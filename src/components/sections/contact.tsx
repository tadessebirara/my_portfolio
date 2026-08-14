"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Rocket } from "lucide-react";

const contactInfo = [
  { icon: Mail,   text: "tadessebirara7@gmail.com", href: "mailto:tadessebirara7@gmail.com" },
  { icon: Phone,  text: "+251 90 565 3221",         href: "tel:+251905653221"               },
  { icon: MapPin, text: "Addis Ababa, Ethiopia",     href: undefined                         },
];

export function ContactSection() {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        setStatus("error");
        setErrMsg(data?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrMsg("Network error. Please try again.");
    }
  }

  return (
    <section id="contact" className="relative px-6 py-16 sm:py-20 lg:px-10 lg:py-28">
      {/* stronger section glow for visibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(37,99,235,0.18) 0%, transparent 65%)",
            "radial-gradient(ellipse 50% 40% at 0% 80%, rgba(79,70,229,0.10) 0%, transparent 55%)",
          ].join(","),
        }}
      />

      <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 sm:space-y-4"
        >
          <span className="section-eyebrow">Contact</span>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Have a project in mind? I&apos;d love to hear from you. Send me a message and I&apos;ll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* ── CTA banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14"
          style={{
            background: "linear-gradient(135deg, rgba(37,99,235,0.18) 0%, rgba(79,70,229,0.12) 50%, rgba(124,58,237,0.15) 100%)",
            border: "1px solid rgba(37,99,235,0.28)",
          }}
        >
          <div className="grid gap-8 md:gap-12 lg:grid-cols-[1fr_440px] lg:gap-16">

            {/* ── LEFT — headline + contact info ── */}
            <div className="flex flex-col gap-6 sm:gap-8">
              {/* rocket icon */}
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{
                  background: "rgba(37,99,235,0.20)",
                  border: "1px solid rgba(37,99,235,0.40)",
                }}
              >
                <Rocket className="h-7 w-7" style={{ color: "var(--accent-cyan)" }} />
              </span>

              <div className="space-y-3">
                <h3 className="text-2xl font-extrabold text-white lg:text-3xl">
                  Let&apos;s Work Together
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Have a project in mind or want to build the future together?
                  Let&apos;s connect and create something amazing!
                </p>
              </div>

              {/* contact details */}
              <div className="flex flex-col gap-4">
                {contactInfo.map(({ icon: Icon, text, href }) => (
                  <div
                    key={text}
                    className="flex items-center gap-4"
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: "rgba(37,99,235,0.15)",
                        border: "1px solid rgba(37,99,235,0.30)",
                      }}
                    >
                      <Icon className="h-4 w-4" style={{ color: "var(--accent-cyan)" }} />
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium transition-colors duration-200 hover:text-white"
                        style={{ color: "#cbd5e1" }}
                      >
                        {text}
                      </a>
                    ) : (
                      <span className="text-sm font-medium" style={{ color: "#cbd5e1" }}>
                        {text}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT — contact form ── */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex flex-col gap-5 rounded-2xl p-6 lg:p-8"
              style={{
                background: "rgba(11,17,32,0.75)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div>
                <label htmlFor="c-name" className="mb-2 block text-xs font-semibold uppercase tracking-wider" style={{ color: "#94a3b8" }}>
                  Your Name
                </label>
                <input
                  id="c-name" type="text" placeholder="John Doe" required
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="c-email" className="mb-2 block text-xs font-semibold uppercase tracking-wider" style={{ color: "#94a3b8" }}>
                  Email Address
                </label>
                <input
                  id="c-email" type="email" placeholder="john@example.com" required
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="c-msg" className="mb-2 block text-xs font-semibold uppercase tracking-wider" style={{ color: "#94a3b8" }}>
                  Message
                </label>
                <textarea
                  id="c-msg" rows={5}
                  placeholder="Tell me about your project..."
                  required className="resize-none"
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-gradient mt-1 flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {status === "loading" ? (
                  "Sending…"
                ) : (
                  <><Send className="h-4 w-4" /> Send Message</>
                )}
              </button>

              {status === "success" && (
                <p className="rounded-lg px-4 py-3 text-xs font-medium" style={{ background: "rgba(52,211,153,0.10)", color: "#34d399", border: "1px solid rgba(52,211,153,0.20)" }}>
                  ✓ Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="rounded-lg px-4 py-3 text-xs font-medium" style={{ background: "rgba(248,113,113,0.10)", color: "#f87171", border: "1px solid rgba(248,113,113,0.20)" }}>
                  {errMsg}
                </p>
              )}
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
