import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import NewArival  from "../../models/product/newArival.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const newArival = asyncHandler(async (req, res) => {
    const user = req.user;
    const { productId } = req.params;

    if (user.role !== "Seller") {
        throw new ApiError(401, "Unauthorized");
    }

    const newArival = await NewArival.create({
        productId,
    });

    return res
        .status(201)
        .json(new ApiResponse(
            201,
            newArival,
            "New arrival created successfully"
        ));
});

const getNewArival = asyncHandler(async (req, res) => {
    const user = req.user;

    const newArival = await NewArival.find().populate("productId");

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            newArival,
            "New arrival fetched successfully"
        ));
});

const updateNewArival = asyncHandler(async (req, res) => {
    const user = req.user;

    if (user.role !== "Seller") {
        throw new ApiError(401, "Unauthorized");
    }

    const newArival = await NewArival.findById(req.params.id);

    if (!newArival) {
        throw new ApiError(404, "New arrival not found");
    }

    const updatedNewArival = await NewArival.findByIdAndUpdate(
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
            updatedNewArival,
            "New arrival updated successfully"
        ));
});

const deleteNewArival = asyncHandler(async (req, res) => {
    const user = req.user;

    if (user.role !== "Seller") {
        throw new ApiError(401, "Unauthorized");
    }

    const newArival = await NewArival.findById(req.params.id);

    if (!newArival) {
        throw new ApiError(404, "New arrival not found");
    }

    await newArival.remove();

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            newArival,
            "New arrival deleted successfully"
        ));
});

export { newArival, getNewArival, updateNewArival, deleteNewArival };
