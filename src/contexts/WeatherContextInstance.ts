import { createContext } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import type { WeatherData, DailyForecast } from "../services/weatherApi";

export interface WeatherContextType {
  currentWeather: WeatherData | null;
  isLoading: boolean;
  error: Error | null;

  forecast: DailyForecast[] | null;
  isLoadingForecast: boolean;
  forecastError: Error | null;

  fetchWeatherByCity: (city: string, units?: "metric" | "imperial") => void;
  fetchWeatherByLocation: (units?: "metric" | "imperial") => Promise<void>;

  locationQuery: UseQueryResult<GeolocationPosition, Error>;
  getCurrentLocation: () => void;
  isLoadingLocation: boolean;
  locationError: string | null;

  // Units
  units: "metric" | "imperial";
  setUnits: (units: "metric" | "imperial") => void;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(
  undefined
);
