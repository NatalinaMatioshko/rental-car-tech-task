import axios from 'axios';

const BASE_URL = 'https://car-rental-api.goit.global';

const api = axios.create({
  baseURL: BASE_URL,
});

// Функція для отримання всіх автомобілів з каталогу
export const fetchCars = async (params = {}) => {
  try {
    const response = await api.get('/cars', { params });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cars');
  }
};

// Функція для отримання автомобілів з фільтрами
export const fetchCarsWithFilters = async (filters, page = 1, limit = 8) => {
  try {
    // Створюємо рядок з параметрами фільтрації
    let queryParams = `?page=${page}&limit=${limit}`;

    // Додаємо параметри фільтрів, якщо вони є
    if (filters.make) queryParams += `&make=${filters.make}`;
    if (filters.rentalPrice)
      queryParams += `&rentalPrice=${filters.rentalPrice}`;
    if (filters.mileageFrom)
      queryParams += `&mileageFrom=${filters.mileageFrom}`;
    if (filters.mileageTo) queryParams += `&mileageTo=${filters.mileageTo}`;

    const response = await api.get(`/api/cars${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Помилка при отриманні автомобілів з фільтрами:', error);
    throw error;
  }
};

// Функція для отримання інформації про конкретний автомобіль за ID

export const fetchCarById = async (id) => {
  try {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch car details');
  }
};

// Функція для отримання всіх доступних брендів автомобілів (для фільтра)

export const fetchBrands = async () => {
  try {
    const response = await api.get('/brands');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch car brands');
  }
};

export default api;
