import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useI18n } from "../hooks/useI18n";
import { weatherApi } from "../services/weatherApi";
import {
  setCurrentWeather,
  setCoordsParams,
  addSavedWeather,
  removeSavedWeather,
  setCurrentDayHourlyData,
  setQueryParams,
} from "../store/slices/weatherSlice";

import "../styles/WeatherDisplay.css";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { EmptyState } from "../components/EmptyState";
import { WeatherCard } from "../components/WeatherCard";
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  formatTemperature,
  getWeatherDescription,
  getWeatherIcon,
} from "../utils/weatherUtils";
import type { WeatherData } from "../models/weatherDto";

export const WeatherContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    currentWeather,
    coordsParams,
    queryParams,
    units,
    currentDayHourlyData,
    savedWeathers,
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

  const { data: forecastData } = useQuery({
    queryKey: [
      "forecastWeatherContainer",
      queryParams?.city,
      coordsParams?.lat,
      coordsParams?.lon,
      units,
      language,
    ],
    queryFn: () => {
      if (queryParams) {
        return weatherApi.getForecastByCity(queryParams.city, units, language);
      } else if (coordsParams) {
        return weatherApi.getForecastByCoords(
          coordsParams.lat,
          coordsParams.lon,
          units,
          language
        );
      }
      throw new Error("No location specified");
    },
    enabled: !!(queryParams || coordsParams),
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
    if (coordsParams) {
      dispatch(setQueryParams(null));
    }
  }, [coordsParams, dispatch]);

  useEffect(() => {
    if (activeData) {
      dispatch(setCurrentWeather(activeData));
      dispatch(setCurrentDayHourlyData(null));
    }
  }, [activeData, dispatch]);

  useEffect(() => {
    if (forecastData) {
      const today = new Date();
      const todayKey = today.toISOString().split("T")[0];

      const todayHourlyData = forecastData.list
        .filter((item) => {
          const itemDate = new Date(item.dt * 1000);
          const itemDateKey = itemDate.toISOString().split("T")[0];
          return itemDateKey === todayKey;
        })
        .map((item) => ({
          ...item,
          date: todayKey,
          units: units,
          day: today.toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
            weekday: "short",
          }),
        }));

      dispatch(setCurrentDayHourlyData(todayHourlyData));
    } else {
      dispatch(setCurrentDayHourlyData(null));
    }
  }, [forecastData, language, dispatch, units]);

  const handleSaveWeather = async () => {
    if (currentWeather) {
      const currentSavedWeathers = savedWeathers || [];
      const isAlreadySaved = currentSavedWeathers.some(
        (saved) => saved.weather.id === currentWeather.id
      );

      if (isAlreadySaved) {
        dispatch(removeSavedWeather(currentWeather.id));
      } else {
        try {
          let forecast = null;

          if (coordsParams) {
            forecast = await weatherApi.getForecastByCoords(
              coordsParams.lat,
              coordsParams.lon,
              units,
              language
            );
          } else if (queryParams) {
            forecast = await weatherApi.getForecastByCity(
              queryParams.city,
              units,
              language
            );
          }

          let processedForecast = null;
          if (forecast) {
            const dailyData: WeatherData[] = [];
            const processedDates: Record<string, boolean> = {};

            forecast.list.forEach((item: WeatherData) => {
              const date = new Date(item.dt * 1000);
              const [dateKey] = date.toISOString().split("T");

              if (!processedDates[dateKey]) {
                processedDates[dateKey] = true;

                dailyData.push({
                  date: dateKey,
                  day: date.toLocaleDateString(
                    language === "es" ? "es-ES" : "en-US",
                    {
                      weekday: "short",
                    }
                  ),
                  ...item,
                });
              } else {
                const existingIndex = dailyData.findIndex(
                  (day) => day.date === dateKey
                );
                if (existingIndex !== -1) {
                  const existing = dailyData[existingIndex];

                  dailyData[existingIndex] = {
                    ...existing,
                    main: {
                      ...existing.main,
                      temp_min: Math.min(
                        existing.main.temp_min,
                        item.main.temp_min
                      ),
                      temp_max: Math.max(
                        existing.main.temp_max,
                        item.main.temp_max
                      ),
                    },
                    weather: (() => {
                      const hour = date.getHours();
                      if (hour >= 10 && hour <= 14) {
                        return item.weather;
                      }
                      return existing.weather;
                    })(),
                  };
                }
              }
            });

            processedForecast = dailyData;
          }

          dispatch(
            addSavedWeather({
              weather: currentWeather,
              forecast: processedForecast,
              todayHourlyForecast: currentDayHourlyData,
              units: units,
            })
          );
        } catch (error) {
          console.error("Error fetching forecast for saved weather:", error);
          dispatch(
            addSavedWeather({
              weather: currentWeather,
              forecast: null,
              todayHourlyForecast: currentDayHourlyData,
              units: units,
            })
          );
        }
      }
    }
  };

  const isWeatherSaved =
    savedWeathers?.some((saved) => saved.weather.id === currentWeather?.id) ||
    false;

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
          message={t("weather.emptyWeather")}
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
              <p>
                {hour.units === "imperial" && units === "imperial"
                  ? formatTemperature(hour.main.temp, units)
                  : hour.units === "imperial" && units === "metric"
                  ? fahrenheitToCelsius(hour.main.temp)
                  : hour.units === "metric" && units === "imperial"
                  ? celsiusToFahrenheit(hour.main.temp)
                  : formatTemperature(hour.main.temp, units)}
              </p>
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
          showSaveButton={true}
          onSave={handleSaveWeather}
          isSaved={isWeatherSaved}
        />
      </div>
    );
  }

  return null;
};
