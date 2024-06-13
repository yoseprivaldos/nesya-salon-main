import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
} from "../controllers/user.controller.js";

import { requireAdmin, verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", verifyToken, getUserById);
router.get("/admins/show", verifyToken, getAllAdmins);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.patch("/admins/update/:id", verifyToken, requireAdmin, updateAdmin);
router.delete("/admins/delete/:id", verifyToken, requireAdmin, deleteAdmin);

export default router;
