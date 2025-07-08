import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../store/hooks";
import { useI18n } from "../hooks/useI18n";
import { weatherApi } from "../services/weatherApi";
import "../styles/WeatherForecast.css";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { WeatherForecast } from "../components/WeatherForecast";
import type { WeatherData } from "../models/weatherDto";

export const WeatherForecastContainer: React.FC = () => {
  const { queryParams, coordsParams, units } = useAppSelector(
    (state) => state.weather
  );
  const { t, language } = useI18n();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "forecast",
      queryParams?.city,
      coordsParams?.lat,
      coordsParams?.lon,
      units,
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

  const forecast = useMemo(() => {
    if (!data) return null;

    const dailyData: WeatherData[] = [];
    const processedDates: Record<string, boolean> = {};

    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const [dateKey] = date.toISOString().split("T");

      if (!processedDates[dateKey]) {
        processedDates[dateKey] = true;

        dailyData.push({
          date: dateKey,
          day: date.toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
            weekday: "short",
          }),
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
              temp_min: Math.min(existing.main.temp_min, item.main.temp_min),
              temp_max: Math.max(existing.main.temp_max, item.main.temp_max),
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

    return dailyData;
  }, [data, language]);

  if (isLoading) {
    return (
      <div className="weather-forecast">
        <LoadingSpinner message={t("forecast.loadingForecast")} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-forecast">
        <ErrorDisplay
          title={t("forecast.forecastUnavailable")}
          message={
            error instanceof Error ? error.message : "Failed to fetch forecast"
          }
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

  return <WeatherForecast forecast={forecast} navigate={navigate} t={t} />;
};
