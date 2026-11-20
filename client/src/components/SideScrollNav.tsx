
import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const sections = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "services", label: "SERVICES" },
  { id: "skills", label: "EXPERTISE" },
  { id: "projects", label: "WORK" },
  { id: "process", label: "PROCESS" },
  { id: "why-me", label: "WHY ME" },
  { id: "contact", label: "CONTACT" },
];

// Responsive navigation spacing
const ITEM_HEIGHT = 60;

export const SideScrollNav: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let ticking = false;

    const updateNavigation = () => {
      const scrollY = window.scrollY;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const currentProgress =
        maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;

      setProgress(currentProgress);

      const detectionPoint = scrollY + window.innerHeight * 0.4;

      let currentIndex = 0;

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);

        if (!element) return;

        const sectionTop = element.getBoundingClientRect().top + scrollY;

        if (detectionPoint >= sectionTop) {
          currentIndex = index;
        }
      });

      if (
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 30
      ) {
        currentIndex = sections.length - 1;
      }

      setActiveIndex((previous) =>
        previous === currentIndex ? previous : currentIndex
      );

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateNavigation);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    updateNavigation();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Portfolio navigation"
      className="
        fixed
        right-3 sm:right-5 lg:right-7 xl:right-9
        top-1/2 -translate-y-1/2
        z-[120]
        pointer-events-none
      "
    >
      <div
        className="
          relative
          pointer-events-auto
          w-[52px]
          sm:w-[60px]
          lg:w-[68px]
          xl:w-[74px]
          py-4
        "
      >
        {/* Main vertical navigation rail */}

        <div
          className="
            absolute
            top-4 bottom-4
            left-1/2
            -translate-x-1/2
            w-[1.5px]
            bg-cyan-400/[0.24]
          "
        />

        {/* Secondary dotted rails */}

        <div
          className="
            absolute
            top-4 bottom-4
            left-[calc(50%-9px)]
            border-l border-dashed
            border-cyan-400/[0.13]
          "
        />

        <div
          className="
            absolute
            top-4 bottom-4
            left-[calc(50%+9px)]
            border-l border-dashed
            border-cyan-400/[0.13]
          "
        />

        {/* Scroll progress */}

        <div
          className="
            absolute top-4
            left-1/2
            -translate-x-1/2
            w-[2px]
            bg-gradient-to-b
            from-cyan-300
            to-blue-500
            origin-top
          "
          style={{
            height: `calc((100% - 32px) * ${progress})`,
            boxShadow: "0 0 7px rgba(34,211,238,0.45)",
          }}
        />

        {/* Moving active diamond */}

        <motion.div
          className="
            absolute
            z-30
            left-1/2
            -translate-x-1/2
            top-4
            pointer-events-none
          "
          initial={false}
          animate={{
            y: activeIndex * ITEM_HEIGHT,
          }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 110,
                  damping: 24,
                  mass: 0.8,
                }
          }
        >
          {/* Outer glow */}

          <div
            className="
              absolute
              top-1/2 left-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-11 h-11
              sm:w-12 sm:h-12
              lg:w-14 lg:h-14
              rotate-45
              bg-cyan-400/[0.12]
              blur-md
            "
          />

          {/* Main diamond */}

          <div
            className="
              relative
              w-[23px] h-[23px]
              sm:w-[26px] sm:h-[26px]
              lg:w-[29px] lg:h-[29px]
              rotate-45
              border-[1.5px]
              border-cyan-300
              bg-[#071619]
              shadow-[0_0_13px_rgba(34,211,238,0.45)]
              flex items-center justify-center
            "
          >
            {/* Inner diamond */}

            <div
              className="
                absolute
                inset-[4px]
                sm:inset-[5px]
                border border-cyan-300/60
                bg-cyan-400/15
              "
            />

            {/* Bright center */}

            <div
              className="
                relative
                w-[6px] h-[6px]
                sm:w-[7px] sm:h-[7px]
                lg:w-[8px] lg:h-[8px]
                bg-white
                shadow-[0_0_9px_rgba(255,255,255,0.95)]
              "
            />
          </div>

          {/* Bottom cyan pointer */}

          <div
            className="
              absolute
              top-[28px]
              sm:top-[31px]
              lg:top-[34px]
              left-1/2
              -translate-x-1/2
              w-0 h-0
              border-l-[5px]
              border-r-[5px]
              border-t-[7px]
              sm:border-l-[6px]
              sm:border-r-[6px]
              sm:border-t-[8px]
              border-l-transparent
              border-r-transparent
              border-t-cyan-400
              drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]
            "
          />
        </motion.div>

        {/* Section navigation */}

        <div className="relative z-10 flex flex-col">
          {sections.map((section, index) => {
            const isActive = activeIndex === index;

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-label={`Navigate to ${section.label}`}
                aria-current={isActive ? "location" : undefined}
                className="
                  group
                  relative
                  flex items-center justify-center
                  h-[60px]
                  w-full
                  outline-none
                  focus-visible:ring-1
                  focus-visible:ring-cyan-400
                "
              >
                {/* Horizontal navigation ticks */}

                <span
                  className={`
                    absolute
                    left-1/2
                    top-1/2
                    -translate-y-1/2
                    h-[1px]
                    transition-all duration-300
                    ${
                      isActive
                        ? "w-[22px] bg-cyan-300"
                        : "w-[13px] bg-cyan-400/30 group-hover:w-[19px] group-hover:bg-cyan-300/75"
                    }
                  `}
                />

                {/* Inactive diamond markers */}

                {!isActive && (
                  <span
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      -translate-x-1/2
                      -translate-y-1/2
                      w-[8px] h-[8px]
                      sm:w-[9px] sm:h-[9px]
                      lg:w-[10px] lg:h-[10px]
                      rotate-45
                      border border-cyan-300/55
                      bg-[#081116]
                      transition-all duration-200
                      group-hover:border-cyan-200
                      group-hover:bg-cyan-400/25
                    "
                  />
                )}

                {/* Hover section label */}

                <span
                  className="
                    absolute
                    right-full
                    mr-3 sm:mr-4
                    px-3 py-2
                    bg-[#0B1118]/95
                    border border-cyan-400/20
                    rounded-md
                    text-[10px]
                    sm:text-[11px]
                    font-mono
                    tracking-wider
                    text-cyan-200
                    whitespace-nowrap
                    opacity-0 invisible
                    translate-x-2
                    group-hover:opacity-100
                    group-hover:visible
                    group-hover:translate-x-0
                    group-focus-visible:opacity-100
                    group-focus-visible:visible
                    group-focus-visible:translate-x-0
                    transition-all duration-200
                  "
                >
                  {section.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default SideScrollNav;
