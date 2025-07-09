import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../hooks/useI18n";
import { WeatherCard } from "../components/WeatherCard";
import "../styles/WeatherDetailPage.css";
import { useAppSelector } from "../store/hooks";
import { motion } from "framer-motion";

export const WeatherDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedForecastDay, currentWeather, units } = useAppSelector(
    (state) => state.weather
  );

  const { t } = useI18n();

  const handleBackClick = () => {
    navigate(-1);
  };

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
      className="weather-detail-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <div className="detail-header">
        <button className="back-button" onClick={handleBackClick}>
          ← {t("detail.back")}
        </button>
      </div>

      {selectedForecastDay ? (
        <WeatherCard
          weather={selectedForecastDay}
          showRefreshButton={false}
          showLocation={true}
          showDetails={true}
          currentWeather={currentWeather ?? undefined}
          unit={units}
        />
      ) : (
        <div className="no-data">
          <p>{t("detail.noData")}</p>
        </div>
      )}
    </motion.div>
  );
};
