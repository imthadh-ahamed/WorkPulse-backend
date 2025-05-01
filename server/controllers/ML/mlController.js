import { getPrediction } from "../../services/ML/mlService.js";

export const predict = async (req, res) => {
  try {
    const { features } = req.body;
    const prediction = await getPrediction(features);
    res.status(200).json({ prediction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};