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


const deleteUserWishList = asyncHandler(async(req, res) => {
    const wishList = await Address.findByIdAndDelete(req.params.addressId);
    return res
    .status(200)
    .clearCookie("accessToken", option)
    .json(new ApiResponse(200, address, "User address deleted successfully"))
});

const allUserAddress = asyncHandler(async (req, res) => {
    const user = req.user;
    const addresses = await Address.find({
      user: user._id,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, addresses, "User addresses fetched successfully"));
});

export { 
    deleteUserWishList,
    userWishList,
};