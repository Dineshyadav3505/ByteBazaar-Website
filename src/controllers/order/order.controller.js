import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import  Product from "../../models/product/product.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import Order from "../../models/order/order.model.js";
import ProductInventory from "../../models/product/productInventory.model.js";

const createOrder = asyncHandler(async (req, res) => {
    const user = req.user;

    const { color, size, quantity} = req.body;
    console.log(req.body)   

    if (!color || !size || !quantity) {
        throw new ApiError(400, "Please fill all the fields");
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }
    console.log(product)

    const inventoryId = (product.inventoryId.toString());
    console.log(inventoryId);
    
    const productInventory = await ProductInventory.findById(inventoryId);
    if (!productInventory) {
        throw new ApiError(404, "Product inventory not found");
    }
    console.log(productInventory);

    if (productInventory.quantity < quantity) {
        throw new ApiError(400, "Quantity not available");
    }

    productInventory.quantity -= quantity;
    await productInventory.save();
    console.log(productInventory)

    // create order
    const order = new Order({
        userId: user._id,
        productId: product._id,
        color,
        size,
        quantity,
    });
    
    await order.save();
    res
        .status(200)
        .json(
            new ApiResponse(200, order, "Order created successfully")
        );
});

const getOrders = asyncHandler(async (req, res) => {});

const deleteOrder = asyncHandler(async (req, res) => {});


export { createOrder, getOrders, deleteOrder };