import React from "react";
import { useWeather } from "../hooks/useWeather";
import { useI18n } from "../hooks/useI18n";
import {
  getWeatherIcon,
  formatTemperature,
  getWeatherDescription,
} from "../utils/weatherUtils";
import "../styles/WeatherHeader.css";

export const WeatherHeader: React.FC = () => {
  const { currentWeather, units, setUnits } = useWeather();
  const { language, setLanguage, t } = useI18n();

  if (!currentWeather) {
    return null;
  }

  return (
    <div className="weather-header">
      <div className="header-weather-info">
        <div className="header-location">
          <span className="header-city">{currentWeather.name}</span>
          <span className="header-country">{currentWeather.sys.country}</span>
        </div>

        <div className="header-weather">
          {currentWeather.weather[0]?.icon && (
            <img
              src={getWeatherIcon(currentWeather.weather[0].icon)}
              alt={getWeatherDescription(currentWeather)}
              className="header-weather-icon"
            />
          )}
          <div className="header-temp">
            {formatTemperature(currentWeather.main.temp)}
          </div>
        </div>
      </div>

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
      </div>
    </div>
  );
};
