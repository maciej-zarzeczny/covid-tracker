import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import statsReducer from "./features/stats/statsSlice";
import countriesSlice from "./features/countries/countriesSlice";

function render(
  ui,
  {
    initialState,
    store = configureStore({
      reducer: {
        stats: statsReducer,
        countries: countriesSlice,
      },
      preloadedState: initialState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
