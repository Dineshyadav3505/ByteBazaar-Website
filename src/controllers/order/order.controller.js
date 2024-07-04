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
    const userId = user._id.toString();
    const { productId, userAddress } = req.body;
    
    const product = productId.map((product) => Product.findById(product));
    console.log(product);

    const userAddressData = await UserAddress.findById(userAddress);

    if (!userAddressData) {
      throw new ApiError(404, "User address not found");
    }

    const order = await Order.create({
      userId,
      productId,
      userAddress,
    });

    res.status(201).json(new ApiResponse(201, order, "Order created successfully"));
  } catch (error) {
    throw new ApiError(error.statusCode || 500, error.message);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  try {
    const user = req.user;

    const orders = await Order.find({ userId: user._id })
      .populate('userAddress');

    res.status(200).json(new ApiResponse(200, orders, 'Orders retrieved successfully'));
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json(new ApiResponse(500, {}, 'Error retrieving orders'));
  }
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