import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { createOrder, deleteOrder, getOrders } from "../../controllers/order/order.controller.js";
const router = Router()

router.route("/create/:id").post(verifyJWT, createOrder);
router.route("/").get(verifyJWT, getOrders);
router.route("/:id").delete(verifyJWT, deleteOrder);


export default router;