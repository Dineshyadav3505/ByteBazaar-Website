import { Router } from "express";
import { userAddress } from "../../controllers/user/userAddress.controller.js";
import {verifyJWT} from "../../middlewares/auth.middleware.js";
const router = Router()


router.route("/userAddress").post(verifyJWT, userAddress)


export default router;