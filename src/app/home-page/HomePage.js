import React, { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import "./HomePage.css";
import { Loader } from "../loader/Loader";
import {
  fetchGlobalData,
  selectGlobalData,
  selectAllCountries,
} from "../../features/stats/statsSlice";
import { StatsCards } from "../../features/stats/stats-cards/StatsCards";

export const HomePage = () => {
  const dispatch = useDispatch();

  const statsStatus = useSelector((state) => state.stats.status);
  const globalData = useSelector(selectGlobalData);
  const countriesData = useSelector(selectAllCountries);

  const [stats, setStats] = useState();

  // Get current date
  const currentDate = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Handle data fetching
  useEffect(() => {
    if (statsStatus === "idle") {
      dispatch(fetchGlobalData());
    }
  }, [statsStatus, dispatch]);

  useEffect(() => {
    if (globalData) setStats(globalData);
  }, [globalData]);

  // Handle country selection
  const handleChange = (e) => {
    const countryData = countriesData.find((country) => country.CountryCode === e.target.value);
    setStats(countryData);
  };

  // Render all countries as select options
  const renderedCountries =
    countriesData &&
    countriesData.map((country, idx) => (
      <option value={country.CountryCode} key={idx}>
        {country.Country}
      </option>
    ));

  if (statsStatus === "loading" || statsStatus === "idle") {
    return (
      <div data-testid="loader">
        {statsStatus === "loading" && <p className="text">Loading</p>}
        <Loader />
      </div>
    );
  }
  if (statsStatus === "failed") return "There was an error";

  return (
    <section className="home-page container">
      <header className="home-page__header">
        <div>
          <h1 className="title">Hello,</h1>
          <h2 className="subtitle">Here is your daily statistics</h2>
        </div>

        <div className="inline-container">
          <select className="button" onChange={handleChange}>
            <option value="global">Global</option>
            {renderedCountries}
          </select>

          <button className="button inline-container date">
            <p className="text">{currentDate}</p>
            <FaRegCalendarAlt className="text date__icon" />
          </button>
        </div>
      </header>

      {stats && <StatsCards stats={stats} />}
    </section>
  );
};
