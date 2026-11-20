import {
  Globe,
  LayoutDashboard,
  Smartphone,
  Server,
  RefreshCw,
  Compass,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
}

export const services: Service[] = [
  {
    icon: Globe,
    title: "Business Website Development",
    description:
      "Professional websites that establish your online presence and communicate your brand effectively.",
    items: [
      "Corporate & business websites",
      "Landing pages & marketing sites",
      "Personal & organizational websites",
      "Responsive, fast, and SEO-optimized",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Web Application Development",
    description:
      "Custom web applications that streamline your operations and manage your business processes.",
    items: [
      "Business management systems",
      "Admin dashboards & analytics",
      "ERP & inventory applications",
      "Custom web platforms",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile Application Development",
    description:
      "Cross-platform mobile applications that extend your services to your customers' phones.",
    items: [
      "Android & cross-platform apps",
      "Business mobile applications",
      "Digital service applications",
      "Flutter-based development",
    ],
  },
  {
    icon: Server,
    title: "Backend & API Development",
    description:
      "Robust server-side systems and APIs that power your applications securely and reliably.",
    items: [
      "RESTful API development",
      "Database design & integration",
      "Authentication & authorization",
      "Business logic implementation",
    ],
  },
  {
    icon: RefreshCw,
    title: "Business Digitalization",
    description:
      "Transform your manual processes into efficient digital workflows that save time and reduce errors.",
    items: [
      "Process analysis & optimization",
      "Workflow automation",
      "Paper-to-digital transformation",
      "Custom digital solutions",
    ],
  },
  {
    icon: Compass,
    title: "Software Consultation & System Design",
    description:
      "Expert guidance on technology decisions, system architecture, and project planning.",
    items: [
      "Requirements analysis",
      "Technical planning & roadmaps",
      "System architecture design",
      "Technology stack selection",
    ],
  },
];
