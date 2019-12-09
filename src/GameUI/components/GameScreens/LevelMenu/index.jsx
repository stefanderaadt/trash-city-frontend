import React from 'react';
import { connect } from 'react-redux';

import game from '../../../../Game/Game.ts';

import levels from '../../../../Game/levels/levels.ts';
import { Screens } from '../../../../enums.ts';
import { setScreen } from '../../../../actions/appActions';
import Button from '../../Default/Button';

const LevelItem = ({ level }) => (
  <div
    className="game-screen-level-item"
    onClick={() => game.pickLevel(level.id)}
    role="button"
    tabIndex={0}
  >
    <div className="game-screen-level-item-content">
      <div className="game-screen-level-thumbnail">
        <img src={level.thumbnail} alt={level.name} />
      </div>
      <div className="game-screen-level-name">{level.name}</div>
    </div>
  </div>
);

@connect(dispatch => ({
  dispatch
}))
class LevelMenu extends React.Component {
  setScreen = screen => {
    const { dispatch } = this.props;
    dispatch(setScreen(screen));
  };

  render() {
    return (
      <div className="game-screen-content level-menu">
        <div className="game-screen-item game-screen-title">Levels</div>
        <div className="game-screen-level-picker">
          {levels.map(level => (
            <LevelItem level={level} key={level.id} />
          ))}
        </div>
        <div className="game-screen-item">
          <Button
            className="level-picker-mainmenu-button"
            fullwidth
            onClick={() => this.setScreen(Screens.MainMenu)}
          >
            Terug
          </Button>
        </div>
      </div>
    );
  }
}

export default LevelMenu;
