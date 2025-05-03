import axios from "axios";

const BASE_URL = process.env.FLASK_SERVER_URL || "http://localhost:5000"; 

export const getPrediction = async (features) => {
  try {
    const response = await axios.post(`${BASE_URL}/predict`, {
      features,
    });
    return response.data; // Return the full response data (e.g., efficiency_prediction, productivity_prediction)
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message;
    throw new Error("Error fetching prediction: " + errorMessage);
  }
};