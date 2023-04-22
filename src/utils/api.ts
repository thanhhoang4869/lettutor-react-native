import axios from 'axios';
import storageService from 'services/storageService';
import {Alert} from 'react-native';

const api = axios.create({
  baseURL: 'https://sandbox.api.lettutor.com',
  headers: {
    'Content-Type': 'application/json',
    Origin: 'https://sandbox.app.lettutor.com',
    Referer: 'https://sandbox.app.lettutor.com/',
  },
});

api.interceptors.request.use(async config => {
  const token = await storageService.getString('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  async err => {
    const originalConfig = err.config;
    if (originalConfig.url !== '/auth/login' && err.response) {
      if (err.response.status === 401) {
        storageService.removeItem('access_token');
        Alert.alert(
          'Your session has expired. Please login again to continue.',
        );
      }
    }
  },
);

export default api;
