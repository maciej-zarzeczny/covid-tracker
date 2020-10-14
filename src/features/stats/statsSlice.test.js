import axios from "axios";

import store from "../../app/store";
import reducer, { fetchGlobalData, fetchCountryData } from "./statsSlice";

jest.mock("axios");

const initialState = {
  status: "idle",
  countryDataStatus: "idle",
  data: [],
  countryData: [],
  currentCountry: {},
  error: null,
};

describe("Stats Slice", () => {
  it("Returns initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("Sets status as loading when fetchGlobalData is pending", () => {
    expect(
      reducer(initialState, {
        type: fetchGlobalData.pending,
      })
    ).toEqual({
      ...initialState,
      status: "loading",
    });
  });

  it("Sets status as succeeded and data as respone when fetchGlobalData resolved successfully", async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
      data: {
        Global: {
          TotalConfirmed: 1000,
          TotalDeaths: 2000,
        },
        Countries: [
          {
            Country: "Poland",
            CountryCode: "PL",
            TotalConfirmed: 2000,
            TotalDeaths: 1000,
            TotalRecovered: 500,
          },
        ],
      },
    });

    await store.dispatch(fetchGlobalData());
    const state = store.getState();

    expect(state.stats.status).toBe("succeeded");
    expect(state.stats.data).toEqual({
      Global: { TotalConfirmed: 1000, TotalDeaths: 2000 },
      Countries: [
        {
          Country: "Poland",
          CountryCode: "PL",
          TotalConfirmed: 2000,
          TotalDeaths: 1000,
          TotalRecovered: 500,
        },
      ],
    });
  });

  it("Sets status as failed and error as error messsage when fetchGlobalData was rejected", async () => {
    axios.get.mockResolvedValueOnce({
      status: 404,
      data: {},
    });

    await store.dispatch(fetchGlobalData());
    const state = store.getState();

    expect(state.stats.status).toBe("failed");
    expect(state.stats.error).not.toBe(null);
  });

  it("Should set countryDataStatus as loading when fetchCountryData is pending", () => {
    expect(reducer(initialState, { type: fetchCountryData.pending })).toEqual({
      ...initialState,
      countryDataStatus: "loading",
    });
  });
});
