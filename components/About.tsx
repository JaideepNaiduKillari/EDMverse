import GridTicks from "./GridTicks";
import EDMVisual from "./EDMVisual";

const MODULES = [
  {
    n: "01",
    title: "Artists",
    desc: "Discover artists, explore their music, upcoming events, releases, labels.",
  },
  {
    n: "02",
    title: "Events & Festivals",
    desc: "Find electronic music events and festivals around the world, from club nights to the biggest stages.",
  },
  {
    n: "03",
    title: "News & Releases",
    desc: "Stay up to date with the latest music, announcements, industry news, and everything happening in electronic music.",
  },
  {
    n: "04",
    title: "Personalized Discovery",
    desc: "Discover new artists, events, festivals, and music tailored to your taste.",
  },
  {
    n: "05",
    title: "Community",
    desc: "Connect with fellow fans and creators who share the same passion for electronic music.",
  },
  {
    n: "06",
    title: "Everything Connected",
    desc: "Every artist, event, festival, and release is interconnected, making it effortless to explore the electronic music ecosystem.",
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
      <EDMVisual className="right-[-20%] bottom-[-25%] opacity-40" />

      <div className="relative z-10 py-14 md:py-0">
        <div className="flex items-end justify-between border-b border-line pb-6 mb-2">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl">
            Everything in its right place
          </h2>
        </div>

        <div className="grid md:grid-cols-3 border-line">
          {MODULES.map((m, i) => (
            <div
              key={m.n}
              className={[
                "module-card border-line px-0 md:px-8 py-8 md:py-10",
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
