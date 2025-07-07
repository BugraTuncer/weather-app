import React from "react";

import "../styles/HomePage.css";
import { WeatherContainer } from "../containers/WeatherContainer";
import { WeatherForecastContainer } from "../containers/WeatherForecastContainer";

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="home-container">
        <WeatherContainer />
        <WeatherForecastContainer />
      </div>
    </div>
  );
};
