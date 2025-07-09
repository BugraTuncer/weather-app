import type { WeatherData } from "../models/weatherDto";

export const getWeatherIcon = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const formatTemperature = (temp: number, unit: string): string => {
  if (unit === "metric") {
    return `${Math.round(temp)}°C`;
  } else {
    return `${Math.round(temp)}°F`;
  }
};

export const getWeatherDescription = (weather: WeatherData): string => {
  if (!weather || !weather.weather || weather.weather.length === 0) {
    return "Unknown";
  }
  return weather.weather[0].description;
};

export const formatWindSpeed = (speed: number): string => {
  return `${speed} m/s`;
};

export const getWindDirection = (): string => {
  return "↗";
};

export const formatVisibility = (visibility: number): string => {
  return `${visibility / 1000} km`;
};

export const formatPressure = (pressure: number): string => {
  return `${pressure} hPa`;
};

export const formatHumidity = (humidity: number): string => {
  return `${humidity}%`;
};
