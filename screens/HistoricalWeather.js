import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import Carousel from 'react-native-snap-carousel';

const { width: windowWidth } = Dimensions.get('window');

const HistoricalWeather = () => {
  const historicalWeather = useSelector(state => state.weather.historicalWeather);
  const loading = useSelector(state => state.weather.loading); 

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!historicalWeather || historicalWeather.length === 0) {
    return <Text>No historical data available.</Text>;
  }

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.date}>{new Date(item.timestamp).toLocaleString()}:</Text>
      <Text style={styles.text}>Temp: {item.temperature}°F, Humidity: {item.humidity}%,</Text>
      <Text style={styles.text}>Conditions: {item.weather_conditions},</Text>
      <Text style={styles.text}>Wind: {item.wind_speed} mph {item.wind_direction},</Text>
      <Text style={styles.text}>Pressure: {item.pressure} hPa, Visibility: {item.visibility} miles</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historical Weather</Text>
      <Carousel
        data={historicalWeather.historical_weather}
        renderItem={renderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth * 0.85}
      />
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
    color: '#000', 
  },
  listItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  date: {
    fontWeight: 'bold',
    color: '#000', 
  },
  text: {
    color: '#333', 
  },
});

export default HistoricalWeather;
