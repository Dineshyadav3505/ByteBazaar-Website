import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import  WishList from "../../models/user/userWishList.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const option = {
  httpOnly: true,
  secure: true
};

const userWishList = asyncHandler(async (req, res) => {
    const user = req.user;
    
    const wishlist = await WishList.create({
      userId: user._id,
    });
    return res
      .status(201)
      .json(new ApiResponse(201, wishlist, "User wishlist created successfully"));
});



export { userWishList };