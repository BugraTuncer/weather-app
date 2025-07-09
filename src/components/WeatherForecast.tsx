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
              </div>

              <div className="day-weather-container">
                <img
                  src={getWeatherIcon(day.weather[0].icon)}
                  alt={day.weather[0].description}
                  className="day-weather-icon"
                />
                <div>
                  {day.weather[0].description.charAt(0).toUpperCase() +
                    day.weather[0].description.slice(1)}
                </div>
              </div>

              <div className="day-weather">
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
