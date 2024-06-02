import dotenv from 'dotenv';
import { connectToDatabase } from "./db/dataConnection.js";
import { app } from './app.js';

dotenv.config({
    path: './.env'
});

connectToDatabase()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});

app.on('error', (error) => {
    console.log("Error:", error);
    throw error;
});