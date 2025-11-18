import { body, param } from "express-validator";

let getRestaurantValidators = [
  param("restaurantId")
    .notEmpty()
    .withMessage("Restaurant ID is required")
    .isMongoId()
    .withMessage("Invalid Restaurant ID format"),
];

let createRestaurantValidators = [
  body("name").trim().notEmpty().withMessage("Restaurant name is required"),
  body("address")
    .trim()
    .notEmpty()
    .withMessage("Restaurant address is required"),
];
export { getRestaurantValidators, createRestaurantValidators };

