import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import  Product from "../../models/product/product.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import Order from "../../models/order/order.model.js";
import productId from "../../models/product/product.model.js";
import UserAddress from "../../models/user/userAddress.model.js";
import { OrderPaymentDetails } from "../../models/order/orderPaymentDetails.model.js";


const orderPyament = asyncHandler(async (req, res) => {

    const user = req.user;
    const { paymentMode, paymentGateway } = req.body;
    if(!paymentMode || !paymentGateway){
        throw new ApiError(400, "Please fill all the fields");
    }
    const userId = (user.id)
    
    const order = await Order.findOneAndUpdate(userId);
    const orderId = (order.id);
    const productId = (order.productId);
    const product =  await Product.findById(productId);
    const price = (product.price)
    const disconnect = (product.discount)
    const amount = (price - disconnect);

    const orderPaymentDetails = await OrderPaymentDetails.create({
        orderId,
        userId,
        amount,
        paymentMode,
        paymentGateway,
    });

    res
        .status(201)
        .json(
            new ApiResponse(201, orderPaymentDetails, "Order payment successfully")
    );
});

const update = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { status } = req.body;

    if(!status){
        throw new ApiError(400, "Update status is required");
    }

    const orderPaymentDetails = await OrderPaymentDetails.findOneAndUpdate(
        { userId },
        { status },
        { new: true }
    );

    if(!orderPaymentDetails){
        throw new ApiError(404, "Order payment details not found");
    }

    res
        .status(200)
        .json(
            new ApiResponse(200, orderPaymentDetails, "Order payment status updated successfully")
        );
});

const getOrderPayment = asyncHandler(async (req, res) => {
    const user = req.user;
    const userId = user._id.toString();

    const orders = await OrderPaymentDetails.find({ userId })
        .populate({
            path: "productId",
            select: "name price",
            strictPopulate: false
        })

    res
        .status(200)
        .json(
            new ApiResponse(200, orders, "Orders retrieved successfully")
        );
});


export { 
    orderPyament,
    update,
    getOrderPayment
 };