import React from "react";
import { WeatherDisplay } from "../components/WeatherDisplay";
import { WeatherForecast } from "../components/WeatherForecast";
import { WeatherSearch } from "../components/WeatherSearch";
import "../styles/HomePage.css";

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="home-container">
        <WeatherSearch />
        <WeatherDisplay />
        <WeatherForecast />
      </div>
    </div>
  );
};
