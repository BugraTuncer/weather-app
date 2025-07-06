import React, { useEffect } from "react";
import { useWeather } from "../hooks/useWeather";
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
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorDisplay } from "./ErrorDisplay";
import { EmptyState } from "./EmptyState";
import "../styles/WeatherDisplay.css";

export const WeatherDisplay: React.FC = () => {
  const {
    currentWeather,
    isLoading,
    error,
    fetchWeatherByLocation,
    isLoadingLocation,
    locationError,
  } = useWeather();
  const { t } = useI18n();

  useEffect(() => {
    if (!currentWeather && !isLoading && !isLoadingLocation) {
      fetchWeatherByLocation();
    }
  }, [currentWeather, isLoading, isLoadingLocation, fetchWeatherByLocation]);

  const handleRefreshLocation = () => {
    fetchWeatherByLocation();
  };

  if (isLoading || isLoadingLocation) {
    return (
      <div className="weather-display">
        <LoadingSpinner message={t("weather.loadingWeatherData")} />
      </div>
    );
  }

  if (error || locationError) {
    return (
      <div className="weather-display">
        <ErrorDisplay
          title={t("weather.weatherDataUnavailable")}
          message={error?.message || locationError || "An error occurred"}
          onRetry={handleRefreshLocation}
          retryButtonText={t("weather.tryAgain")}
        />
      </div>
    );
  }

  if (!currentWeather && !isLoading && !isLoadingLocation) {
    return (
      <div className="weather-display">
        <EmptyState
          title={t("weather.weatherInformation")}
          message={t("weather.unableToGetLocation")}
          onAction={handleRefreshLocation}
          actionButtonText={t("weather.tryAgain")}
        />
      </div>
    );
  }

  if (currentWeather) {
    return (
      <div className="weather-display">
        <div className="weather-card">
          <div className="location-section">
            <h1 className="city-name">{currentWeather.name}</h1>
            <p className="country">{currentWeather.sys.country}</p>
          </div>

          <div className="weather-main">
            <div className="temperature-section">
              <div className="current-temp">
                {formatTemperature(currentWeather.main.temp)}
              </div>
              <div className="feels-like">
                {t("weather.feelsLike")}{" "}
                {formatTemperature(currentWeather.main.feels_like)}
              </div>
            </div>

            <div className="weather-icon-section">
              {currentWeather.weather[0]?.icon && (
                <img
                  src={getWeatherIcon(currentWeather.weather[0].icon)}
                  alt={getWeatherDescription(currentWeather)}
                  className="weather-icon"
                />
              )}
              <p className="weather-description">
                {getWeatherDescription(currentWeather)}
              </p>
            </div>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <span className="detail-label">{t("weather.humidity")}</span>
              <span className="detail-value">
                {formatHumidity(currentWeather.main.humidity)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">{t("weather.windSpeed")}</span>
              <span className="detail-value">
                {formatWindSpeed(currentWeather.wind.speed)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">{t("weather.pressure")}</span>
              <span className="detail-value">
                {formatPressure(currentWeather.main.pressure)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">{t("weather.visibility")}</span>
              <span className="detail-value">
                {formatVisibility(currentWeather.visibility)}
              </span>
            </div>
          </div>

          <button onClick={handleRefreshLocation} className="refresh-button">
            {t("weather.refreshWeather")}
          </button>
        </div>
      </div>
    );
  }

  return null;
};
