import express from "express";
import { createEmployee, deleteEmployee, employeeLogin, employeeLogout, getAllEmployees, getAllEmployeesInactive, getEmployee, getEmployeeProfile, updateEmployee, updateEmployeeProfile, updateEmployeeStatus, uploadEmployeeResume } from "../controllers/employeeController.js";
import { verifyTokenEmployee } from "../middleware/employeeMiddleware.js";


const router = express.Router();

router.post("/login", employeeLogin);
router.post("/logout", employeeLogout);

router.get("/profile", verifyTokenEmployee, getEmployeeProfile);
router.put("/profile", verifyTokenEmployee, updateEmployeeProfile);

router.put("/upload", verifyTokenEmployee, uploadEmployeeResume);

router.get("/status", getAllEmployeesInactive);
router.put("/status/:id", updateEmployeeStatus);

router.post("/", createEmployee);
router.get("/", getAllEmployees);

router.get("/:id", getEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);


export default router;