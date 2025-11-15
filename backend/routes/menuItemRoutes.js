import express from "express";
import mongoose from "mongoose";
import {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuItemController.js";

import { menuItemValidator } from "../validators/menuItem.validator.js";
import validateRequest from "../middlewares/validateRequest.js";
import { authenticate, AuthorizeRole } from "../middlewares/auth.js";

const router = express.Router();

// Middleware للتحقق من صحة ObjectId
const checkObjectId = (param) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[param])) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }
  next();
};

// 👀 GET routes مفتوحة
router.get("/", getAllMenuItems);
router.get("/:id", checkObjectId("id"), getMenuItemById);

// 🛡️ POST/PUT/DELETE routes محمية (Admin فقط)
router.post(
  "/",
  authenticate,
  AuthorizeRole("admin"),
  menuItemValidator,
  validateRequest,
  createMenuItem
);

router.put(
  "/:id",
  authenticate,
  AuthorizeRole("admin"),
  checkObjectId("id"),
  menuItemValidator,
  validateRequest,
  updateMenuItem
);

router.delete(
  "/:id",
  authenticate,
  AuthorizeRole("admin"),
  checkObjectId("id"),
  deleteMenuItem
);

export default router;
