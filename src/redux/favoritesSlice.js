import { createSlice } from '@reduxjs/toolkit';

const savedFavorites = localStorage.getItem('favorites')
  ? JSON.parse(localStorage.getItem('favorites'))
  : [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: savedFavorites,
  },
  reducers: {
    toggleFavorite: (state, { payload }) => {
      const index = state.items.findIndex((car) => car.id === payload.id);
      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(payload);
      }
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
