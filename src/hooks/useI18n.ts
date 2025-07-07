import { useAppSelector } from "../store/hooks";
import { locales } from "../i18n";

export const useI18n = () => {
  const language = useAppSelector(
    (state) => (state.ui as { language: "en" | "es" }).language
  );

  const t = (key: string) => {
    const keys = key.split(".");
    let value: unknown = locales[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  };

  return { t, language };
};
