import { useTranslation } from "react-i18next";
import Reveal from "../../common/Reveal/Reveal.jsx";
import ProgressBar from "./components/ProgressBar";
import "./Skills.css";

export default function Skills() {
  const { t } = useTranslation();
  const bars = t("skills.bars", { returnObjects: true });

  return (
    <section className="skills" id="skills">
      <div className="container">
        <Reveal variant="fade-up">
          <h2 className="section-title">{t("skills.title")}</h2>
        </Reveal>
        <Reveal variant="fade-up" delay={80}>
          <p className="skills-desc">{t("skills.description")}</p>
        </Reveal>

        <div className="skills-grid">
          {/* Columna de proceso (si quieres ocultarla, comenta esta columna) */}
          <Reveal variant="fade-up" delay={120}>
            <div className="skills-process">
              {(t("skills.process", { returnObjects: true }) || []).map((step, idx) => (
                <div className="process-item" key={idx}>
                  <div className="process-dot" />
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
                delay={150 + i * 90}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
