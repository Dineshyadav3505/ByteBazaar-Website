import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import  {Product } from "../../models/product/product.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../../utils/cloudnary.js";


const option = {
  httpOnly: true,
  secure: true
};

const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, discount } = req.body;

    if (!name || !description || !price || !discount) {
        throw new ApiError(400, "Please fill all the fields");
    }

    const productLocalPath = req.file?.path;

    // if (!productLocalPath) {
    //     throw new ApiError(400, "Avatar file path is required");
    // }

    const imageURL = await uploadOnCloudinary(productLocalPath);

    const product = await Product.create({
        name,
        imageURL,
        description,
        price,
        discount
    });

    return res
        .status(201)
        .json(new ApiResponse(
            201,
            product,
            "Product created successfully"
        ))
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

const deleteProduct = asyncHandler(async(req, res) => {
  const user = await Product.findByIdAndDelete(req.product?._id);
  return res
  .status(200)
  .json(new ApiResponse(200, product, "User deleted successfully"))
});

const updateProduct = asyncHandler(async (req, res) => {

});


export { 
    createProduct,
    getAllProduct,
    deleteProduct,
    updateProduct
};