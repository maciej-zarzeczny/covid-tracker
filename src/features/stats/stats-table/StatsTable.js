import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import classNames from "classnames";

import "./StatsTable.css";
import { selectAllCountries } from "../statsSlice";

export const StatsTable = () => {
  const countriesData = useSelector(selectAllCountries);

  const [tableData, setTableData] = useState(countriesData);
  const [sortBy, setSortBy] = useState("cases");

  const renderedRows = tableData.map((country, idx) => (
    <tr key={idx}>
      <td>{idx + 1}</td>
      <td
        data-testid="country-cell"
        className={classNames("", {
          "stats-table__cell--bold": sortBy === "country",
        })}
      >
        {country.Country}
      </td>
      <td
        className={classNames("stats-table__cell--warning", {
          "stats-table__cell--bold": sortBy === "cases",
        })}
      >
        {country.TotalConfirmed}
      </td>
      <td
        className={classNames("stats-table__cell--warning", {
          "stats-table__cell--bold": sortBy === "new-cases",
        })}
      >
        {country.NewConfirmed}
      </td>
      <td
        className={classNames("stats-table__cell--danger", {
          "stats-table__cell--bold": sortBy === "deaths",
        })}
      >
        {country.TotalDeaths}
      </td>
      <td
        className={classNames("stats-table__cell--danger", {
          "stats-table__cell--bold": sortBy === "new-deaths",
        })}
      >
        {country.NewDeaths}
      </td>
      <td
        className={classNames("stats-table__cell--success", {
          "stats-table__cell--bold": sortBy === "recovered",
        })}
      >
        {country.TotalRecovered}
      </td>
      <td
        className={classNames("stats-table__cell--success", {
          "stats-table__cell--bold": sortBy === "new-recovered",
        })}
      >
        {country.NewRecovered}
      </td>
    </tr>
  ));

  useEffect(() => {
    switch (sortBy) {
      case "country":
        const sortedByCountry = [...countriesData].sort((a, b) => (a.Country > b.Country ? 1 : -1));
        setTableData(sortedByCountry);
        break;

      case "cases":
        const sortedByCases = [...countriesData].sort(
          (a, b) => b.TotalConfirmed - a.TotalConfirmed
        );
        setTableData(sortedByCases);
        break;

      case "new-cases":
        const sortedByNewCases = [...countriesData].sort((a, b) => b.NewConfirmed - a.NewConfirmed);
        setTableData(sortedByNewCases);
        break;

      case "deaths":
        const sortedByDeaths = [...countriesData].sort((a, b) => b.TotalDeaths - a.TotalDeaths);
        setTableData(sortedByDeaths);
        break;

      case "new-deaths":
        const sortedByNewDeaths = [...countriesData].sort((a, b) => b.NewDeaths - a.NewDeaths);
        setTableData(sortedByNewDeaths);
        break;

      case "recovered":
        const sortedByRecovered = [...countriesData].sort(
          (a, b) => b.TotalRecovered - a.TotalRecovered
        );
        setTableData(sortedByRecovered);
        break;

      case "new-recovered":
        const sortedByNewRecovered = [...countriesData].sort(
          (a, b) => b.NewRecovered - a.NewRecovered
        );
        setTableData(sortedByNewRecovered);
        break;

      default:
        break;
    }
  }, [sortBy, countriesData]);

  const handleSortedByChange = (value) => {
    setSortBy(value);
  };

  return (
    <div className="stats-table-container card card--big">
      <table className="stats-table">
        <thead>
          <tr>
            <th>Num</th>
            <th data-tip="Sort by country" onClick={() => handleSortedByChange("country")}>
              Country
            </th>
            <th data-tip="Sort by cases" onClick={() => handleSortedByChange("cases")}>
              Total cases
            </th>
            <th data-tip="Sort by new cases" onClick={() => handleSortedByChange("new-cases")}>
              New cases
            </th>
            <th data-tip="Sort by deaths" onClick={() => handleSortedByChange("deaths")}>
              Total deaths
            </th>
            <th data-tip="Sort by new deaths" onClick={() => handleSortedByChange("new-deaths")}>
              New deaths
            </th>
            <th data-tip="Sort by recovered" onClick={() => handleSortedByChange("recovered")}>
              Total recovered
            </th>
            <th
              data-tip="Sort by new recovered"
              onClick={() => handleSortedByChange("new-recovered")}
            >
              New recovered
            </th>
          </tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
      <ReactTooltip />
    </div>
  );
};
