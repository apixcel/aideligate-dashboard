"use client";
import { languages } from "@/components/shared/LanguageFilter";
import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";
const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lang = localStorage.getItem("lang");
    const langusage = languages.find((item) => item.value === lang);
    const currentLang = langusage || languages[0];
    i18n.changeLanguage(currentLang.value);
  }, []);
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nProvider;
