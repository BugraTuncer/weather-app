import type { WeatherData } from "../services/weatherApi";

export const getWeatherIcon = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°C`;
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
  // Since we don't have wind direction data in the current forecast structure,
  // we'll return a generic direction indicator
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
