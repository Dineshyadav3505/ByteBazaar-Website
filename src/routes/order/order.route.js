import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { createOrder, deleteOrder, getOrders } from "../../controllers/order/order.controller.js";
import { getOrderPayment, orderPyament, update } from "../../controllers/order/orderPayment.controller.js";
const router = Router()

router.route("/create/:id").post(verifyJWT, createOrder);
router.route("/paymenty").post(verifyJWT, orderPyament);
router.route("/paymenty").patch(verifyJWT, update);
router.route("/").get(verifyJWT, getOrders);
router.route("/payment").get(verifyJWT, getOrderPayment);
router.route("/:id").delete(verifyJWT, deleteOrder);


export default router;