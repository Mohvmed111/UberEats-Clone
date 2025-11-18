import express from "express";
import {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuItemController.js";

import { authenticate } from "../middlewares/auth.js";

const router = express.Router();
router.get("/", getAllMenuItems);

router.get("/:menuItemId", getMenuItemById);
router.post("/", authenticate, createMenuItem);

router.put("/:menuItemId", authenticate, updateMenuItem);
router.delete("/:menuItemId", authenticate, deleteMenuItem);

export default router;
