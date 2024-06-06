import mongoose,{Schema} from "mongoose";


const wishlistSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
});


const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;