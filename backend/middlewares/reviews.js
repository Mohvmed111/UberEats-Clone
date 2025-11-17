import { body, param } from "express-validator";

let AddReviewValidators = [
  body("restaurant")
    .notEmpty()
    .withMessage("Restaurant ID is required")
    .isMongoId()
    .withMessage("Invalid Restaurant ID format"),
  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5"),
  body("comment").optional().isString().withMessage("Comment must be a string"),
];
let deleteValidators = [
  param("reviewId")
    .notEmpty()
    .withMessage("Review ID is required")
    .isMongoId()
    .withMessage("Invalid Review ID format"),
    body("restaurant")
    .notEmpty()
    .withMessage("Restaurant ID is required")
    .isMongoId()
    .withMessage("Invalid Restaurant ID format"),
];
export {
  AddReviewValidators,
  deleteValidators
}