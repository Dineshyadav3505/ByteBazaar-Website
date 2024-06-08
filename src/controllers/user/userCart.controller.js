import { asyncHandler } from "../../utils/asyncHandler.js";
import  Cart from "../../models/user/userCart.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const option = {
  httpOnly: true,
  secure: true
};

const userCartList = asyncHandler(async (req, res) => {
    const user = req.user;
    
    const cartlist = await Cart.create({
      userId: user._id,
    });
    return res
      .status(201)
      .json(new ApiResponse(201, cartlist, "User wishlist created successfully"));
});



export { userCartList };