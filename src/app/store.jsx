import { configureStore } from "@reduxjs/toolkit";

import cartReducer from '../features/cartSlice'
import authReducer from '../features/authSlice'
import adminReducer from '../features/adminSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        admin: adminReducer
    },
});