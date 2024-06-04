import mongoose,{Schema} from "mongoose";

const AddressSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    addressLine1:{
        type:String,
        required:true,
    },
    addressLine2:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    pincode:{
        type: Number,
        required:true,
    },
    country:{
        type:String,
        default:"India"
    },
    phone:{
        type: Number,
        required:true,
    },

    
},{timestamps:true});

export default mongoose.model("Address",AddressSchema);