import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    FlatList,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const API_BASE_URL = 'http://10.10.130.6:5224'; // Replace with your actual API base URL

export default function AddRecipePage({ route, navigation }) {
    const { userId } = route.params;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);

    const [ingredientName, setIngredientName] = useState('');
    const [ingredientQuantity, setIngredientQuantity] = useState('');
    const [instructionStep, setInstructionStep] = useState('');
    const [instructionDescription, setInstructionDescription] = useState('');

    const [isLoading, setIsLoading] = useState(false); // To show loading spinner while submitting

    // Handle adding ingredients
    const handleAddIngredient = () => {
        if (!ingredientName || !ingredientQuantity) {
            Alert.alert('Error', 'Please provide both ingredient name and quantity.');
            return;
        }
        setIngredients([...ingredients, { name: ingredientName, quantity: ingredientQuantity }]);
        setIngredientName('');
        setIngredientQuantity('');
    };

    // Handle adding instructions
    const handleAddInstruction = () => {
        if (!instructionStep || !instructionDescription) {
            Alert.alert('Error', 'Please provide both step number and description.');
            return;
        }
        setInstructions([
            ...instructions,
            { step: parseInt(instructionStep, 10), description: instructionDescription },
        ]);
        setInstructionStep('');
        setInstructionDescription('');
    };

    // Function to handle adding recipe (POST request)
    const handleAddRecipe = () => {
        if (!name || !description || !categoryId || ingredients.length === 0 || instructions.length === 0) {
            Alert.alert('Error', 'Please fill in all fields and add ingredients and instructions.');
            return;
        }

        const newRecipe = {
            userId: userId,
            name: name,
            description: description,
            categoryId: parseInt(categoryId), // Ensure categoryId is an integer
            ingredients: ingredients,
            instructions: instructions,
        };

        setIsLoading(true); // Start loading

        // Send the recipe data to the backend
        fetch(`${API_BASE_URL}/users/${userId}/recipes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecipe),
        })
            .then((response) => response.json())
            .then((data) => {
                setIsLoading(false); // Stop loading
                if (data && data.id) {
                    Alert.alert('Success', 'Recipe added successfully!');
                    navigation.goBack(); // Go back to the previous screen after success
                } else {
                    Alert.alert('Error', 'Something went wrong. Please try again.');
                }
            })
            .catch((error) => {
                setIsLoading(false); // Stop loading
                console.error('Error adding recipe:', error);
                Alert.alert('Error', 'Network request failed. Please try again.');
            });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.title}>Add New Recipe</Text>

                {/* Recipe Name */}
                <Text style={styles.label}>Recipe Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter recipe name"
                    placeholderTextColor="#666"
                    value={name}
                    onChangeText={setName}
                />

                {/* Description */}
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter description"
                    placeholderTextColor="#666"
                    value={description}
                    onChangeText={setDescription}
                />

                {/* Category */}
                <Text style={styles.label}>Category ID</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter category ID"
                    placeholderTextColor="#666"
                    value={categoryId}
                    onChangeText={setCategoryId}
                />

                {/* Ingredients Section */}
                <Text style={styles.sectionTitle}>Ingredients</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingredient Name"
                    placeholderTextColor="#666"
                    value={ingredientName}
                    onChangeText={setIngredientName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Quantity"
                    placeholderTextColor="#666"
                    value={ingredientQuantity}
                    onChangeText={setIngredientQuantity}
                />
                <TouchableOpacity style={styles.addIngredientButton} onPress={handleAddIngredient}>
                    <Text style={styles.addIngredientText}>Add Ingredient</Text>
                </TouchableOpacity>

                {/* Ingredients List */}
                <FlatList
                    data={ingredients}
                    keyExtractor={(item, index) => `${item.name}-${index}`}
                    renderItem={({ item }) => (
                        <Text style={styles.listItem}>
                            {item.name} - {item.quantity}
                        </Text>
                    )}
                />

                {/* Instructions Section */}
                <Text style={styles.sectionTitle}>Instructions</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Step Number"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={instructionStep}
                    onChangeText={setInstructionStep}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Step Description"
                    placeholderTextColor="#666"
                    value={instructionDescription}
                    onChangeText={setInstructionDescription}
                />
                <TouchableOpacity style={styles.addInstructionButton} onPress={handleAddInstruction}>
                    <Text style={styles.addInstructionText}>Add Instruction</Text>
                </TouchableOpacity>

                {/* Instructions List */}
                <FlatList
                    data={instructions}
                    keyExtractor={(item, index) => `${item.step}-${index}`}
                    renderItem={({ item }) => (
                        <Text style={styles.listItem}>
                            Step {item.step}: {item.description}
                        </Text>
                    )}
                />

                {/* Add Recipe Button */}
                <TouchableOpacity style={styles.addRecipeButton} onPress={handleAddRecipe} disabled={isLoading}>
                    <Text style={styles.addRecipeText}>Add Recipe</Text>
                </TouchableOpacity>

                {/* Loading Indicator */}
                {isLoading && <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F6F7E7', // Background color matches the app theme
    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#444',
        marginVertical: 15,
    },
    listItem: {
        fontSize: 16,
        color: '#444',
        marginVertical: 5,
    },
    addIngredientButton: {
        backgroundColor: '#E7F6F8',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    addIngredientText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    addInstructionButton: {
        backgroundColor: '#E7F6F8',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    addInstructionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    addRecipeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: '#F6F7E7',
        borderRadius: 10,
        marginTop: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    addRecipeText: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    loading: {
        marginTop: 20,
    },
});
