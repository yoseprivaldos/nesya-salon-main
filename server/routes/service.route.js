import express from "express";
import {
  createService,
  getAllServices,
  getService,
  updateService,
  deleteService,
  getNumberOfViewsById,
  updateNumberOfViewsService,
} from "../controllers/services.controller.js";
import { verifyToken, requireAdmin } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", verifyToken, requireAdmin, createService);
router.get("/", getAllServices);
router.get("/:serviceId", getService);
router.patch("/:serviceId", verifyToken, requireAdmin, updateService);
router.delete("/:serviceId", verifyToken, requireAdmin, deleteService);
router.get("/:id/views", getNumberOfViewsById);
router.post("/updateNumberOfViews", updateNumberOfViewsService);

export default router;
