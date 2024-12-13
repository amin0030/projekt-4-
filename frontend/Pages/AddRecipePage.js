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
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const API_BASE_URL = 'http://10.192.152.110:5224'; 

export default function AddRecipePage({ route, navigation }) {
    const { userId } = route.params;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [image, setImage] = useState(null);

    const [ingredientName, setIngredientName] = useState('');
    const [ingredientQuantity, setIngredientQuantity] = useState('');
    const [instructionStep, setInstructionStep] = useState('');
    const [instructionDescription, setInstructionDescription] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    
    const handlePickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission required', 'You need to allow access to your photos to upload an image.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log("Selected Image URI:", result.assets[0].uri); 
            setImage(result.assets[0].uri);
        } else {
            console.log("Image selection canceled");
        }
    };

    
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
        setInstructions([
            ...instructions,
            { step: parseInt(instructionStep, 10), description: instructionDescription },
        ]);
        setInstructionStep('');
        setInstructionDescription('');
    };

    
    const handleAddRecipe = () => {
        if (!name || !description || !categoryId || ingredients.length === 0 || instructions.length === 0 || !image) {
            Alert.alert('Error', 'Please fill in all fields, add ingredients and instructions, and select an image.');
            return;
        }

        const newRecipe = {
            userId: userId,
            name: name,
            description: description,
            categoryId: parseInt(categoryId),
            ingredients: ingredients,
            instructions: instructions,
            image: image,
        };

        console.log("Submitting Recipe:", newRecipe); 

        setIsLoading(true);

        fetch(`${API_BASE_URL}/users/${userId}/recipes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecipe),
        })
            .then((response) => response.json())
            .then((data) => {
                setIsLoading(false);
                if (data && data.id) {
                    Alert.alert('Success', 'Recipe added successfully!');
                    navigation.goBack();
                } else {
                    Alert.alert('Error', 'Something went wrong. Please try again.');
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.error('Error adding recipe:', error);
                Alert.alert('Error', 'Network request failed. Please try again.');
            });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.title}>Add New Recipe</Text>

                <Text style={styles.label}>Recipe Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter recipe name"
                    placeholderTextColor="#666"
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter description"
                    placeholderTextColor="#666"
                    value={description}
                    onChangeText={setDescription}
                />

                <Text style={styles.label}>Category ID</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter category ID"
                    placeholderTextColor="#666"
                    value={categoryId}
                    onChangeText={setCategoryId}
                />

                <Text style={styles.label}>Recipe Image</Text>
                <TouchableOpacity style={styles.imagePickerButton} onPress={handlePickImage}>
                    <Text style={styles.imagePickerText}>Pick an Image</Text>
                </TouchableOpacity>
                {image ? (
                    <Image source={{ uri: image }} style={styles.imagePreview} />
                ) : (
                    <Text style={styles.noImageText}>No image selected</Text>
                )}

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

                <FlatList
                    data={ingredients}
                    keyExtractor={(item, index) => `${item.name}-${index}`}
                    renderItem={({ item }) => (
                        <Text style={styles.listItem}>
                            {item.name} - {item.quantity}
                        </Text>
                    )}
                />

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

                <FlatList
                    data={instructions}
                    keyExtractor={(item, index) => `${item.step}-${index}`}
                    renderItem={({ item }) => (
                        <Text style={styles.listItem}>
                            Step {item.step}: {item.description}
                        </Text>
                    )}
                />

                <TouchableOpacity style={styles.addRecipeButton} onPress={handleAddRecipe} disabled={isLoading}>
                    <Text style={styles.addRecipeText}>Add Recipe</Text>
                </TouchableOpacity>

                {isLoading && <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F6F7E7',
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
    imagePickerButton: {
        backgroundColor: '#E7F6F8',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    imagePickerText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    noImageText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
        marginBottom: 15,
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
    },
    addRecipeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    loading: {
        marginTop: 20,
    },
});
