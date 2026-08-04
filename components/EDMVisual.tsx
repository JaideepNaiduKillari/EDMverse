type EDMVisualProps = {
  className?: string;
};

const BARS = [30, 52, 74, 42, 88, 60, 35, 68, 96, 48, 78, 55, 32, 64, 84, 46, 70, 38, 58, 92, 50, 76, 40, 62];

export default function EDMVisual({ className = "" }: EDMVisualProps) {
  return (
    <div className={`edm-visual ${className}`} aria-hidden="true">
      <div className="edm-orbit edm-orbit-one" />
      <div className="edm-orbit edm-orbit-two" />
      <div className="edm-deck">
        <div className="edm-platter">
          <div className="edm-platter-groove" />
          <span className="edm-platter-label" />
          <span className="edm-tonearm" />
        </div>
        <div className="edm-deck-controls">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="edm-waveform">
        {BARS.map((height, index) => (
          <span key={index} style={{ height: `${height}%` }} />
        ))}
      </div>
    </div>
  );
}
