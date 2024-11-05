// CategoryPage.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { API_BASE_URL } from '../config';

export default function CategoryPage({ route, navigation }) {
  const { categoryId } = route.params || {};  // Safely destructuring categoryId
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (categoryId) {  // Ensure categoryId exists before fetching
      fetchCategoryRecipes();
    } else {
      setError('Category ID is missing');
      setLoading(false);
    }
  }, [categoryId]);

  const fetchCategoryRecipes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/recipes`);
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      } else {
        console.error("Failed to fetch category recipes:", response.status, response.statusText);
        setError("Failed to load category recipes.");
      }
    } catch (error) {
      console.error('Error fetching category recipes:', error);
      setError('Network request failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category Recipes</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('RecipePage', { recipeId: item.id })}>
            <Text style={styles.recipeItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  recipeItem: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});
