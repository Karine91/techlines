import { statusHelper } from "./../../utils/statusHelper";
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

export const selectProducts = (state: RootState) => state.products.products;
export const getStatuses = (state: RootState) =>
  statusHelper(state.products.status);

export default productSlice.reducer;
