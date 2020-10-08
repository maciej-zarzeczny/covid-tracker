import React, { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import "./HomePage.css";
import { Loader } from "../loader/Loader";
import { fetchGlobalData } from "../../features/stats/statsSlice";
import { fetchAllCountries, selectAllCountries } from "../../features/countries/countriesSlice";
import { StatsCards } from "../../features/stats/stats-cards/StatsCards";

export const HomePage = () => {
  const dispatch = useDispatch();

  const statsStatus = useSelector((state) => state.stats.status);
  const stats = useSelector((state) => state.stats.data);

  const countriesStatus = useSelector((state) => state.countries.status);
  const countries = useSelector(selectAllCountries);

  // Get current date
  const currentDate = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [country, setCountry] = useState("");

  // Handle data fetching
  useEffect(() => {
    if (statsStatus === "idle") {
      dispatch(fetchGlobalData());
    }

    if (countriesStatus === "idle") {
      dispatch(fetchAllCountries());
    }
  }, [statsStatus, countriesStatus, dispatch]);

  // Handle country selection
  const handleChange = (e) => {
    setCountry(e.target.value);
  };

  // Render all countries as select options
  const renderedCountries = countries.map((country, idx) => (
    <option value={country.ISO2} key={idx}>
      {country.Country}
    </option>
  ));

  if (statsStatus === "loading" || countriesStatus === "loading")
    return (
      <div data-testid="loader">
        {statsStatus === "loading" && <p className="text">Loading</p>}
        <Loader />
      </div>
    );
  if (statsStatus === "failed" || countriesStatus === "failed") return "There was an error";

  return (
    <section className="home-page container">
      <header className="home-page__header">
        <div>
          <h1 className="title">Hello,</h1>
          <h2 className="subtitle">Here is your daily statistics</h2>
        </div>

        <div className="inline-container">
          <select className="button" onChange={handleChange}>
            {renderedCountries}
          </select>

          <button className="button inline-container date">
            <p className="text">{currentDate}</p>
            <FaRegCalendarAlt className="text date__icon" />
          </button>
        </div>
      </header>

      <StatsCards stats={stats} />
    </section>
  );
};
