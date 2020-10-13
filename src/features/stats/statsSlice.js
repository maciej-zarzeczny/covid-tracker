import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  countryDataStatus: "idle",
  data: [],
  countryData: [],
  currentCountry: {},
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

// Fetch data from day one for specific country
export const fetchCountryData = createAsyncThunk("stats/fetchCountryData", async (country) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await axios.get(
    `https://api.covid19api.com/total/dayone/country/${country}`,
    requestOptions
  );
  return { status: response.status, data: response.data };
});

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    changedCountry: (state, action) => {
      const { country } = action.payload;
      state.currentCountry = country;
    },
  },
  extraReducers: {
    [fetchGlobalData.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchGlobalData.fulfilled]: (state, action) => {
      const { status, data } = action.payload;

      if (status === 200) {
        state.status = "succeeded";
        state.data = data;
        state.currentCountry = data.Countries[0];
      } else {
        state.status = "failed";
        state.error = "There was an error, please try again.";
      }
    },
    [fetchGlobalData.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },

    [fetchCountryData.pending]: (state, action) => {
      state.countryDataStatus = "loading";
    },
    [fetchCountryData.fulfilled]: (state, action) => {
      const { status, data } = action.payload;

      if (status === 200) {
        state.countryDataStatus = "succeeded";
        state.countryData = data;
      } else {
        state.countryDataStatus = "failed";
        state.error = "There was an error, please try again.";
      }
    },
    [fetchCountryData.rejected]: (state, action) => {
      state.countryDataStatus = "failed";
      state.error = action.error.message;
    },
  },
});

export const { changedCountry } = statsSlice.actions;

export default statsSlice.reducer;

export const selectAllCountries = (state) => state.stats.data.Countries;

export const selectCurrentCountry = (state) => state.stats.currentCountry;

export const selectGlobalData = (state) => state.stats.data.Global;

export const selectCountryData = (state) => state.stats.countryData;
