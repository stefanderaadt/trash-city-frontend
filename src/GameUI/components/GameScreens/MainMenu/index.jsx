import React from 'react';
import { connect } from 'react-redux';

import { setScreen } from '../../../../actions/appActions';
import { Screens } from '../../../../enums.ts';
import Button from '../../Default/Button';

@connect(dispatch => ({
  dispatch
}))
class MainMenu extends React.Component {
  setScreen = screen => {
    const { dispatch } = this.props;
    dispatch(setScreen(screen));
  };

  render() {
    return (
      <div className="game-screen-content">
        <div className="game-screen-item game-screen-title">Hoofdmenu</div>
        <div className="game-screen-item">
          <Button
            className="main-menu-levels-button"
            fullwidth
            onClick={() => this.setScreen(Screens.LevelMenu)}
          >
            Levels
          </Button>
        </div>
        <div className="game-screen-item">
          <Button
            className="main-menu-controls-button"
            fullwidth
            onClick={() => this.setScreen(Screens.ControlsMenu)}
          >
            Besturing
          </Button>
        </div>
        <div className="game-screen-item">
          <Button
            className="main-menu-settings-button"
            fullwidth
            onClick={() => this.setScreen(Screens.SettingsMenu)}
          >
            Opties
          </Button>
        </div>
        <div className="game-screen-item">
          <Button
            className="main-menu-feedback-button"
            fullwidth
            link="https://forms.gle/6b8Lrr72zHwudbib8"
            target="_blank"
            style={{ backgroundColor: '#45a55d' }}
          >
            Feedback geven
          </Button>
        </div>
        <div className="game-screen-item">
          <Button
            className="main-menu-close-button"
            fullwidth
            onClick={() => {
              window.location.href = '/';
            }}
          >
            Afsluiten
          </Button>
        </div>
      </div>
    );
  }
}

export default MainMenu;
