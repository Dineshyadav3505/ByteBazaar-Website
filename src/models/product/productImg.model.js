import mongoose,{Schema} from "mongoose";


const productImgSchema = new Schema({
    imageURL:[
        {
            type: String,
            required: true
        }
    ]
},{
    timestamps: true,
})

const ProductImg = mongoose.model("ProductImg", productImgSchema);

export default ProductImg;
