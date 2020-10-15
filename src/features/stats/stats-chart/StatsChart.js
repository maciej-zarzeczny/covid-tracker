import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import "./StatsChart.css";
import { fetchCountryData, selectCountryData, selectCurrentCountry } from "../statsSlice";

export const StatsChart = () => {
  const dispatch = useDispatch();
  const ctx = useRef(null);

  const countryData = useSelector(selectCountryData);
  const country = useSelector(selectCurrentCountry);
  const [data, setData] = useState({});
  const [dataType, setDataType] = useState("cases");
  const [timePeriod, setTimePeriod] = useState("all");

  // When selected country changes fetch chart data
  useEffect(() => {
    dispatch(fetchCountryData(country.Slug));
  }, [dispatch, country]);

  // When data changes create or update chart
  useEffect(() => {
    if (countryData.length === 0) return;

    let dataToShow = [];

    switch (timePeriod) {
      case "all":
        dataToShow = [...countryData];
        break;

      case "month":
        dataToShow = countryData.slice(Math.max(countryData.length - 30, 0));
        break;

      case "week":
        dataToShow = countryData.slice(Math.max(countryData.length - 7, 0));
        break;

      default:
        break;
    }

    let labels = [];
    let datasets = {
      backgroundColor: "",
      borderColor: "",
      pointBorderColor: "rgba(0, 0, 0, 0)",
      pointHoverRadius: 10,
      data: [],
    };

    switch (dataType) {
      case "cases":
        datasets.backgroundColor = "rgba(255, 192, 5, 0.1)";
        datasets.borderColor = "rgba(255, 192, 5, 1";
        datasets.pointHoverBackgroundColor = "rgba(255, 192, 5, 1";

        dataToShow.forEach((el) => {
          labels.push(moment(el.Date));
          datasets.data.push(el.Confirmed);
        });
        break;

      case "deaths":
        datasets.backgroundColor = "rgba(208, 44, 60, 0.1)";
        datasets.borderColor = "rgba(208, 44, 60, 1)";
        datasets.pointHoverBackgroundColor = "rgba(208, 44, 60, 1)";

        dataToShow.forEach((el) => {
          labels.push(moment(el.Date));
          datasets.data.push(el.Deaths);
        });
        break;

      case "recovered":
        datasets.backgroundColor = "rgba(39, 167, 68, 0.1)";
        datasets.borderColor = "rgba(39, 167, 68, 1)";
        datasets.pointHoverBackgroundColor = "rgba(39, 167, 68, 1)";

        dataToShow.forEach((el) => {
          labels.push(moment(el.Date));
          datasets.data.push(el.Recovered);
        });
        break;

      default:
        break;
    }

    setData({ labels, datasets: [datasets] });
  }, [ctx, countryData, dataType, timePeriod]);

  const handleDataTypeChange = (e) => {
    setDataType(e.target.value);
  };

  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };

  return (
    <section className="stats-chart">
      <header className="stats-chart__header inline-container">
        <p className="subtitle">
          <span className="stats-chart__data-type">{dataType}</span> chart for {country.Country}
        </p>

        <div className="inline-container">
          <select className="button" onChange={handleTimePeriodChange}>
            <option value="all">From the beginning </option>
            <option value="month">Last 30 days</option>
            <option value="week">Last 7 days</option>
          </select>

          <select className="button" onChange={handleDataTypeChange}>
            <option value="cases">Cases</option>
            <option value="deaths">Deaths</option>
            <option value="recovered">Recovered</option>
          </select>
        </div>
      </header>

      <div className="card card--big stats-chart__canvas">
        <Line
          data={data}
          options={{
            legend: { display: false },
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              xAxes: [
                {
                  type: "time",
                  time: {
                    unit: timePeriod === "all" ? "month" : "day",
                  },
                },
              ],
            },
          }}
        />
      </div>
    </section>
  );
};
