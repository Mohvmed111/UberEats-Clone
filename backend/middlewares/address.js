import { body, param } from "express-validator";
import { HandleErrors } from "./auth.js";

// let getAddressValidators = [
//   param("id")
//     .notEmpty()
//     .withMessage("Address ID is required")
//     .isMongoId()
//     .withMessage("Invalid Address ID format"),
// ];

let addAddressValidator = [
  body("label")
    .trim()
    .notEmpty()
    .withMessage("Label is required")
    .isLength({ max: 100 })
    .withMessage("Label can be at most 100 characters long"),
  body("street")
    .trim()
    .notEmpty()
    .withMessage("Street is required")
    .isLength({ max: 200 })
    .withMessage("Street can be at most 200 characters long"),
  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required")
    .isLength({ max: 100 })
    .withMessage("City can be at most 100 characters long"),
  body("country")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Country can be at most 100 characters long"),
  body("postalCode")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Postal Code can be at most 20 characters long"),
  body("location.lat")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be between -90 and 90"),
  body("location.lng")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be between -180 and 180"),
];

let updateAddressValidator = [
  param("id")
    .notEmpty()
    .withMessage("Address ID is required")
    .isMongoId()
    .withMessage("Invalid Address ID format"),
  body("label")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Label cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Label can be at most 100 characters long"),
  body("street")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Street cannot be empty")
    .isLength({ max: 200 })
    .withMessage("Street can be at most 200 characters long"),
  body("city")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("City cannot be empty")
    .isLength({ max: 100 })
    .withMessage("City can be at most 100 characters long"),
  body("country")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Country can be at most 100 characters long"),
  body("postalCode")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Postal Code can be at most 20 characters long"),
  body("location.lat")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be between -90 and 90"),
  body("location.lng")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be between -180 and 180"),
];

export const validateAddressId = [
  param("id")
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage("Invalid Address ID format"),
  HandleErrors,
];

export {
  // getAddressValidators,
  addAddressValidator,
  updateAddressValidator,
};
