import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentWeather: null,
  forecast: [],
  historicalWeather: [],
  loading: false,
  error: null,
};
export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCurrentWeather: (state, action) => {
      state.currentWeather = action.payload;
    },
    setForecast: (state, action) => {
      state.forecast = action.payload;
    },
    setHistoricalWeather: (state, action) => {
      state.historicalWeather = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCurrentWeather, setForecast, setHistoricalWeather, setLoading, setError } = weatherSlice.actions;

export default weatherSlice.reducer;
