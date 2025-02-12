import React from 'react';
import { useState } from 'react'
import '../App.css'

const ProgressBarSlider = () => {
  // State to manage the slider value
  const [value, setValue] = useState(50);

  // Handle slider value change
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div style={styles.container}>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        style={styles.slider}
      />
      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progress,
            width: `${value}%`,
          }}
        />
      </div>
      <p>Current Value: {value}</p>
    </div>
  );
};

// Styles for the slider and progress bar
const styles = {
  container: {
    width: "300px",
    margin: "20px auto",
    textAlign: "center",
  },
  slider: {
    width: "100%",
    appearance: "none",
    background: "transparent",
    outline: "none",
    position: "relative",
    zIndex: 2,
  },
  progressBar: {
    width: "100%",
    height: "8px",
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    position: "relative",
    top: "-10px",
    zIndex: 1,
  },
  progress: {
    height: "100%",
    backgroundColor: "#76c7c0",
    borderRadius: "4px",
    transition: "width 0.2s ease",
  },
};


function ManualPage(){
    return (
    <>

    <div style={{ 
      backgroundImage: 'url(../assets/robotic-background.jpg)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '100vh', 
      width: '100vw', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
    <p>This is the manual page</p>
    <div class="app-container">
    <div>
      <h3>Motor 1</h3>
      <ProgressBarSlider />
      <h3>Motor 2</h3>
      <ProgressBarSlider />
      <h3>Motor 3</h3>
      <ProgressBarSlider />
      <h3>Motor 4</h3>
      <ProgressBarSlider />
    </div>
    <div id="belt-control">
      <h3>Belt Control</h3>
      <button style={{ background: 'transparent', border: 'none'}} class = "belt-button press-effect"> 
        <img src="../assets/GreenButton_LeftArrow.svg" alt="Left Arrow" /> 
      </button>
      <span></span>
      <button style={{ background: 'transparent', border: 'none' }} class = "belt-button press-effect"> 
        <img src="../assets/GreenButton_RightArrow.svg" alt="Right Arrow" /> 
      </button>
    </div>
</div>
</div>
    </>


  );
}

export default ManualPage;