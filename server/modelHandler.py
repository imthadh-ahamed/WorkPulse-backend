import pickle
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load the model
import os

model_path = os.path.join(os.path.dirname(__file__), "ml", "efficiency_score_regressor.pkl")
with open(model_path, "rb") as file:
    model = pickle.load(file)

@app.route("/", methods=["POST"])
def predict():
    data = request.json
    prediction = model.predict([data["features"]])  # Replace with your model's input format
    return jsonify({"prediction": prediction.tolist()})

if __name__ == "__main__":
    app.run(port=5000)