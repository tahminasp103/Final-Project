import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from '../redux/reducers/CurrencySlice'
export const store = configureStore({
    reducer:{
        currency:currencyReducer
    }
})