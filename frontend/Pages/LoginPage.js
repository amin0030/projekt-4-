import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import colors from "../config/colors";
import { FontAwesome, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const API_BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.10.130.4:5224' // Android emulator
    : 'http://10.10.130.4:5224'; // iOS simulator or physical devices

export default function LoginPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // To show a loading indicator

  // Handle user login
  const handleLogin = () => {
    if (username === "" || password === "") {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }

    setIsLoading(true); // Start loading
    fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        setIsLoading(false); // Stop loading
        if (response.ok) {
          Alert.alert("Success", "You are now logged in!");
          navigation.navigate("HomePage");
        } else {
          response
            .text()
            .then((text) =>
              Alert.alert(
                "Login Failed",
                text || "Incorrect username or password."
              )
            );
        }
      })
      .catch((error) => {
        setIsLoading(false); // Stop loading
        console.error("Login error:", error);
        Alert.alert("Error", "Network request failed. Please try again.");
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
       {/* Back Button */}
       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      <View style={styles.container}>
          
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Glad to see you again</Text>

        {/* Username Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#666"
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
             placeholderTextColor="#666"
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
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Signup")}
 // Navigate to SignUpPage
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Loading Indicator */}
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loading}
          />
        )}

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
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    paddingLeft: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#000",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  icon: {
    marginLeft: 5,
    color: "#888",
  },
  forgotPassword: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#F6F7E7",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  orText: {
    textAlign: "center",
    color: "#666",
    marginVertical: 15,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  socialIcon: {
    marginHorizontal: 10,
    color: "#000",
  },
  loading: {
    marginTop: 10,
  },
});
