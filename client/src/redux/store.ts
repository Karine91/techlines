import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import productsReducer from "./slices/product";
import cartReducer from "./slices/cart";
import userReducer from "./slices/user";
import orderReducer from "./slices/order";
import { useSelector, useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
  extra: { s: string; n: number };
}>();
