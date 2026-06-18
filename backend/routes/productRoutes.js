import express from "express";
import multer from "multer";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

const storage = multer.diskStorage({});
const upload = multer({ storage });

router
  .route("/")
  .get(getProducts)
  .post(protect, admin, upload.single("imageUrl"), createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, upload.single("imageUrl"), updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
