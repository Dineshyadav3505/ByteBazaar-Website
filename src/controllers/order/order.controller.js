import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import  Product from "../../models/product/product.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import Order from "../../models/order/order.model.js";
import ProductInventory from "../../models/product/productInventory.model.js";
import UserAddress from "../../models/user/userAddress.model.js";


const createOrder = asyncHandler(async (req, res) => {
    const user = req.user;

    const { color, size, quantity } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    const userAddress = await UserAddress.find({ user: user._id });

    const inventoryId = product.inventoryId.toString();

    const productInventory = await ProductInventory.findById(inventoryId);
    if (!productInventory) {
        throw new ApiError(404, "Product inventory not found");
    }

    if (productInventory.quantity < quantity) {
        throw new ApiError(400, "Quantity not available");
    }

    productInventory.quantity -= quantity;
    await productInventory.save();

    const totalPrice = (product.price - product.discount) * quantity;

    // create order
    const order = new Order({
        userId: user._id,
        productId: product._id,
        color,
        size,
        quantity,
        totalPrice,
        userAddress: userAddress?.[0]?._id || null
    });

    await order.save();

    res
        .status(201)
        .json(
            new ApiResponse(201, order, "Order created successfully")
        );
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