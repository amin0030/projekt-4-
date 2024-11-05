import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { API_BASE_URL } from '../config';

export default function SearchPage({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchRecipes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes/search?query=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for recipes..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={searchRecipes} />
      <FlatList
        data={results}
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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  recipeItem: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
