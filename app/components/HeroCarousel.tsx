"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type LeftSlide = {
  name: string;
  tone: string;
  background: string;
  product: string;
};

type RightSlide = {
  eyebrow: string;
  title: string;
  image: string;
  align: "center" | "right";
};

type MegaMenuKey = "men" | "women" | "sale";

type MegaMenuContent = {
  tabs: string[];
  featureLinks: string[];
  shoeTitle: string;
  shoes: string[];
  picks: string[];
  apparel: string[];
  cards: {
    title: string;
    image: string;
    className?: string;
  }[];
};

const leftSlides: LeftSlide[] = [
  {
    name: "Regenerative Green",
    tone: "Color created by",
    background:
      "https://images.unsplash.com/photo-1520322082799-20c1288346e3?auto=format&fit=crop&w=1200&q=80",
    product:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Adventurous Auburn",
    tone: "Naturally grounded",
    background:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
    product:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Coastal Stone",
    tone: "Made for every day",
    background:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80",
    product:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80",
  },
];

const rightSlides: RightSlide[] = [
  {
    eyebrow: "New season canvas",
    title: "The New Canvas Cruiser Collection",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=82",
    align: "right",
  },
  {
    eyebrow: "Light steps, long days",
    title: "Built For Errands, Weekends, And Everywhere Between",
    image:
      "https://images.unsplash.com/photo-1506629905607-d9fe3c4d99d7?auto=format&fit=crop&w=1800&q=82",
    align: "center",
  },
  {
    eyebrow: "Soft structure",
    title: "Everyday Sneakers With A Cleaner Footprint",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=82",
    align: "right",
  },
];

const megaMenus: Record<MegaMenuKey, MegaMenuContent> = {
  men: {
    tabs: ["Shoes", "Socks & Apparel", "Sale"],
    featureLinks: [
      "Allbirds x Pantone",
      "Dasher NZ Collection",
      "Trail Runners",
      "New Arrivals",
      "Bestsellers",
    ],
    shoeTitle: "Men's Shoes",
    shoes: ["Shop All", "Sneakers", "Slip Ons", "Running Shoes", "Slippers", "All-Weather"],
    picks: ["Tree Runner NZ", "Canvas Cruiser", "Tree Glider", "Dasher NZ", "Couriers", "Loungers"],
    apparel: ["Socks", "Apparel", "Bags", "Laces", "Insoles"],
    cards: [
      {
        title: "Canvas Cruiser",
        image:
          "https://images.unsplash.com/photo-1520322082799-20c1288346e3?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Men's New Arrivals",
        image:
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Men's Sale",
        image:
          "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=900&q=80",
        className: "md:col-start-2",
      },
    ],
  },
  women: {
    tabs: ["Shoes", "Socks & Apparel", "Sale"],
    featureLinks: [
      "Allbirds x Pantone",
      "Dasher NZ Collection",
      "Terralux Collection",
      "Varsity Collection",
      "New Arrivals",
      "Bestsellers",
    ],
    shoeTitle: "Women's Shoes",
    shoes: ["Shop All", "Sneakers", "Flats", "Slip Ons", "Slippers", "All-Weather", "Sandals"],
    picks: [
      "Tree Runner NZ",
      "Canvas Cruiser",
      "The Original Tree Runner",
      "Tree Glider",
      "Tree Breezer",
      "Dasher NZ",
      "Varsity",
    ],
    apparel: ["Socks", "Apparel", "Bags", "Laces", "Insoles"],
    cards: [
      {
        title: "Canvas Cruiser",
        image:
          "https://images.unsplash.com/photo-1520322082799-20c1288346e3?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Women's New Arrivals",
        image:
          "https://images.unsplash.com/photo-1506629905607-d9fe3c4d99d7?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Women's Sale",
        image:
          "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=900&q=80",
        className: "md:col-start-2",
      },
    ],
  },
  sale: {
    tabs: ["Sale Shoes", "Sale Apparel", "Last Chance"],
    featureLinks: ["Sale", "Women's Sale", "Men's Sale", "Final Pairs", "Bestsellers"],
    shoeTitle: "Sale Shoes",
    shoes: ["Shop All Sale", "Sneakers", "Running Shoes", "Slip Ons", "Flats", "Sandals"],
    picks: ["Canvas Cruiser", "Tree Runner NZ", "Tree Glider", "Tree Breezer", "Dasher NZ"],
    apparel: ["Sale Socks", "Sale Apparel", "Bags", "Accessories", "Insoles"],
    cards: [
      {
        title: "Up To 40% Off",
        image:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Women's Sale",
        image:
          "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Men's Sale",
        image:
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
        className: "md:col-start-2",
      },
    ],
  },
};

function SearchIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m20 20-4.2-4.2m1.7-5.05a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 12.5a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5Zm7 7.5a7 7 0 0 0-14 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M9.7 9.4A2.45 2.45 0 0 1 12 7.9c1.45 0 2.55.9 2.55 2.2 0 1.05-.6 1.7-1.65 2.35-.8.5-.95.82-.95 1.55m.02 2.5h.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.2 8.5h11.6l.7 11H5.5l.7-11Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M9 8.5V7a3 3 0 0 1 6 0v1.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function HeroCarousel() {
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MegaMenuKey | null>(null);

  const rootRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const leftProgressRef = useRef<HTMLSpanElement | null>(null);
  const rightProgressRef = useRef<HTMLSpanElement | null>(null);
  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const rightCopyRef = useRef<HTMLDivElement | null>(null);
  const megaMenuRef = useRef<HTMLDivElement | null>(null);
  const megaContentRef = useRef<HTMLDivElement | null>(null);

  const leftSlide = leftSlides[leftIndex];
  const rightSlide = rightSlides[rightIndex];
  const megaMenu = megaMenus[activeMenu ?? "women"];

  useEffect(() => {
    if (!rootRef.current || !leftProgressRef.current || !rightProgressRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.set([leftProgressRef.current, rightProgressRef.current], {
        scaleX: 0,
        transformOrigin: "left center",
      });

      timelineRef.current = gsap
        .timeline({ repeat: -1 })
        .to(leftProgressRef.current, {
          scaleX: 1,
          duration: 4.2,
          ease: "none",
          onComplete: () => {
            setLeftIndex((current) => (current + 1) % leftSlides.length);
          },
        })
        .set(leftProgressRef.current, { scaleX: 0 })
        .to(rightProgressRef.current, {
          scaleX: 1,
          duration: 5.2,
          ease: "none",
          onComplete: () => {
            setRightIndex((current) => (current + 1) % rightSlides.length);
          },
        })
        .set(rightProgressRef.current, { scaleX: 0 });
    }, rootRef);

    return () => {
      context.revert();
      timelineRef.current = null;
    };
  }, []);

  useEffect(() => {
    timelineRef.current?.paused(paused);
  }, [paused]);

  useEffect(() => {
    if (!leftCardRef.current) {
      return;
    }

    gsap.fromTo(
      leftCardRef.current,
      { autoAlpha: 0, y: 22, scale: 0.985 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.75, ease: "power3.out" },
    );
  }, [leftIndex]);

  useEffect(() => {
    if (!rightCopyRef.current) {
      return;
    }

    gsap.fromTo(
      rightCopyRef.current,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
    );
  }, [rightIndex]);

  useEffect(() => {
    if (!megaMenuRef.current) {
      return;
    }

    if (!activeMenu) {
      gsap.to(megaMenuRef.current, {
        autoAlpha: 0,
        duration: 0.35,
        ease: "power2.inOut",
        yPercent: -105,
      });
      return;
    }

    gsap.to(megaMenuRef.current, {
      autoAlpha: 1,
      duration: 0.55,
      ease: "power3.out",
      yPercent: 0,
    });

    if (megaContentRef.current) {
      gsap.fromTo(
        megaContentRef.current.children,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          delay: 0.1,
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.045,
          y: 0,
        },
      );
    }
  }, [activeMenu]);

  return (
    <section
      className="isolate relative mx-2.5 mt-2.5 grid min-h-[clamp(520px,calc(100svh-96px),705px)] grid-cols-1 overflow-hidden rounded-[22px] bg-[#c8c5b8] shadow-[0_28px_70px_rgba(42,40,33,0.14)] sm:mx-3.5 sm:mt-3.5 sm:rounded-[27px] lg:grid-cols-[40%_60%]"
      ref={rootRef}
      aria-label="Featured products"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div
        className={`pointer-events-auto invisible absolute inset-x-0 top-0 z-20 hidden -translate-y-full origin-top bg-[#eeeae1] px-4 pt-[104px] pb-8 opacity-0 shadow-[0_24px_70px_rgba(21,21,18,0.18)] md:block ${
          activeMenu ? "" : "pointer-events-none"
        }`}
        ref={megaMenuRef}
        onMouseEnter={() => setActiveMenu(activeMenu ?? "women")}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="rounded-[14px] bg-[#ded8cc] px-5 py-4">
          <div className="mx-auto flex max-w-[380px] items-center justify-center gap-8 text-[1.08rem] font-semibold tracking-[-0.04em] text-[#5c5b58]">
            {megaMenu.tabs.map((tab, index) => (
              <a
                className={`no-underline transition hover:text-[#20211d] ${
                  index === 0 ? "font-black text-[#20211d]" : ""
                }`}
                href="#"
                key={tab}
              >
                {tab}
              </a>
            ))}
          </div>
        </div>

        <div
          className="grid gap-8 pt-8 text-[#242520] lg:grid-cols-[1fr_0.9fr_1fr_1.1fr_1.7fr]"
          ref={megaContentRef}
        >
          <div className="space-y-5 text-[0.88rem] leading-snug font-black tracking-[0.06em] uppercase">
            {megaMenu.featureLinks.map((item) => (
              <a className="block no-underline transition hover:text-[#657364]" href="#" key={item}>
                {item}
              </a>
            ))}
          </div>

          <div>
            <h3 className="mb-5 text-[0.88rem] font-black tracking-[0.06em] uppercase">
              {megaMenu.shoeTitle}
            </h3>
            <div className="space-y-3 text-[1.02rem] leading-snug tracking-[-0.04em] text-[#5c5b58]">
              {megaMenu.shoes.map((item) => (
                <a className="block no-underline transition hover:text-[#20211d]" href="#" key={item}>
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-[0.88rem] font-black tracking-[0.06em] uppercase">
              Popular Picks
            </h3>
            <div className="space-y-3 text-[1.02rem] leading-snug tracking-[-0.04em] text-[#5c5b58]">
              {megaMenu.picks.map((item) => (
                <a className="block no-underline transition hover:text-[#20211d]" href="#" key={item}>
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-[0.88rem] font-black tracking-[0.06em] uppercase">
              Apparel & Accessories
            </h3>
            <div className="space-y-3 text-[1.02rem] leading-snug tracking-[-0.04em] text-[#5c5b58]">
              {megaMenu.apparel.map((item) => (
                <a className="block no-underline transition hover:text-[#20211d]" href="#" key={item}>
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {megaMenu.cards.map((card, index) => (
              <a
                className={`relative min-h-[160px] overflow-hidden rounded-[16px] bg-[#657364] p-5 text-white shadow-[0_15px_35px_rgba(21,21,18,0.18)] no-underline ${card.className ?? ""}`}
                href="#"
                key={`${card.title}-${index}`}
              >
                <span
                  className="absolute inset-0 bg-cover bg-center transition duration-500 hover:scale-105"
                  style={{ backgroundImage: `url(${card.image})` }}
                  aria-hidden="true"
                />
                <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(12,14,10,0.52),rgba(12,14,10,0.08))]" />
                <strong className="absolute right-5 bottom-5 left-5 text-[1.02rem] leading-tight font-black tracking-[0.03em] uppercase">
                  {card.title}
                </strong>
              </a>
            ))}
          </div>
        </div>
      </div>

      <header className="absolute top-4 right-4 left-4 z-30 flex min-h-[72px] items-center justify-between rounded-[18px] bg-white px-5 text-[#20211d] shadow-[0_18px_45px_rgba(21,21,18,0.1)] sm:px-7 lg:top-4 lg:right-4 lg:left-4">
        <a
          className="font-serif text-[2rem] leading-none font-black tracking-[-0.11em] text-[#242520] italic no-underline sm:text-[2.25rem]"
          href="#"
          aria-label="Allbirds home"
        >
          allbirds
        </a>
        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-11 text-[1.05rem] font-black tracking-[0.08em] uppercase md:flex"
          aria-label="Primary navigation"
        >
          <button
            className={`cursor-pointer border-0 bg-transparent p-0 font-inherit tracking-[inherit] uppercase transition hover:text-[#657364] ${
              activeMenu === "men" ? "text-[#8d8b85]" : ""
            }`}
            type="button"
            onMouseEnter={() => setActiveMenu("men")}
          >
            Men
          </button>
          <button
            className={`cursor-pointer border-0 bg-transparent p-0 font-inherit tracking-[inherit] uppercase transition hover:text-[#657364] ${
              activeMenu === "women" ? "text-[#20211d]" : ""
            }`}
            type="button"
            onMouseEnter={() => setActiveMenu("women")}
          >
            Women
          </button>
          <button
            className={`cursor-pointer border-0 bg-transparent p-0 font-inherit tracking-[inherit] uppercase transition hover:text-[#657364] ${
              activeMenu === "sale" ? "text-[#8d8b85]" : ""
            }`}
            type="button"
            onMouseEnter={() => setActiveMenu("sale")}
          >
            Sale
          </button>
        </nav>
        <div className="flex items-center gap-4 text-[1.02rem] font-semibold tracking-[-0.02em] sm:gap-5">
          <a className="hidden no-underline transition hover:text-[#657364] lg:inline" href="#about">
            About
          </a>
          <a className="hidden no-underline transition hover:text-[#657364] lg:inline" href="#rerun">
            ReRun
          </a>
          <button className="grid place-items-center transition hover:text-[#657364]" type="button" aria-label="Search">
            <SearchIcon />
          </button>
          <button className="hidden place-items-center transition hover:text-[#657364] sm:grid" type="button" aria-label="Account">
            <UserIcon />
          </button>
          <button className="hidden place-items-center transition hover:text-[#657364] sm:grid" type="button" aria-label="Help">
            <HelpIcon />
          </button>
          <button className="grid place-items-center transition hover:text-[#657364]" type="button" aria-label="Cart">
            <BagIcon />
          </button>
        </div>
      </header>

      <div className="relative min-h-[500px] min-w-0 overflow-hidden lg:min-h-0">
        <div
          className="absolute inset-0 scale-[1.03] bg-cover bg-center"
          style={{ backgroundImage: `url(${leftSlide.background})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_45%,rgba(255,255,255,0.3),transparent_28%),linear-gradient(90deg,rgba(24,27,20,0.04),rgba(24,27,20,0.22))] backdrop-blur-[1px]"
          aria-hidden="true"
        />
        <div
          className="absolute top-28 right-5 left-5 z-10 grid min-h-0 grid-rows-[minmax(245px,1fr)_auto] bg-[#fbfaf5] shadow-[0_24px_60px_rgba(20,21,17,0.24)] sm:top-32 sm:right-10 sm:left-10 sm:grid-rows-[minmax(300px,1fr)_auto] lg:top-[92px] lg:left-[21%] lg:right-auto lg:min-h-[min(600px,calc(100%-126px))] lg:w-[58%] lg:max-w-[min(435px,64%)]"
          ref={leftCardRef}
        >
          <div
            className="m-[13px] mb-0 min-h-[245px] bg-[#d9d8cf] bg-cover bg-center sm:min-h-[320px]"
            style={{ backgroundImage: `url(${leftSlide.product})` }}
            aria-hidden="true"
          />
          <div className="flex min-h-[186px] flex-col justify-between gap-8 px-6 pt-5 pb-7 sm:min-h-[230px] sm:gap-14">
            <p className="m-0 text-[clamp(1.45rem,2vw,2rem)] leading-[0.98] font-black tracking-[-0.05em] text-[#0d0e0b]">
              {leftSlide.name}
            </p>
            <div>
              <span className="block text-[0.93rem] font-extrabold tracking-[-0.03em] text-[#151712]">
                {leftSlide.tone}
              </span>
              <strong className="block text-[clamp(1.45rem,2.2vw,2.22rem)] leading-[0.9] font-black tracking-[-0.09em] text-[#10110f]">
                PANTONE
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div className="relative min-h-[500px] min-w-0 overflow-hidden lg:min-h-0">
        <div
          className={`absolute inset-0 scale-[1.03] bg-cover ${
            rightSlide.align === "right" ? "bg-[position:62%_center]" : "bg-center"
          }`}
          style={{ backgroundImage: `url(${rightSlide.image})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,10,7,0.16),transparent_28%),linear-gradient(0deg,rgba(9,10,7,0.5),transparent_46%)]"
          aria-hidden="true"
        />
        <div
          className="absolute right-7 bottom-[104px] left-7 z-10 max-w-[760px] text-left text-[#fffaf1] lg:right-[clamp(38px,6vw,118px)] lg:bottom-[118px] lg:left-auto lg:text-right"
          ref={rightCopyRef}
        >
          <span className="mb-3.5 block text-[0.82rem] font-extrabold tracking-[0.18em] uppercase">
            {rightSlide.eyebrow}
          </span>
          <h1 className="m-0 text-balance font-serif text-[clamp(2.2rem,4.2vw,4.8rem)] leading-[0.96] font-normal tracking-[-0.05em] drop-shadow-[0_14px_35px_rgba(0,0,0,0.28)]">
            {rightSlide.title}
          </h1>
          <div className="mt-8 flex max-w-[230px] flex-col gap-2.5 sm:max-w-none sm:flex-row lg:justify-end">
            <a
              className="inline-flex min-h-12 min-w-0 items-center justify-center rounded-full bg-[#fffdf7] px-7 text-[0.92rem] font-black tracking-[0.02em] text-[#11130f] uppercase no-underline transition hover:-translate-y-0.5 hover:bg-[#ece6d8] sm:min-w-[182px]"
              href="#men"
            >
              Shop Men
            </a>
            <a
              className="inline-flex min-h-12 min-w-0 items-center justify-center rounded-full bg-[#fffdf7] px-7 text-[0.92rem] font-black tracking-[0.02em] text-[#11130f] uppercase no-underline transition hover:-translate-y-0.5 hover:bg-[#ece6d8] sm:min-w-[182px]"
              href="#women"
            >
              Shop Women
            </a>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute right-[78px] bottom-[46px] left-5 z-10 grid grid-cols-2 items-center gap-0 sm:right-[92px] sm:left-7 lg:right-[108px] lg:bottom-[52px] lg:left-12"
        aria-hidden="true"
      >
        <div className="h-1 overflow-hidden rounded-full bg-white/25">
          <span ref={leftProgressRef} className="block h-full w-full rounded-full bg-[#fffaf2]" />
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-white/25">
          <span ref={rightProgressRef} className="block h-full w-full rounded-full bg-[#fffaf2]" />
        </div>
      </div>

      <button
        className="absolute right-5 bottom-7 z-30 inline-flex size-[42px] cursor-pointer items-center justify-center rounded-full border-2 border-white/90 bg-[#12140f]/10 text-[#fffaf3] transition hover:scale-105 hover:bg-[#12140f]/25 sm:right-8 lg:bottom-8"
        type="button"
        aria-label={paused ? "Resume carousel" : "Pause carousel"}
        onClick={() => setPaused((current) => !current)}
      >
        {paused ? (
          <svg className="size-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          <svg className="size-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 5h3v14H7zM14 5h3v14h-3z" />
          </svg>
        )}
      </button>
    </section>
  );
}
