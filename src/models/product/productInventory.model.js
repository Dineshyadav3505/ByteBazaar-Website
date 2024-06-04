import mongoose,{Schema} from "mongoose";

const productInventorySchema = new Schema({
    quantity: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

export const ProductInventory = mongoose.model("ProductInventory", productInventorySchema);