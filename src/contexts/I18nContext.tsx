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

const getNestedValue = (obj: Record<string, unknown>, key: string): unknown => {
  const parts = key.split(".");
  let value: unknown = obj;

  for (const part of parts) {
    if (typeof value === "object" && value !== null && part in value) {
      value = (value as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }

  return value;
};

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const value = getNestedValue(translations[language], key);

    if (typeof value === "string") {
      return value;
    }

    const fallbackValue = getNestedValue(translations["en"], key);
    if (typeof fallbackValue === "string") {
      return fallbackValue;
    }

    return key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};
