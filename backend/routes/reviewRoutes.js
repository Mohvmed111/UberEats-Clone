import express from "express";
import { addReview, getRestaurantReviews, deleteReview } from "../controllers/reviewController.js";

const router = express.Router();

// Add a new review
router.post("/", addReview);

// Get all reviews for a specific restaurant
router.get("/:restaurantId", getRestaurantReviews);

// Delete a review by ID
router.delete("/:id", deleteReview);

export default router;
