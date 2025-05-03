import express from "express";
import { predict } from "../../controllers/ML/mlController.js";

const router = express.Router();

// Validation middleware to check if features are provided and are in the correct format
// This middleware checks if the 'features' field is present in the request body and is an array.

const validateFeatures = (req, res, next) => {
  const { features } = req.body;
  if (!features || !Array.isArray(features)) {
    return res.status(400).json({ error: "Invalid input: 'features' must be an array." });
  }
  next();
};

// Route for prediction
router.post("/predict", validateFeatures, predict);

export default router;