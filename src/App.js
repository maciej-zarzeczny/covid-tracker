import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import { Navbar } from "./app/navbar/Navbar";
import { HomePage } from "./app/home-page/HomePage";
import { MapPage } from "./app/map-page/MapPage";
import { ListPage } from "./app/list-page/ListPage";

export const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/map" component={MapPage} />
          <Route exact path="/list" component={ListPage} />
        </Switch>
      </div>
    </Router>
  );
};
