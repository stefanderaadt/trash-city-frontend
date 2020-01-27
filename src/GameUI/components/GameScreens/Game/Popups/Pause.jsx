import React from 'react';

import GamePopup from './GamePopup';
import Button from '../../../Default/Button';
import game from '../../../../../Game/Game.ts';
import { Screens } from '../../../../../enums.ts';

const Pause = ({ setScreen, level: { goal } }) => (
  <GamePopup>
    <div className="pause-popup">
      <h1>Pauze</h1>
      <div className="pause-popup-buttons">
        <div className="popup-button-container">
          <Button className="popup-button-resume" onClick={game.resume}>
            Verder spelen
          </Button>
        </div>
        <div className="popup-button-container">
          <Button className="popup-button-mainmenu" onClick={() => setScreen(Screens.MainMenu)}>
            Hoofdmenu
          </Button>
        </div>
      </div>
      <hr />
      <h3>Leveldoel:</h3>
      <p>{goal}</p>
    </div>
  </GamePopup>
);

export default Pause;
