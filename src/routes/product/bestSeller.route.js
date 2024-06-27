import {bestSeller, getBestSeller, updateBestSeller, deleteBestSeller  } from "../../controllers/product/bestSeller.controller.js";
import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
const router = Router()



router.route("/create/:productId").post(verifyJWT, bestSeller);
router.route("/").get(getBestSeller);
router.route("/:productId").delete(verifyJWT, deleteBestSeller);
router.route("/:productId").patch(verifyJWT, updateBestSeller);


export default router;