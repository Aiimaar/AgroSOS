import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";  // Archivo de traducción en inglés
import es from "./locales/es.json";  // Archivo de traducción en español

// Detectar el idioma desde localStorage o usar uno por defecto
const storedLanguage =
  typeof localStorage !== "undefined" ? localStorage.getItem("language") || "es" : "es";
 // 'es' como idioma por defecto

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
    },
    lng: storedLanguage, // Usar el idioma almacenado en localStorage
    fallbackLng: 'es', // Idioma de respaldo si no hay traducción
    interpolation: {
      escapeValue: false, // React maneja el escape de valores
    },
    detection: {
      // Desactivamos la detección automática para evitar que el idioma cambie sin control
      order: [],
      caches: [],
    },
  });

export default i18n;
