import { useState, type ReactNode } from "react";
import { en } from "../i18n/locales/en";
import { es } from "../i18n/locales/es";
import { I18nContext } from "./I18nContextInstance";

export type Language = "en" | "es";

export interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, unknown>> = {
  en,
  es,
};

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: unknown = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        let fallbackValue: unknown = translations.en;
        for (const fallbackKey of keys) {
          if (
            fallbackValue &&
            typeof fallbackValue === "object" &&
            fallbackKey in fallbackValue
          ) {
            fallbackValue = (fallbackValue as Record<string, unknown>)[
              fallbackKey
            ];
          } else {
            fallbackValue = key;
            break;
          }
        }
        value = fallbackValue;
        break;
      }
    }

    return typeof value === "string" ? value : key;
  };

  const contextValue: I18nContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
};
