import mongoose,{Schema} from "mongoose";

const userPaymentSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    paymentType: {
        type: String,
        required: true,
    },
    provider:{
        type:String,
        required:true,
    },
    accountNumber:{
        type:Number
    },



},{timestamps: true});

export const UserPayment = mongoose.model("UserPayment", userPaymentSchema);    