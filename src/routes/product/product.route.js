import { createProduct } from "../../controllers/product/product.controller.js";
import { Router } from "express";

import { upload } from "../../middlewares/multer.middleware.js";
const router = Router()



router.route("/product").post(
    upload.fields([
        {
            name : "imageURL",
            maxCount: 5
        },
    ]),
    createProduct
    );

export default router;