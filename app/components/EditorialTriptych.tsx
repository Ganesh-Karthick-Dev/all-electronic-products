"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "Spring Travel Essentials",
    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1600&q=84",
    alt: "Striped shoes styled outdoors",
  },
  {
    title: "New Arrivals",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=84",
    alt: "Fresh seasonal footwear collection",
  },
  {
    title: "Fresh Colors For Spring",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1600&q=84",
    alt: "Pink footwear photographed in sunlight",
  },
] as const;

export function EditorialTriptych() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from("[data-triptych-card]", {
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        y: 34,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f2f0ea] px-3 pb-28 pt-6 sm:px-6 lg:px-3"
      aria-label="Editorial spring highlights"
    >
      <div className="mx-auto grid max-w-[1900px] gap-3 lg:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.title}
            data-triptych-card
            className="group relative flex min-h-[520px] overflow-hidden rounded-[30px] bg-[#d9d1c6] md:min-h-[620px]"
          >
            <Image
              src={card.image}
              alt={card.alt}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,14,11,0.08),rgba(15,14,11,0.04)_35%,rgba(15,14,11,0.34)_100%)] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(15,14,11,0.14),rgba(15,14,11,0.08)_35%,rgba(15,14,11,0.4)_100%)]" />

            <div className="relative z-10 flex w-full flex-col justify-between p-6 sm:p-8">
              <h3 className="max-w-[12ch] font-serif text-[clamp(2.4rem,4vw,4.2rem)] leading-[0.95] tracking-[-0.03em] text-white">
                {card.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#men"
                  className="inline-flex min-w-[172px] items-center justify-center rounded-full border border-white/90 px-8 py-3 font-sans text-[0.96rem] font-black tracking-[0.03em] text-white uppercase transition duration-300 hover:bg-white hover:text-[#141512]"
                >
                  Shop Men
                </a>
                <a
                  href="#women"
                  className="inline-flex min-w-[172px] items-center justify-center rounded-full border border-white/90 px-8 py-3 font-sans text-[0.96rem] font-black tracking-[0.03em] text-white uppercase transition duration-300 hover:bg-white hover:text-[#141512]"
                >
                  Shop Women
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
