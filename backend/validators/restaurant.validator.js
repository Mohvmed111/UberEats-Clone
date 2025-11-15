import { body } from "express-validator";
import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const addRestaurantValidator = [
  body("owner")
    .notEmpty()
    .withMessage("Owner Id is required")
    .custom(isValidObjectId)
    .withMessage("Invalid Owner Id"),

  body("name").trim().notEmpty().withMessage("Restaurant name is required"),

  body("description").optional().trim(),

  body("image").optional().isURL().withMessage("Image must be a valid URL"),

  body("address").optional().trim(),

  body("location.lat")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Invalid latitude"),

  body("location.lng")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Invalid longitude"),

  body("categories")
    .optional()
    .isArray()
    .withMessage("Categories must be an array of strings"),
];
