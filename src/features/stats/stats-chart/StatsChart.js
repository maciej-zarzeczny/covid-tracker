import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js";
import { useDispatch, useSelector } from "react-redux";

import "./StatsChart.css";
import { fetchCountryData, selectCountryData, selectCurrentCountry } from "../statsSlice";

export const StatsChart = () => {
  const dispatch = useDispatch();
  const ctx = useRef(null);

  const countryData = useSelector(selectCountryData);
  const country = useSelector(selectCurrentCountry);
  const [chart, setChart] = useState();
  const [dataType, setDataType] = useState("cases");

  // When selected country changes fetch chart data
  useEffect(() => {
    dispatch(fetchCountryData(country.Slug));
  }, [dispatch, country]);

  // When data changes create or update chart
  useEffect(() => {
    if (countryData.length === 0) return;

    let labels = [];
    let datasets = { data: [], backgroundColor: [], borderColor: [], pointBorderColor: [] };

    countryData.forEach((el) => {
      switch (dataType) {
        case "cases":
          datasets.data.push(el.Confirmed);
          datasets.backgroundColor.push("rgba(6, 141, 236, 0.1)");
          datasets.borderColor.push("rgba(6, 141, 236, 1)");
          datasets.pointBorderColor.push("rgba(0, 0, 0, 0)");
          break;

        case "deaths":
          datasets.data.push(el.Deaths);
          datasets.backgroundColor.push("rgba(208, 44, 60, 0.1)");
          datasets.borderColor.push("rgba(208, 44, 60, 1)");
          datasets.pointBorderColor.push("rgba(0, 0, 0, 0)");
          break;

        case "recovered":
          datasets.data.push(el.Recovered);
          datasets.backgroundColor.push("rgba(39, 167, 68, 0.1)");
          datasets.borderColor.push("rgba(39, 167, 68, 1)");
          datasets.pointBorderColor.push("rgba(0, 0, 0, 0)");
          break;

        default:
          break;
      }
      labels.push("");
    });

    if (chart) {
      chart.data.labels = labels;
      chart.data.datasets = [datasets];
      chart.update();
      return;
    }

    const newChart = new Chart(ctx.current, {
      type: "line",
      data: {
        labels,
        datasets: [datasets],
      },
      options: {
        responsive: true,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    setChart(newChart);
  }, [ctx, countryData, chart, dataType]);

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
        <canvas ref={ctx} className="stats-chart__canvas"></canvas>
      </div>
    </section>
  );
};
