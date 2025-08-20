import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Reveal from "../../common/Reveal/Reveal";
import { projects } from "./data";
import "./Portfolio.css";

export default function Portfolio() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef(null);

  const categoryLabel = (cat) =>
    cat === "react-node"
      ? t("portfolio.categories.reactNode", { defaultValue: "React / Node.js" })
      : t("portfolio.categories.uxui", { defaultValue: "UX / UI" });

  const all = projects;
  const filtered = filter === "all" ? all : all.filter((p) => p.category === filter);

  return (
    <section className="portfolio" id="portfolio" ref={sectionRef}>
      <div className="container">
        <Reveal variant="fade-up">
          <h2 className="section-title">
            {t("portfolio.title", { defaultValue: "Portfolio" })}
          </h2>
        </Reveal>
        <Reveal variant="fade-up" delay={80}>
          <p className="section-desc">
            {t("portfolio.description", { defaultValue: "" })}
          </p>
        </Reveal>

        {/* Filtros */}
        <Reveal variant="fade-up" delay={120}>
          <div className="portfolio-filters" role="tablist" aria-label={t("portfolio.title")}>
            <button
              role="tab"
              aria-selected={filter === "all"}
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              {t("portfolio.filters.all", { defaultValue: "All" })}
            </button>
            <button
              role="tab"
              aria-selected={filter === "react-node"}
              className={filter === "react-node" ? "active" : ""}
              onClick={() => setFilter("react-node")}
            >
              {t("portfolio.filters.reactNode", { defaultValue: "React / Node.js" })}
            </button>
            <button
              role="tab"
              aria-selected={filter === "ux-ui"}
              className={filter === "ux-ui" ? "active" : ""}
              onClick={() => setFilter("ux-ui")}
            >
              {t("portfolio.filters.uxui", { defaultValue: "UX / UI" })}
            </button>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="portfolio-grid">
          {filtered.map((p, idx) => {
            const title = t(`portfolio.items.${p.slug}.title`, { defaultValue: p.slug });
            const short = t(`portfolio.items.${p.slug}.short`, { defaultValue: "" });

            return (
              <Reveal key={p.slug} variant="fade-up" delay={140 + idx * 80}>
                <article className="portfolio-card" aria-labelledby={`p-${p.slug}`}>
                  <div className="portfolio-img">
                    <img src={p.image} alt={title} loading="lazy" />
                  </div>

                  <div className="portfolio-info">
                    <div className="portfolio-meta">
                      <span className="portfolio-tag">{categoryLabel(p.category)}</span>
                      {p.year ? <span className="portfolio-year">{p.year}</span> : null}
                    </div>
                    <h3 id={`p-${p.slug}`}>{title}</h3>
                    <p>{short}</p>

                    <div className="portfolio-actions">
                      <Link to={`/project/${p.slug}`} className="btn-link">
                        {t("portfolio.viewProject", { defaultValue: "View Project" })}
                      </Link>
                      {p.demo && (
                        <a href={p.demo} target="_blank" rel="noopener noreferrer">
                          {t("portfolio.openDemo", { defaultValue: "Open demo" })}
                        </a>
                      )}
                      {p.repo && (
                        <a href={p.repo} target="_blank" rel="noopener noreferrer">
                          {t("portfolio.openRepo", { defaultValue: "Open repository" })}
                        </a>
                      )}
                      {p.figma && (
                        <a href={p.figma} target="_blank" rel="noopener noreferrer">
                          {t("portfolio.openFigma", { defaultValue: "Open in Figma" })}
                        </a>
                      )}
                    </div>
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
