import { statusHelper } from "./../../utils/statusHelper";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { IProduct } from "../../types/Product";
import { getProducts } from "../actions/productActions";
import { Status } from "./types";
import { LS_FAVORITES_KEY } from "../../utils/constants";

export type Pagination = {
  currentPage: number;
  totalPages: number;
};

interface IProductState {
  status: Status;
  error: null | string;
  products: IProduct[];
  product: null | IProduct;
  pagination: Pagination;
  favoritesToggled: boolean;
  favorites: string[];
}

export const initialState: IProductState = {
  status: "idle",
  error: null,
  products: [],
  product: null,
  pagination: {} as Pagination,
  favoritesToggled: false,
  favorites: JSON.parse(localStorage.getItem(LS_FAVORITES_KEY) || "[]"),
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFavoritesToggled: (state, action: PayloadAction<boolean>) => {
      state.favoritesToggled = action.payload;
    },

    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    },
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<string>) => {
      const newFavorites = [...state.favorites, action.payload];
      localStorage.setItem(LS_FAVORITES_KEY, JSON.stringify(newFavorites));
      state.favorites = newFavorites;
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const newFavorites = state.favorites.filter(
        (favId) => favId !== action.payload
      );
      localStorage.setItem(LS_FAVORITES_KEY, JSON.stringify(newFavorites));
      state.favorites = newFavorites;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
      state.status = "resolved";
    });
    builder.addCase(getProducts.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.error =
        action.error.message ||
        "An unexpected error has occured. Please try again later";
      state.status = "rejected";
    });
  },
});

export const {
  setFavoritesToggled,
  setFavorites,
  setProducts,
  addToFavorites,
  removeFromFavorites,
} = productSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;
export const getStatuses = (state: RootState) =>
  statusHelper(state.products.status);

export default productSlice.reducer;
