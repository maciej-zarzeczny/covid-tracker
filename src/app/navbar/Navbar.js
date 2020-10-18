import React, { useState } from "react";
import { FaChartLine, FaMapMarkedAlt, FaListUl } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import "./Navbar.css";

export const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const handleNavbarClose = () => {
    setIsActive(false);
  };

  const handleNavbarOpen = () => {
    setIsActive(true);
  };

  return (
    <>
      <nav className={classNames("navbar", { "navbar--active": isActive })} data-testid="navbar">
        <MdClose className="navbar__close title" onClick={handleNavbarClose} />
        <h1 className="title title--light navbar__logo">CovidTracker</h1>

        <div className="navbar__items">
          <NavLink
            exact
            to="/"
            className="navbar__item"
            activeClassName="navbar__item--active"
            onClick={handleNavbarClose}
          >
            <FaChartLine />
          </NavLink>

          <NavLink
            data-testid="map-page"
            to="/map"
            className="navbar__item"
            activeClassName="navbar__item--active"
            onClick={handleNavbarClose}
          >
            <FaMapMarkedAlt />
          </NavLink>

          <NavLink
            data-testid="list-page"
            to="/list"
            className="navbar__item"
            activeClassName="navbar__item--active"
            onClick={handleNavbarClose}
          >
            <FaListUl />
          </NavLink>
        </div>
      </nav>

      <div
        className={classNames("navbar-trigger", { "navbar-trigger--active": !isActive })}
        onClick={handleNavbarOpen}
      >
        <GiHamburgerMenu className="title" />
      </div>

      <div className={classNames("app-overlay", { "app-overlay--active": isActive })} />
    </>
  );
};
