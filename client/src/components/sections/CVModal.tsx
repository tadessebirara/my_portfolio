import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  FileText,
  Printer,
  Mail,
  Phone,
  MapPin,
  Github,
  Globe,
  GraduationCap,
  BriefcaseBusiness,
  Code2,
  Languages,
  Sparkles,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";

const skills = [
  {
    title: "Frontend Development",
    icon: Code2,
    items: [
      "React.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Backend Development",
    icon: BriefcaseBusiness,
    items: ["Node.js", "Express.js", "REST API Development"],
  },
  {
    title: "Database & ORM",
    icon: Globe,
    items: ["PostgreSQL", "Prisma ORM", "Database Design"],
  },
  {
    title: "Software Engineering",
    icon: GraduationCap,
    items: [
      "Software Requirements Specification (SRS)",
      "System Analysis & Design",
      "Application Architecture",
      "Role-Based Access Control (RBAC)",
      "Software Testing & Debugging",
    ],
  },
  {
    title: "Development Tools",
    icon: Code2,
    items: ["Git", "GitHub", "Visual Studio Code", "Docker"],
  },
];

const projects = [
  {
    number: "01",
    name: "Education Management System (EMS)",
    organization: "Wisdom X College",
    category: "Full-Stack Software Development Project",
    description:
      "A college-focused Education Management System designed to support academic and administrative operations.",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
    ],
    contributions: [
      "Developed frontend interfaces using React and TypeScript.",
      "Developed backend services and REST API functionality using Node.js and Express.js.",
      "Designed database models and relationships using PostgreSQL and Prisma ORM.",
      "Worked on role-based access control for administrators, registrars, instructors, students, family members, and finance users.",
      "Organized application modules to improve maintainability and separation of concerns.",
    ],
  },
  {
    number: "02",
    name: "AgroLink Ethiopia",
    organization: "Agricultural SaaS Platform",
    category: "Software Analysis & System Design Project",
    description:
      "A digital agricultural platform concept connecting farmers with agricultural experts and suppliers.",
    technologies: [
      "Flutter",
      "Dart",
      "Requirements Engineering",
      "Mobile Application Architecture",
    ],
    contributions: [
      "Identified key stakeholders and their interactions within the platform.",
      "Defined core functional requirements for farmer and agent mobile applications.",
      "Planned features for agricultural product showcasing, expert support, and supplier discovery.",
      "Worked on requirements analysis, application structure, and multilingual support considerations.",
    ],
  },
];

const interests = [
  "Full-Stack Software Engineering",
  "Software Architecture & System Design",
  "Artificial Intelligence Engineering",
  "Marketing & Sales",
  "Business & Administration",
];

function CVSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-9">
      <div className="mb-4 flex items-center gap-3 border-b-2 border-blue-100 pb-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
          <Icon size={20} />
        </div>

        <h3 className="text-xl font-bold tracking-tight text-slate-900">
          {title}
        </h3>
      </div>

      {children}
    </section>
  );
}

