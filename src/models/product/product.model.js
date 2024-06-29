import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    imageURL: [
        { 
            type: String,
            required: true
        }
    ],
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: [],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fit: {
        type: String,
        required: true
    },
    washCare: {
        type: [],
        required: true
    },
    specification: {
        type: [],
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
    productType: { 
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    inventoryId: {
        type: Schema.Types.ObjectId, 
        ref: "ProductInventory",
    },
   
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;