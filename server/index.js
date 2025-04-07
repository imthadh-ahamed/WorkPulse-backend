import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
// import authRoutes from "./routes/auth.js";
import tenantRoutes from "./routes/Tenant/tenant.js";
// import employeeRoutes from "./routes/employee.js";
// import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
app.use("/api/tenant", tenantRoutes);
// app.use("/api/employees", employeeRoutes);

// // Error handling
// app.use(errorHandler);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
