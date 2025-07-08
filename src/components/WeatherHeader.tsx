import React from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useI18n } from "../hooks/useI18n";
import { setUnits } from "../store/slices/weatherSlice";
import { setLanguage, toggleDarkMode } from "../store/slices/uiSlice";
import "../styles/WeatherHeader.css";

export const WeatherHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentWeather, units } = useAppSelector((state) => state.weather);
  const { language, isDarkMode } = useAppSelector(
    (state) => state.ui as { language: "en" | "es"; isDarkMode: boolean }
  );
  const { t } = useI18n();

  if (!currentWeather) {
    return null;
  }

  return (
    <div className="weather-header">
      <h1 className="header-title">Weather App</h1>
      <div className="header-controls">
        <div className="button-toggle">
          <button
            className={`btn ${language === "en" ? "active" : ""}`}
            onClick={() => dispatch(setLanguage("en"))}
          >
            EN
          </button>
          <button
            className={`btn ${language === "es" ? "active" : ""}`}
            onClick={() => dispatch(setLanguage("es"))}
          >
            ES
          </button>
        </div>

        <div className="button-toggle">
          <button
            className={`btn ${units === "metric" ? "active" : ""}`}
            onClick={() => dispatch(setUnits("metric"))}
          >
            {t("header.units.celsius")}
          </button>
          <button
            className={`btn ${units === "imperial" ? "active" : ""}`}
            onClick={() => dispatch(setUnits("imperial"))}
          >
            {t("header.units.fahrenheit")}
          </button>
        </div>

        <div className="button-toggle">
          <button className="btn" onClick={() => dispatch(toggleDarkMode())}>
            {!isDarkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </div>
  );
};
