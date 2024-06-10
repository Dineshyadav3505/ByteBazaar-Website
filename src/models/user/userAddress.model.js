import mongoose,{Schema} from "mongoose";

const AddressSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        required:true,
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
        minLenght:[ 5, " invalid pincode"],
        maxLenght:[ 5, " invalid pincode"],
        required:true,
    },
    country:{
        type:String,
        default:"India"
    },
    phoneNumber:{
        type: Number,
        minLenght:[ 10, "Phone Number must contain 10 numbers"],
        maxLenght:[ 10, "Phone Number must contain 10 numbers"],
        required:true,
    },

    
},{timestamps:true});

const Address = mongoose.model("Address", AddressSchema);

export default Address;