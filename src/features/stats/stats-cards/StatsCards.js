import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./StatsCards.css";
import { StatsCard } from "./StatsCard";
import { selectAllCountries, changedCountry, selectCurrentCountry } from "../statsSlice";

export const StatsCards = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState("all");

  const countries = useSelector(selectAllCountries);
  const country = useSelector(selectCurrentCountry);

  // Handle country selection
  const handleCountryChange = (e) => {
    const { value } = e.target;

    const selectedCountry = countries.find((country) => country.Slug === value);
    dispatch(changedCountry({ country: selectedCountry }));
  };

  // Handle data type selection
  const handleStatsTypeChange = (e) => {
    setType(e.target.value);
  };

  // Render all countries as select options
  const renderedCountries = countries.map((country, idx) => (
    <option data-testid="country-option" value={country.Slug} key={idx}>
      {country.Country}
    </option>
  ));

  return (
    <section className="stats-cards">
      <header className="stats-cards__header inline-container">
        <select
          data-testid="countries-select"
          className="button"
          value={country.Slug}
          onChange={handleCountryChange}
        >
          {renderedCountries}
        </select>

        <select
          data-testid="data-type-select"
          className="button data-type"
          onChange={handleStatsTypeChange}
        >
          <option value="all">All data</option>
          <option value="daily">Daily data</option>
        </select>
      </header>

      <section className="stats-cards__content">
        <StatsCard
          color="warning"
          title="Cases"
          data={type === "all" ? country.TotalConfirmed : country.NewConfirmed}
        />

        <StatsCard
          color="danger"
          title="Deaths"
          data={type === "all" ? country.TotalDeaths : country.NewDeaths}
        />

        <StatsCard
          color="success"
          title="Recovered"
          data={type === "all" ? country.TotalRecovered : country.NewRecovered}
        />
      </section>
    </section>
  );
};
