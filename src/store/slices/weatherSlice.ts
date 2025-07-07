import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { WeatherData } from "../../models/weatherDto";

interface WeatherState {
  currentWeather: WeatherData | null;
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
      state.error = null;
    },
  },
});

export const {
  setCurrentWeather,
  setUnits,
  setQueryParams,
  setCoordsParams,
  clearWeatherData,
} = weatherSlice.actions;

export default weatherSlice.reducer;
