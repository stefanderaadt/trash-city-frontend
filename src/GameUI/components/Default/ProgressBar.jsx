import React from 'react';

const ProgressBar = ({ progress, description }) => {
  return (
    <div className="progress-bar">
      <div className="progress-bar-display" style={{ width: `${progress}%` }} />
      <div className="progress-bar-text">{description ? description(progress) : progress}</div>
    </div>
  );
};

export default ProgressBar;
