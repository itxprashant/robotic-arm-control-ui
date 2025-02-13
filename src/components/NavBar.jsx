import React from 'react';
import { useState, useEffect } from 'react'
import '../App.css'
import { generateResponse } from "../geminiapi";
import Slider from '@mui/material/Slider';
import AnimatedBackground from '../components/AnimatedBackground';
import RoboticArmWebSocket from '../services/websocket';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';

export default function NavBar(){
    const navigate = useNavigate();
    return (
    <nav>
        <button onClick={() => navigate("/")} className="back-button">Home</button>
        <button onClick={() => navigate("/manual")} className="back-button">Manual</button>
        <button onClick={() => navigate("/automatic")} className="back-button">Automatic</button>
        <button onClick={() => navigate("/ai-mode")} className="back-button">AI Mode</button>
    </nav>
    )
}