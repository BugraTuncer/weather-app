import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useI18n } from "../hooks/useI18n";
import { setQueryParams } from "../store/slices/weatherSlice";
import "../styles/WeatherSearch.css";

export const WeatherSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const { isLoading, isLoadingLocation, units } = useAppSelector(
    (state) => state.weather
  );
  const { t } = useI18n();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(setQueryParams({ city: searchQuery.trim(), units }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="weather-search">
      <form onSubmit={handleSearch}>
        <motion.div
          className="search-input-container"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder={t("search.placeholder")}
            className="search-input"
            disabled={isLoading || isLoadingLocation}
            whileFocus={{
              scale: 1.02,
              boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)",
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.button
            type="submit"
            className="search-button"
            disabled={!searchQuery.trim() || isLoading || isLoadingLocation}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#3b82f6",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {isLoading ? t("search.searching") : t("search.search")}
          </motion.button>
        </motion.div>
      </form>
    </div>
  );
};
