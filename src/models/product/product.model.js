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
    discount: { 
        type: Number,
        required: true 
    },
    categoryId: { 
        type: Schema.Types.ObjectId, 
        ref: "ProductCategory",
    },
    incentoryId: {
        type: Schema.Types.ObjectId, 
        ref: "ProductInventory",
    },
   
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);