// src/redux/api/authApiSlice.js
import { apiSlice } from "./ApiSlice";
import { setCredentials } from "./authSlice";

const AUTH_URL = '/api/users/login';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: AUTH_URL,
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: data.user, token: data.token }));
          localStorage.setItem('user', JSON.stringify({ user: data.user, token: data.token }));
        } catch (error) {
          console.error('Login error:', error);
        }
      },
    }),
    // başqa endpoint-lər buraya əlavə oluna bilər
  }),
});

export const { useLoginMutation } = authApiSlice;
