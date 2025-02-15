import { React, useState } from 'react'
import '../App.css'
import AnimatedBackground from '../components/AnimatedBackground';
import RoboticArmWebSocket from '../services/websocket';
import NavBar from '../components/NavBar';

function SpawnObjectPage() {
    const handleSpawnObject = (objectType) => {
        const ws = RoboticArmWebSocket.getInstance();
        ws.executeLuaFunction('spawnObject', [objectType]);
    };

    return (
        <AnimatedBackground>
            <NavBar />
            <div className="app-container">
                <h2>Spawn Objects</h2>
                {/* Regular Objects Section */}
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
                    margin: '0 auto 20px auto'
                }}>
                    <h3>Regular Objects</h3>
                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        <button 
                            className="btn-3 btn-border" 
                            onClick={() => handleSpawnObject('cuboid')}
                            style={{ width: '200px' }}
                        >
                            Cuboid
                        </button>
                        <button 
                            className="btn-3 btn-border" 
                            onClick={() => handleSpawnObject('sphere')}
                            style={{ width: '200px' }}
                        >
                            Sphere
                        </button>
                        <button 
                            className="btn-3 btn-border" 
                            onClick={() => handleSpawnObject('cylinder')}
                            style={{ width: '200px' }}
                        >
                            Cylinder
                        </button>
                        <button 
                            className="btn-3 btn-border" 
                            onClick={() => handleSpawnObject('capsule')}
                            style={{ width: '200px' }}
                        >
                            Capsule
                        </button>
                    </div>
                </div>

                {/* Irregular Objects Section */}
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
                    <h3>Irregular Objects</h3>
                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        <button 
                            className="btn-3 btn-border" 
                            onClick={() => handleSpawnObject('plate')}
                            style={{ width: '200px' }}
                        >
                            Plate
                        </button>
                        <button 
                            className="btn-3 btn-border" 
                            onClick={() => handleSpawnObject('redCup')}
                            style={{ width: '200px' }}
                        >
                            Red Cup
                        </button>
                        <button 
                            className="btn-3 btn-border" 
                            onClick={() => handleSpawnObject('copperCup')}
                            style={{ width: '200px' }}
                        >
                            Copper Cup
                        </button>
                        <button 
                            className="btn-3 btn-border" 
                            onClick={() => handleSpawnObject('dumbBell')}
                            style={{ width: '200px' }}
                        >
                            Dumb Bell
                        </button>
                    </div>
                </div>
            </div>
        </AnimatedBackground>
    );
}

export default SpawnObjectPage;
