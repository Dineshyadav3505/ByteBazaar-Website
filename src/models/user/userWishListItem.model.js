import mongoose,{Schema} from "mongoose";

const wishlistItemSchema = new Schema({
    wishlistId: { 
        type: Schema.Types.ObjectId, 
        ref: "Wishlist"
    },
    productId: { 
        type: Schema.Types.ObjectId, 
        ref: "Product", 
    },
});

export const WishlistItem = mongoose.model("WishlistItem", wishlistItemSchema);