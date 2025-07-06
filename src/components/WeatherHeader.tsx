import React from "react";
import { useWeather } from "../hooks/useWeather";
import { useI18n } from "../hooks/useI18n";
import { useTheme } from "../hooks/useTheme";
import "../styles/WeatherHeader.css";

export const WeatherHeader: React.FC = () => {
  const { currentWeather, units, setUnits } = useWeather();
  const { language, setLanguage, t } = useI18n();
  const { theme, toggleTheme } = useTheme();

  if (!currentWeather) {
    return null;
  }

  return (
    <div className="weather-header">
      <div className="header-controls">
        <div className="language-toggle">
          <button
            className={`lang-btn ${language === "en" ? "active" : ""}`}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
          <button
            className={`lang-btn ${language === "es" ? "active" : ""}`}
            onClick={() => setLanguage("es")}
          >
            ES
          </button>
        </div>

        <div className="units-toggle">
          <button
            className={`unit-btn ${units === "metric" ? "active" : ""}`}
            onClick={() => setUnits("metric")}
          >
            {t("header.units.celsius")}
          </button>
          <button
            className={`unit-btn ${units === "imperial" ? "active" : ""}`}
            onClick={() => setUnits("imperial")}
          >
            {t("header.units.fahrenheit")}
          </button>
        </div>

        <div className="theme-toggle">
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </div>
  );
};
