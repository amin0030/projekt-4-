import { Platform } from 'react-native';

export const API_BASE_URL =
    Platform.OS === 'android'
        ? 'http://10.192.152.110:5224' 
        : 'http://10.192.152.110:5224'; 
