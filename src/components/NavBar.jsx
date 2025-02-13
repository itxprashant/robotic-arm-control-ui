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
    <nav class="navbar">
        <button class="btn-3" onClick={() => navigate("/")}>Home</button>
        <button class="btn-3" onClick={() => navigate("/manual")}>Manual</button>
        <button class="btn-3" onClick={() => navigate("/automatic")}>Automatic</button>
        <button class="btn-3" onClick={() => navigate("/ai-mode")}>AI Mode</button>
    </nav>
    )
}