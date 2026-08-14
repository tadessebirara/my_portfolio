import { Navbar }         from "@/components/layout/navbar";
import { Footer }          from "@/components/layout/footer";
import { Hero }            from "@/components/sections/hero";
import { About }           from "@/components/sections/about";
import { Skills }          from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { Services }        from "@/components/sections/services";
import { ContactSection }  from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <ProjectsSection />
        <Services />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
