import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import  CartItem from "../../models/user/userCartItem.model.js";
import Cart from "../../models/user/userCart.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import Product from "../../models/product/product.model.js";

const addItemInCart = asyncHandler(async (req, res) => {
    const user = req.user;
    const Id = user._id.toString();

    const cart = await Cart.find({ userId: user._id });
    const userId = (cart.map((item) => item.userId).toString())

    if(Id !== userId) {
      const cart = await cart.create({
        userId: user._id,
      });
    }

    const { productId } = req.params;

    const alreadyInCart = await CartItem.find({ productId });

    if (alreadyInCart) {
        throw new ApiError(400, "Item already in cart");
    }

    const cartId = (cart.map((item) => item._id).toString());
    console.log(cartId)

    const cartItems = await CartItem.create({
        cartId,
        productId,
  
    });
  
    return res
      .status(201)
      .json(new ApiResponse(201,cartItems, "Item add in wishlist successfully"));
});

const getCartItem = asyncHandler(async (req, res) => {
  const user = req.user;
  const cart = await Cart.find({ userId: user._id });
  const cartId = (cart.map((item) => item._id).toString());
  const cartItem = await CartItem.find({ cartId })
      .populate({
          path: 'productId',
          select: 'imageURL name description price size owner discount'
      });
  
  return res
    .status(200)
    .json(new ApiResponse(200, cartItem, "Wishlist items fetched successfully"));
});

const deleteCartItem = asyncHandler(async (req, res) => {
    const user = req.user;
    const { productId } = req.params;
    console.log(productId)
    const cart = await Cart.find({ userId: user._id });
    const cartId = (cart.map((item) => item._id).toString());
    console.log(cartId)

    const cartItem = await CartItem.findOneAndDelete({ cartId, productId });

    if (!cartItem) {
        throw new ApiError(404, "Item not found in cart");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, cartItem, "Item removed from cart successfully"));
});

export { addItemInCart, getCartItem, deleteCartItem };