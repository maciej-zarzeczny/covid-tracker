import React from "react";
import { render, screen } from "./testUtils";

import { App } from "./App";

describe("App", () => {
  it("Should render", () => {
    render(<App />);
  });
});
