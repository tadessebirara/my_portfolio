import { processSteps } from "../../data/process";
import AnimatedSection from "../ui/AnimatedSection";
import SectionHeading from "../ui/SectionHeading";
import { motion } from "framer-motion";

export default function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden border-t border-white/10 bg-[#090D16] py-20 md:py-28"
    >
      {/* Background Glows */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-3/4 h-[400px] w-[400px] translate-x-1/3 rounded-full bg-indigo-600/[0.07] blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <AnimatedSection>
          <SectionHeading
            label="Engineering Workflow"
            title="How I deliver reliable digital solutions"
            description="A battle-tested process designed to minimize risk, maximize quality, and ensure the final product perfectly aligns with business goals."
            align="center"
          />
        </AnimatedSection>

        <div className="relative mx-auto mt-16 max-w-5xl">
          {/* Desktop Center Timeline */}
          <div className="absolute bottom-0 left-1/2 top-4 hidden w-[2px] -translate-x-1/2 md:block">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-blue-400/40 to-transparent" />

            <motion.div
              className="absolute left-1/2 top-0 h-32 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-blue-400 to-white shadow-[0_0_15px_rgba(59,130,246,0.9)]"
              animate={{ y: ["-100%", "800%"] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <div className="space-y-12 md:space-y-20">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <div key={step.step} className="relative z-10 w-full">
                  {/* Desktop Alternating Layout */}
                  <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6 lg:gap-12">
                    {/* Left Card */}
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
                            icon={<Icon size={21} />}
                          />
                        </AnimatedSection>
                      ) : (
                        <div className="w-full" />
                      )}
                    </div>

                    {/* Center Timeline Node */}
                    <div className="relative flex items-center justify-center">
                      <AnimatedSection delay={index * 0.1}>
                        <div className="group relative flex h-16 w-16 items-center justify-center">
                          <span className="absolute inset-0 animate-ping rounded-full bg-blue-500/15 duration-1000" />

                          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-400/70 bg-[#0C1627] text-blue-300 shadow-[0_0_25px_rgba(59,130,246,0.25)] transition-all duration-300 group-hover:scale-110 group-hover:border-blue-300 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                            <Icon size={19} />
                          </div>

                          <div
                            className={`absolute top-1/2 h-[2px] w-8 -translate-y-1/2 ${
                              isLeft
                                ? "right-full bg-gradient-to-r from-transparent to-blue-400/70"
                                : "left-full bg-gradient-to-r from-blue-400/70 to-transparent"
                            }`}
                          />
                        </div>
                      </AnimatedSection>
                    </div>

                    {/* Right Card */}
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
                            icon={<Icon size={21} />}
                          />
                        </AnimatedSection>
                      ) : (
                        <div className="w-full" />
                      )}
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden">
                    <AnimatedSection delay={index * 0.05}>
                      <ProcessCard
                        step={step.step}
                        title={step.title}
                        description={step.description}
                        icon={<Icon size={21} />}
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

// Reusable Process Card
function ProcessCard({
  step,
  title,
  description,
  icon,
}: {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group relative isolate overflow-hidden rounded-2xl border border-slate-500/50 bg-[#101A2B] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/80 hover:shadow-[0_15px_40px_rgba(37,99,235,0.16)] sm:p-7">
      {/* Visible Top Accent */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent" />

      {/* Subtle Hover Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/[0.07] via-transparent to-indigo-500/[0.05] opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Watermark Number */}
      <span className="pointer-events-none absolute -bottom-6 -right-2 text-[110px] font-black leading-none text-white/[0.035] transition-colors duration-300 group-hover:text-blue-400/[0.08]">
        {String(step).padStart(2, "0")}
      </span>

      <div className="relative z-10">
        {/* Card Header */}
        <div className="mb-6 flex items-center justify-between">
          {/* Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/50 bg-blue-500/15 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.12)] transition-all duration-300 group-hover:border-blue-300/80 group-hover:bg-blue-500/25">
            {icon}
          </div>

          {/* Phase Badge */}
          <span className="rounded-full border border-blue-400/40 bg-blue-500/15 px-3 py-1.5 text-[11px] font-bold tracking-[0.15em] text-blue-200">
            PHASE {String(step).padStart(2, "0")}
          </span>
        </div>

        {/* Card Title */}
        <h3 className="mb-3 text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-blue-200 sm:text-xl">
          {title}
        </h3>

        {/* Card Description */}
        <p className="text-sm leading-7 text-slate-300 transition-colors duration-300 group-hover:text-slate-200">
          {description}
        </p>
      </div>
    </div>
  );
}
