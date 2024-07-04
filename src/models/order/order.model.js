import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    productId: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Product", 
        required: true 
    }],
    userAddress: { 
        type: Schema.Types.ObjectId, 
        ref: "Address", 
        required: true 
    },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
