// HomePage.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { API_BASE_URL } from '../config';

export default function HomePage({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes`);
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
        setFilteredRecipes(data);
      } else {
        setError("Failed to fetch recipes.");
        console.error("Backend response error:", response.status, response.statusText);
      }
    } catch (error) {
      setError('Network request failed');
      console.error('Error fetching recipes:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error("Failed to fetch categories:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Recipes</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search recipes..."
        value={searchText}
        onChangeText={handleSearch}
      />

      {/* Category Buttons */}
      <Text style={styles.subTitle}>Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}  // Wrap into two columns
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => navigation.navigate('CategoryPage', { categoryId: item.id })}
          >
            <Text style={styles.categoryButtonText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Recipe List */}
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recipeItem}
            onPress={() => navigation.navigate('RecipePage', { recipeId: item.id })}
          >
            <Text style={styles.recipeName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#333' },
  searchBar: {
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  subTitle: { fontSize: 20, fontWeight: '600', marginVertical: 16, color: '#333' },
  categoryButton: {
    flex: 1, // Ensure buttons take equal width in columns
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    margin: 4, // Margin around each button for spacing
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  recipeItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  recipeName: { fontSize: 18, color: '#555' },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
});
