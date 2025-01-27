import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';  // Archivo de traducciones en inglés
import es from './locales/es.json';  // Archivo de traducciones en español

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
    lng: 'es', // Establece el idioma por defecto
    fallbackLng: 'es', // Si no hay traducción, usa el idioma por defecto
    interpolation: {
      escapeValue: false, // React ya hace escape de los valores
    },
  });

export default i18n;
