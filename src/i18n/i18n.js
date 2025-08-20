import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importamos un JSON por idioma
import es from "./locales/es.json";
import en from "./locales/en.json";

// Idioma inicial (revisa localStorage primero, si no usa el navegador)
const savedLang =
  typeof window !== "undefined" ? localStorage.getItem("lang") : null;
const browserLang =
  typeof window !== "undefined"
    ? (navigator.language || "es").split("-")[0]
    : "es";
const initialLng = savedLang || (browserLang === "en" ? "en" : "es");

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en }
    },
    lng: initialLng,
    fallbackLng: "es",
    interpolation: { escapeValue: false }
  });

// Sincroniza el <html lang="...">
if (typeof document !== "undefined") {
  document.documentElement.lang = initialLng;
}

export default i18n;
