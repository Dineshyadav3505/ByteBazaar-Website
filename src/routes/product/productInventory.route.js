import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import createProductInventory from "../../controllers/product/productInventory.controller.js";
const router = Router()



router.route("/ProductInventory").post(verifyJWT, createProductInventory);

export default router;