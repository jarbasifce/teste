import api from './api';

export const list = () => {
  return api.get('/addresses');
};

export const store = (address) => {
  return api.post('/addresses', address);
};

export const listByUser = () => {
  return api.get(`/addresses/user`);
};

export const remove = (addressId) => {
  return api.delete(`/addresses/${addressId}`);
};
