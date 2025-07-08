import React, { useEffect } from "react";

import "../styles/HomePage.css";
import { WeatherContainer } from "../containers/WeatherContainer";
import { WeatherForecastContainer } from "../containers/WeatherForecastContainer";

export const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-page">
      <div className="home-container">
        <WeatherContainer />
        <WeatherForecastContainer />
      </div>
    </div>
  );
};
