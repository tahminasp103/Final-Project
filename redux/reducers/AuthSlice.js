// src/redux/reducers/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
updateBalance: (state, action) => {
  if (state.user) {
    state.user.balance = action.payload;

    // 🔥 LocalStorage-da da yenilə
    const updatedUser = { ...state.user, balance: action.payload };
    localStorage.setItem('userInfo', JSON.stringify(updatedUser));
  }
},
  },
});

export const { setCredentials, logout, updateBalance } = authSlice.actions;
export default authSlice.reducer;
