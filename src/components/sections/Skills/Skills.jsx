import { useTranslation } from "react-i18next";
import Reveal from "../../common/Reveal/Reveal.jsx";
import ProgressBar from "./components/ProgressBar";
import "./Skills.css";

export default function Skills() {
  const { t } = useTranslation();
  const bars = t("skills.bars", { returnObjects: true }) || [];

  return (
    <section className="skills" id="skills">
      <div className="container">
        <div className="skills-header-center">
          <Reveal variant="fade-up">
            <div className="tech-eyebrow">// CORE COMPETENCIES &amp; PROCESS</div>
            <h2 className="section-title">
              {t("skills.title", { defaultValue: "ENGINEERING STACK & WORKFLOW" })}<span className="dot">.</span>
            </h2>
          </Reveal>
          <Reveal variant="fade-up" delay={60}>
            <p className="skills-desc">
              {t("skills.description", {
                defaultValue: "From initial analysis and systems architecture to production deployment, applying rigorous engineering standards at every step."
              })}
            </p>
          </Reveal>
        </div>

        <div className="skills-grid">
          {/* Columna de proceso */}
          <Reveal variant="fade-up" delay={100}>
            <div className="skills-process">
              {(t("skills.process", { returnObjects: true }) || []).map((step, idx) => (
                <div className="process-item" key={idx}>
                  <div className="process-dot">
                    <span className="process-step-num">0{idx + 1}</span>
                  </div>
                  <div className="process-content">
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Columna de barras */}
          <div className="skills-bars">
            {bars.map((b, i) => (
              <ProgressBar
                key={b.label + i}
                label={b.label}
                value={b.value}
                delay={120 + i * 80}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
