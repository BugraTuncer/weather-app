import React, { useMemo } from "react";
import { useI18n } from "../hooks/useI18n";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  setCurrentWeather,
  removeSavedWeather,
} from "../store/slices/weatherSlice";
import { celsiusToFahrenheit, formatTemperature } from "../utils/weatherUtils";
import { getWeatherIcon } from "../utils/weatherUtils";
import "../styles/SavedWeathersList.css";
import type { WeatherData } from "../models/weatherDto";

const SavedWeathersListComponent: React.FC = () => {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const savedWeathers = useAppSelector((state) => state.weather.savedWeathers);
  const currentWeather = useAppSelector(
    (state) => state.weather.currentWeather
  );
  const units = useAppSelector((state) => state.weather.units);

  const weatherItems = useMemo(() => {
    if (!savedWeathers || savedWeathers.length === 0) return [];

    return savedWeathers.map((savedWeather) => ({
      ...savedWeather.weather,
      formattedTemp: formatTemperature(
        savedWeather?.weather?.main?.temp,
        units
      ),
      weatherIcon:
        savedWeather?.weather?.weather?.length > 0 &&
        savedWeather?.weather?.weather[0]?.icon
          ? getWeatherIcon(savedWeather?.weather?.weather[0].icon)
          : null,
    }));
  }, [savedWeathers, units]);

  const handleWeatherClick = (weather: WeatherData) => {
    dispatch(setCurrentWeather(weather));
  };

  const handleRemoveWeather = (weatherToRemove: WeatherData) => {
    dispatch(removeSavedWeather(weatherToRemove.id));
    if (currentWeather && currentWeather.id === weatherToRemove.id) {
      dispatch(setCurrentWeather(null));
    }
  };

  if (!savedWeathers || savedWeathers.length === 0) {
    return (
      <div className="saved-weathers-list empty">
        <p>{t("savedWeathers.empty")}</p>
      </div>
    );
  }

  return (
    <div className="saved-weathers-list">
      <div className="saved-weathers-header">
        <h3>{t("savedWeathers.title")}</h3>
      </div>
      <div className="saved-weathers-container">
        {weatherItems.map((weather) => (
          <div
            key={weather.id}
            className={`saved-weather-item ${
              currentWeather?.id === weather.id ? "active" : ""
            }`}
            onClick={() => handleWeatherClick(weather)}
          >
            <div className="saved-weather-content">
              <div className="saved-weather-info">
                <h4 className="saved-city-name">
                  {weather.name?.replace("Province", "")}
                </h4>
                <p className="saved-country">{weather.sys?.country}</p>
                <div className="saved-temperature">
                  {units === "metric"
                    ? weather.formattedTemp
                    : celsiusToFahrenheit(parseFloat(weather.formattedTemp))}
                </div>
              </div>
              <div className="saved-weather-icon">
                {weather.weatherIcon && (
                  <img
                    src={weather.weatherIcon}
                    className="weather-icon-small"
                  />
                )}
              </div>
            </div>
            <button
              className="remove-weather-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveWeather(weather);
              }}
              title={t("savedWeathers.remove")}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SavedWeathersList = React.memo(SavedWeathersListComponent);
