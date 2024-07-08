import express from "express";
import {
  createRating,
  getAverageRatingForService,
  getRatingsByReservation,
  getRatingsByService,
  getRatingsByUser,
} from "../controllers/rating.controller.js";

const router = express.Router();

router.post("/", createRating);
router.get("/user/:user_id", getRatingsByUser);
router.get("/reservation/:reservation_id", getRatingsByReservation);
router.get("/service/:service_id", getRatingsByService);
router.get("/service/:service_id/average", getAverageRatingForService);

export default router;
