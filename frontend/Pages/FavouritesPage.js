import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { API_BASE_URL } from '../config';

export default function FavouritesPage({ route, navigation }) {
  const { userId } = route.params;
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  const fetchFavorites = async () => {
    if (!userId) {
      setError('User ID is missing. Cannot fetch favorites.');
      return;
    }

    try {
      console.log(`Fetching favorites for userId: ${userId}`);
      const response = await fetch(`${API_BASE_URL}/users/${userId}/favorites`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched Favorites:', data);
        setFavorites(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch favorites.');
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setError('An error occurred while fetching favorites.');
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [userId]);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = favorites.filter((recipe) =>
        recipe.name.toLowerCase().includes(text.toLowerCase())
      );
      setFavorites(filtered);
    } else {
      fetchFavorites();
    }
  };

  const navigateToRecipe = (recipeId) => {
    if (!userId) {
      Alert.alert('Error', 'User ID is missing. Please log in again.');
      return;
    }

    console.log('Navigating to RecipePage with:', { recipeId, userId });
    navigation.navigate('RecipePage', { recipeId, userId });
  };

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.error}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Favorites"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>

        {/* Favorites List */}
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.favoriteItem}
              onPress={() => navigateToRecipe(item.id)}
            >
              <Text style={styles.favoriteTitle}>{item.name}</Text>
              <Ionicons name="heart" size={20} color="#f00" />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F7E7',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  searchContainer: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  searchInput: {
    height: 50,
    fontSize: 16,
    paddingHorizontal: 15,
    color: '#333',
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  favoriteTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});
