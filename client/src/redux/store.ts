import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/product";
import cartReducer from "./slices/cart";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
