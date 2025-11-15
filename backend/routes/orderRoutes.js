import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { createOrderValidator } from "../validators/order.validator.js";
import validateRequest from "../middlewares/validateRequest.js";
import { authenticate, AuthorizeRole } from "../middlewares/auth.js";
import mongoose from "mongoose";

const router = express.Router();

const checkObjectId = (param) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[param])) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }
  next();
};

router
  .route("/")
  .post(authenticate, createOrderValidator, validateRequest, createOrder)
  .get(authenticate, getMyOrders);

router.route("/all").get(authenticate, AuthorizeRole("admin"), getAllOrders);

router
  .route("/:id")
  .put(
    authenticate,
    AuthorizeRole("admin"),
    checkObjectId("id"),
    updateOrderStatus
  );

export default router;
