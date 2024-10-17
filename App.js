import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { setCurrentWeather, setForecast, setHistoricalWeather } from './src/Redux/weatherSlice';
import CurrentWeather from './screens/CurrentWeather';
import HistoricalWeather from './screens/HistoricalWeather';
import WeatherForecast from './screens/WeatherForecast';
import { useDispatch } from 'react-redux';
import store from './src/Redux/store';
import { View, StyleSheet, ImageBackground } from 'react-native';

const WeatherDataInitializer = () => {
  const dispatch = useDispatch();
  const fetchCurrentWeather = async () => {
    try {
      const response = await fetch('https://apps.org.in/weather/live/');
      const data = await response.json();
      dispatch(setCurrentWeather(data));
    } catch (error) {
      console.error('Error current weather:', error);
    }
  };

  // Fetch forecast data
  const fetchForecast = async () => {
    try {
      const response = await fetch('https://apps.org.in/weather/forecast/');
      const data = await response.json();
      dispatch(setForecast(data));
    } catch (error) {
      console.error('Error fetching forecast:', error);
    }
  };

  //  historical weather data
  const fetchHistoricalWeather = async () => {
    try {
      const response = await fetch('https://apps.org.in/weather/history/');
      const data = await response.json();
      dispatch(setHistoricalWeather(data));
    } catch (error) {
      console.error('Error historical weather:', error);
    }
  };

  useEffect(() => {
    fetchCurrentWeather();
    fetchForecast();
    fetchHistoricalWeather();
  }, [dispatch]);

};

function App() {
  return (
    <Provider store={store}>
      <ImageBackground
        source={require('./assests/lightning-7401119_1920.jpg')}
        style={styles.background}
      >
        <View style={styles.container}>
          <WeatherForecast />
          <WeatherDataInitializer />
          <CurrentWeather />
          <HistoricalWeather />
        </View>
      </ImageBackground>
    </Provider>
  );
}
const styles = StyleSheet.create({
 
  background: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
  },
});

export default App;
