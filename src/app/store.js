import { configureStore } from "@reduxjs/toolkit";
import statsReducer from "../features/stats/statsSlice";
import countriesSlice from "../features/countries/countriesSlice";

export default configureStore({
  reducer: {
    stats: statsReducer,
    countries: countriesSlice,
  },
});