export default function MyCV() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* PUBLIC CV BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-cyan-300 bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-300 hover:shadow-cyan-400/40 focus:outline-none focus:ring-4 focus:ring-cyan-400/40"
      >
        <FileText
          size={19}
          className="transition-transform group-hover:scale-110"
        />
        <span>View My CV</span>
      </button>

      {/* CV MODAL - RENDERED OUTSIDE HERO LAYOUT */}
      {isOpen &&
        createPortal(
          <div
            className="cv-overlay fixed inset-0 z-[2147483000] flex items-center justify-center bg-slate-950/90 p-2 backdrop-blur-md sm:p-5"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cv-modal-title"
              className="cv-modal flex h-[96dvh] max-h-[96dvh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-2xl sm:h-[94vh] sm:max-h-[94vh]"
            >
              {/* HEADER */}
              <header className="cv-no-print flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-slate-950 px-4 py-3 sm:px-7 sm:py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
                    <FileText size={22} />
                  </div>

                  <div className="min-w-0">
                    <h2
                      id="cv-modal-title"
                      className="truncate text-base font-bold text-white sm:text-lg"
                    >
                      My Curriculum Vitae
                    </h2>

                    <p className="text-xs text-slate-300">
                      Tadesse Birara · Professional Profile
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-3 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-300 sm:px-4 sm:text-sm"
                  >
                    <Printer size={17} />
                    <span className="hidden sm:inline">Print / Save PDF</span>
                    <span className="sm:hidden">Print</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close CV"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-600 bg-slate-800 text-white transition hover:border-red-400 hover:bg-red-500"
                  >
                    <X size={21} />
                  </button>
                </div>
              </header>

              {/* SCROLL INDICATOR */}
              <div className="cv-no-print flex shrink-0 items-center justify-center gap-2 border-b border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-800">
                <span>Scroll down to read the complete CV</span>
                <span>↓</span>
              </div>

              {/* CV SCROLL AREA */}
              <main className="cv-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain bg-slate-100 p-3 sm:p-7">
                <article
                  id="cv-print-area"
                  className="mx-auto w-full max-w-4xl bg-white px-5 py-7 text-slate-800 shadow-md sm:px-12 sm:py-12"
                >
                  {/* PERSONAL INFORMATION */}
                  <header className="mb-10 border-b-4 border-blue-700 pb-7">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
                      <div>
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-700">
                          Curriculum Vitae
                        </p>

                        <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                          TADESSE BIRARA
                        </h1>

                        <h2 className="mt-3 text-lg font-bold text-blue-700">
                          Full-Stack Software Engineer
                        </h2>

                        <p className="mt-2 text-sm font-medium text-slate-600">
                          Software Engineering Student
                        </p>
                      </div>

                      <div className="grid gap-3 text-sm text-slate-700">
                        <a
                          href="mailto:brotadese50@gmail.com"
                          className="flex items-center gap-2 break-all hover:text-blue-700"
                        >
                          <Mail size={17} className="shrink-0 text-blue-700" />
                          brotadese50@gmail.com
                        </a>

                        <a
                          href="tel:0905653221"
                          className="flex items-center gap-2 hover:text-blue-700"
                        >
                          <Phone size={17} className="shrink-0 text-blue-700" />
                          0905653221
                        </a>

                        <div className="flex items-center gap-2">
                          <MapPin
                            size={17}
                            className="shrink-0 text-blue-700"
                          />
                          Ethiopia
                        </div>

                        <a
                          href="https://tadessebirara-portfolio.vercel.app/"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 break-all hover:text-blue-700"
                        >
                          <Globe size={17} className="shrink-0 text-blue-700" />
                          Portfolio Website
                          <ExternalLink size={13} />
                        </a>

                        <a
                          href="https://github.com/tadessebirara"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 hover:text-blue-700"
                        >
                          <Github
                            size={17}
                            className="shrink-0 text-blue-700"
                          />
                          GitHub Profile
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>
                  </header>

                  {/* PROFESSIONAL SUMMARY */}
                  <CVSection title="Professional Summary" icon={Sparkles}>
                    <p className="text-justify text-sm leading-8 text-slate-700">
                      Software Engineering student at Injibara University with
                      practical project experience in full-stack web
                      development, backend engineering, database design, and
                      software system development. Interested in designing and
                      building scalable software solutions using modern
                      JavaScript technologies. Experienced through academic and
                      personal projects in translating system requirements into
                      application features, designing software architecture,
                      developing REST APIs, and implementing role-based
                      application functionality. Passionate about solving
                      real-world problems through software engineering,
                      continuous learning, and practical technology development.
                    </p>
                  </CVSection>

                  {/* TECHNICAL SKILLS */}
                  <CVSection title="Technical Skills" icon={Code2}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {skills.map((group) => {
                        const Icon = group.icon;

                        return (
                          <div
                            key={group.title}
                            className="rounded-xl border border-slate-200 bg-white p-4"
                          >
                            <div className="mb-3 flex items-center gap-2">
                              <Icon
                                size={19}
                                className="shrink-0 text-blue-700"
                              />

                              <h4 className="text-sm font-bold text-slate-950">
                                {group.title}
                              </h4>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {group.items.map((item) => (
                                <span
                                  key={item}
                                  className="rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-900"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CVSection>

                  {/* PROJECT EXPERIENCE */}
                  <CVSection
                    title="Project Experience"
                    icon={BriefcaseBusiness}
                  >
                    <div className="space-y-9">
                      {projects.map((project) => (
                        <div
                          key={project.number}
                          className="border-l-[3px] border-blue-600 pl-5"
                        >
                          <p className="text-xs font-extrabold tracking-wider text-blue-700">
                            PROJECT {project.number}
                          </p>

                          <h4 className="mt-2 text-lg font-extrabold text-slate-950">
                            {project.name}
                          </h4>

                          <p className="mt-1 text-sm font-bold text-slate-700">
                            {project.organization}
                          </p>

                          <p className="mt-1 text-xs font-medium text-slate-500">
                            {project.category}
                          </p>

                          <p className="mt-4 text-sm leading-7 text-slate-700">
                            {project.description}
                          </p>

                          <h5 className="mb-2 mt-4 text-xs font-extrabold uppercase tracking-wider text-slate-900">
                            Technologies & Areas
                          </h5>

                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((technology) => (
                              <span
                                key={technology}
                                className="rounded-md bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-900"
                              >
                                {technology}
                              </span>
                            ))}
                          </div>

                          <h5 className="mb-2 mt-4 text-xs font-extrabold uppercase tracking-wider text-slate-900">
                            Contributions
                          </h5>

                          <ul className="space-y-2">
                            {project.contributions.map((contribution) => (
                              <li
                                key={contribution}
                                className="flex gap-2 text-sm leading-7 text-slate-700"
                              >
                                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-700" />
                                <span>{contribution}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CVSection>

                  {/* EDUCATION */}
                  <CVSection title="Education" icon={GraduationCap}>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                      <h4 className="text-base font-extrabold text-slate-950">
                        Bachelor of Science in Software Engineering
                      </h4>

                      <p className="mt-2 text-sm font-semibold text-blue-700">
                        Injibara University, Ethiopia
                      </p>

                      <p className="mt-3 inline-flex rounded-lg bg-blue-100 px-3 py-2 text-xs font-bold text-blue-900">
                        Current Status: Fifth-Year Student
                      </p>
                    </div>
                  </CVSection>

                  {/* TRAINING */}
                  <CVSection
                    title="Certifications & Professional Training"
                    icon={FileText}
                  >
                    <div className="space-y-4">
                      <div className="flex gap-4 rounded-xl border border-slate-200 p-4">
                        <GraduationCap
                          size={22}
                          className="mt-1 shrink-0 text-blue-700"
                        />

                        <div>
                          <h4 className="text-sm font-bold text-slate-950">
                            5 Million Ethiopian Coders Program
                          </h4>

                          <p className="mt-1 text-sm text-slate-600">
                            Professional Training
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 rounded-xl border border-slate-200 p-4">
                        <BriefcaseBusiness
                          size={22}
                          className="mt-1 shrink-0 text-blue-700"
                        />

                        <div>
                          <h4 className="text-sm font-bold text-slate-950">
                            Digital Marketing and Sales
                          </h4>

                          <p className="mt-1 text-sm text-slate-600">Athena</p>
                        </div>
                      </div>
                    </div>
                  </CVSection>

                  {/* PROFESSIONAL INTERESTS */}
                  <CVSection title="Professional Interests" icon={Sparkles}>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest) => (
                        <span
                          key={interest}
                          className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-900"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </CVSection>

                  {/* LANGUAGES */}
                  <CVSection title="Languages" icon={Languages}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <h4 className="text-sm font-bold text-slate-950">
                          Amharic
                        </h4>
                        <p className="mt-1 text-sm text-slate-600">Native</p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <h4 className="text-sm font-bold text-slate-950">
                          English
                        </h4>
                        <p className="mt-1 text-sm text-slate-600">Language</p>
                      </div>
                    </div>
                  </CVSection>

                  {/* FOOTER */}
                  <footer className="border-t-2 border-blue-700 pt-6 text-center">
                    <p className="text-xs font-extrabold tracking-wider text-slate-700">
                      TADESSE BIRARA · FULL-STACK SOFTWARE ENGINEER
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      Thank you for reviewing my professional profile.
                    </p>
                  </footer>
                </article>
              </main>

              {/* MODAL FOOTER */}
              <footer className="cv-no-print flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-3 sm:px-7">
                <p className="text-xs font-medium text-slate-600">
                  Complete professional profile
                </p>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700"
                >
                  Close CV
                </button>
              </footer>
            </div>
          </div>,
          document.body,
        )}

      {/* SCROLLBAR AND PRINT STYLES */}
      <style>
        {`
          .cv-scroll {
            scrollbar-width: auto;
            scrollbar-color: #2563eb #dbeafe;
            -webkit-overflow-scrolling: touch;
          }

          .cv-scroll::-webkit-scrollbar {
            width: 12px;
          }

          .cv-scroll::-webkit-scrollbar-track {
            background: #dbeafe;
          }

          .cv-scroll::-webkit-scrollbar-thumb {
            background: #2563eb;
            border: 3px solid #dbeafe;
            border-radius: 20px;
          }

          .cv-scroll::-webkit-scrollbar-thumb:hover {
            background: #1d4ed8;
          }

          @page {
            size: A4;
            margin: 12mm;
          }

          @media print {
            html,
            body {
              height: auto !important;
              overflow: visible !important;
              background: white !important;
            }

            body * {
              visibility: hidden !important;
            }

            #cv-print-area,
            #cv-print-area * {
              visibility: visible !important;
            }

            #cv-print-area {
              position: absolute !important;
              top: 0 !important;
              left: 0 !important;
              width: 100% !important;
              max-width: none !important;
              margin: 0 !important;
              padding: 0 !important;
              border: none !important;
              box-shadow: none !important;
              overflow: visible !important;
            }

            .cv-no-print,
            .cv-overlay {
              display: none !important;
            }

            #cv-print-area section {
              break-inside: auto;
            }

            #cv-print-area a {
              color: #334155 !important;
              text-decoration: none !important;
            }
          }
        `}
      </style>
    </>
  );
}
