import React, { useState } from "react";
import { useWeather } from "../hooks/useWeather";
import { useI18n } from "../hooks/useI18n";
import {
  getWeatherIcon,
  formatTemperature,
  formatHumidity,
  formatWindSpeed,
} from "../utils/weatherUtils";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorDisplay } from "./ErrorDisplay";
import "../styles/WeatherForecast.css";

export const WeatherForecast: React.FC = () => {
  const { forecast, isLoadingForecast, forecastError } = useWeather();
  const { t } = useI18n();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

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

  const selectedDayData = selectedDay
    ? forecast.find((day) => day.date === selectedDay)
    : null;

  return (
    <div className="weather-forecast">
      <h2 className="forecast-title">{t("forecast.title")}</h2>

      <div className="forecast-container">
        <div className="forecast-list">
          {forecast.map((day) => (
            <div
              key={day.date}
              className={`forecast-day ${
                selectedDay === day.date ? "selected" : ""
              }`}
              onClick={() => setSelectedDay(day.date)}
            >
              <div className="day-info">
                <div className="day-name">{day.day}</div>
                <div className="day-date">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>

              <div className="day-weather">
                <img
                  src={getWeatherIcon(day.weather.icon)}
                  alt={day.weather.description}
                  className="day-weather-icon"
                />
                <div className="day-temps">
                  <span className="temp-max">
                    {formatTemperature(day.temp_max)}
                  </span>
                  <span className="temp-min">
                    {formatTemperature(day.temp_min)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedDayData && (
          <div className="forecast-detail">
            <div className="detail-header">
              <h3>{selectedDayData.day}</h3>
              <p className="detail-date">
                {new Date(selectedDayData.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="detail-weather">
              <img
                src={getWeatherIcon(selectedDayData.weather.icon)}
                alt={selectedDayData.weather.description}
                className="detail-weather-icon"
              />
              <div className="detail-info">
                <h4>{selectedDayData.weather.description}</h4>
                <div className="detail-temps">
                  <span className="detail-temp-max">
                    {t("forecast.high")}:{" "}
                    {formatTemperature(selectedDayData.temp_max)}
                  </span>
                  <span className="detail-temp-min">
                    {t("forecast.low")}:{" "}
                    {formatTemperature(selectedDayData.temp_min)}
                  </span>
                </div>
              </div>
            </div>

            <div className="detail-metrics">
              <div className="metric-item">
                <span className="metric-label">{t("weather.humidity")}</span>
                <span className="metric-value">
                  {formatHumidity(selectedDayData.humidity)}
                </span>
              </div>
              <div className="metric-item">
                <span className="metric-label">{t("weather.windSpeed")}</span>
                <span className="metric-value">
                  {formatWindSpeed(selectedDayData.wind_speed)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
