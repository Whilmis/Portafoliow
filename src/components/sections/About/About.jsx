import { useTranslation } from "react-i18next";
import Reveal from "../../common/Reveal/Reveal.jsx";
import foto from "../../../assets/img/whil22black-web.jpg";
import "./About.css";

export default function About() {
  const { t } = useTranslation();
  const paragraphs = t("about.text", { returnObjects: true }) || [];
  const metrics = t("about.metrics", { returnObjects: true }) || {};

  return (
    <section className="about" id="about">
      <div className="container about-grid">
        {/* Left Column: Portrait Card */}
        <Reveal variant="fade-up">
          <div className="about-portrait-card">
            <div className="about-photo-wrapper">
              <img src={foto} alt="Whilmis Perez" className="about-photo" />
            </div>
            <div className="about-portrait-footer">
              <span className="about-footer-name">WHILMIS PEREZ</span>
              <span className="about-footer-role">STARTUP TECH PARTNER &amp; ARCHITECT</span>
            </div>
          </div>
        </Reveal>

        {/* Right Column: Bio & Philosophy */}
        <Reveal variant="fade-up" delay={80}>
          <div className="about-content">
            <div className="tech-eyebrow">
              {t("about.eyebrow", { defaultValue: "// TECH PARTNER FOR STARTUPS" })}
            </div>
            <h2 className="section-title">
              {t("about.sectionTitle", {
                defaultValue: "THE SENIOR ENGINEER YOUR STARTUP NEEDS TO SHIP FAST"
              })}
              <span className="dot">.</span>
            </h2>

            <div className="about-paragraphs">
              {Array.isArray(paragraphs) && paragraphs.length > 0 ? (
                paragraphs.map((p, i) => (
                  <p key={i} className="about-paragraph">{p}</p>
                ))
              ) : (
                <p className="about-paragraph">
                  I combine 8+ years of full-stack software engineering, systems architecture, and data science to help founders build and ship products that gain real market traction.
                </p>
              )}
            </div>

            {/* Metrics Highlights Grid */}
            <div className="about-metrics-grid">
              <div className="about-metric-box">
                <span className="metric-box-title">
                  {metrics.m1Title || "3-4 WEEKS TO MVP"}
                </span>
                <span className="metric-box-sub">
                  {metrics.m1Sub || "From Figma / Vision to Production"}
                </span>
              </div>
              <div className="about-metric-box">
                <span className="metric-box-title">
                  {metrics.m2Title || "ZERO TECH DEBT"}
                </span>
                <span className="metric-box-sub">
                  {metrics.m2Sub || "Modular architecture in TypeScript & Postgres"}
                </span>
              </div>
              <div className="about-metric-box">
                <span className="metric-box-title">
                  {metrics.m3Title || "DIRECT COMMUNICATION"}
                </span>
                <span className="metric-box-sub">
                  {metrics.m3Sub || "Private Slack / Discord with zero bureaucracy"}
                </span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="about-action">
              <a href="#packages" className="btn-primary">
                {t("hero.viewPackages", { defaultValue: "VIEW STARTUP PACKAGES" })} &gt;
              </a>
              <a href="#contact" className="btn-secondary" style={{ marginLeft: "1rem" }}>
                {t("hero.workTogether", { defaultValue: "BOOK DISCOVERY CALL" })}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
