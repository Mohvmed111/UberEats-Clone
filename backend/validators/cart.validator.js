import { body } from "express-validator";
import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const addToCartValidator = [
  body("user")
    .notEmpty()
    .withMessage("User Id is required")
    .custom(isValidObjectId)
    .withMessage("Invalid User Id"),

  body("items")
    .isArray({ min: 1 })
    .withMessage("Items must be an array with at least one item"),

  body("items.*.menuItem")
    .notEmpty()
    .withMessage("menuItem Id is required")
    .custom(isValidObjectId)
    .withMessage("Invalid menuItem Id"),

  body("items.*.quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),

  body("totalPrice")
    .notEmpty()
    .withMessage("Total price is required")
    .isFloat({ min: 0 })
    .withMessage("Total price must be a positive number"),
];
