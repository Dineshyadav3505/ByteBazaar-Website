import { Router } from "express";
import {verifyJWT} from "../../middlewares/auth.middleware.js";
import { addItemInWishList, getWishList, deleteWishListItem} from "../../controllers/user/userWishListItem.controller.js";
const router = Router()



router.route("/addToWishList/:productId").post(verifyJWT, addItemInWishList);
router.route("/addToWishList/:productId").delete(verifyJWT, deleteWishListItem);
router.route("/WishListitem").get(verifyJWT, getWishList);



export default router;