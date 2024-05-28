import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  addAvailability,
} from "../controllers/employee.controller.js";
import { verifyToken, requireAdmin } from "../utils/verifyUser.js";

const router = express.Router();

//create employee, get all employees, get employee by id, updated employee, delete employee
router.post("/", verifyToken, requireAdmin, createEmployee);
router.get("/", getAllEmployees);
router.get("/:employeeId", getEmployeeById);
router.patch("/:employeeId", verifyToken, requireAdmin, updateEmployee);
router.delete("/:employeeId", verifyToken, requireAdmin, deleteEmployee);
router.patch(
  "/:employeeId/availability",
  verifyToken,
  requireAdmin,
  addAvailability
);

export default router;
