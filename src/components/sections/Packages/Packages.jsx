import { useTranslation } from "react-i18next";
import Reveal from "../../common/Reveal/Reveal";
import "./Packages.css";

export default function Packages() {
  const { t } = useTranslation();

  const plans = t("packages.plans", { returnObjects: true }) || {};
  const comparison = t("packages.comparison", { returnObjects: true }) || {};
  const guarantees = t("packages.guarantees", { returnObjects: true }) || [];
  const audit = t("packages.audit", { returnObjects: true }) || {};
  const enterpriseCard = t("packages.enterpriseCard", { returnObjects: true }) || {};

  const planKeys = ["mvp", "ai", "fractional"];

  const handleSelectPackage = (packageKey) => {
    // Dispatch custom event so Contact component updates active selection chip
    window.dispatchEvent(new CustomEvent("select-package", { detail: packageKey }));
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      const textarea = contactSection.querySelector("textarea[name='message']");
      if (textarea) {
        setTimeout(() => {
          textarea.focus();
        }, 500);
      }
    }
  };

  return (
    <section className="packages" id="packages">
      <div className="container">
        {/* Section Header */}
        <div className="packages-header-wrapper">
          <Reveal variant="fade-up">
            <div className="tech-eyebrow">
              {t("packages.eyebrow", { defaultValue: "// ENGAGEMENT MODELS // STARTUPS & ENTERPRISES" })}
            </div>
            <h2 className="section-title">
              {t("packages.title", { defaultValue: "SPRINT PACKAGES & ENTERPRISE SERVICES" })}
              <span className="dot">.</span>
            </h2>
          </Reveal>
          <Reveal variant="fade-up" delay={60}>
            <p className="packages-subtitle">
              {t("packages.subtitle", {
                defaultValue: "Transparent, flexible engagement models by sprint or retainer. Zero corporate red tape, guaranteed delivery dates, and clear milestones for both startups and established businesses."
              })}
            </p>
          </Reveal>
        </div>

        {/* 3 Main Sprint Cards */}
        <div className="packages-cards-grid">
          {planKeys.map((key, idx) => {
            const plan = plans[key] || {};
            const isFeatured = key === "mvp";

            return (
              <Reveal key={key} variant="fade-up" delay={80 + idx * 70}>
                <article className={`package-card ${isFeatured ? "featured" : ""}`}>
                  {plan.badge && (
                    <div className="package-badge">
                      <span className="badge-dot"></span>
                      {plan.badge}
                    </div>
                  )}

                  <div className="package-card-header">
                    <h3 className="package-name">{plan.name || "Sprint Package"}</h3>
                    <p className="package-tagline">{plan.tagline || ""}</p>
                  </div>

                  <div className="package-timeline-box">
                    <span className="timeline-label">
                      {t("packages.durationLabel", { defaultValue: "ESTIMATED TIMELINE" })}
                    </span>
                    <span className="timeline-val">{plan.duration}</span>
                  </div>

                  <div className="package-deliverables">
                    <div className="deliverables-heading">
                      {t("packages.deliverablesLabel", { defaultValue: "WHAT IS INCLUDED:" })}
                    </div>
                    <ul className="deliverables-list">
                      {Array.isArray(plan.items) &&
                        plan.items.map((item, iIdx) => (
                          <li key={iIdx} className="deliverable-item">
                            <span className="check-icon">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="package-card-footer">
                    <button
                      type="button"
                      className={`btn-package-cta ${isFeatured ? "btn-primary" : "btn-secondary"}`}
                      onClick={() => handleSelectPackage(key)}
                    >
                      {plan.cta || t("packages.ctaDefault", { defaultValue: "BOOK SPRINT" })}
                      <span className="btn-arrow">&gt;</span>
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* 2-Column Banner: Enterprise Custom Systems + Fast-Track Audit */}
        <div className="packages-special-grid">
          {/* Box 1: Enterprise Custom Architecture */}
          <Reveal variant="fade-up" delay={100}>
            <div className="special-service-box enterprise-box">
              <div className="special-content">
                <span className="special-tag">
                  {enterpriseCard.tag || "ENTERPRISE & A MEDIDA"}
                </span>
                <h3 className="special-title">
                  {enterpriseCard.title || "¿Tu empresa necesita una solución a gran escala o arquitectura a medida?"}
                </h3>
                <p className="special-desc">
                  {enterpriseCard.description ||
                    "Desarrollo de microservicios, migración de sistemas legacy, integraciones complejas de ERP/CRM y consultoría técnica personalizada para medianas y grandes empresas."}
                </p>
              </div>
              <div className="special-action">
                <button
                  type="button"
                  className="btn-secondary special-cta-btn"
                  onClick={() => handleSelectPackage("enterprise")}
                >
                  {enterpriseCard.cta || "Solicitar Propuesta para Empresa"}
                  <span className="btn-arrow">&gt;</span>
                </button>
              </div>
            </div>
          </Reveal>

          {/* Box 2: Fast Track Audit Banner */}
          <Reveal variant="fade-up" delay={120}>
            <div className="special-service-box audit-box">
              <div className="special-content">
                <span className="special-tag audit-tag-color">
                  {audit.tag || "FAST-TRACK // 72 HOURS"}
                </span>
                <h3 className="special-title">
                  {audit.title || "Is your existing product slow, buggy, or underconverting?"}
                </h3>
                <p className="special-desc">
                  {audit.description ||
                    "I perform an in-depth 72-hour Technical & UX Audit of your current MVP or app with a clear refactor roadmap."}
                </p>
              </div>
              <div className="special-action">
                <button
                  type="button"
                  className="btn-primary special-cta-btn"
                  onClick={() => handleSelectPackage("audit")}
                >
                  {audit.cta || "Request 72h Audit"}
                  <span className="btn-arrow">&gt;</span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Comparison Matrix: Whilmis vs Agency vs Full-Time */}
        {comparison.rows && (
          <div className="packages-comparison-section">
            <Reveal variant="fade-up">
              <div className="comparison-header">
                <div className="tech-eyebrow">
                  {comparison.eyebrow || "// REAL VALUE COMPARISON"}
                </div>
                <h3 className="comparison-title">
                  {comparison.title || "Why Hire Whilmis Over Traditional Alternatives?"}
                </h3>
                <p className="comparison-lead">
                  {comparison.subtitle ||
                    "How partnering with me compares to hiring a traditional agency or a full-time employee:"}
                </p>
              </div>
            </Reveal>

            <Reveal variant="fade-up" delay={60}>
              <div className="comparison-table-wrapper">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>{comparison.headers?.feature || "Criterion"}</th>
                      <th>{comparison.headers?.agency || "Traditional Agency"}</th>
                      <th>{comparison.headers?.fulltime || "Full-Time Hire"}</th>
                      <th className="highlight-col">
                        <span className="col-star">★</span> {comparison.headers?.whilmis || "Whilmis (Senior Partner)"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        <td className="row-criterion">{row.criterion}</td>
                        <td className="row-agency">{row.agency}</td>
                        <td className="row-fulltime">{row.fulltime}</td>
                        <td className="row-whilmis highlight-col">{row.whilmis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        )}

        {/* Startup & Enterprise Guarantees */}
        {Array.isArray(guarantees) && guarantees.length > 0 && (
          <div className="packages-guarantees-grid">
            {guarantees.map((g, gIdx) => (
              <Reveal key={gIdx} variant="fade-up" delay={100 + gIdx * 50}>
                <div className="guarantee-card">
                  <div className="guarantee-icon-box">
                    {g.icon === "code" && "💻"}
                    {g.icon === "zap" && "⚡"}
                    {g.icon === "shield" && "🛡️"}
                    {!["code", "zap", "shield"].includes(g.icon) && "★"}
                  </div>
                  <h4 className="guarantee-title">{g.title}</h4>
                  <p className="guarantee-desc">{g.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
