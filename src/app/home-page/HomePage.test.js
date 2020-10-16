import React from "react";
import { render, screen, wait, fireEvent } from "../../testUtils";

import { HomePage } from "./HomePage";
import { numberFormatter } from "../numberFormatter";
import { globalData, countriesData, dayOneDataGermany } from "../../testsMockData";

// Line chart mock
jest.mock("react-chartjs-2", () => ({
  Line: () => null,
}));

const initialState = {
  stats: {
    status: "succeeded",
    error: null,
    countryDataStatus: "succeeded",
    currentCountry: countriesData[0],
    data: { Global: globalData, Countries: countriesData },
    countryData: dayOneDataGermany,
  },
};

const initialErrorState = {
  stats: {
    status: "failed",
    error: "Server error 500",
    countryDataStatus: "failed",
    currentCountry: {},
    data: {},
    countryData: [],
  },
};

describe("Home Page", () => {
  it("Should display all data on successful fetch", () => {
    render(<HomePage />, {
      initialState: initialState,
    });

    expect(screen.getByText(/Hello,/i)).toBeInTheDocument();
    expect(screen.getByText(/Here is your daily statistics/i)).toBeInTheDocument();

    // Check if countries selection is displayed
    const conutryOptions = screen.getAllByTestId("country-option");
    expect(conutryOptions).toHaveLength(2);
    expect(conutryOptions[0].value).toBe("germany");
    expect(conutryOptions[1].value).toBe("poland");

    // Check if country data are displayed
    expect(screen.getByText(/85.7k/i)).toBeInTheDocument();
    expect(screen.getByText(/22.3k/i)).toBeInTheDocument();
    expect(screen.getByText(/65.6k/i)).toBeInTheDocument();

    // Check if global data are displayed
    Object.values(globalData).forEach((data) => {
      expect(screen.getByText(`${numberFormatter(data)}`)).toBeInTheDocument();
    });

    // Check if danger country is displayed
    expect(screen.getByText(/(most new cases)/i)).toBeInTheDocument();
    expect(
      screen.getByText(`${numberFormatter(countriesData[1].TotalConfirmed)}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${numberFormatter(countriesData[1].TotalDeaths)}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${numberFormatter(countriesData[1].TotalRecovered)}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${numberFormatter(countriesData[1].NewConfirmed)}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`${numberFormatter(countriesData[1].NewDeaths)}`)).toBeInTheDocument();
    expect(
      screen.getByText(`${numberFormatter(countriesData[1].NewRecovered)}`)
    ).toBeInTheDocument();
  });

  it("Should display error message on failed fetch", () => {
    render(<HomePage />, { initialState: initialErrorState });

    expect(screen.getByText(/There was an error: Server error 500/i)).toBeInTheDocument();
  });

  it("Should change displayed data after country change", () => {
    render(<HomePage />, { initialState: initialState });

    const countriesSelect = screen.getByTestId("countries-select");

    expect(countriesSelect.value).toBe("germany");
    fireEvent.change(countriesSelect, { target: { value: "poland" } });
    expect(countriesSelect.value).toBe("poland");
    expect(
      screen.queryByText(`${numberFormatter(countriesData[0].TotalConfirmed)}`)
    ).not.toBeInTheDocument();
  });

  it("Should change displayed data from global to daily", () => {
    render(<HomePage />, { initialState: initialState });

    const dataTypeSelect = screen.getByTestId("data-type-select");
    expect(dataTypeSelect.value).toBe("all");

    fireEvent.change(dataTypeSelect, { target: { value: "daily" } });
    expect(
      screen.getByText(`${numberFormatter(countriesData[0].NewConfirmed)}`)
    ).toBeInTheDocument();

    expect(screen.getByText(`${numberFormatter(countriesData[0].NewDeaths)}`)).toBeInTheDocument();

    expect(
      screen.getByText(`${numberFormatter(countriesData[0].NewRecovered)}`)
    ).toBeInTheDocument();
  });
});
