import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import  WishlistItem from "../../models/user/userWishListItem.model.js";
import WishList from "../../models/user/userWishList.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const option = {
  httpOnly: true,
  secure: true
};

const addItemInWishList = asyncHandler(async (req, res) => {
    const user = req.user;
    const Id = user._id.toString();

    const wishlist = await WishList.find({ userId: user._id });
    const userId = (wishlist.map((item) => item.userId).toString())

    if(Id !== userId) {
      const wishlist = await WishList.create({
        userId: user._id,
      });
    }

    const { productId } = req.params;

    const alreadyInWishlist = await WishlistItem.findOne({ productId });
    
    if (alreadyInWishlist) {
      throw new ApiError(400, "Item already in wishlist");
    }

    const wishlistId = (wishlist.map((item) => item._id).toString()); 
      
    
    const wishlistitem = await WishlistItem.create({
      wishlistId,
      productId,

    });
    return res
      .status(201)
      .json(new ApiResponse(201, wishlistitem, "Item add in wishlist successfully"));
});

const getWishList = asyncHandler(async (req, res) => {
    const user = req.user;
    const wishlist = await WishList.find({ userId: user._id });
    const wishlistId = (wishlist.map((item) => item._id).toString());
    const wishlistItems = await WishlistItem.find({ wishlistId });
    return res
      .status(200)
      .json(new ApiResponse(200, wishlistItems, "Wishlist items fetched successfully"));
});

const deleteWishListItem = asyncHandler(async (req, res) => {
    const user = req.user;
    const { productId } = req.params;
    const wishlist = await WishList.find({ userId: user._id });
    const wishlistId = (wishlist.map((item) => item._id).toString());
    const wishlistItem = await WishlistItem.findOneAndDelete({ wishlistId, productId });
    if (!wishlistItem) {
      throw new ApiError(404, "Item not found in wishlist");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, wishlistItem, "Item removed from wishlist successfully"));
});

export { addItemInWishList, getWishList, deleteWishListItem};