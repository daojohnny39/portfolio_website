import { MeshBackground } from "@/components/core/MeshBackground";
import { TopNav } from "@/components/core/TopNav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Contact, Footer } from "@/components/sections/Contact";

export default function PortfolioPage() {
  return (
    <>
      <MeshBackground />
      <div className="relative z-[1]">
        <TopNav />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
