import express from "express";
import { register, login, logout, getUsers } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get( "/users", verifyToken, getUsers);


export default router;