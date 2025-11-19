import express from "express";
import {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuItemController.js";

const router = express.Router();

// GET routes
router.get("/", getAllMenuItems);
router.get("/:id", getMenuItemById);

router.post("/", createMenuItem);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);

export default router;
