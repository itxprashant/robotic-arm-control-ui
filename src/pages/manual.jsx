import React from 'react';
import { useState, useEffect } from 'react'
import '../App.css'
import AnimatedBackground from '../components/AnimatedBackground';
import RoboticArmWebSocket from '../services/websocket';

const ProgressBarSlider = ({ motorId, label }) => {
  const [value, setValue] = useState(50);
  const ws = RoboticArmWebSocket.getInstance();

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    setValue(newValue);
    ws.sendCommand(motorId, newValue);
  };

  return (
    <div style={styles.container}>
      <h3>{label}</h3>
      <input
        type="range"
        min="-180"
        max="180"
        value={value}
        onChange={handleChange}
        style={styles.slider}
      />
      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progress,
            width: `${((value + 180) / 360) * 100}%`,
          }}
        />
      </div>
      <p>Angle: {value}°</p>
    </div>
  );
};

function ManualPage() {
  const motors = [
    { id: 1, label: "Base Rotation" },
    { id: 2, label: "Shoulder" },
    { id: 3, label: "Elbow" },
    { id: 4, label: "Wrist Roll" },
    { id: 5, label: "Wrist Pitch" },
    { id: 6, label: "Wrist Yaw" },
    { id: 7, label: "Gripper" },
  ];

  return (
    <AnimatedBackground>
      <div className="app-container">
        <h2>Manual Control</h2>
        <div className="motors-grid">
          {motors.map((motor) => (
            <ProgressBarSlider
              key={motor.id}
              motorId={motor.id}
              label={motor.label}
            />
          ))}
        </div>
      </div>
    </AnimatedBackground>
  );
}

const styles = {
  container: {
    width: "300px",
    margin: "20px auto",
    textAlign: "center",
  },
  slider: {
    width: "100%",
    appearance: "none",
    background: "transparent",
    outline: "none",
    position: "relative",
    zIndex: 2,
  },
  progressBar: {
    width: "100%",
    height: "8px",
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    position: "relative",
    top: "-10px",
    zIndex: 1,
  },
  progress: {
    height: "100%",
    backgroundColor: "#76c7c0",
    borderRadius: "4px",
    transition: "width 0.2s ease",
  },
};

export default ManualPage;