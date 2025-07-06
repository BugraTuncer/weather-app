import React from "react";
import { WeatherDisplay } from "../components/WeatherDisplay";
import { WeatherForecast } from "../components/WeatherForecast";
import "../styles/HomePage.css";

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="home-container">
        <WeatherDisplay />
        <WeatherForecast />
      </div>
    </div>
  );
};
