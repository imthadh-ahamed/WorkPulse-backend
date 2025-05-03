import { getPrediction } from "../../services/ML/mlService.js";

export const predict = async (req, res) => {
  try {
    const { features } = req.body;

    // Validate input
    if (!features || !Array.isArray(features)) {
      return res.status(400).json({ error: "Invalid input: 'features' must be an array." });
    }

    // Call the ML service to get predictions
    const prediction = await getPrediction(features);

    // Return the prediction
    res.status(200).json(prediction); // Assuming prediction contains the efficiency and productivity predictions
  } catch (error) {
    // Return error response
    res.status(500).json({ error: error.message });
  }
};