import React from "react";
import { useNavigate } from "react-router-dom";
import { useWeather } from "../hooks/useWeather";
import { useI18n } from "../hooks/useI18n";
import "../styles/WeatherForecast.css";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { WeatherForecast } from "../components/WeatherForecast";

export const WeatherForecastContainer: React.FC = () => {
  const { forecast, isLoadingForecast, forecastError } = useWeather();
  const { t } = useI18n();
  const navigate = useNavigate();

  if (isLoadingForecast) {
    return (
      <div className="weather-forecast">
        <LoadingSpinner message={t("forecast.loadingForecast")} />
      </div>
    );
  }

  if (forecastError) {
    return (
      <div className="weather-forecast">
        <ErrorDisplay
          title={t("forecast.forecastUnavailable")}
          message={forecastError.message}
        />
      </div>
    );
  }

  if (!forecast || forecast.length === 0) {
    return (
      <div className="weather-forecast">
        <div className="no-forecast">
          <h3>{t("forecast.noForecastData")}</h3>
          <p>{t("forecast.forecastWillAppear")}</p>
        </div>
      </div>
    );
  }

  return <WeatherForecast forecast={forecast} navigate={navigate} t={t} />;
};
