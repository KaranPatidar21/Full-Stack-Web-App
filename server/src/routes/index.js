import { Router } from "express";
import authRoutes from "./auth.js";
import jobRoutes from "./jobs.js";

const apiRoutes = Router();

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/jobs", jobRoutes);

export default apiRoutes;
