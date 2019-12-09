import React from 'react';

const GamePopup = ({ children, className, ...props }) => (
  <div className={`game-popup${className ? ` ${className}` : ''}`} {...props}>
    <div className="game-popup-container">{children}</div>
  </div>
);

export default GamePopup;
