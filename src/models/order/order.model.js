import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
    },
    paymentId:{
        type: Schema.Types.ObjectId,
        ref: "OrderPaymentDetails",
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
    price:{
        type: Schema.Types,
        required: true
    },
    
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);