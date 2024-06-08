import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import  ProductCoupon from "../../models/product/productCoupon.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";


const productCoupon = asyncHandler(async (req, res) => {
    
    const user = req.user;
    const {value, discount } = req.body;

    if (user.role !== "Seller") {
        throw new ApiError(403, "You are not authorized to create a product");
    }

    if (!(value || discount)) {
        throw new ApiError(400, "Please fill all the fields");
    }

    const product = await ProductCoupon.create({
        value,
        discount
    });
    

    return res
    .status(201)
    .json(new ApiResponse(
        201,
        product,
        "Product created successfully"   
    ));

})

const productCouponUpdate = asyncHandler(async (req, res) => {
    const user = req.user;

    const { value, discount } = req.body;

    const product = await ProductCoupon.findById(req.params.id);


    if (user.role !== "Seller") {
        throw new ApiError(403, "You are not authorized to update a product");
    }

    if (!(value || discount)) {
        throw new ApiError(400, "Please fill all the fields");
    }

    const updatedProduct = await ProductCoupon.findByIdAndUpdate(req.params.id, {
        value,
        discount
    }, { new: true });

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        updatedProduct,
        "Product updated successfully"
    ));
})

const productCouponDelete = asyncHandler(async (req, res) => {
    const user = req.user;

    const product = await ProductCoupon.findById(req.params.id);

    if (user.role !== "Seller") {
        throw new ApiError(403, "You are not authorized to update a product");
    }

    const deletedProduct = await ProductCoupon.findByIdAndDelete(req.params.id,);

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        deletedProduct,
    ));



});

const productCouponGet = asyncHandler(async (req, res) => {
    const products = await ProductCoupon.find().exec();
    return res
      .status(200)
      .json(new ApiResponse(200, products, "Products fetched successfully"));
});  

export {
    productCoupon,
    productCouponUpdate,
    productCouponDelete,
    productCouponGet
};
