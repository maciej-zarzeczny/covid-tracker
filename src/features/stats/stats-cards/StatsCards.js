import React from "react";

import "./StatsCards.css";
import { StatsCard } from "./StatsCard";

export const StatsCards = ({ stats }) => {
  return (
    <section className="stats-cards">
      <StatsCard color="warning" title="Cases" data={stats.TotalConfirmed} />

      <StatsCard color="danger" title="Deaths" data={stats.TotalDeaths} />

      <StatsCard color="success" title="Recovered" data={stats.TotalRecovered} />
    </section>
  );
};
