import express from 'express';
import {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} from '../controllers/menuItemController.js';

const router = express.Router();

// GET routes مفتوحة
router.get('/', getAllMenuItems);
router.get('/:id', getMenuItemById);

// POST/PUT/DELETE بدون أي auth أو owner middleware
router.post('/', createMenuItem);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);

export default router;
