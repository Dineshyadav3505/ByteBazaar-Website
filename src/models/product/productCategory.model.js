import mongoose,{Schema} from "mongoose";

const productCategorySchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true
    },
   
}, { timestamps: true });

export const ProductCategory = mongoose.model("ProductCategory", productCategorySchema);