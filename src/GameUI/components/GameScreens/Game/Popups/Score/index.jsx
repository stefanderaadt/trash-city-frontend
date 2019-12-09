import React from 'react';

import GamePopup from '../GamePopup';
import Button from '../../../../Default/Button';
import { Screens } from '../../../../../../enums.ts';
import displayTime from '../../../../../../utils/displayTime';
import HighScores from './HighScores';

const Score = ({ game, game: { time }, setScreen, setScoreName, saveHighScore, score }) => (
  <GamePopup className="score-popup">
    <div className="score-popup-content">
      <h1>Gewonnen!</h1>
      <hr />
      <div className="score-popup-info">
        <p>{`Tijd: ${displayTime(game.time)}`}</p>
      </div>
      <hr />
      <HighScores
        score={score}
        time={time}
        saveHighScore={saveHighScore}
        setScoreName={setScoreName}
      />
      <hr />
      <div className="popup-button-container">
        <Button className="popup-button-mainmenu" onClick={() => setScreen(Screens.MainMenu)}>
          Hoofdmenu
        </Button>
      </div>
    </div>
  </GamePopup>
);

export default Score;
