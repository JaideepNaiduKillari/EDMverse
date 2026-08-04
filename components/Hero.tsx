"use client";

import { useState } from "react";
import { scrollToSection } from "@/lib/scrollTo";
import EDMVisual from "./EDMVisual";

const INDEX_ITEMS = [
  { n: "01", label: "Artists" },
  { n: "02", label: "Events" },
  { n: "03", label: "Festivals" },
  { n: "04", label: "Releases" },
  { n: "05", label: "News" },
];

export default function Hero() {
  const [showIndex, setShowIndex] = useState(false);

  return (
    <section
      id="hero"
      className="snap-section relative flex flex-col justify-center px-6 md:px-10"
      style={{ paddingTop: "var(--topbar-h)" }}
    >
      <div className="parallax-grid" />
      <EDMVisual className="right-[-8%] top-[15%] lg:right-[7%] lg:top-[18%]" />
      <div className="relative z-10 grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-16 py-12 lg:py-0">
        {/* Left column */}
        <div className="flex flex-col justify-center">
          <p className="mono-label text-[12px] text-smoke-300 mb-8">
            <span className="text-accent">/</span> Everything electronic
            music, one platform
          </p>

          <h1 className="font-display font-black uppercase leading-[0.92] tracking-tight text-[15vw] sm:text-[11vw] md:text-[7.2vw] lg:text-[6.2vw] [text-shadow:0_0_42px_rgba(249,115,22,0.08)]">
            The Home
            <br />
            Of Electronic
            <br />
            Music
            <span className="inline-block align-baseline w-[0.16em] h-[0.16em] ml-1 rounded-full bg-accent" />
          </h1>

          <div className="flex flex-wrap items-center gap-8 mt-10 md:mt-14">
            <button
              onClick={() => scrollToSection("waitlist")}
              className="mono-label text-[12px] bg-accent hover:bg-white text-ink-950 font-semibold px-7 py-4 transition-colors"
            >
              Request Access
            </button>
            <button
              onClick={() => setShowIndex((v) => !v)}
              aria-expanded={showIndex}
              aria-controls="hero-index-panel"
              className="mono-label text-[12px] text-smoke-300 hover:text-white transition-colors inline-flex items-center gap-2"
            >
              {showIndex ? "Hide The Index" : "View The Index"}
              <span
                aria-hidden="true"
                className={`inline-block transition-transform duration-300 ${
                  showIndex ? "rotate-180" : ""
                }`}
              >
                {showIndex ? "↓" : "↗"}
              </span>
            </button>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:border-l lg:border-line lg:pl-10 flex flex-col justify-center backdrop-blur-[1px]">
          <p className="text-smoke-200 text-lg leading-relaxed max-w-sm">
            EDMVerse links artists, festivals, events, releases and news into
            a single, navigable record of the scene.
          </p>

          {/* Toggle panel — animates open/closed via CSS grid-rows,
              no layout jump, no JS height measuring. */}
          <div
            id="hero-index-panel"
            className={`grid transition-all duration-300 ease-out max-w-sm ${
              showIndex
                ? "grid-rows-[1fr] opacity-100 mt-10"
                : "grid-rows-[0fr] opacity-0 mt-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="border-t border-line">
                {INDEX_ITEMS.map((item) => (
                  <button
                    key={item.n}
                    onClick={() => scrollToSection("about")}
                    className="w-full flex items-center gap-4 py-4 border-b border-line group text-left"
                  >
                    <span className="mono-label text-[12px] text-accent">
                      {item.n}
                    </span>
                    <span className="mono-label text-[13px] text-smoke-200 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
