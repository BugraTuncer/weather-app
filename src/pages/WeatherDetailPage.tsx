import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useI18n } from "../hooks/useI18n";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { WeatherCard } from "../components/WeatherCard";
import "../styles/WeatherDetailPage.css";
import { useAppSelector } from "../store/hooks";

export const WeatherDetailPage: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const { currentWeather } = useAppSelector((state) => state.weather);

  const { t } = useI18n();

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
