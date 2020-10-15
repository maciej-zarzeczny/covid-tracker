import React from "react";
import { FaChartLine, FaMapMarkedAlt, FaListUl } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="title title--light navbar__logo">CovidTracker</h1>

      <div className="navbar__items">
        <NavLink exact to="/" className="navbar__item" activeClassName="navbar__item--active">
          <FaChartLine />
        </NavLink>

        <NavLink
          data-testid="map-page"
          to="/map"
          className="navbar__item"
          activeClassName="navbar__item--active"
        >
          <FaMapMarkedAlt />
        </NavLink>

        <NavLink
          data-testid="list-page"
          to="/list"
          className="navbar__item"
          activeClassName="navbar__item--active"
        >
          <FaListUl />
        </NavLink>
      </div>
    </nav>
  );
};
