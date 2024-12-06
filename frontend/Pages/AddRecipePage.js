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
} from 'react-native';
import { API_BASE_URL } from '../config';

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

    const handleAddIngredient = () => {
        if (!ingredientName || !ingredientQuantity) {
            Alert.alert('Error', 'Please provide both ingredient name and quantity.');
            return;
        }
        setIngredients([...ingredients, { name: ingredientName, quantity: ingredientQuantity }]);
        setIngredientName('');
        setIngredientQuantity('');
    };

    const handleAddInstruction = () => {
        if (!instructionStep || !instructionDescription) {
            Alert.alert('Error', 'Please provide both step number and description.');
            return;
        }
        setInstructions([...instructions, { step: parseInt(instructionStep, 10), description: instructionDescription }]);
        setInstructionStep('');
        setInstructionDescription('');
    };

    const handleAddRecipe = async () => {
        const newRecipe = {
            name,
            description,
            categoryId: parseInt(categoryId, 10),
            ingredients,
            instructions,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}/recipes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRecipe),
            });

            if (response.ok) {
                Alert.alert('Success', 'Recipe added successfully');
                navigation.goBack(); // Go back to ProfilePage
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Failed to add recipe');
            }
        } catch (error) {
            console.error('Error adding recipe:', error);
            Alert.alert('Error', 'An error occurred while adding the recipe');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Add New Recipe</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Recipe Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Category ID"
                    value={categoryId}
                    onChangeText={setCategoryId}
                />

                {/* Ingredients Section */}
                <Text style={styles.sectionTitle}>Ingredients</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingredient Name"
                    value={ingredientName}
                    onChangeText={setIngredientName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Quantity"
                    value={ingredientQuantity}
                    onChangeText={setIngredientQuantity}
                />
                <TouchableOpacity style={styles.addSubItemButton} onPress={handleAddIngredient}>
                    <Text style={styles.addSubItemButtonText}>Add Ingredient</Text>
                </TouchableOpacity>
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
                    keyboardType="numeric"
                    value={instructionStep}
                    onChangeText={setInstructionStep}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Step Description"
                    value={instructionDescription}
                    onChangeText={setInstructionDescription}
                />
                <TouchableOpacity style={styles.addSubItemButton} onPress={handleAddInstruction}>
                    <Text style={styles.addSubItemButtonText}>Add Instruction</Text>
                </TouchableOpacity>
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
                <TouchableOpacity style={styles.addButton} onPress={handleAddRecipe}>
                    <Text style={styles.addButtonText}>Add Recipe</Text>
                </TouchableOpacity>
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
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 20,
        fontSize: 16,
    },
    addSubItemButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    addSubItemButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#28a745',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    listItem: {
        fontSize: 16,
        marginVertical: 5,
    },
});
