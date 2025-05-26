"use client";

import React, { useState, useRef, useEffect } from "react";
import NatureSound from "./NatureSound";
import LeafBackground from "./LeafAnimation";

export default function Home() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const inputRef = useRef();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPrediction("");
  };

  const handlePredict = async () => {
    if (!file) return;

    setLoading(true);
    setPrediction("");  // clear old prediction while loading

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://backend-tealeaves-1.onrender.com/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setPrediction(data.prediction || "No prediction result.");
    } catch (error) {
      setPrediction("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger animation each time prediction updates
  useEffect(() => {
    if (prediction) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 1500); // match pulseGlow duration
      return () => clearTimeout(timer);
    }
  }, [prediction]);

  return (
    <div className="container gradient-background">
      <div className="background-leaf" />
      <LeafBackground />
      <NatureSound />

      <header className="header">
        <h1>Tea Leaf Disease Detector 🌿</h1>
        <p>Analyze tea leaves and detect diseases in a natural, soothing environment.</p>
      </header>

      <main className="main-centered">
        <div className="predict-card">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={inputRef}
            className="file-input"
          />

          <button
            className="predict-button"
            onClick={handlePredict}
            disabled={!file || loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>

          {prediction && (
            <div className={`prediction-box ${animate ? "animate" : ""}`}>
              <strong>Prediction:</strong> {prediction}
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 TeaLeafAI — Crafted with 🍵 and 🌿 by Aaryaa!!</p>
      </footer>
    </div>
  );
}
