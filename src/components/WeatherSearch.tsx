import React, { useState } from "react";
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
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder={t("search.placeholder")}
            className="search-input"
            disabled={isLoading || isLoadingLocation}
          />
          <button
            type="submit"
            className="search-button"
            disabled={!searchQuery.trim() || isLoading || isLoadingLocation}
          >
            {isLoading ? t("search.searching") : t("search.search")}
          </button>
        </div>
      </form>
    </div>
  );
};
