import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../common/LanguageSwitcher/LanguageSwitcher";
import "./Header.css";

export default function Header() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#home" className="logo" onClick={closeMenu}>
          <span className="logo-text">WHILMIS PEREZ</span><span className="dot">.</span>
        </a>

        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li><a href="#home" onClick={closeMenu}>{t("nav.home")}</a></li>
            <li><a href="#services" onClick={closeMenu}>{t("nav.services")}</a></li>
            <li><a href="#packages" onClick={closeMenu}>{t("nav.packages", { defaultValue: "Packages" })}</a></li>
            <li><a href="#tools" onClick={closeMenu}>{t("nav.tools", { defaultValue: "Stack" })}</a></li>
            <li><a href="#portfolio" onClick={closeMenu}>{t("nav.portfolio")}</a></li>
            <li><a href="#about" onClick={closeMenu}>{t("nav.about")}</a></li>
            <li><a href="#ai-puzzle" onClick={closeMenu}>{t("nav.pipeline", { defaultValue: "AI Pipeline" })}</a></li>
            <li><a href="#contact" onClick={closeMenu}>{t("nav.contact")}</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <LanguageSwitcher />
          
          <a href="#contact" className="header-cta-btn">
            {t("nav.cta", { defaultValue: "LET'S TALK" })}
          </a>

          <button 
            className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
