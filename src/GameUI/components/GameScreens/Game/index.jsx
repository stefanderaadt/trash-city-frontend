import React from 'react';
import { connect } from 'react-redux';

import Button from '../../Default/Button';
import ProgressBar from '../../Default/ProgressBar';
import game from '../../../../Game/Game.ts';
import GamePopups from './Popups';
import displayTime from '../../../../utils/displayTime';
import numberFormatter from '../../../../utils/numberFormatter';

@connect(
  state => ({
    game: state.game
  }),
  dispatch => ({
    dispatch
  })
)
class Game extends React.Component {
  render() {
    const {
      game: { score, time, coins }
    } = this.props;

    let icon = '';

    if (score < 20) {
      icon = 'icon-astonished-face';
    } else if (score < 40) {
      icon = 'icon-sad-face';
    } else if (score < 60) {
      icon = 'icon-neutral-face';
    } else if (score < 80) {
      icon = 'icon-smiling-face';
    } else {
      icon = 'icon-laughing-face';
    }

    return (
      <div className="game">
        <div className="game-overlay-ui">
          <div className="top-bar">
            <Button onClick={game.pause}>
              <i className="icon-pause" />
            </Button>
          </div>
          <div className="bottom-bar">
            <div className="bottom-bar-progress">
              <div className="bottom-bar-progress-bar">
                <ProgressBar progress={score} description={v => `${numberFormatter(v)}%`} />
              </div>
              <div className="bottom-bar-progress-icon">
                <i className={icon} />
              </div>
            </div>
            <div className="bottom-bar-info">
              {`Muntjes: ${coins} - Tijd: ${displayTime(time)}`}
            </div>
          </div>
        </div>
        <GamePopups />
      </div>
    );
  }
}

export default Game;
