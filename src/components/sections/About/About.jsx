import { useTranslation } from "react-i18next";
import Reveal from "../../common/Reveal/Reveal.jsx";
import foto from "../../../assets/img/whil22black.jpg"
import "./About.css";

export default function About() {
  const { t } = useTranslation();
  const paragraphs = t("about.text", { returnObjects: true });

  return (
    <section className="about" id="about">
      <div className="container about-inner">
        <Reveal variant="zoom-in">
          <div className="about-image">
            <img src={foto} alt={t("about.title")} />
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay={100}>
          <div className="about-content">
            <h2 className="section-title">{t("about.title")}</h2>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <a href="#contact" className="btn-primary">
              {t("hero.ctaContact")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

