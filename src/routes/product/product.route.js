import { createProduct } from "../../controllers/product/product.controller.js";
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

export default router;