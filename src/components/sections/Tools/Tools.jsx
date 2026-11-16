// /src/sections/Tools/Tools.jsx
import { useTranslation } from "react-i18next";
import Reveal from "../../common/Reveal/Reveal";
import { toolOrder, toolIcons } from "./data";
import "./Tools.css";

export default function Tools() {
  const { t } = useTranslation();

  return (
    <section className="tools" id="tools">
      <div className="container">
        <div className="tools-header-center">
          <Reveal variant="fade-up">
            <div className="tech-eyebrow">// HIGH-VELOCITY TECH STACK</div>
            <h2 className="section-title">{t("tools.title", { defaultValue: "TOOLS & ENVIRONMENT" })}</h2>
            <p className="tools-subtitle" style={{ color: "var(--color-text-secondary)", marginTop: "0.6rem", fontSize: "0.95rem" }}>
              {t("tools.subtitle", { defaultValue: "Battle-tested tech stack chosen for developer velocity, sub-second latency, and horizontal scalability." })}
            </p>
          </Reveal>
        </div>

        <div className="tools-grid-modern">
          {toolOrder.map((key, idx) => {
            const title = t(`tools.items.${key}.title`, { defaultValue: key });
            const text  = t(`tools.items.${key}.text`,  { defaultValue: "" });

            return (
              <Reveal key={key} variant="fade-up" delay={80 + idx * 50}>
                <article className="tool-pill-card">
                  <div className="tool-pill-icon">
                    <img src={toolIcons[key]} alt={title} />
                  </div>
                  <div className="tool-pill-meta">
                    <h3 className="tool-pill-name">{title}</h3>
                    {text && <p className="tool-pill-desc">{text}</p>}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
