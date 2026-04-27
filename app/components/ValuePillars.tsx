"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    title: "Wear All Day Comfort",
    body:
      "Lightweight, bouncy, and wildly comfortable, our everyday pairs make any outing feel effortless. Slip in, lace up, or slide them on and enjoy the comfy support.",
  },
  {
    title: "Sustainability In Every Step",
    body:
      "From materials to transport, we’re working to reduce our carbon footprint to near zero. Holding ourselves accountable and striving for climate goals isn’t a 30-year goal. It’s now.",
  },
  {
    title: "Materials From The Earth",
    body:
      "We replace petroleum-based synthetics with natural alternatives wherever we can, using wool, tree fiber, and sugarcane. They’re soft, breathable, and better for the planet.",
  },
] as const;

export function ValuePillars() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from("[data-pillar-card]", {
        autoAlpha: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.08,
        y: 24,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f2f0ea] px-3 pb-28 pt-4 sm:px-6 lg:px-3"
      aria-label="Value pillars"
    >
      <div className="mx-auto grid max-w-[1900px] gap-3 lg:grid-cols-3">
        {pillars.map((pillar) => (
          <article
            key={pillar.title}
            data-pillar-card
            className="min-h-[264px] rounded-[28px] bg-white px-10 py-10 shadow-[0_16px_36px_rgba(27,27,23,0.04)]"
          >
            <p className="font-sans text-[0.96rem] font-black tracking-[0.23em] text-[#11130f] uppercase">
              {pillar.title}
            </p>
            <p className="mt-8 max-w-[34ch] font-sans text-[1.12rem] leading-9 text-[#171814]">
              {pillar.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
