import React from "react";
import { FaChartLine, FaMapMarkedAlt, FaListUl } from "react-icons/fa";

import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="title title--light navbar__logo">CovidTracker</h1>

      <div className="navbar__items">
        <a href="#!">
          <FaChartLine className="navbar__item navbar__item--active" />
        </a>

        <a href="#!">
          <FaMapMarkedAlt className="navbar__item" />
        </a>

        <a href="#!">
          <FaListUl className="navbar__item" />
        </a>
      </div>
    </nav>
  );
};
