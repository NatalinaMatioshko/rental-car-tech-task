import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBrands } from '../services/api';

export const getBrands = createAsyncThunk(
  'filters/getBrands',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchBrands();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    brands: [],
    selectedBrand: '',
    selectedPrice: '',
    minMileage: '',
    maxMileage: '',
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedBrand: (state, { payload }) => {
      state.selectedBrand = payload;
    },
    setSelectedPrice: (state, { payload }) => {
      state.selectedPrice = payload;
    },
    setMinMileage: (state, { payload }) => {
      state.minMileage = payload;
    },
    setMaxMileage: (state, { payload }) => {
      state.maxMileage = payload;
    },
    resetFilters: (state) => {
      state.selectedBrand = '';
      state.selectedPrice = '';
      state.minMileage = '';
      state.maxMileage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBrands.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.brands = payload;
      })
      .addCase(getBrands.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {
  setSelectedBrand,
  setSelectedPrice,
  setMinMileage,
  setMaxMileage,
  resetFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
