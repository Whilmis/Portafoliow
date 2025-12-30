import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import "./Nav.css";

export default function Nav() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const bpMd = 960; // breakpoint "mediano"

  // Cierra al cambiar tamaño hacia desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > bpMd && open) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  // Bloquea scroll al abrir
  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  // Esc para cerrar
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const changeLang = (lng) => i18n.changeLanguage(lng);

  const handleAnchor = useCallback((href) => (e) => {
    // Para #anclas: cierra y hace scroll suave
    if (href.startsWith("#")) {
      e.preventDefault();
      setOpen(false);
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const items = [
    { k: "home", label: t("nav.home", { defaultValue: "Inicio" }), href: "#home" },
    { k: "about", label: t("nav.about", { defaultValue: "Sobre mí" }), href: "#about" },
    { k: "services", label: t("nav.services", { defaultValue: "Servicios" }), href: "#services" },
    { k: "skills", label: t("nav.skills", { defaultValue: "Habilidades" }), href: "#skills" },
    { k: "portfolio", label: t("nav.portfolio", { defaultValue: "Portafolio" }), href: "#portfolio" },
    { k: "contact", label: t("nav.contact", { defaultValue: "Contacto" }), href: "#contact" }
  ];

  return (
    <header className="site-header" id="top">
      <div className="container nav-row">
        {/* LOGO */}
        <a className="brand" href="#top" onClick={handleAnchor("#top")} aria-label="Home">
          <span className="brand-mark">WP</span>
        </a>

        {/* Links desktop */}
        <nav className="nav-desktop" aria-label="primary">
          <ul>
            {items.map((it) => (
              <li key={it.k}>
                <a href={it.href} onClick={handleAnchor(it.href)}>{it.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Selector idioma desktop */}
        <div className="lang-desktop" role="group" aria-label={t("nav.language", { defaultValue: "Idioma" })}>
          <button
            className={`lang-btn ${i18n.language.startsWith("es") ? "active" : ""}`}
            onClick={() => changeLang("es")}
            type="button"
          >
            ES
          </button>
          <button
            className={`lang-btn ${i18n.language.startsWith("en") ? "active" : ""}`}
            onClick={() => changeLang("en")}
            type="button"
          >
            EN
          </button>
        </div>

        {/* Botón hamburguesa (md ↓) */}
        <button
          className={`hamburger ${open ? "is-open" : ""}`}
          aria-label="Menú"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Overlay */}
      <div className={`backdrop ${open ? "show" : ""}`} onClick={() => setOpen(false)} />

      {/* Drawer móvil */}
      <nav id="mobile-menu" className={`mobile-drawer ${open ? "show" : ""}`} aria-label="mobile">
        <div className="drawer-head">
          <a className="brand" href="#top" onClick={handleAnchor("#top")}>Menu</a>
          <button className="close" aria-label="Cerrar" onClick={() => setOpen(false)}>✕</button>
        </div>

        <ul className="drawer-links">
          {items.map((it) => (
            <li key={`m-${it.k}`}>
              <a href={it.href} onClick={handleAnchor(it.href)}>{it.label}</a>
            </li>
          ))}
        </ul>

        <div className="drawer-lang">
          <span>{t("nav.language", { defaultValue: "Idioma" })}</span>
          <div className="lang-group">
            <button
              className={`lang-btn ${i18n.language.startsWith("es") ? "active" : ""}`}
              onClick={() => changeLang("es")}
              type="button"
            >
              ES
            </button>
            <button
              className={`lang-btn ${i18n.language.startsWith("en") ? "active" : ""}`}
              onClick={() => changeLang("en")}
              type="button"
            >
              EN
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
