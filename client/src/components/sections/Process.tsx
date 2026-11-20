import { processSteps } from "../../data/process";
import AnimatedSection from "../ui/AnimatedSection";
import SectionHeading from "../ui/SectionHeading";
import { motion } from "framer-motion";

export default function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden border-t border-white/5 bg-[#090D16] py-28 md:py-36"
    >
      {/* Dynamic Background Glows */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-3/4 h-[400px] w-[400px] translate-x-1/3 rounded-full bg-indigo-600/5 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <SectionHeading
            label="Engineering Workflow"
            title="How I deliver reliable digital solutions"
            description="A battle-tested process designed to minimize risk, maximize quality, and ensure the final product perfectly aligns with business goals."
            align="center"
          />
        </AnimatedSection>

        <div className="relative mx-auto mt-16 max-w-5xl">
          {/* ================================================= */}
          {/* CENTER TIMELINE (Desktop)                       */}
          {/* ================================================= */}
          <div className="absolute bottom-0 left-1/2 top-4 hidden w-px -translate-x-1/2 md:block">
            {/* The base track */}
            <div className="h-full w-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            {/* The Shooting Star / Comet */}
            <motion.div
              className="absolute left-1/2 top-0 h-32 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-blue-500 to-white shadow-[0_0_15px_rgba(59,130,246,0.8)]"
              animate={{ y: ["-100%", "800%"] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <div className="space-y-12 md:space-y-24">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <div key={step.step} className="relative z-10 w-full">
                  {/* ================================================= */}
                  {/* DESKTOP ALTERNATING LAYOUT                        */}
                  {/* ================================================= */}
                  <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6 lg:gap-12">
                    {/* LEFT SIDE CARD */}
                    <div className="flex w-full items-center justify-end">
                      {isLeft ? (
                        <AnimatedSection
                          delay={index * 0.1}
                          className="w-full max-w-[440px]"
                        >
                          <ProcessCard
                            step={step.step}
                            title={step.title}
                            description={step.description}
                            icon={<Icon size={20} />}
                            side="left"
                          />
                        </AnimatedSection>
                      ) : (
                        <div className="w-full" />
                      )}
                    </div>

                    {/* CENTER GLOWING NODE */}
                    <div className="relative flex items-center justify-center">
                      <AnimatedSection delay={index * 0.1}>
                        <div className="group relative flex h-14 w-14 items-center justify-center">
                          {/* Inner pulse */}
                          <span className="absolute inset-0 animate-ping rounded-full bg-blue-500/20 duration-1000" />
                          {/* Node body */}
                          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/40 bg-[#0C121E] text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-transform duration-300 group-hover:scale-110">
                            <Icon size={18} />
                          </div>
                          {/* Connector lines to cards */}
                          <div
                            className={`absolute top-1/2 h-px w-8 -translate-y-1/2 bg-gradient-to-r ${isLeft ? "right-full from-transparent to-blue-500/50" : "left-full from-blue-500/50 to-transparent"}`}
                          />
                        </div>
                      </AnimatedSection>
                    </div>

                    {/* RIGHT SIDE CARD */}
                    <div className="flex w-full items-center justify-start">
                      {!isLeft ? (
                        <AnimatedSection
                          delay={index * 0.1}
                          className="w-full max-w-[440px]"
                        >
                          <ProcessCard
                            step={step.step}
                            title={step.title}
                            description={step.description}
                            icon={<Icon size={20} />}
                            side="right"
                          />
                        </AnimatedSection>
                      ) : (
                        <div className="w-full" />
                      )}
                    </div>
                  </div>

                  {/* ================================================= */}
                  {/* MOBILE STACKED LAYOUT                             */}
                  {/* ================================================= */}
                  <div className="md:hidden">
                    <AnimatedSection delay={index * 0.05}>
                      <ProcessCard
                        step={step.step}
                        title={step.title}
                        description={step.description}
                        icon={<Icon size={20} />}
                        side="mobile"
                      />
                    </AnimatedSection>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// =================================================
// REUSABLE PREMIUM CARD COMPONENT
// =================================================
function ProcessCard({
  step,
  title,
  description,
  icon,
  side,
}: {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  side: "left" | "right" | "mobile";
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0C121E] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)]">
      {/* Magic Top Glow Border on Hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Massive Watermark Number */}
      <span className="pointer-events-none absolute -bottom-6 -right-2 text-[120px] font-black leading-none text-white/[0.02] transition-colors duration-500 group-hover:text-blue-500/[0.03]">
        0{step}
      </span>

      <div className="relative z-10">
        {/* Card Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 shadow-inner">
            {icon}
          </div>
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-widest text-blue-300">
            PHASE {String(step).padStart(2, "0")}
          </span>
        </div>

        {/* Card Body */}
        <h3 className="mb-3 text-xl font-bold tracking-tight text-white group-hover:text-blue-50">
          {title}
        </h3>

        <p className="text-sm leading-relaxed text-slate-400 group-hover:text-slate-300">
          {description}
        </p>
      </div>
    </div>
  );
}
