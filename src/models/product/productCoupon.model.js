import mongoose,{Schema} from "mongoose";

const productCouponSchema = new Schema({
    value: {
        type: String,
        required: true,
    }, 
    discount: {
        type: Number,
        required: true,
    }
},{timestamps:true});

const ProductCoupon = mongoose.model("ProductCoupon", productCouponSchema);

export default ProductCoupon;