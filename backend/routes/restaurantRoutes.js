import express from 'express';
import {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} from '../controllers/restaurantController.js';

const router = express.Router();

// GET routes مفتوحة
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

// POST/PUT/DELETE routes بدون أي auth أو owner middleware
router.post('/', createRestaurant);
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);

export default router;
