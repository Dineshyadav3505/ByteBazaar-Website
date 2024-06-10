import mongoose,{Schema} from "mongoose";

const productCategorySchema = new Schema({
    type: { 
        type: String, 
        required: true 
    },
   
}, { timestamps: true });




const ProductCategory = mongoose.model("ProductCategory", productCategorySchema);

export default ProductCategory;