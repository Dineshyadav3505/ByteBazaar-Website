import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { createProductCategory} from "../../controllers/product/productCategory.controller.js";
const router = Router()



router.route("/ProductCategories").post(verifyJWT, createProductCategory);

export default router;