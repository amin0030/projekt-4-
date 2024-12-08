import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform
} from 'react-native';
import { FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const API_BASE_URL =
  Platform.OS === "android"
    ? "http://10.10.130.6:5224" // Android emulator
    : "http://10.10.130.6:5224"; // iOS simulator or physical devices


export default function SignUpPage({ navigation }) {
  const [username, setUsername] = useState('');
 // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

    // Handle user registration
    const handleRegister = () => {
      if (username === '' || password === '') {
        Alert.alert('Error', 'Please enter username, email and password.');
        return;
      }
  
      setIsLoading(true); // Start loading
      fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => {
          setIsLoading(false); // Stop loading
          if (response.ok) {
            Alert.alert('Success', 'User registered successfully!');
            navigation.navigate('HomePage');
          } else {
            response.text().then((text) => Alert.alert('Registration Failed', text || 'Unable to register.'));
          }
        })
        .catch((error) => {
          setIsLoading(false); // Stop loading
          console.error('Registration error:', error);
          Alert.alert('Error', 'Network request failed. Please try again.');
        });
    };


  return (
    <SafeAreaView style={styles.safeArea}>

<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Let’s get you started now</Text>

        {/* Username Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
             placeholderTextColor="#666"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <FontAwesome name="user" size={20} style={styles.icon} />
        </View>

        {/* Email Input */}
       {/*  <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
             placeholderTextColor="#666"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <FontAwesome name="envelope" size={20} style={styles.icon} />
        </View> */}

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
             placeholderTextColor="#666"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <MaterialCommunityIcons name="lock" size={20} style={styles.icon} />
        </View>

        {/* Sign Up Button */}
               <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Or Sign Up with */}
        <Text style={styles.orText}>Or Signup with</Text>
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
    backgroundColor: '#F6F7E7', // Matches the background color in the design
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    paddingLeft: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
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
    backgroundColor: '#fff',
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
