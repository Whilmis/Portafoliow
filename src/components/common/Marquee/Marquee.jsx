import "./Marquee.css";

export default function Marquee() {
  const techTerms = [
    "MVP FAST LAUNCH (3-4 WEEKS)",
    "AUTONOMOUS AI AGENTS & N8N",
    "SCALABLE FULL-STACK ARCHITECTURE",
    "ZERO TECH DEBT",
    "INTERACTIVE 3D & WEBGL",
    "POSTGRESQL & VECTOR DBS",
    "FRACTIONAL TECH LEAD",
    "INVESTOR-READY UI/UX & FAST SHIPPING"
  ];

  return (
    <div className="marquee-container" aria-hidden="true">
      <div className="marquee-track">
        {[...techTerms, ...techTerms].map((text, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot">✦</span>
            <span className="marquee-text">{text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
