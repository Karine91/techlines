import { statusHelper } from "./../../utils/statusHelper";
import { PayloadAction, createSlice, createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { IProduct } from "../../types/Product";
import {
  getProduct,
  getProducts,
  createProductReview,
} from "../actions/productActions";
import { Status } from "./types";
import { LS_FAVORITES_KEY } from "../../utils/constants";
import { handleError } from "./util";

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
  reviewed: boolean;
}

export const initialState: IProductState = {
  status: Status.IDLE,
  error: null,
  products: [],
  product: null,
  reviewed: false,
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
      state.status = Status.RESOLVED;
    });
    builder.addCase(getProducts.pending, (state) => {
      state.status = Status.PENDING;
    });
    builder.addCase(getProducts.rejected, handleError);
    builder.addCase(getProduct.pending, (state) => {
      state.status = Status.PENDING;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.status = Status.RESOLVED;
    });
    builder.addCase(getProduct.rejected, handleError);
    builder.addCase(createProductReview.fulfilled, (state) => {
      state.reviewed = true;
    });
    builder.addCase(createProductReview.rejected, handleError);
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
export const getStatuses = createSelector(
  (state: RootState) => state.products.status,
  (status) => statusHelper(status)
);

export default productSlice.reducer;
