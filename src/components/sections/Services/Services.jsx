import { useTranslation } from "react-i18next";
import Reveal from "../../common/Reveal/Reveal.jsx";
import "./Services.css";

function ServiceCard({ title, frontText, backTitle, backText, delay = 0 }) {
  return (
    <Reveal variant="fade-up" delay={delay}>
      <div className="service-card">
        <div className="card-inner">
          <div className="card-front">
            <h3>{title}</h3>
            <p>{frontText}</p>
          </div>
          <div className="card-back">
            <h3>{backTitle}</h3>
            <p>{backText}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Services() {
  const { t } = useTranslation();
  const cards = t("services.cards", { returnObjects: true });
  const keys = Object.keys(cards);

  return (
    <section className="services" id="services">
      <div className="container">
        <Reveal variant="fade-up"><h2 className="section-title">{t("services.title")}</h2></Reveal>
        <Reveal variant="fade-up" delay={80}><p className="section-desc">{t("services.description")}</p></Reveal>

        <div className="services-grid">
          {keys.map((key, idx) => (
            <ServiceCard
              key={key}
              title={cards[key].title}
              frontText={cards[key].front}
              backTitle={cards[key].backTitle}
              backText={cards[key].backText}
              delay={120 + idx * 60}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

