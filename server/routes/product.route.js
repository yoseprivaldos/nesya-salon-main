import express from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { verifyToken, requireAdmin } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", verifyToken, requireAdmin, createProduct);
router.get("/", getProducts);
router.get("/:productId", getProductById);
router.patch("/:productId", verifyToken, requireAdmin, updateProduct);
router.delete("/:productId", verifyToken, requireAdmin, deleteProduct);

export default router;
