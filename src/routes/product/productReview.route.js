import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { productReview, getAllReview, productReviewDelete} from "../../controllers/product/productReview.controller.js";
import { upload } from "../../middlewares/multer.middleware.js";
const router = Router()


router.route("/:id").post(
    upload.fields([
        {
            name : "image",
            maxCount: 3
        },
    ]),
    verifyJWT, productReview
    );

router.route("/").post(verifyJWT, productReview);
router.route("/").get(verifyJWT, getAllReview);
router.route("/:id").delete(verifyJWT, productReviewDelete);


export default router;