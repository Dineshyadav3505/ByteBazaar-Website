import mongoose,{Schema} from "mongoose";

const cartItemSchema = new Schema({
    session: { 
        type: Schema.Types.ObjectId, 
        ref: "Shooping"
    },
    productId: { 
        type: Schema.Types.ObjectId, 
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true,
    }, 

},{timestamps:true});

export const CartItem = mongoose.model("CartItem", cartItemSchema);