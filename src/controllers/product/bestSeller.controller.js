import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import BestSeller  from "../../models/product/bestSeller.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const bestSeller = asyncHandler(async (req, res) => {   

 

    const bestSeller = await BestSeller.create({
        productId,
    });

    return res
        .status(201)
        .json(new ApiResponse(
            201,
            bestSeller,
            "Best seller created successfully"
        ));
});

const getBestSeller = asyncHandler(async (req, res) => {
    const user = req.user;

    const bestSeller = await BestSeller.find().populate("productId");

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            bestSeller,
            "Best seller fetched successfully"
        ));
});

const updateBestSeller = asyncHandler(async (req, res) => {
    const user = req.user;

    if (user.role !== "Seller") {
        throw new ApiError(401, "Unauthorized");
    }

    const bestSeller = await BestSeller.findById(req.params.id);

    if (!bestSeller) {
        throw new ApiError(404, "Best seller not found");
    }

    const updatedBestSeller = await BestSeller.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            updatedBestSeller,
            "Best seller updated successfully"
        ));
});

const deleteBestSeller = asyncHandler(async (req, res) => {
    const user = req.user;

    if (user.role!== "Seller") {
        throw new ApiError(401, "Unauthorized");
    }

    const bestSeller = await BestSeller.findById(req.params.id);

    if (!bestSeller) {
        throw new ApiError(404, "Best seller not found");
    }

    await bestSeller.remove();

    return res
       .status(200)
       .json(new ApiResponse(
            200,
            bestSeller,
            "Best seller deleted successfully"
        ));
});

export { bestSeller, getBestSeller, updateBestSeller, deleteBestSeller };
