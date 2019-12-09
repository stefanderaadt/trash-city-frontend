import React from 'react';

import GamePopup from './GamePopup';
import Button from '../../../Default/Button';
import game from '../../../../../Game/Game.ts';

const Info = ({ level }) => (
  <GamePopup>
    <div className="info-popup">
      <h1>{level.name}</h1>
      <p>{level.goal}</p>
      <div className="popup-button-container">
        <Button className="popup-button-start" onClick={() => game.startGame()}>
          Starten
        </Button>
      </div>
    </div>
  </GamePopup>
);

export default Info;
