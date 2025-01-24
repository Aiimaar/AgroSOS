import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";  // Archivo de traducción en inglés
import es from "./locales/es.json";  // Archivo de traducción en español

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
    lng: "es", // Idioma por defecto
    fallbackLng: "es", // Idioma de respaldo si no hay traducción
    interpolation: {
      escapeValue: false, // React maneja el escape de valores
    },
  });

export default i18n;
