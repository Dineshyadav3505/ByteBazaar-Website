import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import  Product from "../../models/product/productCategory.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";



const createProductCategory = asyncHandler(async (req, res) => {
    const {type} = req.body;

    const user = req.user;

    if (user.role !== "Seller") {
        throw new ApiError(403, "You are not authorized to create a product");
    }

    if (!type) {
        throw new ApiError(400, "Please fill all the fields");
    }

    const product = await Product.create({
        type
    });
    

    return res
    .status(201)
    .json(new ApiResponse(
        201,
        product,
        "Product created successfully"   
    ));
    
});


const getAllProduct = asyncHandler(async(req, res) => {
  return res
  .status(200)
  .json(new ApiResponse(
      200,
      req.product,
      "User fetched successfully"
  ))
})



export { 
    createProductCategory,
};