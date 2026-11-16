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
      <div className="container footer-grid-four">
        {/* Brand */}
        <div className="footer-col-brand">
          <a href="#home" className="footer-logo">
            WHILMIS PEREZ<span className="dot">.</span>
          </a>
          <p className="footer-bio-text">
            Production-grade engineering &amp; creative technology. Santo Domingo, Dominican Republic. Available worldwide.
          </p>
        </div>

        {/* Navigation */}
        <div className="footer-col">
          <h4 className="footer-col-title">SECTIONS</h4>
          <ul className="footer-nav-list">
            <li><a href="#home">{t("nav.home", { defaultValue: "Home" })}</a></li>
            <li><a href="#services">{t("nav.services", { defaultValue: "Services" })}</a></li>
            <li><a href="#packages">{t("nav.packages", { defaultValue: "Packages" })}</a></li>
            <li><a href="#tools">{t("nav.tools", { defaultValue: "Stack" })}</a></li>
            <li><a href="#portfolio">{t("nav.portfolio", { defaultValue: "Portfolio" })}</a></li>
            <li><a href="#about">{t("nav.about", { defaultValue: "About" })}</a></li>
            <li><a href="#ai-puzzle">{t("nav.pipeline", { defaultValue: "AI Pipeline" })}</a></li>
            <li><a href="#contact">{t("nav.contact", { defaultValue: "Contact" })}</a></li>
          </ul>
        </div>

        {/* Direct Contact */}
        <div className="footer-col">
          <h4 className="footer-col-title">DIRECT</h4>
          <ul className="footer-contact-list">
            <li>
              <span className="contact-meta-label">TELEPHONE</span>
              <a href="tel:+18293971011">+1 829 397 1011</a>
            </li>
            <li>
              <span className="contact-meta-label">EU WHATSAPP</span>
              <a href="tel:+34607197493">+34 607 197 493</a>
            </li>
            <li>
              <span className="contact-meta-label">EMAIL</span>
              <a href="mailto:whilmisperez@gmail.com">whilmisperez@gmail.com</a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="footer-col">
          <h4 className="footer-col-title">CONNECT</h4>
          <ul className="footer-social-list">
            <li>
              <a href="https://github.com/Whilmis" target="_blank" rel="noopener noreferrer">
                GITHUB ↗
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/whilmis-perez-de-pe%C3%B1a-b21764179" target="_blank" rel="noopener noreferrer">
                LINKEDIN ↗
              </a>
            </li>
            <li>
              <a href="#contact">
                CONTRACT BRIEF ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-flex">
          <span className="footer-copy-text">
            &copy; {year} WHILMIS PEREZ. ALL RIGHTS RESERVED.
          </span>
          <button type="button" className="footer-scroll-top-btn" onClick={scrollTop}>
            BACK TO TOP &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}
