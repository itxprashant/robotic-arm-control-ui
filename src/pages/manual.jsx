import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import '../App.css'
import AnimatedBackground from '../components/AnimatedBackground';
import RoboticArmWebSocket from '../services/websocket';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const ProgressBarSlider = ({ motor, label, step }) => {
  const [value, setValue] = useState(0);
  const ws = RoboticArmWebSocket.getInstance();


  const handleChange = (event, newValue) => {
    setValue(newValue);
    ws.sendJointCommand(motor.id, newValue);
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

  const handleGripperOn = () => {
    const ws = RoboticArmWebSocket.getInstance();
    // ws.sendCommand(7, 166);
  }

  const testFunction = () => { 
    const ws = RoboticArmWebSocket.getInstance();
    ws.executeLuaFunction('exampleFunction', [5, 3])
  }

  const handleGripperOff = () => {
    const ws = RoboticArmWebSocket.getInstance();
    // ws.sendCommand(7, -166);
  }

  return (
    <AnimatedBackground>
      <NavBar />
      <div className="app-container">
        <h2>Manual Control</h2>
        <button class="btn-3 btn-border" onClick={toggleStep}>
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
        <div>
          <button class="btn-3 btn-border" onClick={() => 0}>Gripper On</button>
          <button class="btn-3 btn-border" onClick={() => 0}>Gripper Off</button>
        </div>
        {/* add a test button */}
        <div>
          <button class="btn-3 btn-border" onClick={testFunction}>Test</button>
      </div>
      </div>
    </AnimatedBackground>
  );
}

export default ManualPage;