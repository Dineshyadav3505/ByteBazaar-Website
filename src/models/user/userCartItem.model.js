import mongoose,{Schema} from "mongoose";

const cartItemSchema = new Schema({
    cartId: { 
        type: Schema.Types.ObjectId, 
        ref: "Cart"
    },
    productId: { 
        type: Schema.Types.ObjectId, 
        ref: "Product",
        unique: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    }, 
    productSize: {
        type: String,
        required: true,
    }

},{timestamps:true});

const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;