import { Router } from "express";
import {verifyJWT} from "../../middlewares/auth.middleware.js";
import {userShoppingList} from "../../controllers/user/userShopping.controller.js";
const router = Router()



router.route("/shoppingList").post(verifyJWT, userShoppingList );


export default router;