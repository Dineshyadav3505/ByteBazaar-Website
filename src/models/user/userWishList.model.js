import mongoose,{Schema} from "mongoose";


const wishlistSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
});


export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
