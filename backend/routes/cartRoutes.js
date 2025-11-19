import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

// Routes
router.route("/").get(getCart).post(addToCart);

router.route("/clear").delete(clearCart);
router.route("/:menuItemId").delete(removeFromCart);

export default router;
