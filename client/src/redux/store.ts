import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/product";
import cartReducer from "./slices/cart";
import userReducer from "./slices/user";
import { useSelector, useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
