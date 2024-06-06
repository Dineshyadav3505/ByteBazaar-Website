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
import productRouter from "./routes/product/product.route.js";
import userAddress from './routes/user/userAddress.route.js';
import userWishList from './routes/user/userWishList.route.js';

app.use("/api/v1/users", userRouter);
app.use("/api/v1/users", userAddress);
app.use("/api/v1/users", userWishList);
app.use("/api/v1/products", productRouter);

export { app };