import axios from "axios";

const WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_API_BASE_URL =
  "https://api.openweathermap.org/data/2.5/forecast";

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

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

export class WeatherApiService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getCurrentWeatherByCity(
    city: string,
    units: "metric" | "imperial" = "metric"
  ): Promise<WeatherData> {
    try {
      const response = await axios.get<WeatherData>(WEATHER_API_BASE_URL, {
        params: {
          q: city,
          appid: this.apiKey,
          units: units,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch weather data for ${city}: ${error}`);
    }
  }

  async getCurrentWeatherById(
    cityId: number,
    units: "metric" | "imperial" = "metric"
  ): Promise<WeatherData> {
    try {
      const response = await axios.get<WeatherData>(WEATHER_API_BASE_URL, {
        params: {
          id: cityId,
          appid: this.apiKey,
          units: units,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch weather data for city ID ${cityId}: ${error}`
      );
    }
  }

  async getCurrentWeatherByCoords(
    lat: number,
    lon: number,
    units: "metric" | "imperial" = "metric"
  ): Promise<WeatherData> {
    try {
      const response = await axios.get<WeatherData>(WEATHER_API_BASE_URL, {
        params: {
          lat: lat,
          lon: lon,
          appid: this.apiKey,
          units: units,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch weather data for coordinates (${lat}, ${lon}): ${error}`
      );
    }
  }

  async getForecastByCity(
    city: string,
    units: "metric" | "imperial" = "metric"
  ): Promise<ForecastData> {
    try {
      const response = await axios.get<ForecastData>(FORECAST_API_BASE_URL, {
        params: {
          q: city,
          appid: this.apiKey,
          units: units,
          cnt: 40,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch forecast data for ${city}: ${error}`);
    }
  }

  async getForecastByCoords(
    lat: number,
    lon: number,
    units: "metric" | "imperial" = "metric"
  ): Promise<ForecastData> {
    try {
      const response = await axios.get<ForecastData>(FORECAST_API_BASE_URL, {
        params: {
          lat: lat,
          lon: lon,
          appid: this.apiKey,
          units: units,
          cnt: 40,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch forecast data for coordinates (${lat}, ${lon}): ${error}`
      );
    }
  }
}

export const weatherApi = new WeatherApiService(
  import.meta.env.VITE_OPENWEATHER_API_KEY || ""
);
