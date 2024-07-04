import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import  Product from "../../models/product/product.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import Order from "../../models/order/order.model.js";
import ProductInventory from "../../models/product/productInventory.model.js";
import UserAddress from "../../models/user/userAddress.model.js";


const createOrder = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const id = (user._id).toString();
    console.log(id);
    const { productId, grandTotal, userAddress } = req.params;
    console.log(productId, grandTotal, userAddress);
    
  } catch (error) {
    console.log("error", error)
  }
  res.status(200).json(new ApiResponse(200, {}, "Order created successfully"));

});

const getOrders = asyncHandler(async (req, res) => {
    const user = req.user;

    const orders = await Order.find({ userId: user._id })
        .populate("productId")
        .populate("userAddress");

    res
        .status(200)
        .json(
            new ApiResponse(200, orders, "Orders retrieved successfully")
        );
});

const deleteOrder = asyncHandler(async (req, res) => {
    const user = req.user;
    const orderId = req.params.id;

    const order = await Order.findOneAndDelete({ _id: orderId, userId: user._id });

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    res
        .status(200)
        .json(
            new ApiResponse(200, order, "Order deleted successfully")
    );
});


export { createOrder, getOrders, deleteOrder };