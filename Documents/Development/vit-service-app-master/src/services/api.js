/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { API_URL } from '../../env.json';
import EventSystem from '../util/eventsystem';
import refreshFCM from '../util/fcmToken';

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use(async (confi) => {
  confi.headers.Authorization = `Bearer ${await AsyncStorage.getItem(
    '@vitService:token',
  )}`;
  return confi;
});

api.interceptors.response.use(
  (res) => { return res; },
  async (erro) => {
    const originalRequest = erro.config;
    const refresh_token = await AsyncStorage.getItem(
      '@vitService:refresh_token',
    );
    console.log(JSON.stringify(erro.stack))
    if (erro.response && erro.response.status === 401 && !originalRequest._retry && refresh_token) {
      originalRequest._retry = true;
      return axios
        .post(`${API_URL}/auth`, { refresh_token })
        .then(async (response) => {
          if (response.status === 200) {
            await AsyncStorage.setItem(
              '@vitService:token',
              response.data.token,
            );
            originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
            refreshFCM(true);
            return axios(originalRequest);
          }
        })
        .catch(async () => {
          await AsyncStorage.removeItem('@vitService:token');
          await AsyncStorage.removeItem('@vitService:refresh_token');
          await AsyncStorage.removeItem('@vitService:user');
          await AsyncStorage.removeItem('@vitService:fcm_data');
          EventSystem.publish('refresh.token.error');
        });
    }
    return Promise.reject(erro);
  },
);
export default api;
