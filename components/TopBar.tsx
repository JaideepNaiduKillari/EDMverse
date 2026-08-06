"use client";

import { scrollToSection } from "@/lib/scrollTo";
import Logo from "./Logo";

const NAV_LINKS: { label: string; id: string }[] = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ink-950/95 backdrop-blur-sm">
      {/* Row 1 — brand / nav / cta */}
      <div className="flex items-center justify-between border-b border-line px-6 md:px-10 h-[64px] md:h-[80px]">
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-3 group"
          aria-label="EDMVerse home"
        >
          <Logo size={30} />
          <span className="font-display font-extrabold tracking-tight text-lg md:text-xl">
            EDM<span className="text-accent">VERSE</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-10 mono-label text-[12px] text-smoke-300">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollToSection("waitlist")}
          className="mono-label text-[11px] md:text-[12px] bg-accent hover:bg-white text-ink-950 font-semibold px-4 md:px-6 py-2.5 md:py-3 transition-colors"
        >
          Get Early Access
        </button>
      </div>

      {/* Row 2 — masthead status strip */}
      <div className="hidden sm:flex items-center justify-between border-b border-line px-6 md:px-10 h-[44px] mono-label text-[11px] text-smoke-400">
        <span>003</span>
        <span className="border-l border-r border-line px-6 h-full flex items-center text-smoke-300">
          The Home of Electronic Music
        </span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          Pre-Launch / 2026
        </span>
      </div>
    </header>
  );
}
