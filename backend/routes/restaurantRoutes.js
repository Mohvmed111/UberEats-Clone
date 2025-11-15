import express from "express";
import mongoose from "mongoose";
import {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurantController.js";

import { addRestaurantValidator } from "../validators/restaurant.validator.js";
import validateRequest  from "../middlewares/validateRequest.js";
import { authenticate, AuthorizeRole } from "../middlewares/auth.js";

const router = express.Router();

const checkObjectId = (param) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[param])) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }
  next();
};

router.get("/", getAllRestaurants);
router.get("/:id", checkObjectId("id"), getRestaurantById);

router.post(
  "/",
  authenticate,
  AuthorizeRole("admin"),
  addRestaurantValidator,
  validateRequest,
  createRestaurant
);

router.put(
  "/:id",
  authenticate,
  AuthorizeRole("admin"),
  checkObjectId("id"),
  addRestaurantValidator,
  validateRequest,
  updateRestaurant
);

router.delete(
  "/:id",
  authenticate,
  AuthorizeRole("admin"),
  checkObjectId("id"),
  deleteRestaurant
);

export default router;
