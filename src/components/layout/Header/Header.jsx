import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../common/LanguageSwitcher/LanguageSwitcher";
import "./Header.css";

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <h1 className="logo">WP</h1>

        <nav className="main-nav">
          <ul className="nav-list">
            <li><a href="#home">{t("nav.home")}</a></li>
              <li><a href="#services">{t("nav.services")}</a></li>
            <li><a href="#about">{t("nav.about")}</a></li>
          
            <li><a href="#skills">{t("nav.skills")}</a></li>
            <li><a href="#portfolio">{t("nav.portfolio")}</a></li>
            <li><a href="#contact">{t("nav.contact")}</a></li>
          </ul>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
