import { body } from "express-validator";
// const mongoose = require("");

export const addAddressValidator = [
  body("user")
    .trim()
    .notEmpty()
    .withMessage("User Id is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid User Id"),

  body("label")
    .trim()
    .notEmpty()
    .withMessage("Label is required")
    .isString()
    .withMessage("Label must be a string"),

  body("street")
    .trim()
    .notEmpty()
    .withMessage("Street is required")
    .isString()
    .withMessage("Street must be a string"),

  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required")
    .isString()
    .withMessage("City must be a string"),
];

export const updateAddressValidator = [
  body("label")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Label cannot be empty")
    .isString()
    .withMessage("Label must be a string"),

  body("street")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Street cannot be empty")
    .isString()
    .withMessage("Street must be a string"),

  body("city")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("City cannot be empty")
    .isString()
    .withMessage("City must be a string"),
];

// module.exports = { addAddressValidator, updateAddressValidator };
