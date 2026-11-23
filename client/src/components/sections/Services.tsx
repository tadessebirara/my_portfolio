import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  LayoutGrid,
  Smartphone,
  Server,
  RefreshCw,
  Layers,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tag: string;
  accent: string;
  gradient: string;
  features: string[];
}

const services: ServiceItem[] = [
  {
    id: "01",
    title: "Business Website Development",
    description:
      "Professional websites that establish your online presence, build instant credibility, and effectively communicate your brand to high-value clients.",
    icon: Globe,
    tag: "Web Presence",
    accent: "text-blue-400",
    gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
    features: [
      "Corporate & business websites",
      "Landing pages & marketing sites",
      "Personal & organizational websites",
      "Responsive, fast, and SEO-optimized",
    ],
  },
  {
    id: "02",
    title: "Web Application Development",
    description:
      "Custom web applications engineered to streamline operations, automate business workflows, and manage complex business data securely.",
    icon: LayoutGrid,
    tag: "SaaS & Workflows",
    accent: "text-cyan-400",
    gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    features: [
      "Business management systems",
      "Admin dashboards & analytics",
      "ERP & inventory applications",
      "Custom web platforms",
    ],
  },
  {
    id: "03",
    title: "Mobile Application Development",
    description:
      "Cross-platform mobile applications designed with fluid UI/UX to extend your business services directly to your customers' smartphones.",
    icon: Smartphone,
    tag: "iOS & Android",
    accent: "text-emerald-400",
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    features: [
      "Android & cross-platform apps",
      "Business mobile applications",
      "Digital service applications",
      "Flutter-based development",
    ],
  },
  {
    id: "04",
    title: "Backend & API Development",
    description:
      "Robust server-side architecture and secure APIs built to power applications with high performance, scalability, and strict security.",
    icon: Server,
    tag: "High Performance",
    accent: "text-indigo-400",
    gradient: "from-indigo-500/20 via-indigo-500/5 to-transparent",
    features: [
      "RESTful API development",
      "Database design & integration",
      "Authentication & authorization",
      "Business logic implementation",
    ],
  },
  {
    id: "05",
    title: "Business Digitalization",
    description:
      "Transform manual and paper-heavy business operations into streamlined digital workflows that reduce error rates and multiply team productivity.",
    icon: RefreshCw,
    tag: "Automation",
    accent: "text-purple-400",
    gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
    features: [
      "Process analysis & optimization",
      "Workflow automation",
      "Paper-to-digital transformation",
      "Custom digital solutions",
    ],
  },
  {
    id: "06",
    title: "Software Consultation & System Design",
    description:
      "Expert technical guidance on architectural planning, stack selection, and software scoping before committing development capital.",
    icon: Layers,
    tag: "Architecture",
    accent: "text-sky-400",
    gradient: "from-sky-500/20 via-sky-500/5 to-transparent",
    features: [
      "Requirements analysis",
      "Technical planning & roadmaps",
      "System architecture design",
      "Technology stack selection",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export const Services: React.FC = () => {
  return (
    <section
      id="services"
      className="relative py-28 md:py-36 bg-[#090D16] overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600/5 blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Built-in Section Heading (Zero external file dependencies) */}
        <div className="max-w-3xl mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-blue-400 font-mono text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          >
            SERVICES
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
          Turning Business Challenges into Digital Solutions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base md:text-lg leading-relaxed"
          >
            Clear, practical digital services designed to solve real operational
            bottlenecks and accelerate revenue growth.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            style={{ originX: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-px w-24 bg-gradient-to-r from-blue-500/50 to-transparent mt-8"
          />
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-14"
        >
          {services.map((service) => {
            const IconComponent = service.icon;

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group relative bg-[#0D1322]/80 hover:bg-[#11182A] border border-white/[0.08] hover:border-blue-500/40 rounded-2xl p-7 lg:p-8 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] flex flex-col justify-between overflow-hidden"
              >
                {/* Holographic Top Hover Highlight Line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Subtle Radial Glow Effect on Hover */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 group-hover:bg-blue-500/15 blur-3xl transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Card Header: Icon + Category Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 group-hover:border-blue-500/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500/10 shadow-inner">
                      <IconComponent
                        className={`w-6 h-6 ${service.accent} transition-transform duration-300 group-hover:rotate-3`}
                      />
                    </div>

                    <span className="text-[11px] font-mono tracking-wider px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-slate-400 group-hover:text-white group-hover:border-white/20 transition-all duration-300">
                      {service.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-200 transition-colors duration-200 mb-3 tracking-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Bullet Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start text-xs text-slate-300"
                      >
                        <div className="w-4 h-4 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 mr-2.5 mt-0.5 group-hover:border-blue-400 transition-colors">
                          <Check className={`w-2.5 h-2.5 ${service.accent}`} />
                        </div>
                        <span className="leading-tight text-slate-300 group-hover:text-white transition-colors duration-200">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="mt-8 pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-blue-400 transition-colors duration-200">
                  <span>Discuss Scoping</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Interactive Bottom Consultation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-950/20 via-slate-900/40 to-indigo-950/20 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-white">
                Have a specialized technical challenge or custom requirement?
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                I architect tailored software solutions specific to unique
                enterprise operations.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="shrink-0 text-xs font-semibold px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Schedule Technical Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Exported both ways so any import syntax in App.tsx works smoothly
export default Services;