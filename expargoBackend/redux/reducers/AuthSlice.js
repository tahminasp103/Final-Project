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

    // localStorage-da da güncəllə
    localStorage.setItem('user', JSON.stringify(state.user));
  }
},
  },
});

export const { setCredentials, logout, updateBalance } = authSlice.actions;
export default authSlice.reducer;
