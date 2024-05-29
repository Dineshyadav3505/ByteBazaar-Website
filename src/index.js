import dotenv from 'dotenv' 
import connectToDatabase from "./db/dataConnection.js";

dotenv.config({
    path: "./.env"
})


connectToDatabase();



