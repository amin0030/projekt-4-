import { Platform } from 'react-native';

export const API_BASE_URL =
    Platform.OS === 'android'
        ? 'http:// 192.168.0.113:5224' // Android emulator
        : 'http:// 192.168.0.113:5224'; // iOS simulator or physical devices
