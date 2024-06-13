import express from "express";
import { requireAdmin, verifyToken } from "../utils/verifyUser.js";
import {
  createReservation,
  getAllReservation,
  getMyReservation,
  updateReservation,
} from "../controllers/reservation.controller.js";

const router = express.Router();

//createReservation
router.post("/", verifyToken, createReservation);
router.get("/", verifyToken, requireAdmin, getAllReservation);
router.get("/my-reservation", verifyToken, getMyReservation);
router.patch("/:id", verifyToken, updateReservation);

export default router;
