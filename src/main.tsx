import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/index.css";
import App from "./App.tsx";
import { WeatherProvider } from "./contexts/WeatherContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </QueryClientProvider>
  </StrictMode>
);
