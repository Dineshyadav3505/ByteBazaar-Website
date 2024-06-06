import mongoose,{Schema} from "mongoose";

const productDiscountSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true
    },
    discount: {
        type: number,
        required: true,
    }, 
    active:{ 
        type: Boolean,
        default: true
    },
},{timestamps:true});

export const ProductDiscount = mongoose.model("ProductDiscount", productDiscountSchema);