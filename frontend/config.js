import { Platform } from 'react-native';

export const API_BASE_URL =
    Platform.OS === 'android'
        ? 'http://10.10.130.6:5224' // Android emulator
        : 'http://10.10.130.6:5224'; // iOS simulator or physical devices
