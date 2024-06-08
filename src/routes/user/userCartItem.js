import { Router } from "express";
import {verifyJWT} from "../../middlewares/auth.middleware.js";
import { addItemInCart, deleteCartItem, getCartItem } from "../../controllers/user/userCartItem.controller.js";

const router = Router()

router.route("/addTocart/:productId").post(verifyJWT, addItemInCart);
router.route("/detetTocart/:productId").delete(verifyJWT, deleteCartItem);
router.route("/cart").get(verifyJWT, getCartItem);



export default router;