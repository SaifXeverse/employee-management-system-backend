import express from "express";
import { createEmployee, deleteEmployee, employeeLogin, employeeLogout, getAllEmployees, getAllEmployeesInactive, getEmployee, getEmployeeProfile, updateEmployee, updateEmployeeStatus } from "../controllers/employeeController.js";
import { verifyTokenEmployee } from "../middleware/employeeMiddleware.js";


const router = express.Router();

router.post("/", createEmployee)
router.post("/login", employeeLogin)
router.post("/logout", employeeLogout)
router.get("/", getAllEmployees)
router.get("/profile", verifyTokenEmployee, getEmployeeProfile)
router.get("/status", getAllEmployeesInactive)
router.get("/:id", getEmployee)
router.put("/:id", updateEmployee)
router.put("/status/:id", updateEmployeeStatus)
router.delete("/:id", deleteEmployee)


export default router;