import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchWeatherForCity } from '../src/Redux/weatherAction'; 
import Carousel from 'react-native-snap-carousel';

const { width: windowWidth } = Dimensions.get('window');

const WeatherForecast = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();

  const forecastData = useSelector(state => state.weather.forecast);
  console.log(forecastData);
  
  const currentWeather = useSelector(state => state.weather.currentWeather);
  console.log(currentWeather);
  
  const loading = useSelector(state => state.weather.loading); 

  useEffect(() => {
    dispatch(fetchWeatherForCity('Coimbatore')); 
  }, [dispatch]);

  const forecast = forecastData?.daily_forecast || [];
  console.log("Forecast Data: ", forecast);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return 'weather-sunny';
      case 'Partly Cloudy':
        return 'weather-partly-cloudy';
      case 'Cloudy':
        return 'weather-cloudy';
      case 'Rainy':
        return 'weather-rainy';
      case 'Thunderstorm':
        return 'weather-lightning';
      case 'Snow':
        return 'weather-snowy';
      default:
        return 'weather-cloudy';
    }
  };

  const handleSearch = () => {
    if (city) {
      dispatch(fetchWeatherForCity(city));
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!forecast.length || !currentWeather) {
    return <Text>No data available.</Text>;
  }

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.date}>{item.date}</Text>
      <Text>
        {item.weather_conditions} - Min {item.min_temperature}°F - Max {item.max_temperature}°F
      </Text>
      <MaterialCommunityIcons name={getWeatherIcon(item.weather_conditions)} size={30} />
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city..."
        placeholderTextColor="#000" 
        value={city}
        onChangeText={setCity}
        onSubmitEditing={handleSearch}
      />
      <Text style={styles.header}>7-Days Forecast</Text>
      <Carousel
        data={forecast}
        renderItem={renderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth * 0.85} 
        layout={'default'} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  listItem: {
    backgroundColor: '#000',
    borderRadius: 5,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#FFFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
  },
  date: {
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    width: '100%', 
  },
});

export default WeatherForecast;
