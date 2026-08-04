import GridTicks from "./GridTicks";

const MODULES = [
  {
    n: "01",
    title: "Artist Index",
    desc: "Every producer, DJ, and live act in one cross-referenced catalog. Track discographies, label history, and set archives without the noise.",
  },
  {
    n: "02",
    title: "Release Radar",
    desc: "New tracks, remixes, and edits the moment they land. Filter by genre, label, or the artists you actually follow.",
  },
  {
    n: "03",
    title: "Event Ledger",
    desc: "Festivals, club nights, and warehouse dates mapped by city and date. Lineups update as they are announced.",
  },
  {
    n: "04",
    title: "Signal, Not Feed",
    desc: "No infinite scroll, no engagement bait. A structured record of what matters, ordered by relevance to your taste.",
  },
  {
    n: "05",
    title: "Set Archive",
    desc: "Recorded sets, tracklists, and ID resolutions collected and searchable. Find the unreleased ID from that closing set.",
  },
  {
    n: "06",
    title: "Open Record",
    desc: "Corrections, credits, and metadata contributed by the community and verified. A living archive, not a static database.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="snap-section relative flex flex-col justify-center px-6 md:px-10"
      style={{ paddingTop: "var(--topbar-h)" }}
    >
      <GridTicks />

      <div className="py-14 md:py-0">
        <div className="flex items-end justify-between border-b border-line pb-6 mb-2">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl">
            What it does
          </h2>
          <span className="mono-label text-[11px] text-smoke-400">
            [ 06 Modules ]
          </span>
        </div>

        <div className="grid md:grid-cols-3 border-line">
          {MODULES.map((m, i) => (
            <div
              key={m.n}
              className={[
                "border-line px-0 md:px-8 py-8 md:py-10",
                i % 3 !== 0 ? "md:border-l" : "",
                i % 3 !== 2 ? "border-b md:border-b-0" : "border-b",
                i < 3 ? "md:border-b" : "",
              ].join(" ")}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="mono-label text-[13px] text-accent">
                  {m.n}
                </span>
                <span className="w-6 h-px bg-line2" />
              </div>
              <h3 className="font-display font-bold text-xl md:text-2xl mb-3">
                {m.title}
              </h3>
              <p className="text-smoke-300 leading-relaxed max-w-sm">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
