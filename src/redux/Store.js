// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import currencyReducer from '../redux/reducers/CurrencySlice';
import calculatorReducer from './reducers/CalculatorSlice';
import branchReducer from './reducers/BranchSlice';
import authReducer from './reducers/authSlice';
import adminReducer from './reducers/AdminSlice';
import { apiSlice } from './reducers/ApiSlice';
import newsReducer from './reducers/NewsSlice';
import priceReducer from './reducers/priceSlice'
export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    calculator: calculatorReducer,
    branch: branchReducer,
    auth: authReducer,
    news:newsReducer,
     admin:adminReducer,
     prices:priceReducer,
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
