import React from "react";
import { ImEarth } from "react-icons/im";

import "./GlobalData.css";
import { numberFormatter } from "../../../app/numberFormatter";
import { DangerCountry } from "./DangerCountry";

export const GlobalData = ({ data }) => {
  return (
    <section className="global-data">
      <article className="global-card card card--big card--hover">
        <header className="global-card__header global-card__header--info">
          <p className="subtitle header__title">Worldwide</p>
          <ImEarth className="subtitle" />
        </header>

        <div className="global-card__info">
          <p className="subtitle">Total cases</p>
          <p className="subtitle is-warning">{numberFormatter(data.TotalConfirmed)}</p>
        </div>

        <div className="global-card__info">
          <p className="subtitle">Total deaths</p>
          <p className="subtitle is-danger">{numberFormatter(data.TotalDeaths)}</p>
        </div>

        <div className="global-card__info">
          <p className="subtitle">Total recovered</p>
          <p className="subtitle is-success">{numberFormatter(data.TotalRecovered)}</p>
        </div>

        <div className="separator" />

        <div className="global-card__info">
          <p className="subtitle">New cases</p>
          <p className="subtitle is-warning">{numberFormatter(data.NewConfirmed)}</p>
        </div>

        <div className="global-card__info">
          <p className="subtitle">New deaths</p>
          <p className="subtitle is-danger">{numberFormatter(data.NewDeaths)}</p>
        </div>

        <div className="global-card__info">
          <p className="subtitle">New recovered</p>
          <p className="subtitle is-success">{numberFormatter(data.NewRecovered)}</p>
        </div>
      </article>

      <DangerCountry />
    </section>
  );
};
