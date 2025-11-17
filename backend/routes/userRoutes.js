import express from "express";
import { register, login, verify } from "../controllers/userController.js";
import {
  loginValidators,
  registerValidators,
  verifyValidators,
  HandleErrors
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerValidators, HandleErrors, register);
router.post("/login", loginValidators, HandleErrors, login);
router.post("/verify/:token", verifyValidators, HandleErrors, verify);
export default router;
