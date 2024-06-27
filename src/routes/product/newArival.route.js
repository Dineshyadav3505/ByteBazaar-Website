import {newArival, getNewArival, updateNewArival, deleteNewArival } from "../../controllers/product/newArival.controller.js";
import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
const router = Router()



router.route("/create").post(verifyJWT, newArival);
router.route("/").get(getNewArival);
router.route("/:id").delete(verifyJWT, deleteNewArival);
router.route("/:id").patch(verifyJWT, updateNewArival);



export default router;