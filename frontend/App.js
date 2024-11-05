import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/Homepage';
import RecipePage from './Pages/RecipePage';
import CategoryPage from './Pages/CategoryPage';
import SearchPage from './Pages/SearchPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginPage} 
          options={{ title: 'Log ind' }} 
        />
        <Stack.Screen 
          name="HomePage" 
          component={HomePage} 
          options={{ title: 'Hjem' }} 
        />
        <Stack.Screen 
          name="RecipePage" 
          component={RecipePage} 
          options={{ title: 'Opskrift Detaljer' }} 
        />
        <Stack.Screen 
          name="CategoryPage" 
          component={CategoryPage} 
          options={{ title: 'Kategori' }} 
        />
        <Stack.Screen 
          name="SearchPage" 
          component={SearchPage} 
          options={{ title: 'Søg Resultater' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
