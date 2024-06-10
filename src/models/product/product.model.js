import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    imageURL: [
        { 
            type: String,
            required: true
        }
    ],
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true
    },
    price: { 
        type: Number, 
        required: true 
    },
    size:{
        type: Array,
        required: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },
    discount: { 
        type: Number,
        required: true 
    },
    categoryId: { 
        type: Schema.Types.ObjectId, 
        ref: "ProductCategory",
    },
    inventoryId: {
        type: Schema.Types.ObjectId, 
        ref: "ProductInventory",
    },
   
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;