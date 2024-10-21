import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [forecast, setForecast] = useState(null);
  const [counter, setCounter] = useState(0); // Counter state

  useEffect(() => {
    fetch('http://localhost:5224/weatherforecast')
      .then((response) => response.json())
      .then((data) => setForecast(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const incrementCounter = () => {
    setCounter(counter + 1); // Increment counter by 1
  };

  return (
    <View style={styles.container}>
      <Text>Weather Forecast:</Text>
      {forecast ? (
        forecast.map((item, index) => (
          <Text key={index}>
            {item.summary} - {item.temperatureC}°C
          </Text>
        ))
      ) : (
        <Text>Loading...</Text>
      )}

      <Text style={styles.counterText}>Counter: {counter}</Text>
      <Button title="Increment Counter" onPress={incrementCounter} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: 24,
    margin: 20,
  },
});
