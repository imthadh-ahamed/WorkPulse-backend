import axios from "axios";

export const getPrediction = async (features) => {
  try {
    const response = await axios.post("http://localhost:5000/predict", {
      features,
    });
    return response.data.prediction;
  } catch (error) {
    throw new Error("Error fetching prediction: " + error.message);
  }
};