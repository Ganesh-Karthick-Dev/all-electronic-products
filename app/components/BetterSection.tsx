"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rows = [
  {
    title: "Better Things",
    body:
      "We work with-not against-Mother Nature, favoring both recycled and natural materials like responsibly-sourced Merino wool, tree fiber, and sugarcane. Every choice we make is a step toward a world we could all feel better about living in.",
    cta: "Learn More About Our Materials",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1600&q=84",
    imageAlt: "Dark knit boot in a mountain meadow",
    imageLeft: true,
  },
  {
    title: "Better Ways",
    body:
      "We innovate with a greater goal in mind: preserving our planet for future generations. As a certified B Corp, we use a data-driven approach to invest in projects, systems, and tools that maximize our opportunity for positive impact, prioritizing progress over perfection.",
    cta: "Learn More About Sustainability",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=84",
    imageAlt: "Hands holding soft natural fibers",
    imageLeft: false,
  },
] as const;

export function BetterSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-better-row]");

      items.forEach((row) => {
        const media = row.querySelector<HTMLElement>("[data-better-media]");
        const image = row.querySelector<HTMLElement>("[data-better-image]");
        const copy = row.querySelector<HTMLElement>("[data-better-copy]");

        gsap
          .timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          })
          .from(media, {
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            scale: 0.97,
            y: 30,
          })
          .from(
            image,
            {
              duration: 1.2,
              ease: "power3.out",
              scale: 1.08,
            },
            "-=0.55",
          )
          .from(
            copy,
            {
              autoAlpha: 0,
              duration: 0.7,
              ease: "power3.out",
              x: row.dataset.side === "left" ? 22 : -22,
              y: 12,
            },
            "-=0.8",
          );
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      className="bg-[#f2f0ea] px-4 pb-32 sm:px-8 lg:px-5"
      ref={sectionRef}
      aria-label="Better things and better ways"
    >
      <div className="mx-auto flex max-w-[1880px] flex-col gap-12 lg:gap-18">
        {rows.map((row) => {
          const isLeft = row.imageLeft;

          return (
            <article
              key={row.title}
              data-better-row
              data-side={isLeft ? "left" : "right"}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-18"
            >
              <div
                data-better-media
                className={`relative overflow-hidden rounded-[22px] bg-[#d7d2c7] shadow-[0_18px_45px_rgba(32,31,26,0.08)] ${
                  isLeft ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div
                  data-better-image
                  className="aspect-[1.34/1] bg-cover bg-center"
                  style={{ backgroundImage: `url(${row.image})` }}
                  role="img"
                  aria-label={row.imageAlt}
                />
              </div>

              <div
                data-better-copy
                className={`mx-auto flex max-w-[720px] flex-col items-center text-center ${
                  isLeft ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <h2 className="font-serif text-[clamp(2.2rem,3.2vw,3.4rem)] leading-[1.02] font-normal tracking-[-0.055em] text-[#171916]">
                  {row.title}
                </h2>
                <p className="mt-10 max-w-[660px] text-[clamp(1.05rem,1.35vw,1.58rem)] leading-[1.48] font-medium tracking-[-0.03em] text-[#181a15]">
                  {row.body}
                </p>
                <a
                  className="mt-12 text-[0.98rem] font-black tracking-[0.04em] text-[#11130f] uppercase underline underline-offset-4 transition hover:text-[#5d6d62]"
                  href="#"
                >
                  {row.cta}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
