import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Platform, SafeAreaView, TouchableOpacity,  } from 'react-native';
import colors from '../config/colors';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const API_BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.192.93.96:5224'  // Android emulator
    : 'http://10.31.5.168:5224'; // iOS simulator or physical devices

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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Glad to see you again</Text>

        {/* Username Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <FontAwesome name="envelope" size={20} style={styles.icon} />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <MaterialCommunityIcons name="lock" size={20} style={styles.icon} />
        </View>

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>

        {/* Social Login Icons */}
        <Text style={styles.orText}>Or login with</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity>
            <FontAwesome name="apple" size={30} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="google" size={30} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="facebook" size={30} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.Backgroundcolor,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  icon: {
    marginLeft: 5,
    color: '#888',
  },
  forgotPassword: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#F6F7E7',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 15,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  socialIcon: {
    marginHorizontal: 10,
    color: '#000',
  },

});