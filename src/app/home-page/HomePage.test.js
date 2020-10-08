import React from "react";
import { render, screen, wait } from "../../testUtils";
import axios from "axios";

import { HomePage } from "./HomePage";

jest.mock("axios");

describe("Home Page", () => {
  it("Should display data on successful fetch", async () => {
    const globalData = { TotalConfirmed: 2000, TotalDeaths: 1000, TotalRecovered: 500 };
    const countriesData = [
      { Country: "Poland", ISO2: "PL" },
      { Country: "Germany", ISO2: "DE" },
    ];

    axios.get.mockImplementation((url) => {
      if (url === "https://api.covid19api.com/summary") {
        return Promise.resolve({
          status: 200,
          data: { Global: globalData },
        });
      } else if (url === "https://api.covid19api.com/countries") {
        return Promise.resolve({
          status: 200,
          data: countriesData,
        });
      }
    });

    render(<HomePage />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();

    // Wait for intro message to show up
    await wait(() => expect(screen.queryByText(/Hello,/i)).toBeInTheDocument());
    expect(screen.getByText(/Here is your daily statistics/i)).toBeInTheDocument();

    // Check if countries are rendered
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(2);
    expect(options[0].value).toBe(countriesData[0].ISO2);
    expect(options[1].value).toBe(countriesData[1].ISO2);

    // Check if global data are displayed
    expect(screen.getByText(/2000/i)).toBeInTheDocument();
    expect(screen.getByText(/1000/i)).toBeInTheDocument();
    expect(screen.getByText(/500/i)).toBeInTheDocument();
  });

  it("Should display error message on failed fetch", async () => {
    axios.get.mockImplementation((url) => {
      if (url === "https://api.covid19api.com/summary") {
        return Promise.reject(new Error("Server error 500"));
      } else if (url === "https://api.covid19api.com/countries") {
        return Promise.resolve(new Error("Server error 500"));
      }
    });

    render(<HomePage />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();

    await wait(() => expect(screen.queryByText(/There was an error/i)).toBeInTheDocument());
  });
});
