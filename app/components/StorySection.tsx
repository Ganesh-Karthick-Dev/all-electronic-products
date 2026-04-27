"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function StorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const markerRef = useRef<HTMLDivElement | null>(null);
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
      className="relative overflow-hidden bg-[#f2f0ea] px-4 pt-28 pb-28 text-[#171916] sm:px-8 sm:pt-36 lg:pt-40"
      ref={sectionRef}
      aria-label="Our story"
    >
      <div
        className="relative z-10 mx-auto -mb-[2px] flex h-[116px] w-5 flex-col items-center"
        ref={markerRef}
        aria-hidden="true"
      >
        <span className="block size-3 rounded-full bg-[#1d1e1a]" />
        <span className="block h-[108px] w-px bg-[#86847d]" />
      </div>

      <div
        className="relative mx-auto aspect-[2.12/1] w-[min(92rem,88vw)] max-w-[1480px]"
        ref={frameRef}
      >
        <svg
          className="absolute inset-0 size-full overflow-visible"
          viewBox="0 0 1200 566"
          preserveAspectRatio="none"
          role="img"
          aria-label="Green hills framed by a rounded arch"
        >
          <defs>
            <clipPath id="story-arch-clip" clipPathUnits="userSpaceOnUse">
              <path d="M82 530 L1118 530 C1118 248 980 112 742 112 L458 112 C220 112 82 248 82 530 Z" />
            </clipPath>
            <linearGradient id="story-shade" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#080b06" stopOpacity="0.12" />
              <stop offset="0.52" stopColor="#080b06" stopOpacity="0.24" />
              <stop offset="1" stopColor="#080b06" stopOpacity="0.68" />
            </linearGradient>
          </defs>

          <path
            d="M36 564 L1164 564 C1164 198 1000 58 742 58 L458 58 C200 58 36 198 36 564 Z"
            fill="none"
            stroke="#8c8a83"
            strokeWidth="1"
          />
          <path
            d="M58 548 L1142 548 C1142 222 992 82 742 82 L458 82 C208 82 58 222 58 548 Z"
            fill="none"
            stroke="#8c8a83"
            strokeWidth="1"
          />

          <image
            ref={imageRef}
            href="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=84"
            x="58"
            y="48"
            width="1084"
            height="560"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#story-arch-clip)"
          />
          <path
            d="M82 530 L1118 530 C1118 248 980 112 742 112 L458 112 C220 112 82 248 82 530 Z"
            fill="url(#story-shade)"
          />
        </svg>

        <div className="absolute inset-x-[8%] top-[34%] z-10 flex justify-center text-center sm:top-[38%]">
          <p
            className="max-w-[920px] font-serif text-[clamp(1.15rem,2.25vw,2.55rem)] leading-[1.48] font-normal tracking-[-0.045em] text-[#fffaf1] drop-shadow-[0_12px_34px_rgba(0,0,0,0.35)]"
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
