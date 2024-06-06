import { Router } from "express";
import {verifyJWT} from "../../middlewares/auth.middleware.js";
import { userWishList } from "../../controllers/user/userWishList.controller.js";
const router = Router()



router.route("/wishList").post(verifyJWT, userWishList);


export default router;