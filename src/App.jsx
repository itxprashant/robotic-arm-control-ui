import { useState, useEffect } from 'react';
import React from 'react';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ManualPage from './pages/manual.jsx';
import AutomaticPage from './pages/automatic.jsx';
import AIModePage from './pages/aimode.jsx';
import AnimatedBackground from './components/AnimatedBackground';
import SpawnObjectPage from './pages/spawn-object';

function ManualModeButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/manual');
  };
  return <button onClick={handleClick} className="btn-3"><span>Manual</span></button>;
}

function AutomaticModeButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/automatic');
  };
  return <button onClick={handleClick} className="btn-3"><span>Automatic</span></button>;
}

function AIModeButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/ai-mode');
  };
  return <button onClick={handleClick} className="btn-3"><span>AI Mode</span></button>;
}

function Home() {
  return (
    <AnimatedBackground>
      <div class="main-page-container" style={{  justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
      <h1>Welcome to Robotic Arm Control v1.0</h1>
        <ManualModeButton />
        <AutomaticModeButton />
        <AIModeButton />
      </div>
    </AnimatedBackground>
  );
}

function AutomaticMode() {
  return <h2>Automatic Mode Page</h2>;
}

function AIMode() {
  return <h2>AI Mode Page</h2>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manual" element={<ManualPage />} />
        <Route path="/automatic" element={<AutomaticPage />} />
        <Route path="/ai-mode" element={<AIModePage />} />
        <Route path="/spawn-object" element={<SpawnObjectPage />} />
      </Routes>
    </Router>
  );
}

export default App;

