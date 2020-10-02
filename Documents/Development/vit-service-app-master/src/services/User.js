import api from './api';

export const store = (user) => {
  return api.post('/users', user);
};

export const setToken = (token) => {
  return api.post('/users/fcm', {
    token,
  });
};

export const forgot = (emial) => {
  return api.post('/users/forgot', emial);
};

export const me = () => {
  return api.get('/users/me');
};

export const update = (userID, data) => {
  return api.put(`/users/${userID}`, data);
};
