import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

const CurrentWeather = () => {
  const currentWeatherData = useSelector(state => state.weather.currentWeather);
  console.log(currentWeatherData);
  
  const loading = useSelector(state => state.weather.loading); 

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!currentWeatherData) {
    return <Text>No current weather data available.</Text>;
  }

  const currentWeather = currentWeatherData.current_weather; 
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Current Weather : {currentWeatherData.location.city}, {currentWeatherData.location.country}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{new Date(currentWeatherData.timestamp).toLocaleString()}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Temperature:</Text>
        <Text style={styles.value}>{currentWeather.temperature}°F</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Humidity:</Text>
        <Text style={styles.value}>{currentWeather.humidity}%</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Conditions:</Text>
        <Text style={styles.value}>{currentWeather.weather_conditions}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Wind:</Text>
        <Text style={styles.value}>{currentWeather.wind_speed} mph {currentWeather.wind_direction}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Pressure:</Text>
        <Text style={styles.value}>{currentWeather.pressure} hPa</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Visibility:</Text>
        <Text style={styles.value}>{currentWeather.visibility} miles</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 4,
  },
  label: {
    fontWeight: 'bold',
    flex: 1, 
  },
  value: {
    flex: 1, 
    textAlign: 'right',
    color:"#ffff"
  },
});

export default CurrentWeather;
