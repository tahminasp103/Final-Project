import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from '../redux/reducers/CurrencySlice';
import calculatorReducer from '../redux/reducers/CalculatorSlice';
import { apiSlice } from "./reducers/apiSlice";
import authReducer from './reducers/AuthSlice'
import branchReducer from '../redux/reducers/BranchSlice'
export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    calculator: calculatorReducer,
      auth:authReducer,
      branches:branchReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // ✅ RTK query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // ✅ RTK query middleware
  devTools: true,
});
