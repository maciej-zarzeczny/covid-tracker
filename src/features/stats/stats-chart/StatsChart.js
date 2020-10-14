import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

import "./StatsChart.css";
import { fetchCountryData, selectCountryData, selectCurrentCountry } from "../statsSlice";

export const StatsChart = () => {
  const dispatch = useDispatch();
  const ctx = useRef(null);

  const countryData = useSelector(selectCountryData);
  const country = useSelector(selectCurrentCountry);
  const [data, setData] = useState({});
  const [dataType, setDataType] = useState("cases");

  // When selected country changes fetch chart data
  useEffect(() => {
    dispatch(fetchCountryData(country.Slug));
  }, [dispatch, country]);

  // When data changes create or update chart
  useEffect(() => {
    if (countryData.length === 0) return;

    let labels = [];
    let datasets = {
      backgroundColor: "",
      borderColor: "",
      pointBorderColor: "rgba(0, 0, 0, 0)",
      data: [],
    };

    switch (dataType) {
      case "cases":
        datasets.backgroundColor = "rgba(6, 141, 236, 0.1)";
        datasets.borderColor = "rgba(6, 141, 236, 1)";

        countryData.forEach((el) => {
          labels.push("");
          datasets.data.push(el.Confirmed);
        });
        break;

      case "deaths":
        datasets.backgroundColor = "rgba(208, 44, 60, 0.1)";
        datasets.borderColor = "rgba(208, 44, 60, 1)";

        countryData.forEach((el) => {
          labels.push("");
          datasets.data.push(el.Deaths);
        });
        break;

      case "recovered":
        datasets.backgroundColor = "rgba(39, 167, 68, 0.1)";
        datasets.borderColor = "rgba(39, 167, 68, 1)";

        countryData.forEach((el) => {
          labels.push("");
          datasets.data.push(el.Recovered);
        });
        break;

      default:
        break;
    }

    setData({ labels, datasets: [datasets] });
  }, [ctx, countryData, dataType]);

  const handleDataTypeChange = (e) => {
    setDataType(e.target.value);
  };

  return (
    <section className="stats-chart">
      <header className="stats-chart__header inline-container">
        <p className="subtitle">
          <span className="stats-chart__data-type">{dataType}</span> chart for {country.Country}
        </p>

        <select className="button" onChange={handleDataTypeChange}>
          <option value="cases">Cases</option>
          <option value="deaths">Deaths</option>
          <option value="recovered">Recovered</option>
        </select>
      </header>

      <div className="card card--big">
        <Line data={data} options={{ legend: { display: false } }} />
      </div>
    </section>
  );
};
