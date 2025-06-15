// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USER_STORAGE_KEY = 'user';

let storedUser = null;
try {
  const userData = localStorage.getItem(USER_STORAGE_KEY);
  if (userData && userData !== 'undefined') {
    storedUser = JSON.parse(userData);
  }
} catch (error) {
  console.error('❌ JSON parse error:', error);
  storedUser = null;
}

const initialState = {
  user: storedUser?.user || null,
  token: storedUser?.token || null,
  loading: false,
  error: null,
};

// Login thunk
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:7777/api/users/login', credentials);
      console.log('Login response data:', response.data); // burda cavabı yoxla
      return response.data; // { user: ..., token: ... }
    } catch (err) {
      console.error('Login error:', err);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem(USER_STORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('Login successful, payload:', action.payload);
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { setCredentials, clearUser } = authSlice.actions;
export default authSlice.reducer;
