import React from "react";
import { render, screen, wait, fireEvent } from "../../testUtils";
import axios from "axios";

import { HomePage } from "./HomePage";

jest.mock("axios");

const globalData = { TotalConfirmed: 2000, TotalDeaths: 1000, TotalRecovered: 500 };
const countriesData = [
  {
    Country: "Poland",
    CountryCode: "PL",
    TotalConfirmed: 65700,
    TotalDeaths: 12300,
    TotalRecovered: 35600,
  },
  {
    Country: "Germany",
    CountryCode: "DE",
    TotalConfirmed: 85700,
    TotalDeaths: 22300,
    TotalRecovered: 65600,
  },
];

describe("Home Page", () => {
  it("Should display data on successful fetch", async () => {
    axios.get.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: { Global: globalData, Countries: countriesData },
      });
    });

    render(<HomePage />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();

    // Wait for intro message to show up
    await wait(() => expect(screen.queryByText(/Hello,/i)).toBeInTheDocument());
    expect(screen.getByText(/Here is your daily statistics/i)).toBeInTheDocument();

    // Check if countries are rendered
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
    expect(options[0].value).toBe("global");
    expect(options[1].value).toBe(countriesData[0].CountryCode);
    expect(options[2].value).toBe(countriesData[1].CountryCode);

    // Check if global data are displayed
    expect(screen.getByText(/2.0K/i)).toBeInTheDocument();
    expect(screen.getByText(/1.0K/i)).toBeInTheDocument();
    expect(screen.getByText(/500/i)).toBeInTheDocument();
  });

  it("Should display error message on failed fetch", async () => {
    axios.get.mockImplementation(() => {
      return Promise.reject(new Error("Server error 500"));
    });

    render(<HomePage />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();

    await wait(() => expect(screen.queryByText(/There was an error/i)).toBeInTheDocument());
  });

  it("Should change displayed data after country change", async () => {
    axios.get.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: { Global: globalData, Countries: countriesData },
      });
    });
    render(<HomePage />);

    await wait(() => expect(screen.getByText(/Hello,/i)).toBeInTheDocument());

    const countrySelect = screen.getByRole("combobox");

    expect(countrySelect.value).toBe("global");
    fireEvent.change(countrySelect, { target: { value: "DE" } });
    expect(countrySelect.value).toBe("DE");

    expect(screen.getByText(/85.7K/i)).toBeInTheDocument();
  });
});
