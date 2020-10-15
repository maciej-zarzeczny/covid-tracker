import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";

import "./MapPage.css";
import { Loader } from "../loader/Loader";
import { fetchGlobalData, selectAllCountries } from "../../features/stats/statsSlice";

export const MapPage = () => {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState([]);
  const [dataType, setDataType] = useState("cases");
  const [colors, setColors] = useState(["#FFF9EC", "#ffc005"]);

  const status = useSelector((state) => state.stats.status);
  const error = useSelector((state) => state.stats.error);
  const countriesData = useSelector(selectAllCountries);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchGlobalData());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (countriesData) {
      let data = [["Country", "Cases"]];

      switch (dataType) {
        case "cases":
          countriesData.forEach((country) => {
            data.push([country.CountryCode, country.TotalConfirmed]);
          });

          setColors(["#FFF9EC", "#ffc005"]);
          break;

        case "deaths":
          countriesData.forEach((country) => {
            data.push([country.CountryCode, country.TotalDeaths]);
          });

          setColors(["#FBECED", "#D02E3D"]);
          break;

        case "recovered":
          countriesData.forEach((country) => {
            data.push([country.CountryCode, country.TotalRecovered]);
          });

          setColors(["#EDF7EE", "#27A744"]);
          break;

        default:
          break;
      }

      setChartData(data);
    }
  }, [countriesData, dataType]);

  const handleDataTypeChange = (e) => {
    setDataType(e.target.value);
  };

  if (status === "idle" || status === "loading") {
    return (
      <div data-testid="loader">
        <Loader fullPage={true} />
      </div>
    );
  }

  return (
    <section className="map-page container">
      {error ? (
        <div className="error error--map">
          <p className="subtitle is-danger">There was an error: {error}</p>
        </div>
      ) : (
        <>
          <header className="map-page__header">
            <h1 className="title">Hello,</h1>
            <h2 className="subtitle">Here is the statistics on the map</h2>
          </header>

          <div className="map-page__button">
            <select
              data-testid="countries-select"
              className="button"
              onChange={handleDataTypeChange}
            >
              <option value="cases">Cases</option>
              <option value="deaths">Deaths</option>
              <option value="recovered">Recovered</option>
            </select>
          </div>

          <div className="map-page__map card card--big">
            <Chart
              width={"100%"}
              height={"100%"}
              chartType="GeoChart"
              loader={<p className="subtitle map__loading-text">Loading map...</p>}
              data={chartData}
              options={{
                colorAxis: { colors: colors },
              }}
              mapsApiKey="AIzaSyDP-ETqkV7JO8KPfEl89q22cdg1z3jV01c"
              rootProps={{ "data-testid": "1" }}
            />
          </div>
        </>
      )}
    </section>
  );
};
