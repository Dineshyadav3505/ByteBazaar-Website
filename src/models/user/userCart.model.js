import e from "express";
import mongoose,{Schema} from "mongoose";

const cartSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User" 
    },
    total:{
        type:Number,
        default:0
    },
      
}, { timestamps: true});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;