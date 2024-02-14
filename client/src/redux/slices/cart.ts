import {
  PayloadAction,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { LS_CART_ITEMS, LS_SHIPPING } from "../../utils/constants";
import { RootState } from "../store";
import { IProduct } from "../../types/Product";

interface ICartItem
  extends Pick<
    IProduct,
    "name" | "stripeId" | "subtitle" | "price" | "stock" | "brand"
  > {
  id: string;
  qty: number;
  price: number;
  stripeId: string;
  image: string;
}

interface ICartState {
  entities: Record<string, ICartItem>;
  ids: string[];
  shipping: number;
  subtotal: number;
}

const cartAdapter = createEntityAdapter<ICartItem>();
//   {
//   sortComparer: (a, b) => b.addedAt.localeCompare(a.addedAt),
// }

function calculateSubtotal(entities: Record<string, ICartItem>) {
  const cartItems = Object.values(entities);
  if (!cartItems) return 0;
  return cartItems.reduce((acc, item) => {
    return acc + item.qty * item.price;
  }, 0);
}

export const getInitialState = (): ICartState => {
  const { entities, ids } = JSON.parse(
    localStorage.getItem(LS_CART_ITEMS) ||
      JSON.stringify({ entities: {}, ids: [] })
  );
  return cartAdapter.getInitialState({
    entities,
    ids,
    shipping: JSON.parse(localStorage.getItem(LS_CART_ITEMS) || "4.99"),
    // * check if it needed globally - if not just use the derived state in component
    subtotal: calculateSubtotal(entities),
  });
};

const updateLocalStorage = (state: RootState["cart"]) => {
  localStorage.setItem(
    LS_CART_ITEMS,
    JSON.stringify({ entities: state.entities, ids: state.ids })
  );
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialState(),
  reducers: {
    cartItemAdd: (
      state,
      {
        payload: { qty, product },
      }: PayloadAction<{ qty: number; product: IProduct }>
    ) => {
      const cartItem = {
        id: product._id,
        qty,
        name: product.name,
        image: product.images[0],
        price: product.price,
        stock: product.stock,
        brand: product.brand,
        stripeId: product.stripeId,
        subtitle: product.subtitle,
      };
      const existingItem = state.entities[product._id];

      if (existingItem) {
        // rewrite whole object in case product info changed as well
        state.entities[product._id] = cartItem;
      } else {
        cartAdapter.addOne(state, cartItem);
      }
      updateLocalStorage(state);
      state.subtotal = calculateSubtotal(state.entities);
    },
    cartItemRemove: (state, { payload }: PayloadAction<string>) => {
      cartAdapter.removeOne(state, payload);
      updateLocalStorage(state);
      state.subtotal = calculateSubtotal(state.entities);
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
