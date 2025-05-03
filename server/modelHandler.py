import pickle
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# Load models and preprocessor
try:
    efficiency_model_path = os.path.join(os.path.dirname(__file__), "ml", "efficiency_score_regressor.pkl")
    productivity_model_path = os.path.join(os.path.dirname(__file__), "ml", "productivity_classifier.pkl")
    preprocessor_path = os.path.join(os.path.dirname(__file__), "ml", "preprocessor.pkl")

    with open(efficiency_model_path, "rb") as file:
        efficiency_model = pickle.load(file)

    with open(productivity_model_path, "rb") as file:
        productivity_model = pickle.load(file)

    with open(preprocessor_path, "rb") as file:
        preprocessor = pickle.load(file)

except FileNotFoundError as e:
    print(f"Error: {e}")
    raise FileNotFoundError("One or more model files are missing. Please check the 'ml' directory.")
except Exception as e:
    print(f"Error loading models: {e}")
    raise

@app.route("/", methods=["POST"])
def predict():
    try:
        # Validate input
        data = request.json
        if not data or "features" not in data or not isinstance(data["features"], list):
            return jsonify({"error": "Invalid input: 'features' must be a list."}), 400

        # Preprocess the input data
        processed_data = preprocessor.transform([data["features"]])  # Assuming preprocessor is a scikit-learn transformer

        # Get predictions from both models
        efficiency_prediction = efficiency_model.predict(processed_data)
        productivity_prediction = productivity_model.predict(processed_data)

        return jsonify({
            "efficiency_prediction": efficiency_prediction.tolist(),
            "productivity_prediction": productivity_prediction.tolist()
        })
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

@app.route("/health", methods=["GET"])
def health_check():
    try:
        # Check if models and preprocessor are loaded
        if efficiency_model and productivity_model and preprocessor:
            return jsonify({"status": "healthy"})
        else:
            return jsonify({"status": "unhealthy"}), 500
    except Exception as e:
        return jsonify({"status": "unhealthy", "error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("FLASK_PORT", 5000))
    app.run(port=port, debug=True)