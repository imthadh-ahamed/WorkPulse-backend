import dotenv from "dotenv";
import express from "express";
import cors from "cors"; // Import CORS
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import tenantRoutes from "./routes/Tenant/tenant.js";
import announcementRoutes from "./routes/Announcement/announcement.js";
// import employeeRoutes from "./routes/employee.js";
// import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from your frontend
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tenant", tenantRoutes);
app.use("/api/announcement", announcementRoutes);
// app.use("/api/employees", employeeRoutes);

// Error handling
// app.use(errorHandler);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
