import React from "react";

import "./App.css";
import { Navbar } from "./app/navbar/Navbar";
import { HomePage } from "./app/home-page/HomePage";

export const App = () => {
  return (
    <div className="App">
      <Navbar />
      <HomePage />
    </div>
  );
};
