import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import '../App.css'
import AnimatedBackground from '../components/AnimatedBackground';
import RoboticArmWebSocket from '../services/websocket';

const ProgressBarSlider = ({ motorId, label }) => {
  const [value, setValue] = useState(0);
  const ws = RoboticArmWebSocket.getInstance();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    ws.sendCommand(motorId, newValue);
  };

  return (
    <div className="slider-container">
      <label>{label}</label>
      <Slider
        value={value}
        onChange={handleChange}
        aria-labelledby={`slider-${motorId}`}
        min={-180}
        max={180}
      />
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

export default ManualPage;