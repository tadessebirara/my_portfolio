export interface SkillCategory {
  title: string;
  skills: { name: string; description: string }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    skills: [
      { name: "React.js", description: "Component-based UI development" },
      { name: "TypeScript", description: "Type-safe JavaScript development" },
      { name: "JavaScript", description: "Modern ES6+ programming" },
      { name: "Tailwind CSS", description: "Utility-first styling" },
      { name: "Responsive Design", description: "Mobile-first layouts" },
    ],
  },
  {
    title: "Backend Engineering",
    skills: [
      { name: "Node.js", description: "Server-side JavaScript runtime" },
      { name: "Express.js", description: "REST API framework" },
      { name: "REST APIs", description: "API design & development" },
      { name: "Authentication", description: "JWT & session-based auth" },
    ],
  },
  {
    title: "Database Engineering",
    skills: [
      { name: "PostgreSQL", description: "Relational database management" },
      { name: "SQL", description: "Query design & optimization" },
      { name: "Database Design", description: "Schema & normalization" },
    ],
  },
  {
    title: "Mobile Development",
    skills: [
      { name: "Flutter", description: "Cross-platform UI framework" },
      { name: "Dart", description: "Flutter programming language" },
      {
        name: "Cross-Platform",
        description: "Android & iOS from one codebase",
      },
    ],
  },
  {
    title: "Software Engineering",
    skills: [
      { name: "Git & GitHub", description: "Version control & collaboration" },
      { name: "System Design", description: "Architecture & planning" },
      {
        name: "Requirements Engineering",
        description: "Analysis & specification",
      },
      { name: "SDLC", description: "Full development lifecycle" },
    ],
  },
];
