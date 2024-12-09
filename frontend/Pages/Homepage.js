import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { API_BASE_URL } from "../config";

// Helper function to normalize image paths
const normalizeImagePath = (imagePath) => {
  if (imagePath.startsWith("http") || imagePath.startsWith("file")) {
    return imagePath;
  }
  return `${API_BASE_URL}${imagePath}`;
};

export default function HomePage({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const userId = 1; // Assuming this is the logged-in user's ID. You can replace this with dynamic data.

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
  }, []);

  // Fetch recipes from the API
  const fetchRecipes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes`);
      if (response.ok) {
        const data = await response.json();

        // Normalize image paths for all recipes
        const normalizedData = data.map((recipe) => ({
          ...recipe,
          image: normalizeImagePath(recipe.image),
        }));

        setRecipes(normalizedData);
        setFilteredRecipes(normalizedData); // Initially, show all recipes
      } else {
        setError("Failed to fetch recipes.");
        console.error("Backend response error:", response.status, response.statusText);
      }
    } catch (error) {
      setError("Network request failed");
      console.error("Error fetching recipes:", error);
    }
  };

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data); // Set categories
      } else {
        console.error("Failed to fetch categories:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle search functionality
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
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={handleSearch}
        />
        <Ionicons name="search-outline" size={20} color="#333" style={styles.searchIcon} />
      </View>

      {/* Category Buttons */}
      <View style={styles.categoryContainer}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => navigation.navigate("CategoryPage", { categoryId: item.id })}
            >
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Recipe Grid */}
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.recipeRow}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recipeCard}
            onPress={() => navigation.navigate("RecipePage", { recipeId: item.id })}
          >
            <Image
              source={{ uri: item.image }} // Image path is now normalized
              style={styles.recipeImage}
            />
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeTitle}>{item.name}</Text>
              <Text style={styles.recipeTime}>{item.time} mins</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Add Recipe Floating Button */}
      <TouchableOpacity
        style={styles.addRecipeButton}
        onPress={() => navigation.navigate("AddRecipePage", { userId })} // Passing userId to AddRecipePage
      >
        <Ionicons name="add" size={36} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
          <Ionicons name="home-outline" size={30} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("FriendsPage")}>
          <Ionicons name="people-outline" size={30} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ChatBotPage")}>
          <Ionicons name="chatbubble-outline" size={30} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProfilePage")}>
          <Ionicons name="person-outline" size={30} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7E7",
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  searchIcon: {
    marginLeft: 5,
  },
  categoryContainer: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  recipeRow: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  recipeCard: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },
  recipeImage: {
    width: "100%",
    height: 100,
  },
  recipeInfo: {
    padding: 10,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  recipeTime: {
    fontSize: 12,
    color: "#777",
  },
  addRecipeButton: {
    position: "absolute",
    bottom: 80, // Adjust to position above the nav bar
    right: 20,
    backgroundColor: "#CACBBA",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  navBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    elevation: 5,
    height: 60,
  },
});
