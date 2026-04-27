"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function StorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const markerRef = useRef<SVGGElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<SVGImageElement | null>(null);
  const copyRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        })
        .from(markerRef.current, {
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.out",
          scaleY: 0.25,
          transformOrigin: "top center",
          y: -18,
        })
        .from(
          frameRef.current,
          {
            autoAlpha: 0,
            duration: 0.95,
            ease: "power3.out",
            scale: 0.94,
            y: 48,
          },
          "-=0.08",
        )
        .from(
          imageRef.current,
          {
            duration: 1.15,
            ease: "power3.out",
            scale: 1.08,
            transformOrigin: "50% 50%",
          },
          "-=0.75",
        )
        .from(
          copyRef.current,
          {
            autoAlpha: 0,
            duration: 0.85,
            ease: "power3.out",
            y: 24,
          },
          "-=0.45",
        );

      gsap.to(imageRef.current, {
        attr: { y: "38" },
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 0.8,
          start: "top bottom",
          end: "bottom top",
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-[#f2f0ea] px-4 pt-24 pb-28 text-[#171916] sm:px-8 sm:pt-32 lg:pt-36"
      ref={sectionRef}
      aria-label="Our story"
    >
      <div
        className="relative mx-auto aspect-[1.86/1] w-[min(92rem,88vw)] max-w-[1480px]"
        ref={frameRef}
      >
        <svg
          className="absolute inset-0 size-full overflow-visible"
          viewBox="0 0 1200 760"
          preserveAspectRatio="none"
          role="img"
          aria-label="Green hills framed by a rounded pill"
        >
          <defs>
            <clipPath id="story-arch-clip" clipPathUnits="userSpaceOnUse">
              <ellipse cx="600" cy="474" rx="482" ry="236" />
            </clipPath>
            <linearGradient id="story-shade" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#080b06" stopOpacity="0.12" />
              <stop offset="0.52" stopColor="#080b06" stopOpacity="0.24" />
              <stop offset="1" stopColor="#080b06" stopOpacity="0.68" />
            </linearGradient>
          </defs>

          <g ref={markerRef}>
            <circle cx="600" cy="26" r="7.5" fill="#1d1e1a" />
            <line x1="600" y1="34" x2="600" y2="176" stroke="#86847d" strokeWidth="1" />
          </g>

          <ellipse
            cx="600"
            cy="474"
            rx="566"
            ry="300"
            fill="none"
            stroke="#8c8a83"
            strokeWidth="1"
          />
          <ellipse
            cx="600"
            cy="474"
            rx="540"
            ry="276"
            fill="none"
            stroke="#8c8a83"
            strokeWidth="1"
          />

          <image
            ref={imageRef}
            href="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=84"
            x="118"
            y="208"
            width="964"
            height="540"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#story-arch-clip)"
          />
          <ellipse cx="600" cy="474" rx="482" ry="236" fill="url(#story-shade)" />
        </svg>

        <div className="absolute inset-x-[10%] top-[57%] z-10 flex -translate-y-1/2 justify-center text-center">
          <p
            className="max-w-[900px] font-serif text-[clamp(1.1rem,2vw,2.28rem)] leading-[1.5] font-normal tracking-[-0.045em] text-[#fffaf1] drop-shadow-[0_12px_34px_rgba(0,0,0,0.35)]"
            ref={copyRef}
          >
            We set out to create an entirely new category of shoes inspired by
            natural materials, guided by an ethos to create better things in a
            better way. We&apos;ve made a lot of progress, but we&apos;re just
            getting started.
          </p>
        </div>
      </div>
    </section>
  );
}
