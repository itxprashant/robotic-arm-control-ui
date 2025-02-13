import { React, useState, useEffect } from 'react'
import '../App.css'
import Slider from '@mui/material/Slider';
import AnimatedBackground from '../components/AnimatedBackground';
import RoboticArmWebSocket from '../services/websocket';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';


function AutomaticPage(){
    return (
    <AnimatedBackground>
    <NavBar />
      <div class="app-container">
        <p>This is the automatic page</p>
      </div>
    </AnimatedBackground>)
}






export default AutomaticPage;