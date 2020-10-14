import React from "react";
import { render, screen, wait, fireEvent } from "../../testUtils";
import axios from "axios";

import { HomePage } from "./HomePage";
import { numberFormatter } from "../numberFormatter";

jest.mock("axios");

const globalData = {
  TotalConfirmed: 2000,
  TotalDeaths: 1000,
  TotalRecovered: 500,
  NewConfirmed: 30,
  NewDeaths: 20,
  NewRecovered: 10,
};
const countriesData = [
  {
    Country: "Germany",
    CountryCode: "DE",
    Slug: "germany",
    TotalConfirmed: 85700,
    TotalDeaths: 22300,
    TotalRecovered: 65600,
    NewConfirmed: 70,
    NewDeaths: 60,
    NewRecovered: 50,
  },
  {
    Country: "Poland",
    CountryCode: "PL",
    Slug: "poland",
    TotalConfirmed: 65700,
    TotalDeaths: 12300,
    TotalRecovered: 35600,
    NewConfirmed: 100,
    NewDeaths: 90,
    NewRecovered: 80,
  },
];

const dayOneDataGermany = [
  {
    Country: "Germany",
    Confirmed: 5,
    Deaths: 4,
    Recovered: 3,
  },
  {
    Country: "Germany",
    Confirmed: 7,
    Deaths: 6,
    Recovered: 4,
  },
];

const dayOneDataPoland = [
  {
    Country: "Poland",
    Confirmed: 10,
    Deaths: 9,
    Recovered: 8,
  },
  {
    Country: "Poland",
    Confirmed: 15,
    Deaths: 14,
    Recovered: 13,
  },
];

// Line chart mock
jest.mock("react-chartjs-2", () => ({
  Line: () => null,
}));

// acios calls mock
axios.get.mockImplementation((url) => {
  switch (url) {
    case "https://api.covid19api.com/summary":
      return Promise.resolve({
        status: 200,
        data: { Global: globalData, Countries: countriesData },
      });

    case "https://api.covid19api.com/total/dayone/country/germany":
      return Promise.resolve({
        status: 200,
        data: dayOneDataGermany,
      });

    case "https://api.covid19api.com/total/dayone/country/poland":
      return Promise.resolve({
        status: 200,
        data: dayOneDataPoland,
      });

    default:
      return;
  }
});

describe("Home Page", () => {
  it("Should display all data on successful fetch", async () => {
    render(<HomePage />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();

    // Wait for intro message to show up
    await wait(() => expect(screen.queryByText(/Hello,/i)).toBeInTheDocument());
    expect(screen.getByText(/Here is your daily statistics/i)).toBeInTheDocument();

    // Check if countries selection is displayed
    const conutryOptions = screen.getAllByTestId("country-option");
    expect(conutryOptions).toHaveLength(2);
    expect(conutryOptions[0].value).toBe("germany");
    expect(conutryOptions[1].value).toBe("poland");

    // Check if country data are displayed
    expect(screen.getByText(/85.7K/i)).toBeInTheDocument();
    expect(screen.getByText(/22.3K/i)).toBeInTheDocument();
    expect(screen.getByText(/65.6K/i)).toBeInTheDocument();

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

  it("Should display error message on failed fetch", async () => {
    axios.get.mockImplementationOnce(() => {
      return Promise.reject(new Error("Server error 500"));
    });

    render(<HomePage />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();

    await wait(() =>
      expect(screen.queryByText(/There was an error: Server error 500/i)).toBeInTheDocument()
    );
  });

  it("Should change displayed data after country change", async () => {
    render(<HomePage />);

    await wait(() => expect(screen.getByText(/Hello,/i)).toBeInTheDocument());

    const countriesSelect = screen.getByTestId("countries-select");

    expect(countriesSelect.value).toBe("germany");
    fireEvent.change(countriesSelect, { target: { value: "poland" } });
    expect(countriesSelect.value).toBe("poland");
    expect(
      screen.queryByText(`${numberFormatter(countriesData[0].TotalConfirmed)}`)
    ).not.toBeInTheDocument();
  });

  it("Should change displayed data from global to daily", async () => {
    render(<HomePage />);

    await wait(() => expect(screen.queryByText(/Hello,/i)).toBeInTheDocument());

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
