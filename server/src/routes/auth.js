import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getProfile, login, signup } from "../controllers/authController.js";

const router = Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", requireAuth, getProfile);

export default router;
