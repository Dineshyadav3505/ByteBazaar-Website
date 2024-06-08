import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import  Product from "../../models/product/product.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../../utils/cloudnary.js";
import ProductCategory from "../../models/product/productCategory.model.js";
import ProductInventory from "../../models/product/productInventory.model.js";


const option = {
  httpOnly: true,
  secure: true
};

const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, discount, type, quantity, Size } = req.body;

    const user = req.user;

    if (user.role !== "Seller") {
        throw new ApiError(403, "You are not authorized to create a product");
    }

    if (!name || !description || !price || !discount || !type || !quantity || !Size) {
        throw new ApiError(400, "Please fill all the fields");
    }

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

        const productCategory = await ProductCategory.create({
            type
        });

        const productInventory = await ProductInventory.create({
            quantity
        });



        const product = await Product.create({
            name,
            imageURL: imageURLs, // Assuming your Product schema can handle an array of URLs
            description,
            size:Size,
            owner: user._id,
            price,
            discount,
            categoryId:productCategory._id,
            incentoryId:productInventory._id,
        });

        return res
            .status(201)
            .json(new ApiResponse(
                201,
                product,
                productCategory,
                productInventory,
                "Product created successfully"
            ));
    } catch (error) {
        throw new ApiError(500, `Error uploading file: ${error.message}`);
    }
});

const getAllProduct = asyncHandler(async (req, res) => {
  const products = await Product.find().exec();
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

const deleteProduct = asyncHandler(async(req, res) => {

    const user = req.user;
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }
 

    if(user._id.toString() !== product.owner.toString()){
        throw new ApiError(403, "You are not authorized to delete this product");
    }

    await ProductCategory.findByIdAndDelete(product.categoryId);
    await ProductInventory.findByIdAndDelete(product.incentoryId);
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    return res
    .status(200)
    .json(new ApiResponse(200, deletedProduct, "Product deleted successfully"))
});

const updateProduct = asyncHandler(async (req, res) => {

    const user = req.user;
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    if(user._id.toString() !== product.owner.toString()){
        throw new ApiError(403, "You are not authorized to update this product");
    }

    const { name, description, price, discount, type, quantity, Size } = req.body;
    console.log(name, description, price, discount, type, quantity, Size)

    if(!name || !description || !price || !discount || !type || !quantity || !Size){
        throw new ApiError(400, "Please fill all the fields");
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        name,
        description,
        price,
        discount,
        type,
        quantity,
        Size
    }, { new: true });

    return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"))


});


export { 
    createProduct,
    getAllProduct,
    deleteProduct,
    updateProduct
};