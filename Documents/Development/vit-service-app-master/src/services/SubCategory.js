import api from './api';

export const list = (page = 1, search = null) => {
  return api.get('/categories', { params: { page, search } });
};

export const show = (id = 0) => {
  return api.get(`/categories/${id}`);
};
