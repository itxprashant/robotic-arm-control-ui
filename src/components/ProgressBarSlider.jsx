import React from 'react';

const ProgressBarSlider = ({ motorId, label, step }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="progress-bar-slider">
      <label htmlFor={`motor-${motorId}`}>{label}</label>
      <input
        type="range"
        id={`motor-${motorId}`}
        min={motorId.minVal}
        max={motorId.maxVal}
        step={step}
        value={value}
        onChange={handleChange}
      />
      <p>Angle: {value}°</p>
    </div>
  );
};

export default ProgressBarSlider;