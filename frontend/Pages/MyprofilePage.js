import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MyProfilePage({ navigation }) {
  const [firstName, setFirstName] = useState('Bob');
  const [lastName, setLastName] = useState('Lee');
  const [email, setEmail] = useState('bob_lee@gmail.com');
  const [password, setPassword] = useState('********');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        {/* Profile Details */}
        <View style={styles.profileContainer}>
          <View style={styles.profileImage} />
          <Text style={styles.profileName}>Bob Lee</Text>
        </View>

        {/* Editable Fields */}
        <View style={styles.fields}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>First Name</Text>
            <TextInput
              style={styles.fieldInput}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Last Name</Text>
            <TextInput
              style={styles.fieldInput}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              style={styles.fieldInput}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Password</Text>
            <TextInput
              style={styles.fieldInput}
              value={password}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>

        {/* Save Changes Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

        {/* Delete Account Button */}
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete Account</Text>
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
    marginBottom: 30,
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
  fields: {
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: '600',
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#F6F7E7',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  deleteButton: {
    backgroundColor: '#fff',
    borderColor: 'red',
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
});