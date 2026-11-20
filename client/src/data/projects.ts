export interface Project {
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  technologies: string[];
  responsibilities: string[];
  status: "Academic" | "Prototype" | "In Development" | "Production";
  githubUrl: string;
  liveUrl: string;
  imagePlaceholder: string;
}

export const projects: Project[] = [
  {
    title: "AgroLink Ethiopia",
    tagline: "Digital Agricultural Collaboration Platform",
    problem:
      "Ethiopian farmers, suppliers, buyers, and agricultural experts operate in fragmented markets with limited digital connectivity, leading to inefficiencies in trade, information sharing, and resource management.",
    solution:
      "A comprehensive digital platform connecting all agricultural stakeholders — enabling farmers to list produce, buyers to source directly, suppliers to reach rural markets, and experts to provide guidance through a unified web and mobile interface.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Flutter",
      "REST API",
    ],
    responsibilities: [
      "Requirements gathering and stakeholder analysis",
      "System architecture and database design",
      "Full-stack web application development",
      "Mobile application development with Flutter",
      "API design and integration",
    ],
    status: "Academic",
    githubUrl: "https://github.com/",
    liveUrl: "",
    imagePlaceholder: "AgroLink",
  },
  {
    title: "Alyah Smart Attendance",
    tagline: "Intelligent Attendance Management System",
    problem:
      "Organizations struggle with manual attendance tracking, leading to inaccurate records, time theft, and inefficient HR management. Traditional systems lack real-time visibility and mobile accessibility.",
    solution:
      "A smart attendance system combining a web-based admin dashboard for HR management with a mobile application for employee check-in. The system provides real-time attendance tracking, reporting, and analytics.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Flutter",
      "Dart",
    ],
    responsibilities: [
      "System analysis and requirements engineering",
      "Web admin dashboard development",
      "Mobile attendance app development",
      "Database schema design",
      "Backend API development",
    ],
    status: "Academic",
    githubUrl: "https://github.com/",
    liveUrl: "",
    imagePlaceholder: "Alyah",
  },
];