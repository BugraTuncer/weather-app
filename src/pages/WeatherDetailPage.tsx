import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWeather } from "../hooks/useWeather";
import { useI18n } from "../hooks/useI18n";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { WeatherCard } from "../components/WeatherCard";
import "../styles/WeatherDetailPage.css";

export const WeatherDetailPage: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const { forecast, currentWeather, isLoadingForecast, forecastError } =
    useWeather();
  const { t } = useI18n();

  if (isLoadingForecast) {
    return (
      <div className="weather-detail-page">
        <LoadingSpinner message={t("detail.loadingData")} />
      </div>
    );
  }

  if (forecastError) {
    return (
      <div className="weather-detail-page">
        <ErrorDisplay
          title={t("detail.dataUnavailable")}
          message={forecastError.message}
        />
      </div>
    );
  }

  if (!forecast || !date) {
    return (
      <div className="weather-detail-page">
        <ErrorDisplay
          title={t("detail.noData")}
          message={t("detail.noDataMessage")}
        />
      </div>
    );
  }

  const selectedDay = forecast.find((day) => day.date === date);

  if (!selectedDay) {
    return (
      <div className="weather-detail-page">
        <ErrorDisplay
          title={t("detail.dayNotFound")}
          message={t("detail.dayNotFoundMessage")}
        />
      </div>
    );
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="weather-detail-page">
      <div className="detail-header">
        <button className="back-button" onClick={handleBackClick}>
          ← {t("detail.back")}
        </button>
      </div>

      {currentWeather && (
        <WeatherCard
          weather={currentWeather}
          showRefreshButton={false}
          showLocation={true}
          showDetails={true}
        />
      )}
    </div>
  );
};
