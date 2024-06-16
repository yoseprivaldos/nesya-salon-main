import express from "express";
import {
  createSchedule,
  deleteSchedule,
  deleteScheduleByReservationId,
  getAllSchedules,
  getSchedule,
  updateSchedule,
} from "../controllers/schedule.controller.js";

const router = express.Router();

router.get("/", getSchedule);
router.get("/all", getAllSchedules);
router.post("/create-schedule", createSchedule);
router.patch("/:id", updateSchedule);
router.delete("/:id", deleteSchedule);
router.delete(
  "/delete-schedule-reservation/:id",
  deleteScheduleByReservationId
);

export default router;
