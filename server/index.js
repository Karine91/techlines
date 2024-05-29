import dotenv from "dotenv";
import connectToDatabase from "./database.js";
import cors from "cors";
import express from "express";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectToDatabase();
const app = express();
app.use(cors());

app.use(express.json());

const port = process.env.PORT || 5000;

// app.use((err, req, res, next) => {
//   console.log(err.stack);
//   res.status(500).send("Internal Server Error");
// });

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log("Server runs on port " + port);
});
