import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import '../App.css'
import AnimatedBackground from '../components/AnimatedBackground';
import RoboticArmWebSocket from '../services/websocket';

const ProgressBarSlider = ({ motor, label, step }) => {
  const [value, setValue] = useState(0);
  const ws = RoboticArmWebSocket.getInstance();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    ws.sendCommand(motor.id, newValue);
  };

  return (
    <div className="slider-container">
      <label>{label}</label>
      <Slider
        value={value}
        onChange={handleChange}
        aria-labelledby={`slider-${motor.id}`}
        min= {motor.minVal}
        max= {motor.maxVal}
        step={step}
        className="no-transition"
      />
      <p>Angle: {value}°</p>
    </div>
  );
};

function ManualPage() {
  const [step, setStep] = useState(5);
  const motors = [
    { id: 1, label: "Base Rotation", minVal: -166, maxVal: 166 },
    { id: 2, label: "Shoulder", minVal: -101, maxVal: 101 },
    { id: 3, label: "Elbow", minVal: -166, maxVal: 166 },
    { id: 4, label: "Wrist Roll", minVal: -176, maxVal: -4 },
    { id: 5, label: "Wrist Pitch", minVal: -166, maxVal: 166 },
    { id: 6, label: "Wrist Yaw", minVal: -1, maxVal: 215 },
    { id: 7, label: "Gripper", minVal: -166, maxVal: 166 },
  ];

  const toggleStep = () => {
    setStep((prevStep) => (prevStep === 5 ? 1 : 5));
  };

  return (
    <AnimatedBackground>
      <div className="app-container">
        <h2>Manual Control</h2>
        <button onClick={toggleStep}>
          {step === 5 ? "Smaller Steps" : "Larger Steps"}
        </button>
        <div className="motors-grid">
          {motors.map((motor) => (
            <ProgressBarSlider
              key={motor.id}
              motor={motor}
              label={motor.label}
              step={step}
              min={motor.minVal}
              max={motor.maxVal}
            />
          ))}
        </div>
      </div>
    </AnimatedBackground>
  );
}

export default ManualPage;