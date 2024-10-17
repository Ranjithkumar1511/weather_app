import { setLoading, setCurrentWeather, setForecast, setHistoricalWeather, setError } from './weatherSlice';

export const fetchWeatherForCity = (city) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const currentResponse = await fetch(`https://apps.org.in/weather/live/?city=${city}`);
    const currentData = await currentResponse.json();
    dispatch(setCurrentWeather(currentData));

    const forecastResponse = await fetch(`https://apps.org.in/weather/forecast/?city=${city}`);
    const forecastData = await forecastResponse.json();
    dispatch(setForecast(forecastData));

    const historicalResponse = await fetch(`https://apps.org.in/weather/history/?city=${city}`);
    const historicalData = await historicalResponse.json();
    dispatch(setHistoricalWeather(historicalData));
  } catch (error) {
    console.error('weather', error);
    dispatch(setError('data.'));
  } finally {
    dispatch(setLoading(false));
  }
};
