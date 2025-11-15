import express from "express";
import {
  addAddress,
  getUserAddresses,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";

import {
  addAddressValidator,
  updateAddressValidator,
} from "../validators/address.validator.js";
import validateRequest from "../middlewares/validateRequest.js";

const router = express.Router();

router
  .route("/")
  .get(getUserAddresses)
  .post(addAddressValidator, validateRequest, addAddress);

router
  .route("/:id")
  .put(updateAddressValidator, validateRequest, updateAddress)
  .delete(deleteAddress);

export default router;
