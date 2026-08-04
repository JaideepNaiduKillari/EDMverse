import GridTicks from "./GridTicks";

export default function FAQ() {
  return (
    <section
      id="faq"
      className="snap-section relative flex flex-col justify-center px-6 md:px-10 border-t border-line"
      style={{ paddingTop: "var(--topbar-h)" }}
    >
      <GridTicks />
      <div className="py-14 md:py-0">
        <p className="mono-label text-[12px] text-accent mb-4">
          [ Coming Soon ]
        </p>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl mb-4">
          FAQs
        </h2>
        <p className="text-smoke-300 max-w-lg leading-relaxed">
          Frequently asked questions will live here. In the meantime, request
          access below and we&apos;ll reach out with anything you need to
          know.
        </p>
      </div>
    </section>
  );
}
