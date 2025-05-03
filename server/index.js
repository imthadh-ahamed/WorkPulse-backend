import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose"; // For graceful shutdown
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import tenantRoutes from "./routes/Tenant/tenant.js";
import announcementRoutes from "./routes/Announcement/announcement.js";
import calendarRoutes from "./routes/Calendar/calendar.js";
import projectRoutes from "./routes/Project/Project.js";
import taskRoutes from "./routes/Task/Task.js";
import employeeRoutes from "./routes/Employee/employee.js";
import mlRoutes from "./routes/ML/mlRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js"; 

dotenv.config();

const app = express();

// Validate environment variables
if (!process.env.MONGO) {
  console.error("Error: MONGO environment variable is not defined.");
  process.exit(1);
}

// Enable CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(morgan("dev")); // Log HTTP requests

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tenant", tenantRoutes);
app.use("/api/announcement", announcementRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/ml", mlRoutes);

// Error handling
app.use(errorHandler); // Use error handler middleware

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await mongoose.connection.close();
  process.exit(0);
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
