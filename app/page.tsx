import { cormorant, karla } from "@/components/home/fonts";
import { Hero } from "@/components/home/Hero";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div
      className={cn(cormorant.variable, karla.variable, "home-theme min-h-screen bg-bg font-serif text-fg")}
    >
      <div className="home-column mx-auto w-full max-w-[46rem] px-[clamp(1.5rem,6vw,2.5rem)]">
        <main>
          <Hero />
        </main>
      </div>
    </div>
  );
}
