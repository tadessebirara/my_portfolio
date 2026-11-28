import React, { useState } from "react";
import { Code2, Lightbulb, Target, Users, User } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";
import SectionHeading from "../ui/SectionHeading";

// 1. Put your image in the `public/` directory (e.g. public/profile.jpg)
// 2. Change this string to "/profile.jpg" when ready.
const profileImage = "/myimage.png";

const points = [
  {
    icon: Target,
    text: "I start with the business problem, not the code",
  },
  {
    icon: Code2,
    text: "I write clean, maintainable, production-ready software",
  },
  {
    icon: Users,
    text: "I design solutions around real users and operations",
  },
  {
    icon: Lightbulb,
    text: "I improve continuously and communicate clearly",
  },
];

export function About() {
  const [imgError, setImgError] = useState<boolean>(false);

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-white/5 bg-[#0C121E] py-24 md:py-28"
    >
      {/* Background Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/0.04 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <SectionHeading
            label="About"
            title="I Designe and Develope solutions that create business value"
            description="I am a Software Engineer focused on turning real-world challenges into reliable digital products."
          />
        </AnimatedSection>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Photo Frame Container */}
          <AnimatedSection delay={0.05}>
            <div className="group relative mx-auto w-full max-w-md lg:mx-0">
              {/* Ambient Glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />

              {/* Decorative Frame */}
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 h-full w-full rounded-[1.75rem] border border-blue-400/20 bg-blue-500/5"
              />

              {/* Main Image Container */}
              <div className="relative rounded-[1.75rem] border border-white/10 bg-[#0D1322] p-3 shadow-2xl shadow-black/40">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-[#111A2A] flex items-center justify-center">
                  {!imgError ? (
                    <img
                      src={profileImage}
                      alt="Software Engineer Portrait"
                      loading="eager"
                      decoding="async"
                      onError={() => setImgError(true)}
                      className="h-full w-full object-cover object-top contrast-[1.05] saturate-[0.9] transition duration-700 ease-out group-hover:scale-[1.03] group-hover:saturate-100"
                    />
                  ) : (
                    /* Fallback display if image fails to load */
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <div className="h-20 w-20 rounded-full bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400 mb-4">
                        <User className="w-10 h-10" />
                      </div>
                      <p className="text-white font-semibold text-sm mb-1">Image Not Found</p>
                      <p className="text-xs text-slate-400 max-w-[200px]">
                        Place your image at <code className="text-blue-400 bg-blue-500/10 px-1 py-0.5 rounded">public/profile.jpg</code>
                      </p>
                    </div>
                  )}

                  {/* Gradient shading */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/20 to-transparent"
                  />

                  {/* Glassmorphic Caption Card */}
                  <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/10 bg-[#0D1322]/90 p-4 shadow-xl backdrop-blur-md">
                    <div className="mb-2 h-0.5 w-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
                    <p className="text-sm font-semibold tracking-tight text-white">
                      Software Engineer
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Web applications, mobile solutions & API architecture
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Text & Key Points Column */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-5 text-base leading-relaxed text-slate-400 md:text-lg">
              <p>
                I help business owners, startups, and organizations transform
                ideas and operational problems into practical digital systems.
              </p>

              <p>
                I don’t just write features. I analyze requirements, design
                architecture, and build web and mobile solutions that are clear,
                scalable, and useful.
              </p>

              <p>
                Whether you need a business website, management system, mobile
                app, or backend API, I focus on understanding the real problem
                first — then Desiging and developing the right solution.
              </p>

              {/* Points Grid */}
              <div className="grid gap-3 pt-3 sm:grid-cols-2">
                {points.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="group/card flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 transition-all duration-300 hover:border-blue-400/30 hover:bg-blue-500/[0.05]"
                  >
                    <div className="shrink-0 rounded-lg border border-blue-400/20 bg-blue-500/10 p-2 text-blue-400 transition-colors group-hover/card:border-blue-400/40 group-hover/card:text-blue-300">
                      <Icon size={18} aria-hidden="true" />
                    </div>

                    <p className="text-sm leading-relaxed text-slate-300 font-medium">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

export default About;
