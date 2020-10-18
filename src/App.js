import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import { Loader } from "./app/loader/Loader";
import { fetchGlobalData } from "./features/stats/statsSlice";
import { Navbar } from "./app/navbar/Navbar";
import { HomePage } from "./app/home-page/HomePage";
import { MapPage } from "./app/map-page/MapPage";
import { ListPage } from "./app/list-page/ListPage";

export const App = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.stats.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchGlobalData());
    }
  }, [dispatch, status]);

  if (status === "idle" || status === "loading") {
    return (
      <div data-testid="loader">
        <Loader fullPage={true} />
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <section className="App__navbar">
          <Navbar />
        </section>

        <section className="App__content">
          <Switch>
            <Route exact path="/covid-tracker" component={HomePage} />
            <Route exact path="/covid-tracker/map" component={MapPage} />
            <Route exact path="/covid-tracker/list" component={ListPage} />
          </Switch>
        </section>
      </div>
    </Router>
  );
};
