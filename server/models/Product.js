import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: { type: Array, required: true, default: [] },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    reviews: [reviewSchema],
    description: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numberOfReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    productIsNew: { type: Boolean, default: false },
    stripeId: {
      type: String,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
