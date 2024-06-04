import mongoose, { Schema } from "mongoose";


const orderItemSchema = new Schema({
    orderId: { 
        type: Schema.Types.ObjectId, 
        ref: "Order",  
    },
    productId: { 
        type: Schema.Types.ObjectId, 
        ref: "Product" 
    },
    price: {
        type: Number // Add price field to store price from Order
    },
    quantity: {
        type: Number // Add quantity field to store quantity from Order
    }

},{timestamps:true});

export const OrderItem = mongoose.model("OrderItem", orderItemSchema);