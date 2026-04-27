"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerColumns = [
  {
    title: "Help",
    links: [
      "Live Chat",
      "Call Us",
      "Text Us",
      "help@allbirds.com",
      "FAQ/Contact Us",
      "Returns/Exchanges",
    ],
  },
  {
    title: "Shop",
    links: [
      "Men's Shoes",
      "Women's Shoes",
      "Men's Apparel",
      "Women's Apparel",
      "Socks",
      "Refer a Friend",
    ],
  },
  {
    title: "Company",
    links: [
      "Store Locator",
      "Our Story",
      "Our Materials",
      "Sustainability",
      "Investors",
      "Shoe Care",
      "Affiliates",
      "Bulk Orders",
    ],
  },
  {
    title: "About",
    links: [
      "Press",
      "Careers",
      "Responsible Disclosure Program",
      "California Transparency Act",
      "Community Offers",
      "Our Blog",
      "Patents",
      "Terms of Use - Wholesale",
      "Global Entities",
    ],
  },
] as const;

const socials = [
  {
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.9" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
        <path
          d="M12 4.2c-4.2 0-6.8 3-6.8 6.2 0 2.4 1.3 4.2 3.2 4.9l.7-2.6c-.5-.7-.8-1.5-.8-2.5 0-2.4 1.8-4.6 4.9-4.6 2.7 0 4.2 1.7 4.2 3.8 0 2.8-1.2 5.2-3 5.2-.9 0-1.6-.8-1.4-1.8l.5-2.1c.3-1.1-.3-2-.9-2-.8 0-1.5.9-1.5 2.2 0 .8.3 1.4.3 1.4l-1.2 5c-.2.9 0 2.2.1 3.1.6-.8 1.2-2.1 1.4-2.9l.4-1.6c.4.7 1.6 1.3 2.9 1.3 3.8 0 6.5-3.4 6.5-7.7 0-3.3-2.8-6.3-6.8-6.3Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
        <path d="M13.1 20v-7h2.3l.3-2.6h-2.6V8.8c0-.8.2-1.4 1.4-1.4h1.3V5.1c-.2 0-.9-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.3v2.1H9v2.6h2.1v7h2Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "X",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
        <path d="M5 5h2.7l4.2 5.4L16.7 5H19l-6 6.9L19 19h-2.7l-4.5-5.8L6.8 19H4.5l6.2-7.1L5 5Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
        <path
          d="M14.8 4c.4 1.1 1 1.9 1.9 2.5.8.6 1.7.9 2.8 1v2.7c-1.3 0-2.5-.3-3.6-.8v5.2c0 3.1-2.4 5.4-5.5 5.4-3 0-5.4-2.4-5.4-5.3 0-3.3 2.8-5.7 6-5.3v2.8c-1.5-.4-3 .7-3 2.4 0 1.4 1.1 2.6 2.5 2.6 1.5 0 2.6-1.1 2.6-3V4h1.7Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
        <path d="M20.5 8.3c-.2-1.2-1.1-2.1-2.3-2.3C16.7 5.7 12 5.7 12 5.7s-4.7 0-6.2.3C4.6 6.2 3.7 7.1 3.5 8.3 3.2 9.8 3.2 12 3.2 12s0 2.2.3 3.7c.2 1.2 1.1 2.1 2.3 2.3 1.5.3 6.2.3 6.2.3s4.7 0 6.2-.3c1.2-.2 2.1-1.1 2.3-2.3.3-1.5.3-3.7.3-3.7s0-2.2-.3-3.7ZM10.2 15.2V8.8l5.1 3.2-5.1 3.2Z" fill="currentColor" />
      </svg>
    ),
  },
] as const;

export function SiteFooter() {
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!footerRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from("[data-footer-block]", {
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.06,
        y: 24,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    }, footerRef);

    return () => context.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#1f1f1d] px-6 pb-16 pt-20 text-white sm:px-10 lg:px-12"
      aria-label="Site footer"
    >
      <div className="mx-auto flex max-w-[1900px] flex-col gap-16 xl:flex-row xl:justify-between">
        <div className="max-w-[480px]">
          <div data-footer-block>
            <p className="font-sans text-[0.96rem] font-black tracking-[0.22em] uppercase">
              Subscribe To Our Emails
            </p>

            <form className="mt-10">
              <div className="flex min-h-[48px] items-center rounded-full bg-white px-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="h-full flex-1 bg-transparent font-sans text-[1rem] text-[#6f8093] outline-none placeholder:text-[#6f8093]"
                />
                <button
                  type="submit"
                  className="font-sans text-[0.96rem] font-black tracking-[0.03em] text-[#10110f] uppercase"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>

          <div data-footer-block className="mt-24">
            <p className="font-sans text-[0.96rem] font-black tracking-[0.22em] uppercase">
              Follow The Flock
            </p>

            <div className="mt-8 flex flex-wrap gap-5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="grid size-12 place-items-center rounded-full border border-white/85 text-white transition duration-300 hover:bg-white hover:text-[#1b1b18]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="grid flex-1 gap-10 sm:grid-cols-2 xl:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title} data-footer-block>
              <h3 className="font-sans text-[0.96rem] font-black tracking-[0.22em] uppercase">
                {column.title}
              </h3>
              <ul className="mt-10 space-y-6">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-sans text-[1.05rem] leading-7 text-white transition duration-300 hover:text-[#d4d0c5]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
