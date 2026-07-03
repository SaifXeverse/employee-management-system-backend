import express from "express";
import { createEmployee, deleteEmployee, getAllEmployees, getEmployee, updateEmployee } from "../controllers/employeeController.js";


const router = express.Router();

router.post("/", createEmployee)
router.get("/", getAllEmployees)
router.get("/:id", getEmployee)
router.put("/:id", updateEmployee)
router.delete("/:id", deleteEmployee)


export default router;