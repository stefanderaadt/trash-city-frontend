import React from 'react';
import { connect } from 'react-redux';

import { setScreen } from '../../../../actions/appActions';
import { Screens } from '../../../../enums.ts';
import Button from '../../Default/Button';

@connect(dispatch => ({
  dispatch
}))
class ControlsMenu extends React.Component {
  setScreen = screen => {
    const { dispatch } = this.props;
    dispatch(setScreen(screen));
  };

  render() {
    return (
      <div className="game-screen-content controls-menu">
        <div className="game-screen-item game-screen-title">Besturing:</div>
        <div className="game-screen-item">Pijltjestoetsen en Spatiebalk</div>
        <div className="game-screen-item controls-menu-keys-top">
          <i className="icon icon-arrow-up" />
        </div>
        <div className="game-screen-item controls-menu-keys">
          <i className="icon icon-arrow-left" />
          <i className="icon icon-arrow-down" />
          <i className="icon icon-arrow-right" />
        </div>
        <div className="game-screen-item controls-menu-keys">
          <i className="icon icon-space_bar" />
        </div>
        <div className="game-screen-item">
          <Button
            className="controls-menu-back-button"
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

export default ControlsMenu;
