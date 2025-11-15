import express from "express";
import mongoose from "mongoose";
import {
  addToCart,
  getMyCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";

import { addToCartValidator } from "../validators/cart.validator.js";
import validateRequest from "../middlewares/validateRequest.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

const checkObjectId = (param) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[param])) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }
  next();
};

router.get("/", authenticate, getMyCart);

router.post("/", authenticate, addToCartValidator, validateRequest, addToCart);

router.put("/:itemId", authenticate, checkObjectId("itemId"), updateCartItem);

router.delete(
  "/:itemId",
  authenticate,
  checkObjectId("itemId"),
  removeCartItem
);

router.delete("/", authenticate, clearCart);

export default router;
