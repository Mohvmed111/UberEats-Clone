import express from "express";
import {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurantController.js";

import {
  getRestaurantValidators,
  createRestaurantValidators,
  updateRestaurantValidators,
  validateRestaurantId,
} from "../middlewares/resturant.js";
import { authenticate, HandleErrors } from "../middlewares/auth.js";
const router = express.Router();

// GET routes مفتوحة
router.get("/", getAllRestaurants);
router.get(
  "/:restaurantId",
  getRestaurantValidators,
  HandleErrors,
  getRestaurantById
);

// POST/PUT/DELETE routes بدون أي auth أو owner middleware
router.post(
  "/",
  authenticate,
  createRestaurantValidators,
  HandleErrors,
  createRestaurant
);
router.put(
  "/:restaurantId",
  authenticate,
  updateRestaurantValidators,
  HandleErrors,
  updateRestaurant
);
router.delete(
  "/:restaurantId",
  authenticate,
  validateRestaurantId,
  HandleErrors,
  deleteRestaurant
);

export default router;
