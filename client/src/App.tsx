import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Process from "./components/sections/Process";
import WhyMe from "./components/sections/WhyMe";
import Contact from "./components/sections/Contact";

// 1. Import the new SideScrollNav component
import SideScrollNav from "./components/SideScrollNav";

export default function App() {
  return (
    <div className="min-h-screen bg-[#090D16] text-slate-200 antialiased">
      <Navbar />

      {/* 2. Insert the vertical navigation line here */}
      <SideScrollNav />

      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Process />
        <WhyMe />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
