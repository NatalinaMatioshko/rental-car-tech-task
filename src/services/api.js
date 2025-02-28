import axios from 'axios';

const BASE_URL = 'https://car-rental-api.goit.global';

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchCars = async (params = {}) => {
  try {
    const response = await api.get('/cars', { params });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cars', error);
  }
};

export const fetchCarById = async (id) => {
  try {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch car details', error);
  }
};

export const fetchBrands = async () => {
  try {
    const response = await api.get('/brands');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch car brands', error);
  }
};

export default api;
