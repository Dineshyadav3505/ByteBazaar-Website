import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
    },
    productId: { 
        type: Schema.Types.ObjectId, 
        ref: "Product", 
    },
    color:{
        type: String,
        required: true
    },
    size:{
        type: String,
        required: true
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    userAddress: { 
        type: Schema.Types.ObjectId, 
        ref: "Address", 
    },
    
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;