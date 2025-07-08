import React from "react";
import { getWeatherIcon, formatTemperature } from "../utils/weatherUtils";
import "../styles/WeatherForecast.css";
import type { WeatherData } from "../models/weatherDto";
import { useAppDispatch } from "../store/hooks";
import { setSelectedForecastDay } from "../store/slices/weatherSlice";

interface WeatherForecastProps {
  forecast: WeatherData[];
  navigate: (path: string) => void;
  t: (key: string) => string;
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({
  forecast,
  navigate,
  t,
}) => {
  const dispatch = useAppDispatch();

  const handleDayClick = (day: WeatherData) => {
    dispatch(setSelectedForecastDay(day));
    navigate(`/weather/${day.date}`);
  };

  return (
    <div>
      <h2 className="forecast-title">{t("forecast.title")}</h2>

      <div className="forecast-container">
        <div className="forecast-list">
          {forecast.map((day) => (
            <div
              key={day.date}
              className="forecast-day"
              onClick={() => handleDayClick(day)}
            >
              <div className="day-info">
                <div className="day-name">{day.day}</div>
                <div className="day-date">
                  {new Date(day.date ?? "").toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>

              <div className="day-weather">
                <img
                  src={getWeatherIcon(day.weather[0].icon)}
                  alt={day.weather[0].description}
                  className="day-weather-icon"
                />
                <div className="day-temps">
                  <span className="temp-max">
                    {formatTemperature(day.main.temp_max)}
                  </span>
                  <span className="temp-min">
                    {formatTemperature(day.main.temp_min)}
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
