import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log(` MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`);


    } catch (error) {
        console.error("MONGO-DB Connection Error:", error);
        process.exit(1);
    }
};

export default connectToDatabase;