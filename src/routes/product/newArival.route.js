import {newArival, getNewArival, updateNewArival, deleteNewArival } from "../../controllers/product/newArival.controller.js";
import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
const router = Router()



router.route("/create/:productId").post(verifyJWT, newArival);
router.route("/").get(getNewArival);
router.route("/:productId").delete(verifyJWT, deleteNewArival);
router.route("/:productId").patch(verifyJWT, updateNewArival);



export default router;