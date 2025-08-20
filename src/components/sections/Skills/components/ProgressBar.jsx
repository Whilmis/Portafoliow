import useInView from "../../../../hooks/useInView";
import Reveal from "../../../common/Reveal/Reveal";

export default function ProgressBar({ label, value, delay = 0 }) {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <Reveal variant="fade-up" delay={delay}>
      <div className="skill" ref={ref}>
        <div className="skill-head">
          <span className="skill-label">{label}</span>
          <span className="skill-value">{value} %</span>
        </div>

        <div
          className="skill-bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={inView ? value : 0}
        >
          <div
            className={`skill-fill ${inView ? "is-inview" : ""}`}
            style={{
              // ancho objetivo cuando entra en vista
              "--skill-target": `${value}%`,
              // delay escalonado para cada barra
              "--skill-delay": `${Math.max(0, delay - 100)}ms`,
            }}
          />
        </div>
      </div>
    </Reveal>
  );
}
