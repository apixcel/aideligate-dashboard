// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import the JSONs. Make sure these actually import as JS objects.
import en from "./public/locales/en.json";
import ru from "./public/locales/ru.json";
import vn from "./public/locales/vn.json";

const resources = {
  en: { translation: en.translation ?? en },
  ru: { translation: ru.translation ?? ru },
  vn: { translation: vn.translation ?? vn },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vn",
  fallbackLng: "en",
  defaultNS: "translation",
  ns: ["translation"],
  interpolation: { escapeValue: false },
  // If you’re not loading from HTTP backend, Suspense isn’t needed:
  react: { useSuspense: false },
  // Optional: see what’s happening in the console
  debug: false,
});

export default i18n;
