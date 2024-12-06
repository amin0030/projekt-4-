import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons like back, time, and heart
import colors from '../config/colors';
import { API_BASE_URL } from '../config'; // Assuming you have a config file for the API base URL

export default function RecipePage({ route, navigation }) {
  const { recipeId } = route.params; // Retrieve recipeId passed via navigation
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipeDetails();
  }, []);

  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}`);
      if (response.ok) {
        const data = await response.json();
        setRecipe(data);
      } else {
        setError('Failed to fetch recipe details.');
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      setError('An error occurred while fetching data.');
    }
  };

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {recipe ? (
        <>
          {/* Recipe Image and Header */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: recipe.image }} // Assuming API provides an image URL
              style={styles.image}
            />
            <View style={styles.headerIcons}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="share-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Recipe Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{recipe.name}</Text>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Cooking Time */}
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={18} color="#333" />
              <Text style={styles.infoText}>{recipe.time || 'N/A'}</Text>
            </View>

            {/* Description */}
            <Text style={styles.description}>{recipe.description}</Text>

            {/* Ingredients Section */}
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <FlatList
              data={recipe.ingredients}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.ingredientRow}>
                  <Ionicons name="checkmark-circle-outline" size={18} color="#4CAF50" />
                  <Text style={styles.ingredientText}>{item.name}</Text>
                </View>
              )}
            />

            {/* Instructions Section */}
            <Text style={styles.sectionTitle}>Instructions</Text>
            <FlatList
              data={recipe.instructions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.instructionRow}>
                  <Text style={styles.instructionStep}>Step {item.step}:</Text>
                  <Text style={styles.instructionText}>{item.description}</Text>
                </View>
              )}
            />
          </View>
        </>
      ) : (
        <Text style={styles.loading}>Loading...</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Backgroundcolor,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 300,
  },
  headerIcons: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsContainer: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ingredientText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  instructionRow: {
    marginBottom: 15,
  },
  instructionStep: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  loading: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
