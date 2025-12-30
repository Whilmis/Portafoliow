
import video from "../../../assets/video/videoplayback.mp4"
import imgW from "../../../assets/img/porta3.png"

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Hero.css";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const videoRef = useRef(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const roles = t("hero.roles", { returnObjects: true }) || [];

  // Ralentiza el video y ajusta var de altura del header
  useEffect(() => {
    const v = videoRef.current;
    const setRate = () => {
      try {
        if (!v) return;
        v.defaultPlaybackRate = 0.3;
        v.playbackRate = 0.1;
      } catch (err) {
        console.warn("No se pudo ajustar playbackRate:", err);
      }
    };
    v?.addEventListener("loadedmetadata", setRate);
    v?.addEventListener("canplay", setRate);
    v?.addEventListener("play", setRate);

    const setHeaderHeightVar = () => {
      const header = document.querySelector(".site-header");
      const h = header ? Math.round(header.getBoundingClientRect().height) : 72;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    setHeaderHeightVar();
    window.addEventListener("resize", setHeaderHeightVar);

    return () => {
      v?.removeEventListener("loadedmetadata", setRate);
      v?.removeEventListener("canplay", setRate);
      v?.removeEventListener("play", setRate);
      window.removeEventListener("resize", setHeaderHeightVar);
    };
  }, []);

  // Rotación de roles (Developer ↔ Web Designer)
  useEffect(() => {
    if (!Array.isArray(roles) || roles.length < 2) return;
    const id = setInterval(() => {
      setRoleIdx((i) => (i + 1) % roles.length);
    }, 2600);
    return () => clearInterval(id);
    // reinicia al cambiar de idioma
  }, [i18n.language]); // eslint-disable-line

  return (
    <section className="hero" id="home">
      {/* Video de fondo */}
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={video} type="video/mp4" />
        Tu navegador no soporta video HTML5.
      </video>

      {/* Overlay + escenario a altura completa */}
      <div className="hero-overlay">
        <div className="container hero-container">
          <div className="hero-stage">
            {/* FOTO: grande, anclada al borde inferior del video */}
            <figure className="hero-figure">
              <img
                className="hero-photo"
                src={imgW}
                alt="Foto de perfil"
                loading="eager"
              />
            </figure>

            {/* TEXTOS superpuestos por delante */}
            <div className="hero-content">
              <h1 className="hero-title">{t("hero.greeting")}</h1>

              <p className="hero-role">
                <span
                  key={`${i18n.language}-${roleIdx}`}
                  className="role-word animate-in"
                >
                  {roles[roleIdx] || ""}
                </span>
              </p>

              <div className="hero-buttons">
                <a href="#portfolio" className="btn-primary">
                  {t("hero.ctaPortfolio")}
                </a>
                <a href="#contact" className="btn-secondary">
                  {t("hero.ctaContact")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
