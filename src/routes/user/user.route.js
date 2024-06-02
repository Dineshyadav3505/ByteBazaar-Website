import { Router } from "express";
import { registerUser, loginUser, logoutUser, updateAccountDetails, getCurrentUser, deleteUser } from "../../controllers/user/user.controller.js";
import {verifyJWT} from "../../middlewares/auth.middleware.js";
const router = Router()


router.route("/register").post(registerUser)
router.route("/logIn").post(loginUser)
router.route("/logOut").post(verifyJWT, logoutUser)
router.route("/update").patch(verifyJWT, updateAccountDetails)
router.route("/Current_User").get(verifyJWT, getCurrentUser)
router.route("/delete").delete(verifyJWT, deleteUser)

export default router;
