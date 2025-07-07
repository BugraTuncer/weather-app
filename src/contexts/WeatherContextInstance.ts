import { createContext } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import type { WeatherData } from "../models/weatherDto";

export interface DailyForecast {
  date: string;
  day: string;
  temp_min: number;
  temp_max: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  humidity: number;
  wind_speed: number;
}

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

  units: "metric" | "imperial";
  setUnits: (units: "metric" | "imperial") => void;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(
  undefined
);
