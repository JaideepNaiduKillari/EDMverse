"use client";

import { useState } from "react";
import GridTicks from "./GridTicks";

const FAQS = [
  {
    question: "What is EDMVerse?",
    answer:
      "EDMVerse is building the home of electronic music - a connected platform where fans, artists, festivals, promoters, labels, and the entire electronic music ecosystem come together in one place.",
  },
  {
    question: "Why should I join the waitlist?",
    answer:
      "By joining the waitlist, you'll receive exclusive updates, early previews, behind-the-scenes progress, and priority access when EDMVerse launches.",
  },
  {
    question: "Who is EDMVerse for?",
    answer:
      "Whether you're a fan, artist, DJ, promoter, festival organizer, label or simply passionate about electronic music, EDMVerse is being built for you.",
  },
  {
    question: "Will EDMVerse be free?",
    answer:
      "Yes. The core experience will be free to use. As the platform evolves, additional tools and services may be introduced for professionals.",
  },
  {
    question: "When is EDMVerse launching?",
    answer:
      "We're currently building the first version of EDMVerse and are planning to launch early next year. We'll keep everyone on the waitlist updated along the way.",
  },
  {
    question: "Can I contribute to EDMVerse?",
    answer:
      "Absolutely. We're always looking to collaborate with passionate people who want to help build the future of electronic music. If you'd like to contribute, we'd love to hear from you. Contact us through email.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="snap-section relative flex flex-col justify-center px-6 md:px-10 border-t border-line"
      style={{ paddingTop: "var(--topbar-h)" }}
    >
      <GridTicks />

      <div className="relative z-10 w-full max-w-5xl mx-auto py-14 md:py-0">
        <div className="flex items-end justify-between border-b border-line pb-6 mb-7">
          <div>
            <p className="mono-label text-[11px] text-accent mb-3">
              [ Need to know ]
            </p>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;

            return (
              <article
                key={faq.question}
                className={`border rounded-2xl transition-colors duration-300 ${
                  isOpen
                    ? "border-accent/60 bg-ink-850 shadow-[0_14px_45px_rgba(0,0,0,0.28)]"
                    : "border-line bg-ink-900/70 hover:border-line2"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full flex items-center justify-between gap-6 px-6 md:px-8 py-5 md:py-6 text-left"
                  >
                    <span className="font-display font-semibold text-lg md:text-l">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`relative shrink-0 w-5 h-5 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <span className="absolute top-1/2 left-0 w-full h-px bg-accent" />
                      <span className="absolute top-0 left-1/2 h-full w-px bg-accent" />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 md:px-8 pb-6 md:pb-7 text-base md:text-lg text-smoke-300 leading-relaxed max-w-4xl">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
