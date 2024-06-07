import e from "express";
import mongoose,{Schema} from "mongoose";

const shoppingSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User" 
    },
    total:{
        type:Number,
        required:true,
    },
      
}, { timestamps: true});

const Shooping = mongoose.model("Shooping", shoppingSchema);

export default Shooping;