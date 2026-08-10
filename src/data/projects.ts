export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  overview: string;
  role: string;
  technologies: string[];
  features: string[];
  challenges: string[];
  solutions: string[];
  image: string;
  github?: string;
  liveDemo?: string;
  imageAlt: string;
  outcome: string;
  status: "COMPLETED" | "IN_DEVELOPMENT" | "PLANNED";
};

export const projects: Project[] = [
  {
    slug: "alyah-attendance-management-system",
    title: "Alyah Attendance Management System",
    shortDescription:
      "A web-based attendance management platform designed to streamline student attendance recording, monitoring, reporting, and administrative management.",
    overview:
      "Alyah is a comprehensive attendance management system built for schools and educational institutions. It provides a centralized platform for recording, tracking, and reporting student attendance with role-based access controls for administrators, teachers, and parents.",
    role: "Full-Stack Engineer",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "REST API",
    ],
    features: [
      "Student and class management",
      "Real-time attendance recording",
      "Role-based access control (Admin, Teacher, Parent)",
      "Attendance reports and analytics",
      "Parent notifications and visibility",
      "Dashboard with key metrics",
      "Responsive mobile interface",
    ],
    challenges: [
      "Managing complex role-based permissions and data access",
      "Ensuring real-time synchronization across multiple concurrent users",
    ],
    solutions: [
      "Implemented a robust authorization layer with middleware-based access control",
      "Designed optimized database queries and implemented caching for frequently accessed data",
    ],
    image: "/projects/atlas-dashboard.svg",
    github: "",
    liveDemo: "",
    imageAlt:
      "Alyah Attendance Management System dashboard with attendance records and class information.",
    outcome:
      "Built a production-ready platform that reduces manual attendance tracking overhead and improves parent-school communication.",
    status: "IN_DEVELOPMENT",
  },
  {
    slug: "atlas-ops",
    title: "Atlas Ops",
    shortDescription:
      "A workflow orchestration dashboard for operations teams balancing task intake, status tracking, and delivery visibility.",
    overview:
      "Atlas Ops is a full-stack internal platform for coordinating delivery work across product, engineering, and operations. It centralizes requests, surfaces team bottlenecks, and keeps stakeholders aligned without relying on spreadsheets.",
    role: "Sole designer and full-stack engineer",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma"],
    features: [
      "Multi-stage workflow views",
      "Role-based task assignment",
      "Real-time status updates",
      "Automated reporting summaries",
    ],
    challenges: [
      "The workflow moved across several tools and caused a lot of context switching.",
      "Leadership needed a fast overview without a heavy admin experience.",
    ],
    solutions: [
      "Built a single dashboard interface with structured task states and clear ownership.",
      "Introduced a lightweight API layer for reliable CRUD flows and audit-friendly records.",
    ],
    image: "/projects/atlas-dashboard.svg",
    github: "",
    liveDemo: "",
    imageAlt:
      "A dashboard screen for Atlas Ops with workflow cards and status metrics.",
    outcome:
      "The team replaced manual updates with a clearer operating system for delivery work.",
    status: "COMPLETED",
  },
  {
    slug: "commerce-hub",
    title: "Commerce Hub",
    shortDescription:
      "A modern commerce experience with product discovery, custom bundles, and secure checkout flows.",
    overview:
      "Commerce Hub was designed to simplify multi-product ordering and make merchandising decisions visible to the business team. The result is a polished storefront with strong content and commerce signals.",
    role: "Frontend engineer and product partner",
    technologies: ["React", "Next.js", "Tailwind CSS", "REST APIs", "MySQL"],
    features: [
      "Responsive product discovery",
      "Bundle configuration builder",
      "Inventory-aware checkout",
      "Admin-ready content blocks",
    ],
    challenges: [
      "The previous experience was too fragmented for mobile users.",
      "Pricing and availability had to stay accurate across multiple sources.",
    ],
    solutions: [
      "Created a modular storefront interface with reusable commerce primitives and resilient data handling.",
      "Hooked the experience into a lightweight backend for validation and price lookup.",
    ],
    image: "/projects/commerce-hub.svg",
    github: "",
    liveDemo: "",
    imageAlt:
      "A storefront landing page with featured products and checkout summary cards.",
    outcome:
      "The experience became easier to navigate across devices and reduced handoff friction for the team.",
    status: "COMPLETED",
  },
  {
    slug: "insight-studio",
    title: "Insight Studio",
    shortDescription:
      "A reporting workspace that helps founders and teams understand growth trends without writing SQL.",
    overview:
      "Insight Studio turns complex metrics into clearly structured dashboards. It highlights trends, surfaces anomalies, and makes daily review feels manageable for non-technical teams.",
    role: "Lead engineer and technical designer",
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Docker"],
    features: [
      "Custom report builder",
      "Interactive charts",
      "Saved views and filters",
      "Scheduled delivery summaries",
    ],
    challenges: [
      "The initial reporting process depended on manual exports and scattered spreadsheets.",
      "The platform had to remain fast while serving large datasets.",
    ],
    solutions: [
      "Designed a layered data access pattern that precomputes summaries for quicker response times.",
      "Focused the UI on a small number of meaningful views rather than overloading the experience.",
    ],
    image: "/projects/insight-studio.svg",
    github: "",
    liveDemo: "",
    imageAlt:
      "A reporting dashboard with key metrics and a chart view for Insight Studio.",
    outcome:
      "The reporting flow became easier to follow and dramatically reduced weekly preparation effort.",
    status: "COMPLETED",
  },
  {
    slug: "edu-parent-management-system",
    title: "Edu Parent Management System",
    shortDescription:
      "A school-parent communication and management platform focused on improving engagement and information sharing.",
    overview:
      "Edu Parent Management System is designed to bridge the gap between schools and parents. It provides a centralized platform for sharing academic progress, attendance updates, and school announcements while enabling parents to track their child's educational journey.",
    role: "Full-Stack Engineer",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    features: [
      "Student profile and academic tracking",
      "Parent/guardian management",
      "Real-time notifications",
      "Attendance visibility",
      "Academic progress reports",
      "School announcements",
    ],
    challenges: [
      "Designing an intuitive interface for diverse user groups (parents, teachers, admins)",
      "Ensuring data privacy and secure access to sensitive student information",
    ],
    solutions: [
      "Implemented a modular component architecture for different user roles",
      "Added comprehensive access controls and audit logging",
    ],
    image: "/projects/commerce-hub.svg",
    github: "",
    liveDemo: "",
    imageAlt:
      "A parent dashboard showing student academic progress and school communications.",
    outcome:
      "Improved parent-school communication and provided transparent visibility into student progress.",
    status: "PLANNED",
  },
];
