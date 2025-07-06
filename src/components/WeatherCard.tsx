import React from "react";
import { useI18n } from "../hooks/useI18n";
import {
  getWeatherIcon,
  formatTemperature,
  getWeatherDescription,
  formatHumidity,
  formatWindSpeed,
  formatPressure,
  formatVisibility,
} from "../utils/weatherUtils";
import type { WeatherData } from "../services/weatherApi";
import "../styles/WeatherCard.css";

interface WeatherCardProps {
  weather: WeatherData;
  showRefreshButton?: boolean;
  onRefresh?: () => void;
  showLocation?: boolean;
  showDetails?: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  showRefreshButton = false,
  onRefresh,
  showLocation = true,
  showDetails = true,
}) => {
  const { t } = useI18n();

  return (
    <div className="weather-card">
      {showLocation && (
        <div className="location-section">
          <h1 className="city-name">{weather.name}</h1>
          <p className="country">{weather.sys.country}</p>
        </div>
      )}

      <div className="weather-main">
        <div className="temperature-section">
          <div className="current-temp">
            {formatTemperature(weather.main.temp)}
          </div>
          <div className="feels-like">
            {t("weather.feelsLike")}{" "}
            {formatTemperature(weather.main.feels_like)}
          </div>
        </div>

        <div className="weather-icon-section">
          {weather.weather[0]?.icon && (
            <img
              src={getWeatherIcon(weather.weather[0].icon)}
              alt={getWeatherDescription(weather)}
              className="weather-icon"
            />
          )}
          <p className="weather-description">
            {getWeatherDescription(weather)}
          </p>
        </div>
      </div>

      {showDetails && (
        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">{t("weather.humidity")}</span>
            <span className="detail-value">
              {formatHumidity(weather.main.humidity)}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">{t("weather.windSpeed")}</span>
            <span className="detail-value">
              {formatWindSpeed(weather.wind.speed)}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">{t("weather.pressure")}</span>
            <span className="detail-value">
              {formatPressure(weather.main.pressure)}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">{t("weather.visibility")}</span>
            <span className="detail-value">
              {formatVisibility(weather.visibility)}
            </span>
          </div>
        </div>
      )}

      {showRefreshButton && onRefresh && (
        <button onClick={onRefresh} className="refresh-button">
          {t("weather.refreshWeather")}
        </button>
      )}
    </div>
  );
};
