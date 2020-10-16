import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";

import "./StatsTable.css";
import { selectAllCountries } from "../statsSlice";

export const StatsTable = () => {
  const countriesData = useSelector(selectAllCountries);

  const [tableData, setTableData] = useState(countriesData);
  const [sortBy, setSortBy] = useState("cases");

  const renderedRows = tableData.map((country, idx) => (
    <tr key={idx}>
      <td>{idx + 1}</td>
      <td>{country.Country}</td>
      <td className="stats-table__cell--warning">{country.TotalConfirmed}</td>
      <td className="stats-table__cell--danger">{country.TotalDeaths}</td>
      <td className="stats-table__cell--success">{country.TotalRecovered}</td>
    </tr>
  ));

  useMemo(() => {
    switch (sortBy) {
      case "cases":
        let sortedByCases = [...countriesData].sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
        setTableData(sortedByCases);
        break;

      case "deaths":
        let sortedByDeaths = [...countriesData].sort((a, b) => b.TotalDeaths - a.TotalDeaths);
        setTableData(sortedByDeaths);
        break;

      case "recovered":
        let sortedByRecovered = [...countriesData].sort(
          (a, b) => b.TotalRecovered - a.TotalRecovered
        );
        setTableData(sortedByRecovered);
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
            <th>Country</th>
            <th
              className="stats-table__cell--warning"
              onClick={() => handleSortedByChange("cases")}
            >
              Total cases
            </th>
            <th
              className="stats-table__cell--danger"
              onClick={() => handleSortedByChange("deaths")}
            >
              Total deaths
            </th>
            <th
              className="stats-table__cell--success"
              onClick={() => handleSortedByChange("recovered")}
            >
              Total recovered
            </th>
          </tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  );
};
