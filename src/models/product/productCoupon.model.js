import mongoose,{Schema} from "mongoose";

const productDiscountSchema = new Schema({
    value: {
        type: String,
        required: true,
    }, 
},{timestamps:true});

export const ProductDiscount = mongoose.model("ProductDiscount", productDiscountSchema);