import React from "react";
import {
  View, Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import colors from "../config/colors";

export default function WelcomePage({ navigation }) {
  return (
    <SafeAreaView style={styles.Background}>
      <TouchableOpacity style={styles.container}onPress={() => navigation.navigate("Login")}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
          <Text style={styles.logoText}>MY FRIDGE</Text>
          <Text style={styles.slogan}>
            Discover healthy recipes, manage your ingredients, and track your
            nutrition effortlessly.
          </Text>
        </View>

        <Text style={styles.continueText}>Tap to continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: colors.Backgroundcolor,
  },

  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 5,
  },

  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },

  logoContainer: {
    position: "absolute",
    top: 100,
    alignItems: "center",
  },

  logoText: {
    fontSize: 32,
    marginBottom: 30,
  },

  slogan: {
    fontSize: 18,
    textAlign: "center",
  },

  continueText: {
    fontSize: 15,
    color: "#888",
    position: "absolute",
    bottom: 20,
  },
});
