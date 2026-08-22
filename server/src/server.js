import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";

const app = express();
const port = Number(process.env.PORT) || 5000;
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:3000";

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  throw new Error("MONGO_URI and JWT_SECRET must be configured in server/.env");
}

app.use(cors({ origin: clientOrigin }));
app.use(express.json());

app.get("/api/health", (request, response) => {
  response.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.use("/api/auth", authRoutes);

app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).json({ message: "Something went wrong on the server." });
});

connectDB()
  .then(() => app.listen(port, () => {
    console.log(`PTJOB API listening on http://localhost:${port}`);
  }))
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
