import { HeroCarousel } from "./components/HeroCarousel";
import { StorySection } from "./components/StorySection";

export default function Home() {
  return (
    <main className="min-h-svh bg-[#f2f0ea] text-[#171916]">
      <div className="flex min-h-10 items-center justify-center bg-[#1c1d1a] px-4 py-2.5 text-center text-[clamp(0.8rem,1.2vw,1rem)] font-extrabold tracking-[0.04em] text-[#f8f6ef] sm:min-h-12">
        Extra 25% off sale items.{" "}
        <a className="underline underline-offset-3" href="#men">
          Shop Men
        </a>
        <span className="px-1">|</span>
        <a className="underline underline-offset-3" href="#women">
          Shop Women
        </a>
      </div>
      <HeroCarousel />
      <StorySection />
    </main>
  );
}
