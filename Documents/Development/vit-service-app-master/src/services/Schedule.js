import api from './api';

export const getSchedules = (storeId, duration) => {
  return api.get(`scheduling/${storeId}`, {
    data: { duration },
  });
};

export const listSchedulesByUser = () => {
  return api.get('/orders/user');
};
