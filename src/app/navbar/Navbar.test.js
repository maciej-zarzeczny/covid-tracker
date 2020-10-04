import React from "react";
import { render, screen } from "@testing-library/react";

import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("Should render all the elements", () => {
    render(<Navbar />);

    expect(screen.getByText(/CovidTracker/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });
});
