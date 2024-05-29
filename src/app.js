import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.jsom({ limit: process.env.Data_Limit }));

app.use(express.urlencoded({extended: true, limit: process.env.Data_Limit}));

app.use(express.static("public"))

app.use(cookieParser());

export {app} 