import React from "react";
import { render, screen, wait } from "./testUtils";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import axios from "axios";
import { globalData, countriesData, dayOneDataGermany, dayOneDataPoland } from "./testsMockData";

import { App } from "./App";

jest.mock("react-chartjs-2", () => ({
  Line: () => null,
}));

jest.mock("axios");

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

describe("App", () => {
  it("Should render application without errors", () => {
    render(<App />);
  });

  it("Should be able to navigate correctly between pages", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    // Check if the app loads with home page first
    await wait(() => expect(screen.queryByText(/Hello,/i)).toBeInTheDocument());

    const leftClick = { button: 0 };

    // Navigate to map page
    userEvent.click(screen.getByTestId("map-page"), leftClick);

    expect(screen.getByText(/Here is the statistics on the map/i)).toBeInTheDocument();

    userEvent.click(screen.getByTestId("list-page"), leftClick);

    expect(screen.getByText(/Here is the list of all data/i)).toBeInTheDocument();
  });

  it("Should render all the elements on successfull fetch", async () => {
    render(<App />);

    await wait(() => expect(screen.queryByTestId("navbar")).toBeInTheDocument());
  });

  it("Should display error message when fetching data fails", async () => {
    axios.get.mockImplementation(() => {
      return Promise.resolve({ status: 500, data: [] });
    });

    render(<App />);

    await wait(() => expect(screen.queryByTestId("loader")).not.toBeInTheDocument());

    expect(screen.getByText(/There was an error:/i)).toBeInTheDocument();
  });
});
