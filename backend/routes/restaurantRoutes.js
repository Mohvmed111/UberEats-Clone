import express from 'express';
import {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} from '../controllers/restaurantController.js';
import { createRestaurantValidators, getRestaurantValidators } from '../middlewares/resturant.js';
import { authenticate } from '../middlewares/auth.js';
auth
const router = express.Router();

// GET routes مفتوحة
router.get('/', getAllRestaurants);
router.get('/:restaurantId',getRestaurantValidators, getRestaurantById);

// POST/PUT/DELETE routes بدون أي auth أو owner middleware
router.post('/',authenticate,createRestaurantValidators, createRestaurant);
router.put('/:restaurantId', authenticate, updateRestaurant);
router.delete('/:restaurantId', authenticate, deleteRestaurant);

export default router;
