import { useEffect, useState, useRef, useMemo, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import "./Hero.css";

// Three.js scene is code-split so it never blocks the first paint
const AvatarGlitch3D = lazy(() => import("./AvatarGlitch3D.jsx"));

export default function Hero() {
  const { t, i18n } = useTranslation();
  const [roleIdx, setRoleIdx] = useState(0);
  const cardRef = useRef(null);

  const roles = useMemo(() => {
    const raw = t("hero.roles", { returnObjects: true });
    return Array.isArray(raw) && raw.length > 0
      ? raw
      : [
          "FULL-STACK & CREATIVE ARCHITECT",
          "MVP & PRODUCT ENGINEER (0 → 1)",
          "AI AGENTS & N8N AUTOMATION",
          "TECH CONSULTANT & FRACTIONAL LEAD"
        ];
  }, [t]);

  // Rotación de roles
  useEffect(() => {
    if (!Array.isArray(roles) || roles.length < 2) return;
    const id = setInterval(() => {
      setRoleIdx((i) => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(id);
  }, [i18n.language, roles]);

  // Efecto 3D Tilt interactivo con perspectiva en la tarjeta exterior
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const factor = -6; // tilt suave para priorizar la interacción directa con el avatar
    const rotateX = ((y - centerY) / centerY) * factor;
    const rotateY = ((x - centerX) / centerX) * -factor;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;

    const glare = card.querySelector(".card-3d-glare");
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255, 255, 255, 0.16), transparent 60%)`;
      glare.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    const glare = card.querySelector(".card-3d-glare");
    if (glare) {
      glare.style.opacity = "0";
    }
  };

  return (
    <section className="hero" id="home">
      {/* Background Ambient Glow */}
      <div className="hero-glow"></div>

      <div className="container hero-container">
        {/* Left Side: Main Content */}
        <div className="hero-content-left">
          {/* Top Badges */}
          <div className="hero-badge-row">
            <span className="tech-badge">
              <span className="dot"></span>
              {t("hero.openToWork", { defaultValue: "AVAILABLE FOR PROJECTS & SPRINTS" })}
            </span>
            <span className="tech-badge badge-ghost">
              {t("hero.available", { defaultValue: "STARTUPS, SCALE-UPS & ENTERPRISE" })}
            </span>
          </div>

          {/* Main Name Heading */}
          <h1 className="hero-title">
            WHILMIS<br />
            PEREZ<span className="hero-title-dot">.</span>
          </h1>

          {/* Monospace Subhead */}
          <div className="hero-tagline">
            <span className="prompt-arrow">&gt;</span>
            <span key={`${i18n.language}-${roleIdx}`} className="role-text animate-fade">
              {roles[roleIdx] || "FULL-STACK & CREATIVE ARCHITECT"}
            </span>
          </div>

          {/* Description */}
          <p className="hero-description">
            {t("hero.description", {
              defaultValue: "Helping startups, businesses, and engineering teams build high-impact digital products, automate operations with AI agents, and scale robust architectures with zero tech debt."
            })}
          </p>

          {/* Action Buttons */}
          <div className="hero-actions">
            <a href="#packages" className="btn-primary hero-btn">
              {t("hero.viewPackages", { defaultValue: "VIEW PACKAGES & MODELS" })}
              <span className="btn-arrow">&gt;</span>
            </a>
            <a href="#contact" className="btn-secondary hero-btn">
              {t("hero.workTogether", { defaultValue: "START A CONVERSATION" })}
            </a>
            <a href="#about" className="hero-link-resume">
              {t("hero.resume", { defaultValue: "ABOUT & RESUME" })} &gt;
            </a>
          </div>

          {/* Stats Bar */}
          <div className="hero-stats-row">
            <div className="hero-stat-card">
              <div className="stat-value">8+</div>
              <div className="stat-label" dangerouslySetInnerHTML={{ __html: t("hero.stats.experience", { defaultValue: "SENIOR EXPERIENCE<br/>8+ YEARS" }) }}></div>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat-card">
              <div className="stat-value">60+</div>
              <div className="stat-label" dangerouslySetInnerHTML={{ __html: t("hero.stats.projects", { defaultValue: "DELIVERED SYSTEMS<br/>60+ PROJECTS" }) }}></div>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat-card">
              <div className="stat-value">100%</div>
              <div className="stat-label" dangerouslySetInnerHTML={{ __html: t("hero.stats.satisfaction", { defaultValue: "CODE OWNERSHIP<br/>100% YOURS (IP)" }) }}></div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive 3D Avatar Tech Card */}
        <div className="hero-content-right">
          <div
            className="hero-portrait-card hero-3d-card"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-3d-glare"></div>

            {/* Window Header */}
            <div className="portrait-card-header">
              <div className="portrait-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="portrait-tag">
                AVATAR_3D.GLB // INTERACTIVE
              </div>
              <div className="portrait-mode-live">
                <span className="live-dot"></span>
                <span>3D LIVE</span>
              </div>
            </div>

            {/* 3D WebGL Viewer Frame */}
            <div className="portrait-image-wrapper">
              <Suspense
                fallback={
                  <div className="ag-suspense">
                    <span className="live-dot"></span> LOADING WEBGL ENGINE...
                  </div>
                }
              >
                <AvatarGlitch3D />
              </Suspense>
            </div>

            {/* Footer */}
            <div className="portrait-card-footer">
              <div className="portrait-name">WHILMIS PEREZ</div>
              <div className="portrait-status">
                <span className="status-dot"></span>
                REAL-TIME GLITCH RIG
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
