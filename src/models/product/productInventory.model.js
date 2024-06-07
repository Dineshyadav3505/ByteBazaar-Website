import mongoose,{Schema} from "mongoose";

const productInventorySchema = new Schema({
    quantity: {
        type: Number,
        required: true,
    },
}, { timestamps: true });


const ProductInventory = mongoose.model("ProductInventory", productInventorySchema);

export default ProductInventory ;