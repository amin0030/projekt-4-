import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from './Pages/WelcomePage'; 
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import HomePage from './Pages/Homepage';
import RecipePage from './Pages/RecipePage';
import CategoryPage from './Pages/CategoryPage';
import SearchPage from './Pages/SearchPage';
import ChatBotPage from './Pages/ChatBotPage'; 

import ProfilePage from './Pages/ProfilePage';
import MyProfilePage from './Pages/MyprofilePage';
import FavouritesPage from './Pages/FavouritesPage';
import AddRecipePage from './Pages/AddRecipePage'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
         <Stack.Screen
          name="Welcome"
          component={WelcomePage}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ title: 'Log ind' }}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpPage}
          options={{ headerShown: false }}
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
        <Stack.Screen
          name="ChatBotPage"
          component={ChatBotPage}
          options={{ title: 'ChatBot' }} 
        />
         <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyProfilePage"
          component={MyProfilePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FavouritesPage"
          component={FavouritesPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddRecipePage"
          component={AddRecipePage}
          options={{ title: 'Add New Recipe' }} 
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
