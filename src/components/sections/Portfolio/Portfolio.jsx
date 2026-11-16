import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Reveal from "../../common/Reveal/Reveal";
import { projects } from "./data";
import "./Portfolio.css";

export default function Portfolio() {
  const { t } = useTranslation();
  const [viewLayout, setViewLayout] = useState("grid"); // "grid" | "list"
  const [hoveredProject, setHoveredProject] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [previewVisible, setPreviewVisible] = useState(false);
  const sectionRef = useRef(null);

  // Category label resolver
  const categoryLabel = (cat) => {
    switch (cat) {
      case "react-node":
        return t("portfolio.categories.reactNode", { defaultValue: "React / Node.js" });
      case "web3-ai":
        return "Web3 & AI";
      case "ai-hospitality":
        return "AI & Hospitality";
      case "ux-ui":
        return t("portfolio.categories.uxui", { defaultValue: "UX / UI" });
      default:
        return "Full Stack";
    }
  };

  // Mouse tracking for cards spotlight effect
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  // Mouse tracking for floating preview in list mode
  const handleListMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  // Clean up floating preview on unmount or layout switch
  useEffect(() => {
    if (viewLayout !== "list") {
      setPreviewVisible(false);
      setHoveredProject(null);
    }
  }, [viewLayout]);

  return (
    <section className="portfolio" id="portfolio" ref={sectionRef}>
      {/* Background ambient lighting */}
      <div className="portfolio-bg-glow"></div>

      <div className="container">
        {/* Header split with View Mode Switcher */}
        <div className="portfolio-header-wrapper">
          <div className="portfolio-title-group">
            <Reveal variant="fade-up">
              <div className="tech-eyebrow">
                <span className="live-dot"></span>
                {t("portfolio.eyebrow", { defaultValue: "// VERIFIED WORK & ARCHITECTURES" })}
              </div>
              <h2 className="section-title">
                {t("portfolio.title", { defaultValue: "PORTFOLIO" })}<span className="dot">.</span>
              </h2>
            </Reveal>
            <Reveal variant="fade-up" delay={60}>
              <p className="portfolio-subtitle">
                {t("portfolio.description", {
                  defaultValue: "Real-world web systems, scalable backend architectures, and production AI products delivered with velocity."
                })}
              </p>
            </Reveal>
          </div>

          {/* Controls: Grid/List View Switcher */}
          <div className="portfolio-controls-group">
            <Reveal variant="fade-up" delay={90}>
              <div className="portfolio-counter-badge">
                <span className="counter-dot"></span>
                <span className="counter-label">{projects.length} {t("portfolio.totalProjects", { defaultValue: "PROJECTS" })}</span>
              </div>
            </Reveal>

            {/* Layout Toggle: Grid vs Editorial List */}
            <Reveal variant="fade-up" delay={120}>
              <div className="portfolio-layout-switcher">
                <button
                  type="button"
                  className={`layout-btn ${viewLayout === "grid" ? "active" : ""}`}
                  onClick={() => setViewLayout("grid")}
                  title={t("portfolio.viewMode.grid", { defaultValue: "Grid View" })}
                >
                  <span className="layout-icon">⊞</span>
                  <span className="layout-label">GRID</span>
                </button>
                <button
                  type="button"
                  className={`layout-btn ${viewLayout === "list" ? "active" : ""}`}
                  onClick={() => setViewLayout("list")}
                  title={t("portfolio.viewMode.list", { defaultValue: "Editorial List View" })}
                >
                  <span className="layout-icon">☰</span>
                  <span className="layout-label">LIST</span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── MODE 1: MODERN BENTO GRID WITH SPOTLIGHT & GLITCH ── */}
        {viewLayout === "grid" && (
          <div className="portfolio-grid-fluid">
            {projects.map((p, idx) => {
              const title = t(`portfolio.items.${p.slug}.title`, { defaultValue: p.slug.toUpperCase() });
              const short = t(`portfolio.items.${p.slug}.short`, {
                defaultValue: "Fullstack engineering and high-performance interactive interface architecture."
              });
              const techList = p.tech?.slice(0, 4) || ["React", "TypeScript", "Node.js"];
              const formattedIdx = String(idx + 1).padStart(2, "0");

              return (
                <Reveal key={p.slug} variant="fade-up" delay={100 + idx * 60}>
                  <article
                    className="portfolio-bento-card"
                    onMouseMove={handleCardMouseMove}
                  >
                    {/* Spotlight Glow Follows Cursor */}
                    <div className="card-spotlight-glow"></div>

                    {/* Window Header Bar */}
                    <div className="bento-card-header">
                      <div className="bento-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div className="bento-serial">
                        <span className="serial-num">0x{formattedIdx}</span> // {p.slug.toUpperCase()}
                      </div>
                      <div className="bento-status">
                        <span className="status-live-dot"></span> LIVE
                      </div>
                    </div>

                    {/* Image Preview with Cybernetic Glitch Trigger */}
                    <Link to={`/project/${p.slug}`} className="bento-preview-wrapper" title={`Ver ${title}`}>
                      <img
                        src={p.image}
                        alt={title}
                        className="bento-preview-img"
                        loading="lazy"
                      />
                      <div className="bento-glitch-overlay"></div>
                      <div className="bento-category-tag">
                        {categoryLabel(p.category)}
                      </div>
                      <div className="bento-hover-cta">
                        <span>EXPLORE CASE STUDY</span> &gt;
                      </div>
                    </Link>

                    {/* Card Body */}
                    <div className="bento-card-body">
                      <div className="bento-title-row">
                        <h3 className="bento-project-title">
                          <Link to={`/project/${p.slug}`}>{title}</Link>
                        </h3>
                        {p.year && <span className="bento-year-badge">{p.year}</span>}
                      </div>

                      <p className="bento-project-desc">{short}</p>

                      {/* Tech Chips */}
                      <div className="bento-tech-row">
                        {techList.map((tItem, tI) => (
                          <span key={tI} className="bento-tech-pill">
                            {tItem}
                          </span>
                        ))}
                      </div>

                      {/* Card Footer Links */}
                      <div className="bento-card-footer">
                        <Link to={`/project/${p.slug}`} className="bento-cta-link">
                          <span>{t("portfolio.viewProject", { defaultValue: "VIEW PROJECT" })}</span>
                          <span className="cta-arrow">&gt;</span>
                        </Link>

                        <div className="bento-ext-links">
                          {p.demo && (
                            <a
                              href={p.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bento-icon-btn"
                              title="Visitar proyecto en vivo"
                            >
                              ↗
                            </a>
                          )}
                          {p.repo && (
                            <a
                              href={p.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bento-icon-btn"
                              title="Ver código fuente"
                            >
                              ⌥
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}

        {/* ── MODE 2: EDITORIAL LIST WITH FLOATING CURSOR PREVIEW ── */}
        {viewLayout === "list" && (
          <div
            className="portfolio-list-wrapper"
            onMouseMove={handleListMouseMove}
            onMouseLeave={() => setPreviewVisible(false)}
          >
            <div className="portfolio-list-table">
              {projects.map((p, idx) => {
                const title = t(`portfolio.items.${p.slug}.title`, { defaultValue: p.slug.toUpperCase() });
                const short = t(`portfolio.items.${p.slug}.short`, { defaultValue: "Engineering & Architecture." });
                const formattedIdx = String(idx + 1).padStart(2, "0");
                const roleSnippet = Array.isArray(p.role) ? p.role[0] : (p.role || "Lead Architect");
                const techSnippet = p.tech?.slice(0, 3).join(" · ") || "React · Node.js";

                return (
                  <Reveal key={p.slug} variant="fade-up" delay={80 + idx * 50}>
                    <Link
                      to={`/project/${p.slug}`}
                      className="portfolio-list-row"
                      onMouseEnter={() => {
                        setHoveredProject(p);
                        setPreviewVisible(true);
                      }}
                    >
                      <div className="row-col-idx">{formattedIdx}</div>

                      <div className="row-col-main">
                        <h3 className="row-title">
                          <span className="row-title-text">{title}</span>
                          <span className="row-arrow">↗</span>
                        </h3>
                        <p className="row-mobile-desc">{short}</p>
                      </div>

                      <div className="row-col-role">
                        <span className="row-label-sub">{roleSnippet}</span>
                      </div>

                      <div className="row-col-stack">
                        <span className="row-tech-text">{techSnippet}</span>
                      </div>

                      <div className="row-col-year">
                        <span>{p.year || "2024"}</span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>

            {/* Floating Image Preview that glides smoothly with cursor */}
            {hoveredProject && previewVisible && (
              <div
                className="portfolio-floating-preview"
                style={{
                  transform: `translate3d(${cursorPos.x + 25}px, ${cursorPos.y - 120}px, 0)`,
                }}
              >
                <div className="preview-inner-card">
                  <div className="preview-card-header">
                    <span className="preview-dot"></span>
                    <span className="preview-name">{hoveredProject.slug.toUpperCase()}</span>
                    <span className="preview-cat">{categoryLabel(hoveredProject.category)}</span>
                  </div>
                  <div className="preview-image-box">
                    <img
                      src={hoveredProject.image}
                      alt={hoveredProject.slug}
                      className="preview-img"
                    />
                    <div className="preview-glitch-line"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
