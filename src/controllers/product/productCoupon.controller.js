import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError.js";
import  Product from "../../models/product/productCoupon.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";


const productCoupon = asyncHandler(async (req, res) => {
    
    const user = req.user;
    const {value, percentage } = req.body;

    if (user.role !== "Seller") {
        throw new ApiError(403, "You are not authorized to create a product");
    }

    if (!(value || percentage)) {
        throw new ApiError(400, "Please fill all the fields");
    }

    const product = await Product.create({
        value,
        percentage
    });
    

    return res
    .status(201)
    .json(new ApiResponse(
        201,
        product,
        "Product created successfully"   
    ));

})

export default productCoupon;
