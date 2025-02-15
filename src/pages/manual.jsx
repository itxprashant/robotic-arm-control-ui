import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import '../App.css';
import AnimatedBackground from '../components/AnimatedBackground';
import RoboticArmWebSocket from '../services/websocket';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import defaultJointPos from '../../default_joint_pos.json';

const ProgressBarSlider = ({ motor, label, step, min, max }) => {
  const [value, setValue] = useState(motor.value);
  const ws = RoboticArmWebSocket.getInstance();

  const handleSliderChange = (e) => {
    setValue(e.target.value);
    ws.sendJointCommand(motor.id, e.target.value);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (newValue >= min && newValue <= max) {
      setValue(newValue);
      ws.sendJointCommand(motor.id, newValue);
    }
  };

  return (
    <div className="progress-bar-slider" style={{ padding: '10px' }}>
      <label>{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSliderChange}
        style={{ marginRight: '10px' }}
      />
      <input
        style={{ width: '50px' }}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

const ManualPage = () => {
  const [step, setStep] = useState(5);
  const motors = [
    { id: 1, label: "Base Rotation", minVal: -166, maxVal: 166, value: defaultJointPos["1"] },
    { id: 2, label: "Shoulder", minVal: -101, maxVal: 101, value: defaultJointPos["2"] },
    { id: 3, label: "Elbow", minVal: -166, maxVal: 166, value: defaultJointPos["3"] },
    { id: 4, label: "Wrist Roll", minVal: -176, maxVal: -4, value: defaultJointPos["4"] },
    { id: 5, label: "Wrist Pitch", minVal: -166, maxVal: 166, value: defaultJointPos["5"] },
    { id: 6, label: "Wrist Yaw", minVal: -1, maxVal: 215, value: defaultJointPos["6"] },
    { id: 7, label: "Gripper", minVal: -166, maxVal: 166, value: defaultJointPos["7"] },
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
        <button className="btn-3 btn-border" onClick={toggleStep}>
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
        <div style={{marginBottom: '20px'}}>
          <button className="btn-3 btn-border" onClick={() => 0}>Gripper On</button>
          <button className="btn-3 btn-border" onClick={() => 0}>Gripper Off</button>
        </div>
        {/* add a test button */}
        <div>
          <button className="btn-3 btn-border" onClick={testFunction}>Test</button>
      </div>
      </div>
    </AnimatedBackground>
  );
}

export default ManualPage;