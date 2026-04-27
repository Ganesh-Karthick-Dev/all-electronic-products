"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    name: "New Arrivals",
    cta: "Shop New",
    palette: "#6b8294",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=84",
  },
  {
    name: "Mens",
    cta: "Shop Men",
    palette: "#625856",
    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=84",
  },
  {
    name: "Womens",
    cta: "Shop Women",
    palette: "#9f7d78",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=84",
  },
  {
    name: "Best Sellers",
    cta: "Shop Best Sellers",
    palette: "#98a091",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=84",
  },
] as const;

export function CategoryShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      const validCards = cardRefs.current.filter(Boolean);

      gsap.from(validCards, {
        duration: 0.75,
        ease: "power3.out",
        scale: 0.985,
        stagger: 0.05,
        y: 18,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (!card) {
        return;
      }

      const isActive = activeIndex === index;

      gsap.to(card, {
        borderRadius: isActive ? "999px" : "28px",
        duration: 0.45,
        ease: "power3.out",
        scale: isActive ? 1.015 : 1,
      });
    });
  }, [activeIndex]);

  return (
    <section
      className="bg-[#f2f0ea] px-3 pb-32 pt-6 sm:px-6 lg:px-3"
      ref={sectionRef}
      aria-label="Category showcase"
    >
      <div className="mx-auto grid max-w-[1900px] gap-3 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => {
          const isActive = activeIndex === index;

          return (
            <button
              key={card.name}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              type="button"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              className="group relative flex min-h-[420px] cursor-pointer items-center justify-center overflow-hidden border-0 p-0 text-left shadow-[0_18px_40px_rgba(30,29,24,0.07)] transition will-change-transform"
              style={{
                backgroundColor: card.palette,
                borderRadius: isActive ? "999px" : "28px",
              }}
            >
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.15),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.08))]"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-[18%] left-1/2 h-[44%] w-[86%] -translate-x-1/2 bg-contain bg-center bg-no-repeat transition duration-500 group-hover:scale-[1.03]"
                style={{ backgroundImage: `url(${card.image})` }}
                aria-hidden="true"
              />

              <div className="relative z-10 flex w-full flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="rounded-full border border-white/80 px-7 py-3 text-[1.02rem] font-black tracking-[0.03em] text-white uppercase backdrop-blur-[2px] transition duration-300 group-hover:bg-white/10">
                  {card.name}
                </span>
                <span
                  className={`rounded-full border border-white/70 px-8 py-3 text-[0.98rem] font-black tracking-[0.03em] text-white uppercase transition duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {card.cta}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
