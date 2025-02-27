import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './carsSlice';
import favoritesReducer from './favoritesSlice';
import filtersReducer from './filtersSlice';

const store = configureStore({
  reducer: {
    cars: carsReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
  },
});

export default store;
