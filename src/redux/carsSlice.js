import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCars, fetchCarById } from '../services/api';

export const getCars = createAsyncThunk(
  'cars/getCars',
  async (params, { rejectWithValue }) => {
    try {
      return await fetchCars(params);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getCarById = createAsyncThunk(
  'cars/getCarById',
  async (id, { rejectWithValue }) => {
    try {
      return await fetchCarById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    items: [],
    selectedCar: null,
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
  },
  reducers: {
    resetCars: (state) => {
      state.items = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCars.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (state.page === 1) {
          state.items = payload.cars;
        } else {
          state.items = [...state.items, ...payload.cars];
        }
        state.totalPages = payload.totalPages;
        state.page = state.page + 1;
      })
      .addCase(getCars.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCarById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.selectedCar = payload;
      })
      .addCase(getCarById.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { resetCars } = carsSlice.actions;
export default carsSlice.reducer;
