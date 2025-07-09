import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import weatherReducer from "./slices/weatherSlice";
import uiReducer from "./slices/uiSlice";

const weatherPersistConfig = {
  key: "weather",
  storage,
  whitelist: [
    "selectedForecastDay",
    "currentWeather",
    "units",
    "currentDayHourlyData",
  ],
};

const uiPersistConfig = {
  key: "ui",
  storage,
  whitelist: ["isDarkMode", "language"],
};

const persistedWeatherReducer = persistReducer(
  weatherPersistConfig,
  weatherReducer
);
const persistedUIReducer = persistReducer(uiPersistConfig, uiReducer);

export const store = configureStore({
  reducer: {
    weather: persistedWeatherReducer,
    ui: persistedUIReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
