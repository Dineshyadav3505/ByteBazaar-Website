import { asyncHandler } from "../../utils/asyncHandler.js";
import  Cart from "../../models/user/userCart.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";



const userCartList = asyncHandler(async (req, res) => {
    const user = req.user;
    
    return res
      .status(201)
      .json(new ApiResponse(201, cartlist, "User wishlist created successfully"));
    
});



export { userCartList };