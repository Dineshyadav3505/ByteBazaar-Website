import { Router } from "express";
import { userAddress, updateUserAddress, deleteUserAddress } from "../../controllers/user/userAddress.controller.js";
import {verifyJWT} from "../../middlewares/auth.middleware.js";
const router = Router()


router.route("/userAddress").post(verifyJWT, userAddress)
router.route("/userAddressUpdate/:addressId").post(verifyJWT, updateUserAddress);
router.route("/userAddressDelete/:addressId").delete(verifyJWT, deleteUserAddress);


export default router;