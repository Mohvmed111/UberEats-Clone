import express from "express";
import {
  addReview,
  getRestaurantReviews,
  deleteReview,
} from "../controllers/reviewController.js";
import { authenticate } from "../middlewares/auth.js";
import {
  deleteValidators,
  AddReviewValidators,
} from "../middlewares/reviews.js";
const router = express.Router();

// Add a new review
router.post("/", authenticate, AddReviewValidators, addReview);
// Get all reviews for a specific restaurant
router.get("/:restaurantId", getRestaurantReviews);

// Delete a review by ID
router.delete("/:reviewId", authenticate, deleteValidators, deleteReview);

export default router;
