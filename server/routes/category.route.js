import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategoriesByParent,
  getMainCategories,
  getCategories,
} from "../controllers/category.controller.js";
import { verifyToken, requireAdmin } from "../utils/verifyUser.js";

const router = express.Router();

// router.post("/", verifyToken, requireAdmin, createCategory);
router.post("/", verifyToken, requireAdmin, createCategory);
router.get("/", getCategories);
router.get("/main", getMainCategories);
router.get("/:parentId", getCategoriesByParent);
router.delete("/:categoryId", verifyToken, requireAdmin, deleteCategory);

export default router;
