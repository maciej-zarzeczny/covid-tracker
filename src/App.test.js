import React from "react";
import { render, screen, wait } from "./testUtils";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { App } from "./App";

jest.mock("react-chartjs-2", () => ({
  Line: () => null,
}));

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
});
