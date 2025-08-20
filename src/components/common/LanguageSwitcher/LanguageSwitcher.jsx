import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css";

export default function LanguageSwitcher({ className = "" }) {
  const { i18n } = useTranslation();
  const current = (i18n.language || "es").slice(0, 2);

  const handleChange = (lang) => () => {
    if (lang !== current) {
      i18n.changeLanguage(lang);
      document.documentElement.lang = lang;
      localStorage.setItem("lang", lang);
    }
  };

  return (
    <div
      className={`lang-switcher ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <span className="lang-globe" aria-hidden="true">🌐</span>

      <button
        type="button"
        onClick={handleChange("es")}
        className={`lang-btn ${current === "es" ? "active" : ""}`}
        aria-pressed={current === "es"}
      >
        ES
      </button>

      <button
        type="button"
        onClick={handleChange("en")}
        className={`lang-btn ${current === "en" ? "active" : ""}`}
        aria-pressed={current === "en"}
      >
        EN
      </button>
    </div>
  );
}
