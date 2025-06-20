import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'Token tapılmadı. Giriş edin.' });
    }
    try {
      const { data } = await axios.post(
        'http://localhost:7777/api/orders',
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: 'Naməlum xəta' });
    }
  }
);





const orderSlice = createSlice({
  name: 'order',
  initialState: { loading: false, order: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Xəta baş verdi';
      });
  },
});

export default orderSlice.reducer;
