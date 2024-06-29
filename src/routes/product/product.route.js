import { createProduct, deleteProduct, getAllProducsById, getAllProduct, updateProduct, productCategoryType, productCategoryprice, productCategoryColour} from "../../controllers/product/product.controller.js";
import { Router } from "express";
import { upload } from "../../middlewares/multer.middleware.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
const router = Router()



router.route("/create").post(
    upload.fields([
        {
            name : "imageURL",
        },
    ]),
    verifyJWT, createProduct
    );

router.route("/").get(getAllProduct);
router.route("/type/:type").get(productCategoryType);
router.route("/price").get(productCategoryprice);
router.route("/Colour").get(productCategoryColour);
router.route("/:id").get(getAllProducsById);
router.route("/:id").delete(verifyJWT, deleteProduct);
router.route("/:id").patch(verifyJWT, updateProduct);



export default router;