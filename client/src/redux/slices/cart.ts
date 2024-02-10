import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Status } from "./types";
import { LS_CART_ITEMS, LS_SHIPPING } from "../../utils/constants";
import { RootState } from "../store";

interface ICartItem {
  id: string;
  qty: number;
  price: number;
}

interface ICartState {
  cartItems: ICartItem[];
  shipping: number;
  subtotal: number;
}

function calculateSubtotal(cartItems?: ICartItem[]) {
  if (!cartItems) return 0;
  return cartItems.reduce((acc, item) => {
    return acc + item.qty * item.price;
  }, 0);
}

export const getInitialState = (): ICartState => {
  const cartItems = JSON.parse(localStorage.getItem(LS_CART_ITEMS) || "[]");
  return {
    cartItems,
    shipping: JSON.parse(localStorage.getItem(LS_CART_ITEMS) || "4.99"),
    // * check if it needed globally - if not just use the derived state in component
    subtotal: calculateSubtotal(cartItems),
  };
};

const updateLocalStorage = (state: RootState["cart"]) => {
  localStorage.setItem(LS_CART_ITEMS, JSON.stringify(state.cartItems));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialState(),
  reducers: {
    cartItemAdd: (state, { payload }: PayloadAction<ICartItem>) => {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === payload.id
      );

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex] = payload;
      } else {
        state.cartItems.push(payload);
      }
      updateLocalStorage(state);
      state.subtotal = calculateSubtotal(state.cartItems);
    },
    cartItemRemove: (state, { payload }: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== payload);
      updateLocalStorage(state);
      state.subtotal = calculateSubtotal(state.cartItems);
    },
    setShippingCosts: (state, { payload }: PayloadAction<number>) => {
      state.shipping = payload;
      localStorage.setItem(LS_SHIPPING, payload.toString());
    },
    clearCart: () => {
      localStorage.removeItem(LS_SHIPPING);
      localStorage.removeItem(LS_CART_ITEMS);
      return getInitialState();
    },
  },
});

export const { setShippingCosts, cartItemAdd, cartItemRemove, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
