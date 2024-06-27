import mongoose,{Schema} from "mongoose";

const newArivalSchema = new Schema({
    productId:{
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    }
});

const NewArival = mongoose.model("NewArival", newArivalSchema);
export default NewArival;