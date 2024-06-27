import mongoose,{Schema} from 'mongoose'


const bestSellerSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
}, { timestamps: true });

const BestSeller = mongoose.model("BestSeller", bestSellerSchema);

export default BestSeller;