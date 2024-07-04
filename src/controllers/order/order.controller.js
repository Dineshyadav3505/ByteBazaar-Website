import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import  Product from "../../models/product/product.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import Order from "../../models/order/order.model.js";
import ProductInventory from "../../models/product/productInventory.model.js";
import UserAddress from "../../models/user/userAddress.model.js";


const createOrder = asyncHandler(async (req, res) => {
  try {
    console.log("ff")
    const user = req.user;
    const { productIds, userAddressId, grandTotal } = req.body;

    // Validate the list of product IDs
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== productIds.length) {
      throw new ApiError(404, 'One or more products not found');
    }

    // Validate the user address
    const userAddress = await UserAddress.findById(userAddressId);

    if (!userAddress) {
      throw new ApiError(404, 'User address not found');
    }

    // Create the order
    const order = new Order.create({
      userId: user._id,
      productId: productIds,
      grandTotal,
      userAddress: userAddress._id,
    });

    res.status(201).json(new ApiResponse(201, order, 'Order created successfully'));
  } catch (error) {
    console.error(error);
    throw error;
  }
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