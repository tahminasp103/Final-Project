// redux/reducers/paymentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { updateBalance } from './authSlice';  // Auth slice-dan import

export const checkCard = createAsyncThunk(
  'payment/checkCard',
  async (cardData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:7777/api/payment/check-card', cardData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Xəta baş verdi' });
    }
  }
);

export const createPayment = createAsyncThunk(
  'payment/createPayment',
  async (paymentData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      // paymentData içində userId, amount, paymentMethodId, currency olmalıdır
      const { data } = await axios.post('http://localhost:7777/api/payment', paymentData, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    cardExists: null,
    paymentResult: null,
    error: null,
    lastPayment: null, // burada balance saxlayırıq
  },
  reducers: {
    resetPaymentState: (state) => {
      state.loading = false;
      state.cardExists = null;
      state.paymentResult = null;
      state.error = null;
      state.lastPayment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cardExists = action.payload.exists;
      })
      .addCase(checkCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Kart yoxlanarkən xəta';
      })

      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentResult = action.payload.message;
        state.lastPayment = action.payload; // balance daxil burada olur
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Ödəniş zamanı xəta';
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;

// redux/reducers/authSlice.j
