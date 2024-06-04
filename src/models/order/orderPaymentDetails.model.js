import mongoose,{Schema } from "mongoose";

const orderPaymentDetailsSchema = new Schema({
    orderId:{
        type:Schema.Types.ObjectId,
        ref:"Order"
    },
    amount:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    paymentMode:{
        type:String,
        required:true,
    },
    paymentGateway:{
        type:String,
        required:true,
    }

    
},{timestamps:true});

export const OrderPaymentDetails = mongoose.model("OrderPaymentDetails", orderPaymentDetailsSchema);