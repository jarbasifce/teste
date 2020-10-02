import api from './api';

export const orderByUser = (id = '') => {
  return api.get(`/orders/user/${id}`);
};

export const store = (data = {}) => {
  return api.post('/orders', data);
};

export const show = (orderID) => {
  return api.get(`/orders/${orderID}`);
};

export const cancel = (orderID) => {
  return api.put(`/orders/${orderID}`, {
    status: 'cancelado',
  });
};
