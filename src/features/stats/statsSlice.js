import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  data: [],
  error: null,
};

export const fetchGlobalData = createAsyncThunk("stats/fetchGlobalData", async () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await axios.get("https://api.covid19api.com/summary", requestOptions);

  return { status: response.status, data: response.data };
});

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGlobalData.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchGlobalData.fulfilled]: (state, action) => {
      const { status, data } = action.payload;

      if (status === 200) {
        state.status = "succeeded";
        state.data = data;
      } else {
        state.status = "failed";
        state.error = "There was an error, please try again.";
      }
    },
    [fetchGlobalData.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default statsSlice.reducer;

export const selectAllCountries = (state) => state.stats.data.Countries;

export const selectGlobalData = (state) => state.stats.data.Global;
