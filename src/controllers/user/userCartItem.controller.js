import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import CartItem from "../../models/user/userCartItem.model.js";
import Cart from "../../models/user/userCart.model.js";
import Product from "../../models/product/product.model.js";

const addItemInCart = asyncHandler(async (req, res) => {
    const user = req.user;
    const userId = user._id.toString();

    const quantity = req.body.quantity || 1;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
        const newCart = await Cart.create({ userId });
        cart = newCart;
    }

    const { productId } = req.params;

    const alreadyInCart = await CartItem.findOne({ cartId: cart._id, productId });

    if (alreadyInCart) {
        throw new ApiError(400, "Item already in cart");
    }

    const cartItem = await CartItem.create({ cartId: cart._id, productId, quantity });

    const findprodect = await Product.findById(productId)
    const price = findprodect.price
    const discount = findprodect.discount
    const productQuantity = cartItem.quantity
    const discountPrice = productQuantity * price - (price * discount / 100)

    const cardId = (cartItem.cartId.toString())

    await Cart.findByIdAndUpdate(
        cardId, 
        { 
            $inc: {
                total: discountPrice 
            }
        }, 
        { new: true}
    );

    return res
      .status(201)
      .json(new ApiResponse(201, cartItem, "Item added to cart successfully"));
});

const getCartItem = asyncHandler(async (req, res) => {
  const user = req.user;
  const cart = await Cart.findOne({ userId: user._id });
  if (!cart) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Cart not found"));
  }

  const cartItem = await CartItem.find({ cartId: cart._id })
      .populate({
          path: 'productId',
      });

  return res
    .status(200)
    .json(new ApiResponse(200, cartItem, "Cart items fetched successfully"));
});

const deleteCartItem = asyncHandler(async (req, res) => {
    const user = req.user;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: user._id });
    if (!cart) {
        return res
          .status(404)
          .json(new ApiResponse(404, null, "Cart not found"));
    }

    const cartItem = await CartItem.findOneAndDelete({ cartId: cart._id, productId });
    const productQuantity = cartItem.quantity

    if (!cartItem) {
      throw new ApiError(404, "Item not found in cart");
    }
    
    const product = await Product.findById(cartItem.productId).populate();
    const price = product.price
    const discount = product.discount
    const discountPrice = productQuantity * price - (price * discount / 100)

    const cardId = (cartItem.cartId.toString())

    await Cart.findByIdAndUpdate(
        cardId, 
        { 
            $inc: {
                total: 0 - discountPrice 
            }
        }, 
        { new: true}
    );


    return res
      .status(200)
      .json(new ApiResponse(200, cartItem, "Item removed from cart successfully"));
});

export { addItemInCart, getCartItem, deleteCartItem };