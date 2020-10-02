import api from './api';

export const list = (page = 1, search = null) => {
  return api.get('/stores', { params: { page, search } });
};

export const listBySubcategory = (subcategory = 1, page = 1) => {
  return api.get(`/stores/category/${subcategory}`, { page });
};

export const show = (id = 0) => {
  return api.get(`/stores/${id}`);
};

export const topRated = (id = 0, search = '') => {
  return api.get(`/stores/toprated/${id}`, { params: { search } });
};
