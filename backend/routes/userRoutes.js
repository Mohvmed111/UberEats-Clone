import express from "express";
import {
  register,
  login,
  verify,
  getUserProfile,
  logout,
} from "../controllers/userController.js";
import {
  loginValidators,
  registerValidators,
  verifyValidators,
  HandleErrors,
  authenticate,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerValidators, HandleErrors, register);
router.post("/login", loginValidators, HandleErrors, login);
router.post("/verify/:token", verifyValidators, HandleErrors, verify);
router.post("/logout", logout);
router.get("/profile", authenticate, HandleErrors, getUserProfile);
export default router;
