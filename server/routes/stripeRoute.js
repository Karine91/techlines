import express from "express";
import Stripe from "stripe";
import Product from "../models/Product.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const stripeRoute = express.Router();

const stripePayment = async (req, res) => {
  const data = req.body;

  const lineItems = [];
  // push shipping item
  // push cartItems
  // instead of predefined products I could use price_data
  // const session = stripe.checkout.sessions.create({
  //     mode: 'payment',
  //     line_items: data.cartItems.map(item => ({
  //         price_data: {
  //             currency: 'usd',
  //             product_data: {
  //                 name: item.name
  //             },
  //             unit_amount: , // cents - hence multiply by 100
  //             quantity: item.qty
  //         }
  //     })),
  //     success_url:
  //         req.protocol +
  //         "://" +
  //         req.get("host") +
  //         "/checkout/success",
  //     cancel_url:
  //         req.protocol +
  //         "://" +
  //         req.get("host") +
  //         "/checkout/cancel",
  // });

  const order = new Order({
    orderItems: data.cartItems,
    user: data.userInfo._id,
    // username: data.userInfo.name,
    // email: data.userInfo.email,
    shippingAddress: data.shippingAddress,
    shippingPrice: data.shipping,
    subtotal: data.subtotal,
    totalPrice: data.subtotal + data.shipping,
  });

  const newOrder = await order.save();

  data.cartItems.forEach(async (cartItem) => {
    let product = await Product.findById(cartItem.id);
    product.stock = product.stock - cartItem.qty;
    product.save();
  });

  // res.json({
  //     orderId: newOrder._id.toString(),
  // 		url: session.url,
  // })
};

stripeRoute.route("/").post(stripePayment);

export default stripeRoute;
