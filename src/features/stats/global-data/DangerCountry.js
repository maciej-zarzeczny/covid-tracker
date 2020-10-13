import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IoIosWarning } from "react-icons/io";

import "./GlobalData.css";
import { numberFormatter } from "../../../app/numberFormatter";
import { selectAllCountries } from "../statsSlice";

export const DangerCountry = () => {
  const countries = useSelector(selectAllCountries);
  const [dangerCountry, setDangerCountry] = useState({});

  // Find country with the most cases
  useEffect(() => {
    if (countries.length === 0) return;

    let maxCases = 0;
    let tempCountry = {};
    countries.forEach((country) => {
      if (country.NewConfirmed > maxCases) {
        maxCases = country.NewConfirmed;
        tempCountry = country;
      }
    });

    setDangerCountry(tempCountry);
  }, [countries]);

  return (
    <article className="global-card card card--big card--hover">
      <header className="global-card__header global-card__header--danger">
        <p className="subtitle header__title">{dangerCountry.Country} (most new cases)</p>
        <IoIosWarning className="subtitle" />
      </header>

      <div className="global-card__info">
        <p className="subtitle">Total cases</p>
        <p className="subtitle is-warning">{numberFormatter(dangerCountry.TotalConfirmed)}</p>
      </div>

      <div className="global-card__info">
        <p className="subtitle">Total deaths</p>
        <p className="subtitle is-danger">{numberFormatter(dangerCountry.TotalDeaths)}</p>
      </div>

      <div className="global-card__info">
        <p className="subtitle">Total recovered</p>
        <p className="subtitle is-success">{numberFormatter(dangerCountry.TotalRecovered)}</p>
      </div>

      <div className="separator" />

      <div className="global-card__info">
        <p className="subtitle">New cases</p>
        <p className="subtitle is-warning">{numberFormatter(dangerCountry.NewConfirmed)}</p>
      </div>

      <div className="global-card__info">
        <p className="subtitle">New deaths</p>
        <p className="subtitle is-danger">{numberFormatter(dangerCountry.NewDeaths)}</p>
      </div>

      <div className="global-card__info">
        <p className="subtitle">New recovered</p>
        <p className="subtitle is-success">{numberFormatter(dangerCountry.NewRecovered)}</p>
      </div>
    </article>
  );
};
