import React from "react";
import { useSelector } from "react-redux";

import "./ListPage.css";
import { StatsTable } from "../../features/stats/stats-table/StatsTable";

export const ListPage = () => {
  const error = useSelector((state) => state.stats.error);

  return (
    <section className="list-page container">
      {error ? (
        <div className="error">
          <p className="subtitle is-danger">There was an error: {error}</p>
        </div>
      ) : (
        <>
          <header className="list-page__header">
            <h1 className="title">Hello,</h1>
            <h2 className="subtitle">Here is the list of all data</h2>
          </header>

          <StatsTable />
        </>
      )}
    </section>
  );
};
