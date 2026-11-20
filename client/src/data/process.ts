import {
  Search,
  ClipboardList,
  PenTool,
  Code2,
  TestTube2,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ProcessStep {
  icon: LucideIcon;
  step: number;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    icon: Search,
    step: 1,
    title: "Understand the Problem",
    description:
      "I start by deeply understanding your business, challenges, goals, and expectations. Every great solution begins with understanding the real problem.",
  },
  {
    icon: ClipboardList,
    step: 2,
    title: "Requirements Analysis",
    description:
      "I gather detailed requirements, identify constraints, and determine the most effective and practical solution for your specific situation.",
  },
  {
    icon: PenTool,
    step: 3,
    title: "System Design",
    description:
      "I design the system architecture, database structures, user workflows, and interfaces before writing a single line of code.",
  },
  {
    icon: Code2,
    step: 4,
    title: "Development",
    description:
      "I build the frontend, backend, database, and mobile components using modern technologies and clean, maintainable code.",
  },
  {
    icon: TestTube2,
    step: 5,
    title: "Testing & Deployment",
    description:
      "I thoroughly test functionality, fix issues, optimize performance, and deploy your solution to a reliable production environment.",
  },
  {
    icon: Wrench,
    step: 6,
    title: "Maintenance & Improvement",
    description:
      "I provide ongoing support, improvements, and technical maintenance to ensure your solution continues to serve your business effectively.",
  },
];
