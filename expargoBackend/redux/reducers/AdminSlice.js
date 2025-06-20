// src/redux/reducers/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 🟡 Async login thunk
export const loginAdmin = createAsyncThunk(
  'admin/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post(
        'http://localhost:7777/api/users/admin/login',
        credentials,
        { withCredentials: true }
      );
      return data; // Gözlənilir: { user, token }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Giriş zamanı xəta baş verdi'
      );
    }
  }
);

// 🔵 Initial state
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// 🟢 Slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        if (!action.payload?.user || !action.payload?.token) {
          state.error = 'Serverdən gözlənilməyən cavab alındı';
          return;
        }
        localStorage.setItem("token", action.payload.token);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Giriş mümkün olmadı';
      })
      .addDefaultCase((state, action) => {
        // Sadəcə console üçün — crash olmasın
        if (!action?.type) {
          console.warn('❗ Undefined və ya boş action:', action);
        } else {
          console.log('🟠 Unhandled action:', action.type);
        }
      });
  },
});

// Export
export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
