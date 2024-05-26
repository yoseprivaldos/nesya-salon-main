import express from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
