import axios from "axios";
import type { ForecastData, WeatherData } from "../models/weatherDto";

const WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_API_BASE_URL =
  "https://api.openweathermap.org/data/2.5/forecast";

export class WeatherApiService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getCurrentWeatherByCity(
    city: string,
    units: "metric" | "imperial" = "metric",
    lang: "en" | "es" = "en"
  ): Promise<WeatherData> {
    try {
      const response = await axios.get<WeatherData>(WEATHER_API_BASE_URL, {
        params: {
          q: city,
          appid: this.apiKey,
          units: units,
          lang: lang,
        },
      });
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw new Error(`Failed to fetch weather data for ${city}`);
    }
  }

  async getCurrentWeatherByCoords(
    lat: number,
    lon: number,
    units: "metric" | "imperial" = "metric",
    lang: "en" | "es" = "en"
  ): Promise<WeatherData> {
    try {
      const response = await axios.get<WeatherData>(WEATHER_API_BASE_URL, {
        params: {
          lat: lat,
          lon: lon,
          appid: this.apiKey,
          units: units,
          lang: lang,
        },
      });
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw new Error(
        `Failed to fetch weather data for coordinates (${lat}, ${lon})`
      );
    }
  }

  async getForecastByCity(
    city: string,
    units: "metric" | "imperial" = "metric",
    lang: "en" | "es" = "en"
  ): Promise<ForecastData> {
    try {
      const response = await axios.get<ForecastData>(FORECAST_API_BASE_URL, {
        params: {
          q: city,
          appid: this.apiKey,
          units: units,
          cnt: 40,
          lang: lang,
        },
      });
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw new Error(`Failed to fetch forecast data for ${city}`);
    }
  }

  async getForecastByCoords(
    lat: number,
    lon: number,
    units: "metric" | "imperial" = "metric",
    lang: "en" | "es" = "en"
  ): Promise<ForecastData> {
    try {
      const response = await axios.get<ForecastData>(FORECAST_API_BASE_URL, {
        params: {
          lat: lat,
          lon: lon,
          appid: this.apiKey,
          units: units,
          cnt: 40,
          lang: lang,
        },
      });
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw new Error(
        `Failed to fetch forecast data for coordinates (${lat}, ${lon})`
      );
    }
  }
}

export const weatherApi = new WeatherApiService(
  import.meta.env.VITE_OPENWEATHER_API_KEY || ""
);
