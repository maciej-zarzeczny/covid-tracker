import { configureStore } from "@reduxjs/toolkit";
import statsReducer from "../features/stats/statsSlice";

export default configureStore({
  reducer: {
    stats: statsReducer,
  },
});
