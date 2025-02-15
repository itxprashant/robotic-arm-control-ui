import { React, useState, useEffect } from 'react'
import '../App.css'
import AnimatedBackground from '../components/AnimatedBackground';
import RoboticArmWebSocket from '../services/websocket';
import NavBar from '../components/NavBar';

function AutomaticPage() {
    const [coordinates, setCoordinates] = useState({
        x: 0,
        y: 0,
        z: 0
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCoordinates(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
        }));
    };

    const handleSubmit = () => {
        const ws = RoboticArmWebSocket.getInstance();
        ws.executeLuaFunction('moveToPoint', [coordinates.x, coordinates.y, coordinates.z]);
    };

    const handlePredefinedScript = (shape) => {
        const ws = RoboticArmWebSocket.getInstance();
        ws.executeLuaFunction('executeShape', [shape]);
    };

    const handlePickObject = () => {
        const ws = RoboticArmWebSocket.getInstance();
        ws.executeLuaFunction('pickObject', []);
    }

    const handlePlaceObject = () => {
        const ws = RoboticArmWebSocket.getInstance();
        ws.executeLuaFunction('placeObject', []);
    }

    return (
      <AnimatedBackground>
        <NavBar />
        <div className="app-container">
          <h2>Automatic Control</h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)',
            maxWidth: '400px',
            margin: '0 auto 20px auto'
          }}>
            <h3>Enter Target Coordinates</h3>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <label>X:</label>
              <input
                type="number"
                name="x"
                value={coordinates.x}
                onChange={handleInputChange}
                style={{
                  width: '80px',
                  padding: '5px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '5px',
                  color: 'white'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <label>Y:</label>
              <input
                type="number"
                name="y"
                value={coordinates.y}
                onChange={handleInputChange}
                style={{
                  width: '80px',
                  padding: '5px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '5px',
                  color: 'white'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <label>Z:</label>
              <input
                type="number"
                name="z"
                value={coordinates.z}
                onChange={handleInputChange}
                style={{
                  width: '80px',
                  padding: '5px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '5px',
                  color: 'white'
                }}
              />
            </div>
            <button className="btn-3 btn-border" onClick={handleSubmit} style={{ width: '200px' }}>
              Move to Position
            </button>
            <button className="btn-3 btn-border" onClick={handlePickObject} style={{ width: '200px' }}>
              Pick Object
            </button>
            <button className="btn-3 btn-border" onClick={handlePlaceObject} style={{ width: '200px' }}>
              Place Object
            </button>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            <h3>Predefined Scripts</h3>
            <div style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <button 
                className="btn-3 btn-border" 
                onClick={() => handlePredefinedScript('triangle')}
                style={{ width: '200px' }}
              >
                Triangle
              </button>
              <button 
                className="btn-3 btn-border" 
                onClick={() => handlePredefinedScript('square')}
                style={{ width: '200px' }}
              >
                Square
              </button>
              <button 
                className="btn-3 btn-border" 
                onClick={() => handlePredefinedScript('pentagon')}
                style={{ width: '200px' }}
              >
                Pentagon
              </button>
              <button 
                className="btn-3 btn-border" 
                onClick={() => handlePredefinedScript('circle')}
                style={{ width: '200px' }}
              >
                Circle
              </button>
            </div>
          </div>
        </div>
      </AnimatedBackground>
    );
}

export default AutomaticPage;
