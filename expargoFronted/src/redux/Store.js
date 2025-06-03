import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from '../redux/reducers/CurrencySlice';
import calculatorReducer from '../redux/reducers/CalculatorSlice';
import { apiSlice } from "./reducers/apiSlice";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    calculator: calculatorReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // ✅ RTK query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // ✅ RTK query middleware
  devTools: true,
});
