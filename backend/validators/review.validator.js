import { body, param } from "express-validator";
import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const addReviewValidator = [
  body("restaurant")
    .notEmpty()
    .withMessage("Restaurant Id is required")
    .custom(isValidObjectId)
    .withMessage("Invalid Restaurant Id"),

  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  body("comment").optional().trim(),
];

export const updateReviewValidator = [
  body("rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  body("comment").optional().trim(),
];

export const reviewIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("Review Id is required")
    .custom(isValidObjectId)
    .withMessage("Invalid Review Id"),
];
