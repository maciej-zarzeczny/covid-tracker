import React, { useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import "./HomePage.css";
import { Loader } from "../loader/Loader";
import { fetchGlobalData, selectGlobalData } from "../../features/stats/statsSlice";
import { StatsCards } from "../../features/stats/stats-cards/StatsCards";
import { GlobalData } from "../../features/stats/global-data/GlobalData";
import { StatsChart } from "../../features/stats/stats-chart/StatsChart";

export const HomePage = () => {
  const dispatch = useDispatch();

  const statsStatus = useSelector((state) => state.stats.status);
  const globalData = useSelector(selectGlobalData);
  const error = useSelector((state) => state.stats.error);

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

  if (statsStatus === "loading" || statsStatus === "idle") {
    return (
      <div data-testid="loader">
        <Loader fullPage={true} />
      </div>
    );
  }

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
