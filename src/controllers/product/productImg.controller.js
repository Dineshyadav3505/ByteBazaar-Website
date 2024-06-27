import { uploadOnCloudinary } from "../../utils/cloudnary.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import  ProductImg from "../../models/product/productImg.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";


const createProductImg = asyncHandler (async (req, res) => {
    if (!req.files.imageURL) {
        throw new ApiError(400, "Product image is required");
    }

    const productLocalPaths = req.files.imageURL.map(file => file.path);

    if (!productLocalPaths || productLocalPaths.length === 0) {
        throw new ApiError(400, "Avatar file path is required");
    }

    try {
        const imageURLs = await Promise.all(productLocalPaths.map(async (path) => {
            const result = await uploadOnCloudinary(path);
            return result.secure_url;  // Assuming 'uploadOnCloudinary' returns an object with 'secure_url'
        }));

        const product = await ProductImg.create({
            imageURL: imageURLs, // Assuming your Product schema can handle an array of URLs
        });

        return res
            .status(201)
            .json(new ApiResponse(
                201,
                product,
                "Product created successfully"
            ));

    } catch (error) {
        throw new ApiError(500, `Error uploading file: ${error.message}`);
    }
});

const getProductImg = asyncHandler(async (req, res) => {
    const productImg = await ProductImg.find().exec();
    return res
       .status(200)
       .json(new ApiResponse(200, productImg, "Products fetched successfully"));
    
})

const deleteProductImg = asyncHandler(async (req, res) => {
    const productImg = await ProductImg.findById(req.params.id);
    if (!productImg) {
        throw new ApiError(404, "Product not found");
    }
    await productImg.remove();
    return res
       .status(200)
       .json(new ApiResponse(200, productImg, "Product deleted successfully"));
});

const updateProductImg = asyncHandler(async (req, res) => {
    const productImg = await ProductImg.findById(req.params.id);
    if (!productImg) {
        throw new ApiError(404, "Product not found");
    }
    const updatedProductImg = await ProductImg.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );
    return res
       .status(200)
       .json(new ApiResponse(200, updatedProductImg, "Product updated successfully"));
});

export { createProductImg, getProductImg, updateProductImg, deleteProductImg};