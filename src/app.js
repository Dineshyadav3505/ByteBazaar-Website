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
import userCartList from './routes/user/userCart.route.js';

import productRouter from "./routes/product/product.route.js";
import productCoupon from './routes/product/productCoupon.route.js';
import productReview from './routes/product/productReview.route.js';
import productImg    from './routes/product/productImg.route.js';

import userWishListItem from "./routes/user/userWistListItem.route.js.js"
import userCartItem from "./routes/user/userCartItem.route.js"
import order from "./routes/order/order.route.js"



app.use("/api/v1/users", userRouter, userAddress, userWishList, userCartList, userWishListItem, userCartItem);

app.use("/api/v1/products", productRouter); 

app.use("/api/v1/img", productImg);

app.use("/api/v1/coupon", productCoupon); 

app.use("/api/v1/review", productReview);

app.use("/api/v1/order", order);

export { app };