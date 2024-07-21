import { createSlice } from "@reduxjs/toolkit";
import { LS_SHIPPING_ADDRESS } from "../../utils/constants";
import { RootState } from "../store";
import { getUserOrders } from "../actions/userActions";

export const initialState = {
  orderInfo: null,
  orderId: null,
  shippingAddress: JSON.parse(localStorage.getItem(LS_SHIPPING_ADDRESS) || ""),
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setShippingAddress: (state, { payload }) => {
      state.shippingAddress = payload;

      localStorage.setItem(LS_SHIPPING_ADDRESS, JSON.stringify(payload));
    },
    clearOrder: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.orderInfo = action.payload.data;
    });
  },
});

export const { setShippingAddress, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
export const orderSelector = (state: RootState) => state.order;
