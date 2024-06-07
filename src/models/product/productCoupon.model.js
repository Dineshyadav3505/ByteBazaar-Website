import mongoose,{Schema} from "mongoose";

const productCouponSchema = new Schema({
    value: {
        type: String,
        required: true,
    }, 
},{timestamps:true});

export const ProductCoupon = mongoose.model("ProductCoupon", productCouponSchema);