import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// للمستخدم
router.route("/")
  .post(createOrder)
  .get(getMyOrders);

// للأدمن (كل الطلبات)
router.route("/all").get(getAllOrders);

// تحديث حالة الطلب
router.route("/:id").put(updateOrderStatus);

export default router;
