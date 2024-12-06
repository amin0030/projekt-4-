import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function ProfilePage({ navigation }) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Back Button */}
<TouchableOpacity
  style={styles.backButton}
  onPress={() => navigation.navigate("HomePage")} // Navigate to HomePage
>
  <Ionicons name="arrow-back" size={24} color="#000" />
</TouchableOpacity>
  
          {/* Profile Details */}
          <View style={styles.profileContainer}>
            <Image
              source={require('../assets/dp.webp')} // Replace with your profile picture
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>Bob Lee</Text>
          </View>
  
          {/* Menu Options */}
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('MyProfilePage')} // Navigate to MyProfilePage
            >
              <FontAwesome name="user-o" size={20} color="#000" />
              <Text style={styles.menuText}>My Profile</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.menuItem}
                onPress={() => navigation.navigate('FavouritesPage')} 
            >
              <FontAwesome name="heart-o" size={20} color="#000" />
              <Text style={styles.menuText}>Favourites</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="settings-outline" size={20} color="#000" />
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
          </View>
  
          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={20} color="#000" />
            <Text style={styles.logoutText}>Logout</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  menuContainer: {
    flex: 1,
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  menuText: {
    marginLeft: 15,
    fontSize: 18,
    color: '#000',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#F6F7E7',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
