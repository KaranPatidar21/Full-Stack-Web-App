import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";

const app = express();
const port = Number(process.env.PORT) || 5000;
const configuredOrigins = (process.env.CLIENT_ORIGINS || process.env.CLIENT_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  ...configuredOrigins,
]);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS origin not allowed: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  throw new Error("MONGO_URI and JWT_SECRET must be configured in server/.env");
}

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
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
