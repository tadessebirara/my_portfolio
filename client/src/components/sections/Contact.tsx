import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  Mail,
  AlertCircle,
} from "lucide-react";

import { submitContactForm, type ContactPayload } from "../../lib/api";

/* ============================================================
   SOCIAL / CONTACT ICONS
   ============================================================ */

const BrandIcons = {
  LinkedIn: () => (
    <svg
      className="w-5 h-5 text-cyan-400"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  ),

  GitHub: () => (
    <svg
      className="w-5 h-5 text-slate-200"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.09.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.39-1.305.705-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.405.345.765 1.02.765 2.055 0 1.485-.015 2.685-.015 3.06 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),

  X: () => (
    <svg
      className="w-5 h-5 text-slate-300"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),

  WhatsApp: () => (
    <svg
      className="w-5 h-5 text-emerald-400"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.275-.883-.71-1.48-1.587-1.653-1.884-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.834 11.815 0 005.71 1.483h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),

  Telegram: () => (
    <svg
      className="w-5 h-5 text-sky-400"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.411-.168.56-.359.747-.557.763-.433.036-.762-.29-.118-.523-.559-.366-1.531-1.008-2.158-1.419-.871-.572-.306-.887.19-1.402.13-.135 2.38-2.181 2.424-2.368.005-.024.009-.115-.044-.162-.053-.047-.132-.031-.189-.018-.081.018-1.372.871-3.874 2.561-.366.252-.698.376-.995.369-.328-.008-.959-.187-1.428-.34-.576-.188-1.033-.288-.993-.608.021-.167.243-.338.665-.514 2.607-1.135 4.347-1.884 5.221-2.247 2.484-1.031 3.001-1.21 3.337-1.216.074 0 .24.018.347.106.09.074.116.175.127.247.011.072.025.236.014.397z" />
    </svg>
  ),
};

/* ============================================================
   SOCIAL LINKS
   Replace example URLs with your real public profile URLs.
   ============================================================ */

const socialLinks = [
  {
    name: "Email",
    subtitle: "Formal Inquiries",
    href: "mailto:tadessebirara7@gmail.com",
    icon: Mail,
    hover: "hover:border-blue-500/40",
    external: false,
  },
  {
    name: "LinkedIn",
    subtitle: "Professional Network",
    href: "https://www.linkedin.com/in/yourprofile",
    icon: BrandIcons.LinkedIn,
    hover: "hover:border-cyan-500/40",
    external: true,
  },
  {
    name: "WhatsApp",
    subtitle: "Direct Conversation",
    href: "https://wa.me/251905653221",
    icon: BrandIcons.WhatsApp,
    hover: "hover:border-emerald-500/40",
    external: true,
  },
  {
    name: "GitHub",
    subtitle: "Code & Projects",
    href: "https://github.com/tadessebirara",
    icon: BrandIcons.GitHub,
    hover: "hover:border-slate-400/40",
    external: true,
  },
  {
    name: "Telegram",
    subtitle: "Direct Message",
    href: "https://t.me/@big_pecture",
    icon: BrandIcons.Telegram,
    hover: "hover:border-sky-500/40",
    external: true,
  },
  {
    name: "X (Twitter)",
    subtitle: "Tech Community",
    href: "https://x.com/tadessebirara21",
    icon: BrandIcons.X,
    hover: "hover:border-slate-400/40",
    external: true,
  },
];

