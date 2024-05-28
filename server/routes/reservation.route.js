import express from "express";
import {
  requireAdmin,
  requirePelanggan,
  verifyToken,
} from "../utils/verifyUser.js";
import {
  createReservation,
  getAllReservation,
  getMyReservation,
} from "../controllers/reservation.controller.js";

const router = express.Router();

//createReservation
router.post("/", verifyToken, requireAdmin, createReservation);
router.get("/", verifyToken, requireAdmin, getAllReservation);
router.get("/my-reservation", verifyToken, requirePelanggan, getMyReservation);

export default router;
