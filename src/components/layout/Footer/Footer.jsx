import { useTranslation } from "react-i18next";
import "./Footer.css";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer" id="footer">
      <div className="container footer-grid">
        {/* Marca + CTA */}
        <div className="footer-brand">
          <h3 className="logo">WP</h3>
          <p className="footer-tagline">{t("footer.tagline")}</p>

          <button
            type="button"
            className="back-to-top"
            onClick={scrollTop}
            aria-label={t("footer.backToTop")}
          >
            <span className="arrow" aria-hidden="true">↑</span>
            {t("footer.backToTop")}
          </button>
        </div>

        {/* Mapa del sitio */}
        <nav className="footer-nav" aria-label="Footer">
          <h4 className="footer-title">{t("footer.navTitle")}</h4>
          <ul className="footer-links">
            <li><a href="#home">{t("nav.home")}</a></li>
            <li><a href="#about">{t("nav.about")}</a></li>
            <li><a href="#services">{t("nav.services")}</a></li>
            <li><a href="#skills">{t("nav.skills")}</a></li>
            <li><a href="#portfolio">{t("nav.portfolio")}</a></li>
            <li><a href="#contact">{t("nav.contact")}</a></li>
          </ul>
        </nav>

        {/* Contacto + Redes */}
        <div className="footer-contact">
          <h4 className="footer-title">{t("footer.contactTitle")}</h4>
          <ul className="footer-contact-list">
            <li>
              <a href="tel:+34607197493">(+34) 607 197 493</a>
            </li>
            <li>
              <a href="mailto:whilmisweb@gmail.com">whilmisweb@gmail.com</a>
            </li>
          </ul>

          <div className="footer-social">
            <h4 className="footer-title">{t("footer.socialTitle")}</h4>
            <ul className="social-list">
              {/* Reemplaza # por tus enlaces reales */}
              <li><a href="https://github.com/Whilmis" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/whilmis-perez-de-pe%C3%B1a-b21764179" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Franja inferior */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {year} Whilmis</span>
          <span>{t("footer.rights")}</span>
        </div>
      </div>
    </footer>
  );
}
