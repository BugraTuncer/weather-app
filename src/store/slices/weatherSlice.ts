import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { WeatherData } from "../../models/weatherDto";

interface SavedWeather {
  weather: WeatherData;
  forecast: WeatherData[] | null;
  todayHourlyForecast: WeatherData[] | null;
}

interface WeatherState {
  currentWeather: WeatherData | null;
  selectedForecastDay: WeatherData | null;
  currentDayHourlyData: WeatherData[] | null;
  savedWeathers: SavedWeather[] | null;
  isLoading: boolean;
  error: string | null;
  units: "metric" | "imperial";
  queryParams: {
    city: string;
    units: "metric" | "imperial";
  } | null;
  coordsParams: {
    lat: number;
    lon: number;
    units: "metric" | "imperial";
  } | null;
  isLoadingLocation: boolean;
  locationError: string | null;
}

const initialState: WeatherState = {
  currentWeather: null,
  selectedForecastDay: null,
  currentDayHourlyData: null,
  savedWeathers: null,
  isLoading: false,
  error: null,
  units: "metric",
  queryParams: null,
  coordsParams: null,
  isLoadingLocation: false,
  locationError: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCurrentWeather: (state, action: PayloadAction<WeatherData | null>) => {
      state.currentWeather = action.payload;
    },

    setSelectedForecastDay: (
      state,
      action: PayloadAction<WeatherData | null>
    ) => {
      state.selectedForecastDay = action.payload;
    },

    setCurrentDayHourlyData: (
      state,
      action: PayloadAction<WeatherData[] | null>
    ) => {
      state.currentDayHourlyData = action.payload;
    },

    setSavedWeathers: (state, action: PayloadAction<SavedWeather[] | null>) => {
      state.savedWeathers = action.payload;
    },

    addSavedWeather: (state, action: PayloadAction<SavedWeather>) => {
      const currentSaved = state.savedWeathers || [];
      const isAlreadySaved = currentSaved.some(
        (saved) => saved.weather.id === action.payload.weather.id
      );

      if (!isAlreadySaved) {
        state.savedWeathers = [...currentSaved, action.payload];
      }
    },

    removeSavedWeather: (state, action: PayloadAction<number>) => {
      if (state.savedWeathers) {
        state.savedWeathers = state.savedWeathers.filter(
          (saved) => saved.weather.id !== action.payload
        );
      }
    },

    updateSavedWeatherForecast: (
      state,
      action: PayloadAction<{ weatherId: number; forecast: WeatherData[] }>
    ) => {
      if (state.savedWeathers) {
        const index = state.savedWeathers.findIndex(
          (saved) => saved.weather.id === action.payload.weatherId
        );

        if (index !== -1) {
          state.savedWeathers[index].forecast = action.payload.forecast;
        }
      }
    },

    setUnits: (state, action: PayloadAction<"metric" | "imperial">) => {
      state.units = action.payload;
    },
    setQueryParams: (
      state,
      action: PayloadAction<{
        city: string;
        units: "metric" | "imperial";
      } | null>
    ) => {
      state.queryParams = action.payload;
      if (action.payload) {
        state.coordsParams = null;
      }
    },
    setCoordsParams: (
      state,
      action: PayloadAction<{
        lat: number;
        lon: number;
        units: "metric" | "imperial";
      } | null>
    ) => {
      state.coordsParams = action.payload;
      if (action.payload) {
        state.queryParams = null;
      }
    },

    clearWeatherData: (state) => {
      state.currentWeather = null;
      state.selectedForecastDay = null;
      state.error = null;
    },
  },
});

export const {
  setCurrentWeather,
  setSelectedForecastDay,
  setCurrentDayHourlyData,
  setUnits,
  setQueryParams,
  setCoordsParams,
  clearWeatherData,
  setSavedWeathers,
  addSavedWeather,
  removeSavedWeather,
  updateSavedWeatherForecast,
} = weatherSlice.actions;

export default weatherSlice.reducer;
