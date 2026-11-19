import { Router } from "express";
import { createJob, getMyPostedJobs } from "../controllers/jobController.js";
import { requireAuth } from "../middleware/auth.js";
import { requireEmployer } from "../middleware/employer.js";

const router = Router();

router.use(requireAuth, requireEmployer);
router.post("/", createJob);
router.get("/my-posted", getMyPostedJobs);

export default router;
