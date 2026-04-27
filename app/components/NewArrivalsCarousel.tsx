"use client";

import {
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    eyebrow: "New Arrivals",
    name: "Canvas Cruiser",
    detail: "Lightweight comfort in washed-earth tones.",
    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1600&q=84",
    accent: "#bb8b7f",
  },
  {
    eyebrow: "Everyday Essentials",
    name: "Tree Runner Go",
    detail: "Soft structure with a breathable knit upper.",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1600&q=84",
    accent: "#95a08e",
  },
  {
    eyebrow: "Fresh Drop",
    name: "Dasher Wool",
    detail: "Sporty cushioning with a sharper street profile.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=84",
    accent: "#8f99aa",
  },
] as const;

type HoverSide = "left" | "right" | null;

function ArrowIcon({ side }: { side: Exclude<HoverSide, null> }) {
  const isLeft = side === "left";

  return (
    <svg className="size-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={isLeft ? "M14.5 6.5 9 12l5.5 5.5M9.75 12h5.75" : "M9.5 6.5 15 12l-5.5 5.5M14.25 12H8.5"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function NewArrivalsCarousel() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverSide, setHoverSide] = useState<HoverSide>(null);
  const [cursorVisible, setCursorVisible] = useState(false);

  const visibleSlides = useMemo(() => {
    const prev = (activeIndex - 1 + slides.length) % slides.length;
    const next = (activeIndex + 1) % slides.length;

    return {
      prev: slides[prev],
      current: slides[activeIndex],
      next: slides[next],
    };
  }, [activeIndex]);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from("[data-arrivals-intro]", {
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        y: 24,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from("[data-arrivals-copy]", {
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        y: 28,
        delay: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-arrival-product='current']",
        { autoAlpha: 0, scale: 0.94, y: 16 },
        {
          autoAlpha: 1,
          duration: 0.52,
          ease: "power3.out",
          scale: 1,
          y: 0,
        },
      );

      gsap.fromTo(
        "[data-arrival-product='side']",
        { autoAlpha: 0.35, scale: 0.94 },
        {
          autoAlpha: 0.9,
          duration: 0.52,
          ease: "power3.out",
          scale: 1,
          stagger: 0.04,
        },
      );

      gsap.fromTo(
        "[data-arrivals-copy]",
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          duration: 0.46,
          ease: "power3.out",
          y: 0,
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, [activeIndex]);

  useEffect(() => {
    if (!cursorRef.current) {
      return;
    }

    gsap.to(cursorRef.current, {
      autoAlpha: cursorVisible && hoverSide ? 1 : 0,
      duration: 0.18,
      ease: "power2.out",
      scale: cursorVisible && hoverSide ? 1 : 0.86,
    });
  }, [cursorVisible, hoverSide]);

  const moveCursor = (clientX: number, clientY: number) => {
    if (!stageRef.current || !cursorRef.current) {
      return;
    }

    const bounds = stageRef.current.getBoundingClientRect();
    const localX = clientX - bounds.left;
    const localY = clientY - bounds.top;
    const leftThreshold = bounds.width * 0.33;
    const rightThreshold = bounds.width * 0.67;

    let nextSide: HoverSide = null;

    if (localX <= leftThreshold) {
      nextSide = "left";
    } else if (localX >= rightThreshold) {
      nextSide = "right";
    }

    setHoverSide(nextSide);
    setCursorVisible(Boolean(nextSide));

    gsap.to(cursorRef.current, {
      duration: 0.22,
      ease: "power3.out",
      x: localX,
      y: localY,
    });
  };

  const resetCursor = () => {
    setHoverSide(null);
    setCursorVisible(false);
  };

  const goNext = () => {
    startTransition(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    });
  };

  const goPrev = () => {
    startTransition(() => {
      setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
    });
  };

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#f2f0ea] px-4 pb-28 pt-14 sm:px-8 lg:px-0"
      aria-label="New arrivals carousel"
    >
      <div className="mx-auto max-w-[1900px]">
        <div data-arrivals-intro className="mb-8 text-center">
          <p className="inline-block border-b border-[#20211d] pb-1 font-sans text-[1.05rem] font-black tracking-[0.16em] text-[#20211d] uppercase">
            {visibleSlides.current.eyebrow}
          </p>
        </div>

        <div
          ref={stageRef}
          className="relative h-[clamp(320px,40vw,560px)] overflow-hidden"
          onMouseLeave={resetCursor}
          onMouseMove={(event) => moveCursor(event.clientX, event.clientY)}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[47%] h-[58%] w-[48%] -translate-x-1/2 -translate-y-1/2 opacity-85"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(55,55,52,0.24) 1.7px, transparent 1.8px)",
              backgroundSize: "38px 38px",
              maskImage:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.92) 35%, rgba(0,0,0,0.42) 72%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.92) 35%, rgba(0,0,0,0.42) 72%, transparent 100%)",
            }}
          />

          <div className="pointer-events-none absolute inset-y-0 left-0 flex w-[29%] items-center justify-start">
            <div className="relative -ml-[18%] aspect-[1.5/1] w-[112%]">
              <Image
                data-arrival-product="side"
                src={visibleSlides.prev.image}
                alt={`${visibleSlides.prev.name} side preview`}
                fill
                draggable="false"
                sizes="(min-width: 1280px) 28vw, 34vw"
                className="object-contain opacity-95"
              />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-[16%] top-1/2 flex -translate-y-[42%] items-center justify-center">
            <div className="relative aspect-[2.2/1] w-full max-w-[860px]">
              <Image
                key={visibleSlides.current.name}
                data-arrival-product="current"
                src={visibleSlides.current.image}
                alt={visibleSlides.current.name}
                fill
                draggable="false"
                sizes="(min-width: 1280px) 48vw, 68vw"
                className="object-contain drop-shadow-[0_28px_34px_rgba(87,70,58,0.08)]"
              />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex w-[29%] items-center justify-end">
            <div className="relative -mr-[18%] aspect-[1.5/1] w-[112%]">
              <Image
                data-arrival-product="side"
                src={visibleSlides.next.image}
                alt={`${visibleSlides.next.name} side preview`}
                fill
                draggable="false"
                sizes="(min-width: 1280px) 28vw, 34vw"
                className="object-contain opacity-95"
              />
            </div>
          </div>

          <button
            type="button"
            aria-label="Previous arrival"
            className="absolute inset-y-0 left-0 z-20 hidden w-[33%] cursor-none bg-transparent lg:block"
            onClick={goPrev}
            onFocus={() => {
              setHoverSide("left");
              setCursorVisible(true);
            }}
            onBlur={resetCursor}
          />

          <button
            type="button"
            aria-label="Next arrival"
            className="absolute inset-y-0 right-0 z-20 hidden w-[33%] cursor-none bg-transparent lg:block"
            onClick={goNext}
            onFocus={() => {
              setHoverSide("right");
              setCursorVisible(true);
            }}
            onBlur={resetCursor}
          />

          <div
            ref={cursorRef}
            className="pointer-events-none absolute left-0 top-0 z-30 hidden size-[132px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#5f5551] text-[#2d2d2b] opacity-0 shadow-[0_18px_36px_rgba(77,64,56,0.16)] lg:grid"
            style={{
              background:
                "radial-gradient(circle at 68% 34%, rgba(255,255,255,0.34), rgba(191,145,136,0.9))",
              visibility: "hidden",
            }}
          >
            {hoverSide ? <ArrowIcon side={hoverSide} /> : null}
          </div>
        </div>

        <div data-arrivals-copy className="mt-4 text-center">
          <h2 className="font-serif text-[clamp(2.4rem,5vw,4.9rem)] leading-[0.98] text-[#1d1e1a]">
            {visibleSlides.current.name}
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-[1.05rem] leading-7 text-[#585752]">
            {visibleSlides.current.detail}
          </p>
        </div>
      </div>
    </section>
  );
}
