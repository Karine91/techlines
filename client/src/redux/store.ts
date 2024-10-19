import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import productsReducer from "./slices/product";
import cartReducer from "./slices/cart";
import orderReducer from "./slices/order";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
