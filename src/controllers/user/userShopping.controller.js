import { asyncHandler } from "../../utils/asyncHandler.js";
import  Shopping from "../../models/user/userShopping.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const option = {
  httpOnly: true,
  secure: true
};

const userShoppingList = asyncHandler(async (req, res) => {
    const user = req.user;
    
    const shoppinglist = await Shopping.create({
      userId: user._id,
    });
    return res
      .status(201)
      .json(new ApiResponse(201, shoppinglist, "User wishlist created successfully"));
});



export { userShoppingList };