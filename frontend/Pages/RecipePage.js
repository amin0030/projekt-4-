// RecipePage.js
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { API_BASE_URL } from '../config';

export default function RecipePage({ route }) {
  const { recipeId } = route.params;
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
        setError("Failed to fetch recipe details.");
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
    <View style={styles.container}>
      {recipe ? (
        <>
          <Text style={styles.title}>{recipe.name}</Text>
          <Text style={styles.description}>{recipe.description}</Text>
          
          <Text style={styles.subTitle}>Ingredients:</Text>
          <FlatList
            data={recipe.ingredients}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text style={styles.ingredient}>
                {item.quantity} {item.unit || ''} {item.name}
              </Text>
            )}
          />

          <Text style={styles.subTitle}>Instructions:</Text>
          <FlatList
            data={recipe.instructions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text style={styles.instruction}>
                Step {item.step}: {item.description}
              </Text>
            )}
          />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    color: '#333',
  },
  ingredient: {
    fontSize: 16,
    color: '#555',
  },
  instruction: {
    fontSize: 16,
    color: '#555',
  },
});
