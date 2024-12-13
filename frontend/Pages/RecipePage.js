import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { API_BASE_URL } from "../config";


const normalizeImagePath = (imagePath) => {
  if (imagePath.startsWith("http") || imagePath.startsWith("file")) {
    return imagePath;
  }
  return `${API_BASE_URL}${imagePath}`;
};

export default function RecipePage({ route, navigation }) {
  const { recipeId, userId: paramUserId } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(paramUserId || 1);

  useEffect(() => {
    console.log("RecipePage received navigation params:", { recipeId, paramUserId });

    const initializeUserId = async () => {
      if (!paramUserId) {
        setUserId(1); 
      }
      fetchRecipeDetails();
    };

    initializeUserId();
  }, [paramUserId]);

  const fetchRecipeDetails = async () => {
    try {
      console.log(`Fetching recipe details for recipeId: ${recipeId}`);
      const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}`);
      if (response.ok) {
        const data = await response.json();

        
        data.image = normalizeImagePath(data.image);

        setRecipe(data);
        setIsFavorite(data.favoriteByUsers && data.favoriteByUsers.includes(userId));
      } else {
        setError("Failed to fetch recipe details.");
      }
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      setError("An error occurred while fetching data.");
    }
  };

  const handleAddToFavorites = async () => {
    try {
      console.log("Adding to favorites:", { userId, recipeId });
      const response = await fetch(`${API_BASE_URL}/users/${userId}/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeId: recipeId,
        }),
      });

      if (response.ok) {
        setIsFavorite(true);
        Alert.alert("Success", "Recipe added to favorites!");
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Failed to add to favorites");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      Alert.alert("Error", "An error occurred while adding to favorites.");
    }
  };

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {recipe ? (
        <>
          <View style={styles.imageContainer}>
            <Image source={{ uri: recipe.image }} style={styles.image} />
            <View style={styles.headerIcons}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="share-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{recipe.name}</Text>
              <TouchableOpacity onPress={handleAddToFavorites}>
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={24}
                  color={isFavorite ? "#f00" : "#333"}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={18} color="#333" />
              <Text style={styles.infoText}>{recipe.time || "N/A"}</Text>
            </View>

            <Text style={styles.description}>{recipe.description}</Text>

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
    backgroundColor: "#F6F7E7",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 300,
  },
  headerIcons: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsContainer: {
    padding: 20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
    marginTop: 20,
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ingredientText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  instructionRow: {
    marginBottom: 15,
  },
  instructionStep: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  instructionText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
  loading: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
