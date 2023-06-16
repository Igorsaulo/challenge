import  i18n  from "i18next";
import { initReactI18next } from "react-i18next";
import EN from "./locales/en.json";
import PT_BR from "./locales/pt-br.json"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: EN,
      ptBR: PT_BR,
    },
    fallbackLng: "pt-br",
    interpolation: {
      escapeValue: false,
    },
  });

  export default i18n;