/* ============================================================
   CONTACT COMPONENT
   ============================================================ */

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactPayload>({
    name: "",
    email: "",
    projectType: "",
    message: "",
    agreement: false,
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null as string | null,
  });

  /* ------------------------------------------------------------
     FORM SUBMISSION
     ------------------------------------------------------------ */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status.loading) return;

    if (!formData.agreement) {
      setStatus({
        loading: false,
        success: false,
        error: "Please agree to the project discussion terms.",
      });
      return;
    }

    setStatus({
      loading: true,
      success: false,
      error: null,
    });

    try {
      const response = await submitContactForm(formData);

      if (response.success) {
        setStatus({
          loading: false,
          success: true,
          error: null,
        });

        setFormData({
          name: "",
          email: "",
          projectType: "",
          message: "",
          agreement: false,
        });
      } else {
        setStatus({
          loading: false,
          success: false,
          error:
            response.error ||
            "Unable to send your message. Please try again later.",
        });
      }
    } catch {
      setStatus({
        loading: false,
        success: false,
        error:
          "A connection error occurred. Please check your internet connection and try again.",
      });
    }
  };

  /* ------------------------------------------------------------
     FORM RESET
     ------------------------------------------------------------ */

  const resetSuccessState = () => {
    setStatus({
      loading: false,
      success: false,
      error: null,
    });
  };

  /* ------------------------------------------------------------
     UI
     ------------------------------------------------------------ */

  return (
    <section
      id="contact"
      className="relative py-28 md:py-36 bg-[#090D16] overflow-hidden"
    >
      {/* Background Ambient Glows */}

      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[150px] pointer-events-none" />

      {/* Micro-Grid Overlay */}

      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ======================================================
            SECTION HEADER
        ====================================================== */}

        <div className="max-w-3xl mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-blue-400 font-mono text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          >
            LET'S CONNECT
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-[1.1]"
          >
            Let's Build Something
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              That Moves Your Business Forward.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl"
          >
            Have a project, business challenge, or idea in mind? Share the
            details below or contact me directly. Let's explore how technology
            can help you achieve your goals.
          </motion.p>
        </div>

        {/* ======================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* ====================================================
              LEFT COLUMN: CONTACT CHANNELS
          ==================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Social Contact Cards */}

            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    aria-label={`Contact me through ${social.name}`}
                    className={`group p-5 rounded-2xl bg-white/[0.02] hover:bg-[#11182A] border border-white/[0.06] ${social.hover} transition-all duration-300 flex flex-col items-center justify-center text-center gap-3`}
                  >
                    <Icon />

                    <div>
                      <span className="block text-sm font-semibold text-white">
                        {social.name}
                      </span>

                      <span className="block text-[10px] text-slate-400">
                        {social.subtitle}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Professional Reassurance Card */}

            <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-950/20 to-transparent border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-blue-400">
                <Clock className="w-4 h-4" />
                <span>Clear Communication. Practical Solutions.</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Every inquiry receives careful attention. I will review your
                goals, understand the requirements, and discuss a practical
                approach, including possible solutions, scope, and next steps.
              </p>

              <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  Confidential project discussions available upon request.
                </span>
              </div>
            </div>
          </motion.div>

          {/* ====================================================
              RIGHT COLUMN: CONTACT FORM
          ==================================================== */}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

            <div className="relative bg-[#0A0F1A]/95 border border-white/[0.08] rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
              {/* ==================================================
                  SUCCESS STATE
              ================================================== */}

              {status.success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-4"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    Message Received
                  </h3>

                  <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. Your message has been submitted
                    successfully. I'll review your inquiry and get back to you
                    as soon as possible.
                  </p>

                  <button
                    type="button"
                    onClick={resetSuccessState}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-white transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                /* ==================================================
                   FORM STATE
                ================================================== */

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* API Error Banner */}

                  {status.error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-2.5"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />

                      <span className="text-xs text-red-300 leading-relaxed">
                        {status.error}
                      </span>
                    </motion.div>
                  )}

                  {/* Full Name */}

                  <div className="group relative bg-[#0D1322] border border-white/10 rounded-2xl focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all overflow-hidden">
                    <label
                      htmlFor="contact-name"
                      className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider pt-3.5 px-4 group-focus-within:text-blue-400 transition-colors"
                    >
                      Full Name *
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      maxLength={100}
                      disabled={status.loading}
                      value={formData.name}
                      placeholder="Enter your full name"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      className="w-full bg-transparent text-white px-4 pb-3.5 pt-1 outline-none text-sm placeholder:text-slate-600 disabled:opacity-50"
                    />
                  </div>

                  {/* Email Address */}

                  <div className="group relative bg-[#0D1322] border border-white/10 rounded-2xl focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all overflow-hidden">
                    <label
                      htmlFor="contact-email"
                      className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider pt-3.5 px-4 group-focus-within:text-blue-400 transition-colors"
                    >
                      Email Address *
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      disabled={status.loading}
                      value={formData.email}
                      placeholder="you@example.com"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      className="w-full bg-transparent text-white px-4 pb-3.5 pt-1 outline-none text-sm placeholder:text-slate-600 disabled:opacity-50"
                    />
                  </div>

                  {/* Business / Project Type */}

                  <div className="group relative bg-[#0D1322] border border-white/10 rounded-2xl focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all overflow-hidden">
                    <label
                      htmlFor="contact-project"
                      className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider pt-3.5 px-4 group-focus-within:text-blue-400 transition-colors"
                    >
                      Business / Company (Optional)
                    </label>

                    <input
                      id="contact-project"
                      name="projectType"
                      type="text"
                      maxLength={150}
                      disabled={status.loading}
                      value={formData.projectType}
                      placeholder="Company or project name"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projectType: e.target.value,
                        })
                      }
                      className="w-full bg-transparent text-white px-4 pb-3.5 pt-1 outline-none text-sm placeholder:text-slate-600 disabled:opacity-50"
                    />
                  </div>

                  {/* Project Details */}

                  <div className="group relative bg-[#0D1322] border border-white/10 rounded-2xl focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all overflow-hidden">
                    <label
                      htmlFor="contact-message"
                      className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider pt-3.5 px-4 group-focus-within:text-blue-400 transition-colors"
                    >
                      Project Details & Scope *
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      maxLength={5000}
                      disabled={status.loading}
                      value={formData.message}
                      placeholder="Describe your project, business challenge, or requirements..."
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        })
                      }
                      className="w-full bg-transparent text-white px-4 pb-3.5 pt-1 outline-none text-sm resize-none placeholder:text-slate-600 disabled:opacity-50"
                    />
                  </div>

                  {/* Agreement Checkbox */}

                  <div className="pt-2 pb-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input
                          id="contact-agreement"
                          name="agreement"
                          type="checkbox"
                          className="peer sr-only"
                          disabled={status.loading}
                          checked={formData.agreement}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              agreement: e.target.checked,
                            })
                          }
                        />

                        <div className="w-5 h-5 rounded-md border border-white/20 bg-[#0D1322] peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-400 transition-all flex items-center justify-center">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 text-white ${
                              formData.agreement
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-50"
                            } transition-all`}
                          />
                        </div>
                      </div>

                      <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed select-none">
                        I agree to discuss the project budget, timeline, and
                        technical requirements during our initial consultation.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}

                  <button
                    type="submit"
                    disabled={status.loading || !formData.agreement}
                    className="w-full relative group overflow-hidden flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                  >
                    {status.loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending Message...
                      </span>
                    ) : (
                      <>
                        <span>Send Project Inquiry</span>

                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[10px] text-slate-500 pt-1">
                    Your information is used only to respond to your inquiry.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
