import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  verifyOtp,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Verify OTP
router.post("/verify-otp", verifyOtp);

// Login
router.post("/login", loginUser);

// Get Logged In User
router.get("/profile", protect, getUser);

export default router;
