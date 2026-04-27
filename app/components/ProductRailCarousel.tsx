"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    badge: "New Color",
    name: "Men's Canvas Runner NZ",
    color: "Deep Navy Stripes",
    price: "$100",
    swatch: "#cfd4d7",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=84",
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5"],
  },
  {
    badge: "New Color",
    name: "Women's Tree Glider",
    color: "Burlwood",
    price: "$140",
    swatch: "#c99992",
    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=84",
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5"],
  },
  {
    badge: "Pantone Color",
    name: "Men's Canvas Cruiser",
    color: "Cultured Blue",
    price: "$75",
    swatch: "#9db4c7",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=84",
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5"],
  },
  {
    badge: "New Color",
    name: "Women's Breezer Mary Jane",
    color: "Dusty Pink",
    price: "$95",
    swatch: "#e2c0b9",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=84",
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5"],
  },
  {
    badge: "Best Seller",
    name: "Men's Varsity Cruiser",
    color: "Light Burnt Olive",
    price: "$115",
    swatch: "#a6a27e",
    image:
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=84",
    sizes: ["9", "9.5", "10", "10.5", "11", "11.5"],
  },
  {
    badge: "New",
    name: "Men's Tree Runner",
    color: "Navy Night",
    price: "$100",
    swatch: "#5f6773",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=84",
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5"],
  },
] as const;

function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const isLeft = direction === "left";

  return (
    <button
      type="button"
      aria-label={isLeft ? "Previous products" : "Next products"}
      disabled={disabled}
      onClick={onClick}
      className="grid size-14 place-items-center rounded-full border border-[#2f2f2b]/45 bg-transparent text-[#1f211d] transition duration-300 hover:border-[#1f211d] hover:bg-white/40 disabled:cursor-not-allowed disabled:opacity-35"
    >
      <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={isLeft ? "M14.5 6.5 9 12l5.5 5.5" : "M9.5 6.5 15 12l-5.5 5.5"}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
      </svg>
    </button>
  );
}

export function ProductRailCarousel() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [stepWidth, setStepWidth] = useState(0);

  const maxIndex = Math.max(products.length - visibleCount, 0);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from("[data-rail-intro]", {
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
    }, sectionRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const measure = () => {
      if (!viewportRef.current || !trackRef.current) {
        return;
      }

      const firstCard = trackRef.current.children[0] as HTMLElement | undefined;

      if (!firstCard) {
        return;
      }

      const trackStyles = window.getComputedStyle(trackRef.current);
      const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || "0");
      const nextStep = firstCard.getBoundingClientRect().width + gap;
      const viewportWidth = viewportRef.current.getBoundingClientRect().width;
      const nextVisible = Math.max(
        1,
        Math.floor((viewportWidth + gap) / nextStep),
      );

      setStepWidth(nextStep);
      setVisibleCount(nextVisible);
      setStartIndex((current) => Math.min(current, Math.max(products.length - nextVisible, 0)));
    };

    measure();

    window.addEventListener("resize", measure);

    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!trackRef.current) {
      return;
    }

    gsap.to(trackRef.current, {
      duration: 0.65,
      ease: "power3.out",
      x: -(startIndex * stepWidth),
    });
  }, [startIndex, stepWidth]);

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (!card) {
        return;
      }

      const isExpanded = expandedIndex === index;

      gsap.to(card, {
        duration: 0.42,
        ease: "power3.out",
        y: isExpanded ? -8 : 0,
        boxShadow: isExpanded
          ? "0 24px 56px rgba(32, 30, 27, 0.12)"
          : "0 0 0 rgba(0, 0, 0, 0)",
      });
    });
  }, [expandedIndex]);

  const goNext = () => {
    startTransition(() => {
      setStartIndex((current) => Math.min(current + 1, maxIndex));
    });
  };

  const goPrev = () => {
    startTransition(() => {
      setStartIndex((current) => Math.max(current - 1, 0));
    });
  };

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#f2f0ea] px-4 pb-28 pt-10 sm:px-6 lg:px-0"
      aria-label="Product rail carousel"
    >
      <div className="mx-auto max-w-[1900px]">
        <div
          data-rail-intro
          className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"
        >
          <div>
            <p className="inline-block border-b border-[#20211d] pb-1 font-sans text-[1.05rem] font-black tracking-[0.16em] text-[#20211d] uppercase">
              New Arrivals
            </p>
          </div>

          <div className="flex items-center gap-3 self-end">
            <ArrowButton direction="left" disabled={startIndex === 0} onClick={goPrev} />
            <ArrowButton direction="right" disabled={startIndex >= maxIndex} onClick={goNext} />
          </div>
        </div>

        <div ref={viewportRef} className="overflow-hidden">
          <div ref={trackRef} className="flex gap-4 will-change-transform">
            {products.map((product, index) => {
              const isExpanded = expandedIndex === index;

              return (
                <article
                  key={`${product.name}-${product.color}`}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  onMouseEnter={() => setExpandedIndex(index)}
                  onMouseLeave={() => setExpandedIndex(null)}
                  onFocus={() => setExpandedIndex(index)}
                  onBlur={() => setExpandedIndex(null)}
                  className="group relative flex min-h-[662px] w-[calc(100%-1rem)] flex-none flex-col overflow-hidden rounded-[28px] bg-white text-[#161714] md:w-[calc(50%-0.5rem)] xl:w-[calc(25%-0.75rem)]"
                >
                  <div className="flex-1 px-5 pt-5">
                    <span className="inline-flex rounded-full bg-[#ded5c5] px-4 py-2 font-sans text-[0.92rem] font-black tracking-[0.05em] text-[#0f1a29] uppercase">
                      {product.badge}
                    </span>

                    <div className="relative mt-7 aspect-[1.16/1] overflow-hidden rounded-[24px] bg-white">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(min-width: 1280px) 24vw, (min-width: 768px) 48vw, 92vw"
                        className="object-contain transition duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>

                  <div className="px-5 pb-6 pt-4">
                    <h3 className="font-sans text-[1.08rem] font-black tracking-[0.01em] text-[#11120f] uppercase">
                      {product.name}
                    </h3>
                    <p className="mt-2 font-sans text-[1.04rem] text-[#22231f]">
                      {product.color}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span
                        className="size-9 rounded-full border border-[#23231f]/65"
                        style={{ backgroundColor: product.swatch }}
                        aria-hidden="true"
                      />
                      <span className="font-sans text-[1rem] font-black text-[#141512]">
                        {product.price}
                      </span>
                    </div>

                    <div
                      className={`grid transition-all duration-500 ${
                        isExpanded ? "grid-rows-[1fr] pt-5" : "grid-rows-[0fr] pt-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="grid grid-cols-3 gap-3">
                          {product.sizes.map((size) => (
                            <button
                              key={`${product.name}-${size}`}
                              type="button"
                              className="min-h-14 rounded-[10px] border border-[#d3d0ca] bg-[#faf9f6] font-sans text-[0.98rem] font-bold text-[#191a16] transition duration-300 hover:border-[#1c1d19]"
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
