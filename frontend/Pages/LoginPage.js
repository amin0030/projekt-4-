import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Platform } from 'react-native';

const API_BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:5224'  // Android emulator
    : 'http://10.31.5.14:5224'; // iOS simulator or physical devices

export default function LoginPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Fejl', 'Indtast både brugernavn og adgangskode');
      return;
    }

    fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          Alert.alert('Succes', 'Du er nu logget ind!');
          navigation.navigate('HomePage');
        } else {
          response.text().then(text => Alert.alert('Fejl', text));
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        Alert.alert('Fejl', 'Der opstod en fejl. Prøv igen senere.');
      });
  };

  const handleRegister = () => {
    if (username === '' || password === '') {
      Alert.alert('Fejl', 'Indtast både brugernavn og adgangskode');
      return;
    }

    fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          Alert.alert('Succes', 'Bruger oprettet!');
          navigation.navigate('HomePage');
        } else {
          response.text().then(text => Alert.alert('Fejl', text));
        }
      })
      .catch((error) => {
        console.error('Error registering:', error);
        Alert.alert('Fejl', 'Der opstod en fejl. Prøv igen senere.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log ind</Text>

      <TextInput
        style={styles.input}
        placeholder="Brugernavn"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Adgangskode"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Button title="Log ind" onPress={handleLogin} />
      <Button title="Opret ny bruger" onPress={handleRegister} color="#841584" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});
