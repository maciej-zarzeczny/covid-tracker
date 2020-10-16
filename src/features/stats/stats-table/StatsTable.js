import React from "react";

import "./StatsTable.css";

export const StatsTable = () => {
  return (
    <table className="stats-table">
      <thead>
        <tr>
          <th>Num</th>
          <th>Country</th>
          <th>Total cases</th>
          <th>Total deaths</th>
          <th>Total recovered</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>United States of America</td>
          <td>1000</td>
          <td>500</td>
          <td>700</td>
        </tr>
      </tbody>
    </table>
  );
};
