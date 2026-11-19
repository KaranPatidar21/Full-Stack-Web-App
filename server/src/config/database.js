import mongoose from "mongoose";

export async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
}

export async function startServer(app, port) {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`PTJOB API listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}
