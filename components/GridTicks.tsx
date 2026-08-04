export default function GridTicks() {
  return (
    <div
      className="absolute left-0 right-0 grid grid-cols-5 pointer-events-none"
      style={{ top: "var(--topbar-h)", height: 28 }}
      aria-hidden="true"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="border-l border-line h-full" />
      ))}
    </div>
  );
}
