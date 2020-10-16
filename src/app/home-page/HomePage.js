import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

import "./HomePage.css";
import { selectGlobalData } from "../../features/stats/statsSlice";
import { StatsCards } from "../../features/stats/stats-cards/StatsCards";
import { GlobalData } from "../../features/stats/global-data/GlobalData";
import { StatsChart } from "../../features/stats/stats-chart/StatsChart";

export const HomePage = () => {
  const globalData = useSelector(selectGlobalData);
  const error = useSelector((state) => state.stats.error);

  // Get current date
  const currentDate = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="home-page container">
      {error ? (
        <div className="error">
          <p className="subtitle is-danger">There was an error: {error}</p>
        </div>
      ) : (
        <>
          <header className="home-page__header">
            <div>
              <h1 className="title">Hello,</h1>
              <h2 className="subtitle">Here is your daily statistics</h2>
            </div>

            <div className="card card--small inline-container">
              <p className="text">{currentDate}</p>
              <FaRegCalendarAlt className="text" />
            </div>
          </header>

          <StatsCards />
          <GlobalData data={globalData} />
          <StatsChart />
        </>
      )}
    </section>
  );
};
