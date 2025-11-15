import { body } from "express-validator";
import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const menuItemValidator = [
  body("restaurant")
    .notEmpty()
    .withMessage("Restaurant Id is required")
    .custom(isValidObjectId)
    .withMessage("Invalid Restaurant Id"),

  body("name").trim().notEmpty().withMessage("Menu item name is required"),

  body("description").optional().trim(),

  body("image").optional().isURL().withMessage("Image must be a valid URL"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("category").optional().trim(),

  body("available")
    .optional()
    .isBoolean()
    .withMessage("Available must be true or false"),
];
