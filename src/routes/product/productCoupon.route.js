import {productCoupon, productCouponUpdate, productCouponDelete, productCouponGet} from "../../controllers/product/productCoupon.controller.js";
import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
const router = Router()


router.route("/").post(verifyJWT, productCoupon);
router.route("/").get(verifyJWT, productCouponGet);
router.route("/:id").patch(verifyJWT, productCouponUpdate);
router.route("/:id").delete(verifyJWT, productCouponDelete);


export default router;