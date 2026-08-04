export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center bg-accent shrink-0"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={size * 0.5}
        height={size * 0.5}
        viewBox="0 0 24 24"
        fill="none"
      >
        <rect x="1" y="9" width="3" height="6" rx="1" fill="#0a0a0a" />
        <rect x="7" y="4" width="3" height="16" rx="1" fill="#0a0a0a" />
        <rect x="13" y="7" width="3" height="10" rx="1" fill="#0a0a0a" />
        <rect x="19" y="2" width="3" height="20" rx="1" fill="#0a0a0a" />
      </svg>
    </span>
  );
}
