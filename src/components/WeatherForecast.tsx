import React from "react";
import { motion } from "framer-motion";
import { getWeatherIcon, formatTemperature } from "../utils/weatherUtils";
import "../styles/WeatherForecast.css";
import type { WeatherData } from "../models/weatherDto";
import { useAppDispatch } from "../store/hooks";
import { setSelectedForecastDay } from "../store/slices/weatherSlice";

interface WeatherForecastProps {
  forecast: WeatherData[];
  navigate: (path: string) => void;
  t: (key: string) => string;
  unit: string;
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({
  forecast,
  navigate,
  t,
  unit,
}) => {
  const dispatch = useAppDispatch();

  const handleDayClick = (day: WeatherData) => {
    dispatch(setSelectedForecastDay(day));
    navigate(`/weather/${day.date}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <h2 className="forecast-title">{t("forecast.title")}</h2>

      <div className="forecast-container">
        <motion.div className="forecast-list" variants={containerVariants}>
          {forecast.map((day) => (
            <motion.div
              key={day.date}
              className="forecast-day"
              onClick={() => handleDayClick(day)}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                y: -5,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="day-info">
                <div className="day-name">
                  {day.day
                    ? day.day.charAt(0).toUpperCase() +
                      day.day.slice(1).toLowerCase()
                    : ""}
                </div>
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
                    {formatTemperature(day.main.temp_max, unit)}
                  </span>
                  <span className="temp-min">
                    {formatTemperature(day.main.temp_min, unit)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
