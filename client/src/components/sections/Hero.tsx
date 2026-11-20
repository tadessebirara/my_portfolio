import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  User,
  Eye,
  X,
  ExternalLink,
  FileText,
  AlertCircle,
  Loader2,
  Download,
} from "lucide-react";

// ========================================
// CONFIGURATION
// ========================================

const heroImage = "/profile.jpg";
const cvFile = "../../../public/document/mycv.pdf";

// ========================================
// HERO COMPONENT
// ========================================

const Hero: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [cvLoading, setCvLoading] = useState(true);
  const [cvError, setCvError] = useState(false);

  // Open CV modal
  const openCV = () => {
    setCvLoading(true);
    setCvError(false);
    setIsCVOpen(true);
  };

  // Close CV modal
  const closeCV = () => {
    setIsCVOpen(false);
  };

  // Escape key and body scroll handling
  useEffect(() => {
    if (!isCVOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCVOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCVOpen]);

  return (
    <>
      {/* ========================================
          HERO SECTION
      ======================================== */}

      <section
        id="home"
        className="relative min-h-screen overflow-hidden bg-[#080b12] px-6 pb-20 pt-32 text-white md:px-12 lg:px-20"
      >
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />

          <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[130px]" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:55px_55px]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Availability */}
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <span className="text-xs font-medium tracking-wide text-emerald-300">
                Available for Opportunities
              </span>
            </div>

            {/* Introduction */}
            <div className="space-y-5">
              <p className="font-mono text-sm tracking-widest text-cyan-400">
                HELLO, I'M TADESSE BIRARA
              </p>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Architecting{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Enterprise Software
                </span>{" "}
                That Scales.
              </h1>

              <p className="max-w-xl text-base leading-8 text-gray-400 md:text-lg">
                Full-Stack Software Engineer focused on building practical,
                scalable, and user-centered digital solutions through modern
                technologies and thoughtful system design.
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-lg bg-cyan-500 px-6 py-3.5 text-sm font-semibold text-[#06111b] transition hover:bg-cyan-400"
              >
                Contact Me
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.08]"
              >
                <Terminal size={17} />
                View Projects
              </a>

              {/* VIEW CV BUTTON */}
              <button
                type="button"
                onClick={openCV}
                className="inline-flex items-center gap-3 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-6 py-3.5 text-sm font-semibold text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-400/20"
              >
                <Eye size={17} />
                View My CV
              </button>
            </div>

            {/* SKILLS */}
            <div className="flex flex-wrap gap-6 border-t border-white/10 pt-7">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <ShieldCheck size={17} className="text-cyan-400" />
                Secure Development
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle2 size={17} className="text-cyan-400" />
                Scalable Solutions
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <User size={17} className="text-cyan-400" />
                User Focused
              </div>
            </div>
          </motion.div>

          {/* RIGHT PROFILE IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-5 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-600/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#101722] p-3 shadow-2xl">
              {!imgError ? (
                <img
                  src={heroImage}
                  alt="Tadesse Birara"
                  onError={() => setImgError(true)}
                  className="h-[420px] w-full rounded-xl object-cover object-center"
                />
              ) : (
                <div className="flex h-[420px] items-center justify-center rounded-xl bg-[#151f2d]">
                  <User size={90} className="text-gray-600" />
                </div>
              )}

              <div className="absolute bottom-7 left-7 right-7 rounded-xl border border-white/10 bg-[#080b12]/90 p-4 backdrop-blur-md">
                <p className="text-lg font-semibold text-white">
                  Tadesse Birara
                </p>

                <p className="mt-1 text-sm text-cyan-400">
                  Full-Stack Software Engineer
                </p>
              </div>
            </div>

            <div className="absolute -right-5 top-10 rounded-lg border border-cyan-400/20 bg-[#101722] px-4 py-3 shadow-xl sm:-right-10">
              <p className="text-xs text-gray-400">Focused on</p>

              <p className="mt-1 text-sm font-semibold text-cyan-300">
                Software Engineering
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          COMPACT CV PREVIEW MODAL
      ======================================== */}

      <AnimatePresence>
        {isCVOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeCV();
              }
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cv-title"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="flex h-[82dvh] max-h-[760px] min-h-[320px] w-full max-w-[680px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-2xl"
            >
              {/* MODAL HEADER */}
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                    <FileText size={19} />
                  </div>

                  <div className="min-w-0">
                    <h2
                      id="cv-title"
                      className="truncate text-sm font-semibold text-white"
                    >
                      My Curriculum Vitae
                    </h2>

                    <p className="mt-0.5 text-xs text-gray-500">
                      PDF Document · Tadesse Birara
                    </p>
                  </div>
                </div>

                {/* CLOSE BUTTON */}
                <button
                  type="button"
                  onClick={closeCV}
                  aria-label="Close CV preview"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white"
                >
                  <X size={19} />
                </button>
              </div>

              {/* PDF PREVIEW AREA */}
              <div className="relative min-h-0 flex-1 bg-[#252a33]">
                {/* LOADING */}
                {cvLoading && !cvError && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#252a33]">
                    <Loader2 size={28} className="animate-spin text-cyan-400" />

                    <p className="text-sm text-gray-300">
                      Loading CV preview...
                    </p>
                  </div>
                )}

                {/* ERROR */}
                {cvError ? (
                  <div className="flex h-full flex-col items-center justify-center px-5 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/10">
                      <AlertCircle size={27} className="text-amber-400" />
                    </div>

                    <h3 className="text-base font-semibold text-white">
                      Unable to display your CV
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-gray-400">
                      The PDF preview could not be displayed. Please check the
                      file path or open the document directly.
                    </p>

                    <a
                      href={cvFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-[#06111b] transition hover:bg-cyan-400"
                    >
                      <ExternalLink size={15} />
                      Open CV
                    </a>
                  </div>
                ) : (
                  <iframe
                    key={cvFile}
                    src={cvFile}
                    title="Tadesse Birara CV Preview"
                    onLoad={() => setCvLoading(false)}
                    onError={() => {
                      setCvLoading(false);
                      setCvError(true);
                    }}
                    className={`h-full w-full border-0 bg-white ${
                      cvLoading ? "invisible" : "visible"
                    }`}
                  />
                )}
              </div>

              {/* MODAL FOOTER */}
              <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 bg-[#111827] px-4 py-3 sm:px-5">
                <span className="hidden text-xs text-gray-500 sm:block">
                  Curriculum Vitae · PDF
                </span>

                <div className="ml-auto flex items-center gap-2">
                  {/* DOWNLOAD */}
                  <a
                    href={cvFile}
                    download="Tadesse-Birara-CV.pdf"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-gray-300 transition hover:border-cyan-400/30 hover:bg-white/5 hover:text-cyan-300"
                  >
                    <Download size={15} />
                    Download
                  </a>

                  {/* OPEN FULL PDF */}
                  <a
                    href={cvFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-gray-300 transition hover:border-cyan-400/30 hover:bg-white/5 hover:text-cyan-300"
                  >
                    <ExternalLink size={15} />
                    <span className="hidden sm:inline">Full View</span>
                    <span className="sm:hidden">Open</span>
                  </a>

                  {/* CLOSE */}
                  <button
                    type="button"
                    onClick={closeCV}
                    className="rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-[#06111b] transition hover:bg-cyan-400"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Hero;
