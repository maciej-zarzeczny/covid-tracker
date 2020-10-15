import React from "react";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("Should render all the elements", () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Navbar />
      </Router>
    );

    expect(screen.getByText(/CovidTracker/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });
});
