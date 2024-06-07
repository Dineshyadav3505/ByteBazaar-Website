import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: process.env.DATA_LIMIT }));

app.use(express.urlencoded({ extended: true, limit: process.env.DATA_LIMIT }));

app.use(express.static("public"));

app.use(cookieParser());

// Routes
///////////////////////////////////////////////////////////////
import userRouter from "./routes/user/user.route.js";
import userAddress from './routes/user/userAddress.route.js';
import userWishList from './routes/user/userWishList.route.js';
import userShoppingList from './routes/user/userShopping.route.js';

import productRouter from "./routes/product/product.route.js";
import productCategory from "./routes/product/productCategory.route.js";
import productInventory from "./routes/product/productInventory.route.js";
// import productCategory from "./routes/product/productCategory.route.js";
app.use("/api/v1/users", userRouter, userAddress, userWishList, userShoppingList);

app.use("/api/v1/products", productRouter, productCategory,productInventory );

export { app };