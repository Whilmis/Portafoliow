import { useTranslation } from "react-i18next";
import Reveal from "../../common/Reveal/Reveal.jsx";
import "./Services.css";

const serviceMeta = {
  webDesign: {
    code: "// 01.01 -- MVP SPRINT",
    title: "MVP Launch & 3D Frontend",
    tags: ["React / Next.js", "Three.js / 3D", "High-Converting UI", "Interactive Prototypes"],
    ctaKey: "mvpCta",
    ctaDefault: "EXPLORE MVP SPRINT >"
  },
  development: {
    code: "// 01.02 -- ARCHITECTURE",
    title: "Scalable Fullstack & Cloud Systems",
    tags: ["Node.js / TypeScript", "Nest / Express", "PostgreSQL / Prisma", "Docker & Cloud"],
    ctaKey: "archCta",
    ctaDefault: "VIEW ARCHITECTURE >"
  },
  mobile: {
    code: "// 01.03 -- AI AUTOMATION",
    title: "Autonomous AI Agents & Workflows",
    tags: ["LLM Pipelines", "LangChain / OpenAI", "n8n Workflows", "Vector DBs / RAG"],
    ctaKey: "aiCta",
    ctaDefault: "AUTOMATE STARTUP >"
  },
  seo: {
    code: "// 01.04 -- GROWTH & AUDIT",
    title: "UI/UX Systems & Growth Engineering",
    tags: ["Design Systems", "Core Web Vitals", "Technical SEO", "Conversion CRO"],
    ctaKey: "auditCta",
    ctaDefault: "OPTIMIZE CONVERSION >"
  }
};

export default function Services() {
  const { t } = useTranslation();
  const cards = t("services.cards", { returnObjects: true }) || {};
  const serviceKeys = ["webDesign", "development", "mobile", "seo"];

  return (
    <section className="services" id="services">
      <div className="container">
        {/* Header split */}
        <div className="services-header-split">
          <Reveal variant="fade-up">
            <div>
              <div className="tech-eyebrow">
                {t("services.eyebrow", { defaultValue: "// STARTUP & SCALE-UP ENGINEERING" })}
              </div>
              <h2 className="section-title">
                {t("services.title", { defaultValue: "WHAT I OFFER" })}
              </h2>
            </div>
          </Reveal>
          
          <Reveal variant="fade-up" delay={80}>
            <p className="services-lead-text">
              {t("services.description", {
                defaultValue: "Production-grade engineering solutions ranging from full-stack systems architecture to deep learning, search intelligence, and UI prototyping."
              })}
            </p>
          </Reveal>
        </div>

        {/* 2x2 Bento Grid */}
        <div className="services-bento-grid">
          {serviceKeys.map((key, idx) => {
            const cardData = cards[key] || {};
            const meta = serviceMeta[key] || {
              code: `// 01.0${idx + 1} -- TECH`,
              title: cardData.title || "Service",
              tags: ["Engineering", "Architecture"],
              ctaDefault: "EXPLORE >"
            };

            const displayTitle = cardData.title || meta.title;
            const frontDesc = cardData.front || "";
            const backDesc = cardData.backText || "";
            const impactBadge = cardData.impact;

            return (
              <Reveal key={key} variant="fade-up" delay={100 + idx * 60}>
                <article className="service-bento-card">
                  <div className="card-top-bar">
                    <span className="card-code">{meta.code}</span>
                    <span className="card-arrow-icon">↗</span>
                  </div>

                  {impactBadge && (
                    <div className="service-impact-badge">
                      <span className="impact-dot"></span>
                      <span>{impactBadge}</span>
                    </div>
                  )}

                  <h3 className="service-card-title">{displayTitle}</h3>
                  
                  <p className="service-card-desc">
                    {frontDesc}
                  </p>

                  {backDesc && (
                    <div className="service-card-highlight">
                      <strong>{cardData.backTitle || "Focus"}:</strong> {backDesc}
                    </div>
                  )}

                  <div className="service-card-footer">
                    <div className="service-tags">
                      {meta.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="service-tag-pill">{tag}</span>
                      ))}
                    </div>
                    <a href="#packages" className="service-cta-link">
                      {meta.ctaDefault}
                    </a>
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
