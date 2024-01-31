import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { IProduct } from "../../types/Product";
import { getProducts } from "../actions/productActions";
import { Status } from "./types";

export type Pagination = {};

interface IProductState {
  status: Status;
  error: null | string;
  products: IProduct[];
  product: null | IProduct;
  pagination: Pagination;
  favoritesToggled: boolean;
}

export const initialState: IProductState = {
  status: "idle",
  error: null,
  products: [],
  product: null,
  pagination: {},
  favoritesToggled: true,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(getProducts.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.error = action.error.message || null;
      state.status = "rejected";
    });
  },
});

export const selectProducts = (state: RootState) => state.products.products;

export default productSlice.reducer;
