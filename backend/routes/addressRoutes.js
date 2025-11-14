import express from "express";
import {
  addAddress,
  getUserAddresses,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";

const router = express.Router();


router.route("/")
  .get(getUserAddresses)
  .post(addAddress);

router.route("/:id")
  .put(updateAddress)
  .delete(deleteAddress);

export default router;
