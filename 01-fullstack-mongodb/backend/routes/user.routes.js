import { Router } from "express";
import { registerUser, verifyUser,loginUser } from "../controller/user.controller.js";
import validate from "../middleware/validate.middleware.js";
import {
  registerSchema,
  loginSchema,
} from "../validations/auth.validations.js";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);
router.get("/verify/:token", verifyUser);
router.post("/login", validate(loginSchema), loginUser);

export default router;
