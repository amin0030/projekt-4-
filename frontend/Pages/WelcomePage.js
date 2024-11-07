import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Button } from 'react-native';

export default function WelcomePage({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Recipe Master!</Text>
      <Text style={styles.subtitle}>
        Discover healthy recipes, manage your ingredients, and track your nutrition effortlessly.
      </Text>
{/* 
      <View style={styles.featureContainer}>
        <Image source={require('../assets/ingredients.png')} style={styles.icon} />
        <Text style={styles.featureTitle}>Recipe Suggestions</Text>
        <Text style={styles.featureDescription}>
          Enter your available ingredients, and let us suggest delicious recipes you can make today.
        </Text>
      </View>

      <View style={styles.featureContainer}>
        <Image source={require('../assets/chatbot.png')} style={styles.icon} />
        <Text style={styles.featureTitle}>Real-Time Cooking Assistance</Text>
        <Text style={styles.featureDescription}>
          Get step-by-step guidance in real time with our AI-powered cooking assistant.
        </Text>
      </View>

      <View style={styles.featureContainer}>
        <Image source={require('../assets/scanner.png')} style={styles.icon} />
        <Text style={styles.featureTitle}>Barcode & QR Scanner</Text>
        <Text style={styles.featureDescription}>
          Add ingredients quickly by scanning barcodes and QR codes for easy recipe generation.
        </Text>
      </View>

      <View style={styles.featureContainer}>
        <Image source={require('../assets/calories.png')} style={styles.icon} />
        <Text style={styles.featureTitle}>Nutrition Tracking</Text>
        <Text style={styles.featureDescription}>
          Monitor your daily calorie intake and ensure balanced nutrition with integrated analysis.
        </Text>
      </View> */}

      <Button
        title="Get Started"
        onPress={() => navigation.navigate('Login')}
        color="#841584"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  featureContainer: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginTop: 5,
  },
  icon: {
    width: 60,
    height: 60,
  },
});
