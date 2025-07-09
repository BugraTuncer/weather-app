import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/HomePage.css";
import { WeatherSearch } from "../components/WeatherSearch";
import { SavedWeathersList } from "../components/SavedWeathersList";
import { WeatherContainer } from "../containers/WeatherContainer";
import { WeatherForecastContainer } from "../containers/WeatherForecastContainer";

export const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="home-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div initial="initial" animate="animate">
        <WeatherSearch />
      </motion.div>

      <div className="home-container">
        <div className="saved-weathers-column">
          <SavedWeathersList />
        </div>
        <div className="weather-column">
          <WeatherContainer />
        </div>
        <div className="forecast-column">
          <WeatherForecastContainer />
        </div>
      </div>
    </motion.div>
  );
};
