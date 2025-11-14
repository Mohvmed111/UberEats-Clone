import express from "express";
import { register, login, verify } from "../controllers/userController.js";
import {
  loginValidators,
  registerValidators,
  verifyValidators,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerValidators, register);
router.post("/login", loginValidators, login);
router.post("/verify/:token", verifyValidators, verify);
export default router;
