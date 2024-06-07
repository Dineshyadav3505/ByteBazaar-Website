import { createProduct, deleteProduct, getAllProduct, updateProduct } from "../../controllers/product/product.controller.js";
import { Router } from "express";
import { upload } from "../../middlewares/multer.middleware.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
const router = Router()



router.route("/create").post(
    upload.fields([
        {
            name : "imageURL",
            maxCount: 5
        },
    ]),
    verifyJWT, createProduct
    );

router.route("/").get(getAllProduct);
router.route("/:id").delete(verifyJWT, deleteProduct);
router.route("/:id").patch(verifyJWT, updateProduct);


export default router;