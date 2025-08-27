"use client";

import { cn } from "@/utils";
import { Check, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import i18n from "../../../i18n";

const languages = [
  {
    label: "English",
    shortLabel: "EN",
    value: "en",
  },
  {
    label: "Vietnamese",
    shortLabel: "VN",
    value: "vn",
  },
  {
    label: "Russian",
    shortLabel: "RU",
    value: "ru",
  },
];

const LanguageFilter = ({ variant }: { variant: "settings" | "header" }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  type LanguageType = (typeof languages)[number];
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>(languages[0]);

  const headerVariant = variant === "header";

  const handleLanguageClick = (selected: LanguageType) => {
    if (selected.value === i18n.language) return;
    setSelectedLanguage(selected);
    setIsOpen(false);
    i18n.changeLanguage(selected.value);
    localStorage.setItem("lang", selected.value);
  };

  // outside click handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    const langusage = languages.find((item) => item.value === lang);
    const currentLang = langusage || languages[0];
    setSelectedLanguage(currentLang);
    i18n.changeLanguage(currentLang.value);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center">
        <button
          className={cn(
            "flex items-center justify-between gap-2 rounded-[8px] border px-[16px] py-[7px] text-sm whitespace-nowrap outline-0 placeholder:text-lighter hover:bg-darker focus:border-neutral",
            headerVariant ? "w-20 border-transparent" : "w-32 border-dark"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {headerVariant ? (
            <>
              <Globe className="h-4 w-4" /> {selectedLanguage.shortLabel}
            </>
          ) : (
            <>
              {selectedLanguage.label} ({selectedLanguage.shortLabel})
            </>
          )}
        </button>
      </div>

      {/* dropdown */}
      {isOpen && (
        <div
          className={cn(
            "absolute z-10 w-[180px] rounded-[8px] bg-darker p-2 text-light",
            headerVariant ? "top-[110%] right-0" : "bottom-[110%] left-0"
          )}
        >
          <div className="flex flex-col justify-start gap-2 text-left">
            {languages.map((language) => (
              <button
                key={language.value}
                className={cn(
                  "flex w-full items-center justify-between gap-1 rounded-[8px] px-3 py-1 text-left text-sm text-light hover:bg-dark",
                  selectedLanguage.value === language.value && "bg-dark"
                )}
                onClick={() => {
                  handleLanguageClick(language);
                }}
              >
                {language.label} ({language.shortLabel})
                {selectedLanguage.value === language.value && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageFilter;
