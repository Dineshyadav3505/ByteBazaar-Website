import mongoose,{Schema} from "mongoose";

const reviewSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User",
    },
    productId: { 
        type: Schema.Types.ObjectId, 
        ref: "Product", 
    },
    rating: { 
        type: Number, 
        required: true 
    },
    image:[{
        type:String,
    }],
    comment: { 
        type: String,
        required: true 
    },
}, { timestamps: true });

export const Review = mongoose.model("Review", reviewSchema);
