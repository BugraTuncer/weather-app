import React from "react";
import { getWeatherIcon, formatTemperature } from "../utils/weatherUtils";
import type { DailyForecast } from "../contexts/WeatherContextInstance";
import "../styles/WeatherForecast.css";

interface WeatherForecastProps {
  forecast: DailyForecast[];
  navigate: (path: string) => void;
  t: (key: string) => string;
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({
  forecast,
  navigate,
  t,
}) => {
  return (
    <div className="weather-forecast">
      <h2 className="forecast-title">{t("forecast.title")}</h2>

      <div className="forecast-container">
        <div className="forecast-list">
          {forecast.map((day) => (
            <div
              key={day.date}
              className={`forecast-day clickable`}
              onClick={() => navigate(`/weather/${day.date}`)}
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
      </div>
    </div>
  );
};
