import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Reveal from "../../components/common/Reveal/Reveal";
import { projects } from "../../components/sections/Portfolio/data";
import "./ProjectDetail.css";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug]);

  useEffect(() => {
    const title = project
      ? t(`portfolio.items.${slug}.title`, { defaultValue: slug })
      : "Project";
    document.title = `${title} — ${t("portfolio.title", { defaultValue: "Portfolio" })}`;
  }, [slug, project, i18n.language, t]);

  if (!project) {
    return (
      <section className="project-detail">
        <div className="container">
          <p>{i18n.language.startsWith("es") ? "Proyecto no encontrado." : "Project not found."}</p>
          <Link to="/" className="btn-link">← {i18n.language.startsWith("es") ? "Volver" : "Back"}</Link>
        </div>
      </section>
    );
  }

  // Todo el texto viene de i18n con el slug
  const title     = t(`portfolio.items.${slug}.title`, { defaultValue: slug });
  const short     = t(`portfolio.items.${slug}.short`, { defaultValue: "" });
  const long      = t(`portfolio.items.${slug}.long`,  { defaultValue: "" });
  const challenge = t(`portfolio.items.${slug}.challenge`, { defaultValue: "" });
  const solution  = t(`portfolio.items.${slug}.solution`,  { defaultValue: "" });

  const features  = t(`portfolio.items.${slug}.features`, { returnObjects: true, defaultValue: [] }) || [];
  const process   = t(`portfolio.items.${slug}.process`,  { returnObjects: true, defaultValue: [] }) || [];
  const results   = t(`portfolio.items.${slug}.results`,  { returnObjects: true, defaultValue: [] }) || [];

  const categoryLabel =
    project.category === "react-node"
      ? t("portfolio.categories.reactNode", { defaultValue: "React / Node.js" })
      : t("portfolio.categories.uxui", { defaultValue: "UX / UI" });

  const related = projects
    .filter((p) => p.category === project.category && p.slug !== slug)
    .slice(0, 3);

  return (
    <section className="project-detail">
      <div className="container">
        {/* Breadcrumb */}
        <Reveal variant="fade-up">
          <nav className="breadcrumb" aria-label="breadcrumbs">
            <Link to="/" className="crumb">{t("nav.home", { defaultValue: "Home" })}</Link>
            <span> / </span>
            <a href="/#portfolio" className="crumb">{t("portfolio.title", { defaultValue: "Portfolio" })}</a>
            <span> / </span>
            <span className="crumb current">{title}</span>
          </nav>
        </Reveal>

        {/* Head */}
        <Reveal variant="fade-up" delay={60}>
          <header className="pd-head">
            <div className="pd-chipline">
             {categoryLabel}
              {project.year && "  " + project.year }
            </div>
            <h1 className="pd-title">{title}</h1>
            <p className="pd-sub">{short}</p>
            <div className="pd-meta">
              {project.role?.length ? (
                <div className="chip">
                  {t("portfolio.labels.role", { defaultValue: "Role" })}: {project.role.join(", ")}
                </div>
              ) : null}
              {project.tech?.length ? (
                <div className="chip">
                  {t("portfolio.labels.stack", { defaultValue: "Tech stack" })}: {project.tech.join(" · ")}
                </div>
              ) : null}
            </div>
          </header>
        </Reveal>

        {/* Hero image */}
        <Reveal variant="zoom-in" delay={100}>
          <div className="pd-hero">
            <img src={project.image} alt={title} />
          </div>
        </Reveal>

        {/* Overview */}
        {long && (
          <Reveal variant="fade-up" delay={120}>
            <section className="pd-overview">
              <h2>{t("portfolio.sections.overview", { defaultValue: "Overview" })}</h2>
              <p>{long}</p>
            </section>
          </Reveal>
        )}

        {/* Challenge / Solution */}
        {(challenge || solution) && (
          <div className="pd-two-cols">
            {challenge && (
              <Reveal variant="fade-up" delay={140}>
                <section className="pd-box">
                  <h3>{t("portfolio.sections.challenge", { defaultValue: "Challenge" })}</h3>
                  <p>{challenge}</p>
                </section>
              </Reveal>
            )}
            {solution && (
              <Reveal variant="fade-up" delay={160}>
                <section className="pd-box">
                  <h3>{t("portfolio.sections.solution", { defaultValue: "Solution" })}</h3>
                  <p>{solution}</p>
                </section>
              </Reveal>
            )}
          </div>
        )}

        {/* Features */}
        {features.length > 0 && (
          <Reveal variant="fade-up" delay={180}>
            <section className="pd-box">
              <h3>{t("portfolio.sections.features", { defaultValue: "Features" })}</h3>
              <ul className="pd-list">
                {features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </section>
          </Reveal>
        )}

        {/* Process */}
        {process.length > 0 && (
          <Reveal variant="fade-up" delay={200}>
            <section className="pd-process">
              <h3>{t("portfolio.sections.process", { defaultValue: "Process" })}</h3>
              <ol>
                {process.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
            </section>
          </Reveal>
        )}

        {/* Results */}
        {results.length > 0 && (
          <Reveal variant="fade-up" delay={220}>
            <section className="pd-results">
              <h3>{t("portfolio.sections.results", { defaultValue: "Results" })}</h3>
              <div className="metrics">
                {results.map((m, i) => (
                  <div className="metric" key={i}>
                    <div className="metric-value">{m.value}</div>
                    <div className="metric-label">{m.label}</div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        {/* Gallery */}
        {project.images?.length > 0 && (
          <Reveal variant="fade-up" delay={240}>
            <section className="pd-gallery">
              <h3>{t("portfolio.sections.gallery", { defaultValue: "Gallery" })}</h3>
              <div className="gallery-grid">
                {project.images.map((src, i) => (
                  <figure key={i}><img src={src} alt={`${title} ${i + 1}`} /></figure>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        {/* Links */}
        <Reveal variant="fade-up" delay={260}>
          <div className="pd-links">
            {project.demo && (
              <a className="btn-primary" href={project.demo} target="_blank" rel="noreferrer">
                {t("portfolio.openDemo", { defaultValue: "Open demo" })}
              </a>
            )}
            {project.repo && (
              <a className="btn-secondary" href={project.repo} target="_blank" rel="noreferrer">
                {t("portfolio.openRepo", { defaultValue: "Open repository" })}
              </a>
            )}
            {project.figma && (
              <a className="btn-secondary" href={project.figma} target="_blank" rel="noreferrer">
                {t("portfolio.openFigma", { defaultValue: "Open in Figma" })}
              </a>
            )}
            <Link to="/" className="btn-link">← {i18n.language.startsWith("es") ? "Volver" : "Back"}</Link>
          </div>
        </Reveal>

        {/* Related */}
        {related.length > 0 && (
          <Reveal variant="fade-up" delay={280}>
            <section className="pd-related">
              <h3>{t("portfolio.sections.related", { defaultValue: "Related projects" })}</h3>
              <div className="related-grid">
                {related.map((r) => (
                  <Link key={r.slug} to={`/project/${r.slug}`} className="related-card">
                    <img
                      src={r.image}
                      alt={t(`portfolio.items.${r.slug}.title`, { defaultValue: r.slug })}
                    />
                    <div className="related-info">
                      <h4>{t(`portfolio.items.${r.slug}.title`, { defaultValue: r.slug })}</h4>
                      <span className="tag">
                        {r.category === "react-node"
                          ? t("portfolio.categories.reactNode", { defaultValue: "React / Node.js" })
                          : t("portfolio.categories.uxui", { defaultValue: "UX / UI" })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </Reveal>
        )}
      </div>
    </section>
  );
}
