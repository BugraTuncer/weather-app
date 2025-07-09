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
import "../styles/WeatherCard.css";
import type { WeatherData } from "../models/weatherDto";

interface WeatherCardProps {
  weather: WeatherData;
  showRefreshButton?: boolean;
  onRefresh?: () => void;
  showLocation?: boolean;
  showDetails?: boolean;
  currentWeather?: WeatherData;
  todayForecast?: React.ReactNode;
  unit: string;
  showSaveButton?: boolean;
  onSave?: () => void;
  isSaved?: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  showLocation = true,
  showDetails = true,
  currentWeather,
  todayForecast,
  unit,
  showSaveButton = false,
  onSave,
  isSaved = false,
}) => {
  const { t } = useI18n();
  return (
    <div>
      <div className="weather-card-header">
        <div>
          {showLocation && (
            <div>
              <h1 className="city-name">
                {weather?.name?.replace("Province", "")}
              </h1>
              {weather.sys && <p className="country">{weather.sys.country}</p>}
            </div>
          )}
          {currentWeather && currentWeather.sys && (
            <div>
              <h1 className="city-name">
                {currentWeather.name.replace("Province", "")}
              </h1>
              {currentWeather.sys && (
                <p className="country">{currentWeather.sys.country}</p>
              )}
            </div>
          )}
          {weather.date && weather.day && (
            <p className="date">
              {weather.date} - {weather.day}
            </p>
          )}
          <div className="weather-main">
            <div className="temperature-section">
              <div className="current-temp">
                {formatTemperature(weather.main.temp, unit)}
              </div>
              {weather.main.feels_like && (
                <div className="feels-like">
                  {t("weather.feelsLike")}{" "}
                  {formatTemperature(weather.main.feels_like, unit)}
                </div>
              )}
            </div>
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

      {todayForecast && todayForecast}

      <div className="weather-card">
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
            {weather.main.pressure && (
              <div className="detail-item">
                <span className="detail-label">{t("weather.pressure")}</span>
                <span className="detail-value">
                  {formatPressure(weather.main.pressure)}
                </span>
              </div>
            )}
            {weather.visibility && (
              <div className="detail-item">
                <span className="detail-label">{t("weather.visibility")}</span>
                <span className="detail-value">
                  {formatVisibility(weather.visibility)}
                </span>
              </div>
            )}
            {weather.main.temp_max && (
              <div className="detail-item">
                <span className="detail-label">{t("forecast.high")}</span>
                <span className="detail-value">
                  {formatTemperature(weather.main.temp_max, unit)}
                </span>
              </div>
            )}
            {weather.main.temp_min && (
              <div className="detail-item">
                <span className="detail-label">{t("forecast.low")}</span>
                <span className="detail-value">
                  {formatTemperature(weather.main.temp_min, unit)}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="weather-actions">
          {showSaveButton && onSave && (
            <button
              onClick={onSave}
              className={`save-button ${isSaved ? "saved" : ""}`}
            >
              {isSaved ? t("weather.saved") : t("weather.save")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
