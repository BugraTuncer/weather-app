import React, { useEffect } from "react";
import { useWeather } from "../hooks/useWeather";
import { useI18n } from "../hooks/useI18n";

import "../styles/WeatherDisplay.css";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { EmptyState } from "../components/EmptyState";
import { WeatherCard } from "../components/WeatherCard";
import { WeatherSearch } from "../components/WeatherSearch";

export const WeatherContainer: React.FC = () => {
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
      <div>
        <WeatherSearch />
        <div className="weather-display">
          <WeatherCard
            weather={currentWeather}
            showRefreshButton={true}
            onRefresh={handleRefreshLocation}
            showLocation={true}
            showDetails={true}
          />
        </div>
      </div>
    );
  }

  return null;
};
