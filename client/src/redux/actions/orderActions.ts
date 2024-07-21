import { client } from "../../lib/api-client";
import { createAppAsyncThunk } from "../store";

export const setPayment = createAppAsyncThunk<string, void>(
  "orders/setPayment",
  async (_, { getState }) => {
    const {
      cart: { entities, subtotal, shipping, ids },
      order: { shippingAddress },
      user: { userInfo },
    } = getState();

    console.log(shippingAddress);

    const newOrder = {
      subtotal,
      shipping,
      shippingAddress,
      cartItems: ids.map((item) => entities[item]),
      userInfo,
    };

    const { data } = await client("api/checkout", {
      data: newOrder,
      method: "POST",
      token: userInfo?.token,
    });

    return data.url;
  }
);
