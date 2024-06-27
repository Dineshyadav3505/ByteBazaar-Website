import {createProductImg, getProductImg, deleteProductImg, updateProductImg } from "../../controllers/product/productImg.controller.js";
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
    verifyJWT, createProductImg
    );

router.route("/").get(getProductImg);
router.route("/:id").delete(verifyJWT, deleteProductImg);
router.route("/:id").patch(verifyJWT, updateProductImg);


export default router;