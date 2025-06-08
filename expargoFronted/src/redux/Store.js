// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import currencyReducer from '../redux/reducers/CurrencySlice';
import calculatorReducer from '../redux/reducers/CalculatorSlice';
import branchReducer from '../redux/reducers/BranchSlice';
import authReducer from '../redux/reducers/AuthSlice';

import { apiSlice } from './reducers/apiSlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    calculator: calculatorReducer,
    branches: branchReducer,
    auth: authReducer,

    // RTK Query-dən gələn reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware), // Yalnız bir dəfə middleware əlavə edin
  devTools: true,
});

// RTK Query-nin focus/reconnect davranışlarını aktivləşdir
setupListeners(store.dispatch);
