import React from 'react';
import { useState, useEffect } from 'react'
import '../App.css'
import Slider from '@mui/material/Slider';
import AnimatedBackground from '../components/AnimatedBackground';
import RoboticArmWebSocket from '../services/websocket';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';

export default function NavBar(){
    const navigate = useNavigate();
    return (
    <nav class="navbar">
        <div style = {{margin: 'auto', width: '80%'}}>
        <div style={{ float: 'left' }}>
            <button class="btn-3 btn-border-2" onClick={() => navigate("/")}>Home</button>
        </div>
        <div style={{ float: 'right' }}>
            <button class="btn-3 btn-border" onClick={() => navigate("/manual")}>Manual</button>
            <button class="btn-3 btn-border" onClick={() => navigate("/automatic")}>Automatic</button>
            <button class="btn-3 btn-border" onClick={() => navigate("/ai-mode")}>AI Mode</button>
        </div>
        </div>
    </nav>
    )
}