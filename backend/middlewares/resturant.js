import { body, param } from "express-validator";

let getRestaurantValidators = [
  param("restaurantId")
    .notEmpty()
    .withMessage("Restaurant ID is required")
    .isMongoId()
    .withMessage("Invalid Restaurant ID format"),
];

let createRestaurantValidators = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Restaurant name is required"),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Restaurant address is required")
    .isLength({ max: 200 })
    .withMessage("Address can be at most 200 characters long"),

  body("categories")
    .optional()
    .isArray()
    .withMessage("Categories must be an array")
    .custom((arr) => {
      for (let category of arr) {
        if (typeof category !== "string" || category.trim() === "") {
          throw "Each category must be a non-empty string";
        }
      }
      return true;
    }),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500, min: 10 })
    .withMessage("Description can be at most 500 characters long"),
];

let updateRestaurantValidators = [
  param("restaurantId")
    .notEmpty()
    .withMessage("Restaurant ID is required")
    .isMongoId()
    .withMessage("Invalid Restaurant ID format"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Restaurant name cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Restaurant name can be at most 100 characters long"),

  body("address")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Restaurant address cannot be empty")
    .isLength({ max: 200 })
    .withMessage("Address can be at most 200 characters long"),

  body("categories")
    .optional()
    .isArray()
    .withMessage("Categories must be an array")
    .custom((arr) => {
      for (let category of arr) {
        if (typeof category !== "string" || category.trim() === "") {
          throw "Each category must be a non-empty string";
        }
      }
      return true;
    }),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500, min: 10 })
    .withMessage("Description can be at most 500 characters long"),
];

const validateRestaurantId = [
  param("restaurantId")
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage("Invalid restaurant ID format"),
];

export {
  getRestaurantValidators,
  createRestaurantValidators,
  updateRestaurantValidators,
  validateRestaurantId,
};
