import api from './api';

export const listByStore = (
  storeId,
  filterBy = '0,0',
  page = 1,
  search = null,
) => {
  return api.get(`/services/store/${storeId}`, {
    params: { page, filterBy, search },
  });
};

export const show = (id = 0) => {
  return api.get(`/services/${id}`);
};
