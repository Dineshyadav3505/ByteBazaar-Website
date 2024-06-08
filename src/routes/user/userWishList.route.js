import { Router } from "express";
import {verifyJWT} from "../../middlewares/auth.middleware.js";
import { userCartList } from "../../controllers/user/userCart.controller.js";
const router = Router()



router.route("/wishList").post(verifyJWT, userCartList);


export default router;