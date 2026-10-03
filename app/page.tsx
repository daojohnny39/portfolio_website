import { cormorant, karla } from "@/components/home/fonts";
import { Hero } from "@/components/home/Hero";
import { Collapsible } from "@/components/home/Section";
import { personal } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div
      id="top"
      className={cn(cormorant.variable, karla.variable, "home-theme min-h-screen bg-bg font-serif text-fg")}
    >
      <div className="home-column mx-auto w-full max-w-[46rem] px-[clamp(1.5rem,6vw,2.5rem)]">
        <main>
          <Hero />
        </main>

        <Collapsible>
          <footer className="mt-24 flex items-center justify-between border-t border-border py-8 font-label text-[0.6875rem] font-medium uppercase tracking-[0.24em] text-muted sm:mt-32">
            <span>© {new Date().getFullYear()} {personal.name}</span>
            <a
              href="#top"
              className="underline decoration-transparent underline-offset-[6px] outline-none transition-colors duration-300 hover:text-fg hover:decoration-fg focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-fg"
            >
              Back to top
            </a>
          </footer>
        </Collapsible>
      </div>
    </div>
  );
}
