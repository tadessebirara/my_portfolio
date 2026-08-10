import { About } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.06),transparent_35%)] dark:bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_35%)]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}
