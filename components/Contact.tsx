import GridTicks from "./GridTicks";

const CONTACT_EMAIL = "helloedmverse@gmail.com";
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  CONTACT_EMAIL
)}&su=${encodeURIComponent("Hello EDMVerse")}`;

export default function Contact() {
  return (
    <section
      id="contact"
      className="snap-section relative flex flex-col justify-center border-t border-line px-6 md:px-10"
      style={{ paddingTop: "var(--topbar-h)" }}
    >
      <GridTicks />

      <div className="relative z-10 mx-auto w-full max-w-5xl py-14 md:py-0">
        <div className="border border-line bg-ink-900/80 p-7 shadow-[0_20px_70px_rgba(0,0,0,0.3)] md:p-12">
          <p className="mono-label mb-5 text-[11px] text-accent">[ Start a conversation ]</p>

          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
                Let&apos;s build the future of electronic music.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-smoke-300 md:text-lg">
                Have an idea, want to collaborate, or simply want to say hi? We&apos;d love to hear from you.
              </p>
            </div>

            <a
              href={GMAIL_COMPOSE}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full shrink-0 items-center justify-between gap-5 border border-accent bg-accent px-5 py-4 text-ink-950 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_12px_32px_rgba(249,115,22,0.22)] md:w-auto md:min-w-[290px]"
              aria-label={`Email EDMVerse at ${CONTACT_EMAIL}`}
            >
              <span>
                <span className="mono-label block text-[10px] font-semibold opacity-70">Contact us</span>
                <span className="mt-1 block text-sm font-bold normal-case tracking-normal">{CONTACT_EMAIL}</span>
              </span>
              <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 border-t border-line pt-5 text-sm text-smoke-400">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_#f97316]" />
            Opens Gmail compose in a new tab, ready to send.
          </div>
        </div>
      </div>
    </section>
  );
}