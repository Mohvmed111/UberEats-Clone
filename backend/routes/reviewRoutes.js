import express from "express";
import {
  addReview,
  getReviewsByRestaurant,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

import {
  addReviewValidator,
  updateReviewValidator,
  reviewIdValidator,
} from "../validators/review.validator.js";
import validateRequest from "../middlewares/validateRequest.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

// عرض كل مراجعات مطعم محدد
router.get("/restaurant/:restaurantId", getReviewsByRestaurant);

// إضافة مراجعة جديدة
router.post("/", authenticate, addReviewValidator, validateRequest, addReview);

// تحديث مراجعة موجودة (المستخدم نفسه)
router.put(
  "/:id",
  authenticate,
  reviewIdValidator,
  updateReviewValidator,
  validateRequest,
  updateReview
);

// حذف مراجعة (المستخدم نفسه)
router.delete("/:id", authenticate, reviewIdValidator, deleteReview);

export default router;
