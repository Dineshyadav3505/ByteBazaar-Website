import { asyncHandler } from "../../utils/asyncHandler.js";
import Review from "../../models/product/productReview.model.js";
import { ApiError } from "../../utils/ApiError.js";
import  ProductReview from "../../models/product/productReview.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../../utils/cloudnary.js";



const productReview = asyncHandler(async (req, res) => {
    const user = req.user;

    const id = req.params.id;

    const { rating, comment } = req.body;

    if (!rating || !comment) {
        throw new ApiError(400, "Rating and comment are required");
    }

    let productLocalPaths = null;

    if (req.files.image) {
        productLocalPaths = req.files.image.map(file => file.path);
    }

    try {
        if (productLocalPaths) {
            const imageURLs = await Promise.all(productLocalPaths.map(async (path) => {
                const result = await uploadOnCloudinary(path);
                return result.secure_url;  // Assuming 'uploadOnCloudinary' returns an object with 'secure_url'
            }));

            const review = await Review.create({
                userId: user._id,
                productId: id,
                image: imageURLs,
                rating,
                comment,
            });

            return res
                .status(201)
                .json(new ApiResponse(
                    201,
                    review,
                    "Review created successfully"
                ));
        } else {
            const review = await Review.create({
                userId: user._id,
                productId: id,
                rating,
                comment,
            });

            return res
                .status(201)
                .json(new ApiResponse(
                    201,
                    review,
                    "Review created successfully"
                ));
        }
    } catch (error) {
        throw new ApiError(500, `Error uploading file: ${error.message}`);
    }
});

const productReviewDelete = asyncHandler(async (req, res) => {
    const user = req.user;

    const review = await Review.findById(req.params.id);


    if (!review) {
        throw new ApiError(404, "Review not found");
    }

    if (review.userId.toString() !== user.id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this review");
    }   

    const deletedReview = await Review.findByIdAndDelete(req.params.id);

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            deletedReview,
            "Review deleted successfully"
    ));
});

const getAllReview = asyncHandler(async (req, res) => {
    const products = await ProductReview.find().exec();
    return res
      .status(200)
      .json(new ApiResponse(200, products, "Products fetched successfully"));
  });


export { productReview, getAllReview, productReviewDelete };