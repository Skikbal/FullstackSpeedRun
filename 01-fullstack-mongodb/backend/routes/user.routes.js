import { Router } from "express";
import {
  registerUser,
  verifyUser,
  loginUser,
  getUserProfile,
  forgetUserPassword,
  resetUserPassword,
  logout,
} from "../controller/user.controller.js";
import validate from "../middleware/validate.middleware.js";
import isAuth from "../middleware/isAuth.middleware.js";
import {
  registerSchema,
  loginSchema,
} from "../validations/auth.validations.js";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);
router.get("/verify/:token", verifyUser);
router.post("/login", validate(loginSchema), loginUser);
router.get("/user-profile", isAuth, getUserProfile);
router.post("/forgot-password", forgetUserPassword);
router.post("/reset-password/:token", resetUserPassword);
router.get("/logout", isAuth, logout);

export default router;
