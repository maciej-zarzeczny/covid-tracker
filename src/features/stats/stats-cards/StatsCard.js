import React, { useMemo } from "react";
import { FaBriefcaseMedical } from "react-icons/fa";
import { GiDeathSkull, GiHealthNormal } from "react-icons/gi";

import { numberFormatter } from "../../../app/numberFormatter";

export const StatsCard = ({ color, title, data }) => {
  const icon = useMemo(() => {
    switch (title) {
      case "Cases":
        return <FaBriefcaseMedical className="is-warning subtitle" />;

      case "Deaths":
        return <GiDeathSkull className="is-danger subtitle" />;

      case "Recovered":
        return <GiHealthNormal className="is-success subtitle" />;

      default:
        return <FaBriefcaseMedical className="is-warning subtitle" />;
    }
  }, [title]);

  return (
    <article className="card card--big card--hover stats-card">
      <span className={`stats-card__decoration stats-card__decoration--${color}`}></span>
      <header className="stats-card__header">
        <p className="subtitle">{title}</p>
        {icon}
      </header>

      <h1 className="title title--dark">{numberFormatter(data)}</h1>
    </article>
  );
};
