import express from "express";
import {
  register,
  login,
  logout,
  checkUser,
  getUser,
  updateUser,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
router.get("/user", verifyToken, getUser);
router.put("/user", verifyToken, updateUser);
router.get("/check-user", verifyToken, checkUser);

export default router;
