import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  data: [],
  error: null,
};

export const fetchAllCountries = createAsyncThunk("countries/fetchAllCountries", async () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await axios.get("https://api.covid19api.com/countries", requestOptions);

  return { status: response.status, data: response.data };
});

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllCountries.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchAllCountries.fulfilled]: (state, action) => {
      const { status, data } = action.payload;

      if (status === 200) {
        state.status = "succeeded";
        state.data = data;
      } else {
        state.status = "failed";
        state.error = "There was an error, please try again.";
      }
    },
    [fetchAllCountries.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default countriesSlice.reducer;

export const selectAllCountries = (state) => state.countries.data;
