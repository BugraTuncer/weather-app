import React, { useState, useCallback, useMemo } from "react";
import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { weatherApi, type DailyForecast } from "../services/weatherApi";
import {
  WeatherContext,
  type WeatherContextType,
} from "./WeatherContextInstance";

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({
  children,
}) => {
  const [queryParams, setQueryParams] = useState<{
    city: string;
    units: "metric" | "imperial";
  } | null>(null);

  const [coordsParams, setCoordsParams] = useState<{
    lat: number;
    lon: number;
    units: "metric" | "imperial";
  } | null>(null);

  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [units, setUnits] = useState<"metric" | "imperial">("metric");

  const weatherQuery = useQuery({
    queryKey: ["weather", queryParams?.city, units],
    queryFn: () => {
      if (!queryParams) {
        throw new Error("No city specified");
      }
      return weatherApi.getCurrentWeatherByCity(queryParams.city, units);
    },
    enabled: !!queryParams,
  });

  const weatherByCoordsQuery = useQuery({
    queryKey: ["weather", coordsParams?.lat, coordsParams?.lon, units],
    queryFn: () => {
      if (!coordsParams) {
        throw new Error("No coordinates specified");
      }
      return weatherApi.getCurrentWeatherByCoords(
        coordsParams.lat,
        coordsParams.lon,
        units
      );
    },
    enabled: !!coordsParams,
  });

  // Forecast queries
  const forecastByCityQuery = useQuery({
    queryKey: ["forecast", queryParams?.city, units],
    queryFn: () => {
      if (!queryParams) {
        throw new Error("No city specified");
      }
      return weatherApi.getForecastByCity(queryParams.city, units);
    },
    enabled: !!queryParams,
  });

  const forecastByCoordsQuery = useQuery({
    queryKey: ["forecast", coordsParams?.lat, coordsParams?.lon, units],
    queryFn: () => {
      if (!coordsParams) {
        throw new Error("No coordinates specified");
      }
      return weatherApi.getForecastByCoords(
        coordsParams.lat,
        coordsParams.lon,
        units
      );
    },
    enabled: !!coordsParams,
  });

  const locationQuery = useQuery({
    queryKey: ["location"],
    queryFn: (): Promise<GeolocationPosition> => {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation is not supported by this browser"));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error),
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000, // 5 minutes
          }
        );
      });
    },
    enabled: false, // Don't run automatically
    retry: false,
  });

  const fetchWeatherByCity = useCallback(
    (city: string, unitsParam?: "metric" | "imperial") => {
      const targetUnits = unitsParam || units;
      setQueryParams({ city, units: targetUnits });
      setCoordsParams(null); // Clear coords query
    },
    [units]
  );

  const fetchWeatherByLocation = useCallback(
    async (unitsParam?: "metric" | "imperial") => {
      const targetUnits = unitsParam || units;
      setIsLoadingLocation(true);
      setLocationError(null);

      try {
        const position = await locationQuery.refetch();
        if (position.data) {
          setCoordsParams({
            lat: position.data.coords.latitude,
            lon: position.data.coords.longitude,
            units: targetUnits,
          });
          setQueryParams(null);
        }
      } catch (error) {
        setLocationError(
          error instanceof Error ? error.message : "Failed to get location"
        );
      } finally {
        setIsLoadingLocation(false);
      }
    },
    [locationQuery, units]
  );

  const getCurrentLocation = useCallback(() => {
    locationQuery.refetch();
  }, [locationQuery]);

  const activeQuery = coordsParams ? weatherByCoordsQuery : weatherQuery;
  const currentWeather = activeQuery.data || null;
  const isLoading = activeQuery.isLoading;
  const error = activeQuery.error;

  const activeForecastQuery = coordsParams
    ? forecastByCoordsQuery
    : forecastByCityQuery;
  const isLoadingForecast = activeForecastQuery.isLoading;
  const forecastError = activeForecastQuery.error;

  const forecast = useMemo(() => {
    if (!activeForecastQuery.data) return null;

    const dailyData = new Map<string, DailyForecast>();

    activeForecastQuery.data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toISOString().split("T")[0];

      if (!dailyData.has(dateKey)) {
        dailyData.set(dateKey, {
          date: dateKey,
          day: date.toLocaleDateString("en-US", { weekday: "short" }),
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          weather: item.weather[0],
          humidity: item.main.humidity,
          wind_speed: item.wind.speed,
        });
      } else {
        const existing = dailyData.get(dateKey)!;
        existing.temp_min = Math.min(existing.temp_min, item.main.temp_min);
        existing.temp_max = Math.max(existing.temp_max, item.main.temp_max);
        const hour = date.getHours();
        if (hour >= 10 && hour <= 14) {
          existing.weather = item.weather[0];
        }
      }
    });

    return Array.from(dailyData.values()).slice(0, 7);
  }, [activeForecastQuery.data]);

  const contextValue: WeatherContextType = {
    currentWeather,
    isLoading,
    error,
    forecast,
    isLoadingForecast,
    forecastError,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    locationQuery,
    getCurrentLocation,
    isLoadingLocation,
    locationError,
    units,
    setUnits,
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};
