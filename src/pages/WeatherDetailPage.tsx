import React from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../hooks/useI18n";
import { WeatherCard } from "../components/WeatherCard";
import "../styles/WeatherDetailPage.css";
import { useAppSelector } from "../store/hooks";

export const WeatherDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedForecastDay, currentWeather } = useAppSelector(
    (state) => state.weather
  );

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

      {selectedForecastDay ? (
        <WeatherCard
          weather={selectedForecastDay}
          showRefreshButton={false}
          showLocation={true}
          showDetails={true}
          currentWeather={currentWeather ?? undefined}
        />
      ) : (
        <div className="no-data">
          <p>{t("detail.noData")}</p>
        </div>
      )}
    </div>
  );
};
