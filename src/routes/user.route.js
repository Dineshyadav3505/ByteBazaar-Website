import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
const router = Router()


router.route("/register").post(registerUser)
router.route("/logIn").post(loginUser)
router.route("/logOut").get(logoutUser)

export default router;
