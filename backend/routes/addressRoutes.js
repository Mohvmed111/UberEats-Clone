import express from "express";
import {
  addAddress,
  getUserAddresses,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";
import {
  // getAddressValidators,
  addAddressValidator,
  updateAddressValidator,
  validateAddressId,
} from "../middlewares/address.js";
import { authenticate, HandleErrors } from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .get(authenticate, getUserAddresses)
  .post(authenticate, addAddressValidator, HandleErrors, addAddress);

router
  .route("/:id")
  .put(authenticate, updateAddressValidator, HandleErrors, updateAddress)
  .delete(authenticate, validateAddressId, HandleErrors, deleteAddress);

export default router;
