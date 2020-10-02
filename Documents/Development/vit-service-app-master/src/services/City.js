import api from './api';

export const list = (page = 1) => {
  return api.get('/cities', {
    params: { page },
  });
};
