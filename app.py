from flask import Flask, request, jsonify
import numpy as np
import pickle
from flask_cors import CORS  # to avoid CORS errors with frontend

app = Flask(__name__)
CORS(app)

# Load trained model
model = pickle.load(open("forest_fire_model.pkl", "rb"))

@app.route("/")
def home():
    return "🌲🔥 Forest Fire Predictor is running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        print("📥 Incoming data:", data)

        features = [
            data["brightness"],
            data["bright_t31"],
            data["frp"],
            data["latitude"],
            data["longitude"]
        ]

        prediction = model.predict([features])
        return jsonify({"confidence": float(prediction[0])})
    
    except Exception as e:
        print("❌ Prediction failed:", e)
        return jsonify({"error": "Prediction failed"}), 400

if __name__ == "__main__":
    app.run(debug=True)
