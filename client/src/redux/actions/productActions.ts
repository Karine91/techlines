import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pagination } from "../slices/product";
import axios from "axios";
import { IProduct } from "../../types/Product";

interface IProductsRes {
  products: IProduct[];
  pagination: Pagination;
}

interface IProductsInput {
  page: number;
  favoriteToggled: boolean;
}

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (arg?: IProductsInput | void) => {
    const {
      data: { products, pagination },
    } = await axios.get("/api/products");
    return {
      products,
      pagination,
    } as IProductsRes;
  }
);
