import api from './api';

export const listTopBanners = () => {
  return api.get(`/sponsor/banners/1`);
};

export const listBottomBanners = () => {
  return api.get(`/sponsor/banners/2`);
};

export const superCategoryBanner = (superCategoryID) => {
  return api.get(`/sponsor/banners/category/${superCategoryID}`);
};
