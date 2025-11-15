import { body } from "express-validator";

export const addAddressValidator = [

  body("user").trim().notEmpty().withMessage("User Id is required"),
  body("label").trim().notEmpty().withMessage("Label is required"),

  body("street").trim().notEmpty().withMessage("Street is required"),

  body("city").trim().notEmpty().withMessage("City is required"),
];

export const updateAddressValidator = [
  body("label").optional().notEmpty().withMessage("Label cannot be empty"),

  body("street").optional().notEmpty().withMessage("Street cannot be empty"),

  body("city").optional().notEmpty().withMessage("City cannot be empty"),
];

// module.exports = { addAddressValidator, updateAddressValidator };
