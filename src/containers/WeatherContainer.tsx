import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useI18n } from "../hooks/useI18n";
import { weatherApi } from "../services/weatherApi";
import {
  setCurrentWeather,
  setCoordsParams,
} from "../store/slices/weatherSlice";

import "../styles/WeatherDisplay.css";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { EmptyState } from "../components/EmptyState";
import { WeatherCard } from "../components/WeatherCard";
import {
  formatTemperature,
  getWeatherDescription,
  getWeatherIcon,
} from "../utils/weatherUtils";

export const WeatherContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    currentWeather,
    coordsParams,
    queryParams,
    units,
    currentDayHourlyData,
  } = useAppSelector((state) => state.weather);
  const { t, language } = useI18n();

  const {
    data: weatherByCoordsData,
    isLoading: weatherByCoordsLoading,
    error: weatherByCoordsError,
  } = useQuery({
    queryKey: [
      "weatherByCoords",
      coordsParams?.lat,
      coordsParams?.lon,
      units,
      language,
    ],
    queryFn: () => {
      if (!coordsParams) throw new Error("No coordinates specified");
      return weatherApi.getCurrentWeatherByCoords(
        coordsParams.lat,
        coordsParams.lon,
        units,
        language
      );
    },
    enabled: !!coordsParams,
    retry: 3,
    retryDelay: 1000,
    refetchInterval: 1000 * 60 * 30,
    refetchIntervalInBackground: true,
    staleTime: 1000 * 60 * 30,
  });

  const {
    data: weatherByCityData,
    isLoading: weatherByCityLoading,
    error: weatherByCityError,
  } = useQuery({
    queryKey: ["weatherByCity", queryParams?.city, units, language],
    queryFn: () => {
      if (!queryParams) throw new Error("No city specified");
      return weatherApi.getCurrentWeatherByCity(
        queryParams.city,
        units,
        language
      );
    },
    enabled: !!queryParams,
    retry: 3,
    retryDelay: 1000,
    refetchInterval: 1000 * 60 * 30,
    refetchIntervalInBackground: true,
    staleTime: 1000 * 60 * 30,
  });

  const activeData = coordsParams ? weatherByCoordsData : weatherByCityData;
  const activeLoading = coordsParams
    ? weatherByCoordsLoading
    : weatherByCityLoading;
  const activeError = coordsParams ? weatherByCoordsError : weatherByCityError;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(
          setCoordsParams({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            units,
          })
        );
      },
      (error) => {
        console.error("Geolocation error:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, [units, dispatch]);

  useEffect(() => {
    if (activeData) {
      dispatch(setCurrentWeather(activeData));
    }
  }, [activeData, dispatch]);

  console.log("current", currentDayHourlyData);

  if (activeLoading) {
    return (
      <div className="weather-display">
        <LoadingSpinner message={t("weather.loadingWeatherData")} />
      </div>
    );
  }

  if (activeError) {
    return (
      <div className="weather-display">
        <ErrorDisplay
          title={t("weather.weatherDataUnavailable")}
          message={activeError?.message || "An error occurred"}
          onRetry={() => window.location.reload()}
          retryButtonText={t("weather.tryAgain")}
        />
      </div>
    );
  }

  if (!currentWeather && !activeLoading) {
    return (
      <div className="weather-display">
        <EmptyState
          title={t("weather.weatherInformation")}
          message={t("weather.unableToGetLocation")}
          onAction={() => window.location.reload()}
          actionButtonText={t("weather.tryAgain")}
        />
      </div>
    );
  }

  const TodayForecast = () => {
    return (
      <div className="today-forecast">
        <div className="today-forecast-header">
          <h2>{t("forecast.todayForecast")}</h2>
        </div>
        <div className="today-forecast-content">
          {currentDayHourlyData?.map((hour) => (
            <div key={hour.dt_txt}>
              <h3>
                {hour.dt_txt.split(" ")[1].split(":")[0]}:
                {hour.dt_txt.split(" ")[1].split(":")[1]}
              </h3>
              <img
                src={getWeatherIcon(hour.weather[0].icon)}
                alt={getWeatherDescription(hour)}
                className="current-weather-icon"
              />
              <p>{formatTemperature(hour.main.temp, units)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (currentWeather) {
    return (
      <div className="weather-display">
        <WeatherCard
          weather={currentWeather}
          showRefreshButton={true}
          onRefresh={() => window.location.reload()}
          showLocation={true}
          showDetails={true}
          todayForecast={<TodayForecast />}
          unit={units}
        />
      </div>
    );
  }

  return null;
};
