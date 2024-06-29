import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import  Product from "../../models/product/product.model.js";
import Category from "../../models/product/productCategory.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../../utils/cloudnary.js";
import ProductCategory from "../../models/product/productCategory.model.js";
import ProductInventory from "../../models/product/productInventory.model.js";



  
const createProduct = asyncHandler(async (req, res) => {
    const {
        productName,
        description,
        price,
        discount,
        color,
        productType,
        fit,
        washCare,
        specification,
        stock,
        size
    } = req.body;

    const user = req.user;

    if (user.role !== "Seller") {
        throw new ApiError(403, "You are not authorized to create a product");
    }

    if (!productName || !description || !price || !stock || !size || !color || !discount || !productType || !fit || !washCare || !specification) {
        throw new ApiError(400, "Please fill all the fields");
    }

    if (!req.files || !req.files.imageURL) {
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

        const productInventory = await ProductInventory.create({
            quantity: stock
        });


        const product = await Product.create({
            productName,
            imageURL: imageURLs,
            description,
            price,
            color,
            discount,
            productType,  
            fit,
            washCare,
            specification,
            owner: user._id,
            stock,
            size,
            inventoryId: productInventory._id
        });

        await ProductInventory.findByIdAndUpdate(productInventory._id, {
            $set: {
                product: product._id
            }
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

const getAllProduct = asyncHandler(async (req, res) => {
    const { category, price, size, colour, search } = req.query;

    let query = Product.find()
    .populate('inventoryId', 'quantity');
  
    if (category) {
      query = query.where('category').equals(category);
    }
  
    if (colour) {
      query = query.where('colour').equals(colour);
    }
  
    if (price) {
      const [minPrice, maxPrice] = price.split('-');
      query = query.where('price').gte(minPrice).lte(maxPrice);
    }
  
    if (size) {
      query = query.where('size').equals(size);
    }
  
    if (search) {
        query = query.where({
          $or: [
            { name: { $regex: search, $options: 'i' } }, // search in product name
            { description: { $regex: search, $options: 'i' } }, // search in product description
            { "categoryId.type": { $regex: search, $options: 'i' } } // search in category type
          ]
        });
    }
  
    const products = await query.exec();
    return res
      .status(200)
      .json(new ApiResponse(200, products, "Products fetched successfully"));
  });

const getAllProducsById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    .populate('categoryId', 'type')
    .populate('inventoryId', 'quantity')
    .exec();

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res
     .status(200)
     .json(new ApiResponse(200, product, "Product fetched successfully"));
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

const productCategoryprice = asyncHandler(async (req, res) => {
    const { minPrice, maxPrice } = req.body;

    if (!minPrice || !maxPrice) {
        throw new ApiError(400, "Please provide a price range");
    }

    const product = await Product.find({
        price: { $gte: minPrice, $lte: maxPrice }
    });

    res
    .status(200)
    .json
    (
        new ApiResponse(200, product, "Product Category fetched successfully")
    );
});

const productCategoryColour = asyncHandler(async (req, res) => {
    const colour = req.body.colour;
    console.log(typeof colour); // Use typeof to check the type of colour

    if (!colour) {
        throw new ApiError(400, "Please provide a category type");
    }

    const product = await Product.find({ color: { $regex: new RegExp(colour, "i")} });

    res
    .status(200)
    .json
    (
        new ApiResponse(200, product, "Product Category fetched successfully")
    );
});

const productCategoryType = asyncHandler(async (req, res) => {
    const type = req.params.type;
    console.log(type); // Use typeof to check the type of type (string or number

    if (!type) {
        throw new ApiError(400, "Please provide a category type");
    }

    const product = await Product.find({ productType: { $regex: new RegExp(type, "i")} });

    res
    .status(200)
    .json
    (
        new ApiResponse(200, product, "Product Category fetched successfully")
    );
});



export { 
    createProduct,
    getAllProduct,
    deleteProduct,
    updateProduct,
    productCategoryType,
    productCategoryprice,
    productCategoryColour,
    getAllProducsById
};