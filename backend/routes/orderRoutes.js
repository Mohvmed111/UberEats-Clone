import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(createOrder).get(getMyOrders);

router.route("/all").get(getAllOrders);

router.route("/:id").put(updateOrderStatus);

export default router;
