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
        <Reveal variant="fade-up">
          <h2 className="section-title">{t("tools.title")}</h2>
        </Reveal>

        <div className="tools-grid tools-grid--ghost">
          {toolOrder.map((key, idx) => {
            // Pedimos cada texto individualmente con fallback seguro
            const title = t(`tools.items.${key}.title`, { defaultValue: key });
            const text  = t(`tools.items.${key}.text`,  { defaultValue: "" });

            return (
              <Reveal key={key} variant="fade-up" delay={100 + idx * 80}>
                <article className="tool-tile">
                  <div className="tool-icon">
                    <img src={toolIcons[key]} alt={title} />
                  </div>
                  <div className="tool-meta">
                    <h3>{title}</h3>
                    <p>{text}</p>
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
