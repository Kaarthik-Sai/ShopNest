import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, admin, getUser);
// router.post("/register", logoutUser);

export default router;
