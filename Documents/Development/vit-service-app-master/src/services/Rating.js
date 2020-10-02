import api from './api';

export const update = (ratingID, data) => {
  return api.put(`ratings/${ratingID}`, data);
};
