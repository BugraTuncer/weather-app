import React from "react";
import { useWeather } from "../hooks/useWeather";
import { useI18n } from "../hooks/useI18n";
import { getWeatherIcon, formatTemperature } from "../utils/weatherUtils";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorDisplay } from "./ErrorDisplay";
import "../styles/WeatherForecast.css";

export const WeatherForecast: React.FC = () => {
  const { forecast, isLoadingForecast, forecastError } = useWeather();
  const { t } = useI18n();

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

  return (
    <div className="weather-forecast">
      <h2 className="forecast-title">{t("forecast.title")}</h2>

      <div className="forecast-container">
        <div className="forecast-list">
          {forecast.map((day) => (
            <div key={day.date} className={`forecast-day`}>
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
      </div>
    </div>
  );
};
